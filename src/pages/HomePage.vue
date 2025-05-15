<template>
    <div
        class="bg-black min-h-screen overflow-hidden relative text-white flex items-center justify-center"
    >
        <header></header>

        <BruteforceBanner
            :show="isBruteforceOn"
            @stop="isBruteforceOn = false"
        />

        <WelcomeBanner
            @add-stars="handleAddStars"
            @open-quiz="openQuizPanel"
            @toggle-calc="toggleCalculator"
            @navigateToCV="goToResume"
            :isCalcOpen="isCalculatorOn"
        />

        <QuizModal
            v-if="isQuizPanelOn"
            :question="activeQuizItem"
            :selectedAnswer="chosenAnswer"
            :feedbackMessage="answerFeedback"
            @close="closeQuizPanel"
            @select="handleAnswerSelect"
        />

        <transition name="blur">
            <div
                v-if="isBlurOn"
                id="backgroundBlur"
                class="absolute inset-0 w-full backdrop-blur-[8px] z-10"
            ></div>
        </transition>

        <FloatingButton @open-modal="showRobotDialog" />
        <RobotModal
            :show="isRobotDialogOn"
            @close="hideRobotDialog"
            @yes="confirmRobotFlow"
        />
        <StarField :stars="stars" />

        <AlertModal
            v-if="isBlockedNoticeOn"
            :show="isBlockedNoticeOn"
            title="Accès refusé"
            message="Vous devez compléter le quiz avant d'accéder à cette page."
            @close="isBlockedNoticeOn = false"
        />

        <transition name="calc">
            <Calc v-if="isCalculatorOn" />
        </transition>

        <FooterBar />
    </div>
</template>

<script setup>
    import { ref, reactive, computed, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import WelcomeBanner from '../components/WelcomeBanner.vue';
    import QuizModal from '../components/QuizModal.vue';
    import StarField from '../components/StarField.vue';
    import FloatingButton from '../components/FloatingButton.vue';
    import RobotModal from '../components/RobotModal.vue';
    import AlertModal from '../components/AlertModal.vue';
    import BruteforceBanner from '../components/BruteforceBanner.vue';
    import FooterBar from '../components/FooterBar.vue';
    import Calc from '../components/Calc.vue';

    const stars = ref([]);
    const isBlurOn = ref(false);
    const isQuizPanelOn = ref(false);
    const chosenAnswer = ref(null);
    const answerFeedback = ref('');
    const isFeedbackVisible = ref(false);
    const activeQuestionIndex = ref(0);
    const isRobotDialogOn = ref(false);
    const currentTryIndex = ref(0);
    const isBruteforceOn = ref(false);
    const isBlockedNoticeOn = ref(false);
    const isCalculatorOn = ref(false);

    const route = useRoute();
    const router = useRouter();

    const handleAddStars = () => {
        for (let i = 0; i < 100; i++) {
            const newStar = reactive({
                size: Math.floor(Math.random() * 6) + 4,
                top: Math.floor(Math.random() * 100),
                left: Math.floor(Math.random() * 100),
                color: randomHexColor(),
                opacity: 0,
                transform: 'scale(0.1)',
            });
            stars.value.push(newStar);
            setTimeout(() => {
                newStar.opacity = 1;
                newStar.transform = 'scale(0.8)';
            }, 0);
        }
    };

    const randomHexColor = () => {
        const hex = '0123456789ABCDEF';
        return (
            '#' +
            Array.from(
                { length: 6 },
                () => hex[Math.floor(Math.random() * 16)],
            ).join('')
        );
    };

    const showRobotDialog = () => {
        isRobotDialogOn.value = true;
        isBlurOn.value = true;
    };

    const hideRobotDialog = () => {
        isRobotDialogOn.value = false;
        isBlurOn.value = false;
    };

    const confirmRobotFlow = () => {
        isBruteforceOn.value = true;
        currentTryIndex.value = 0;
        activeQuestionIndex.value = 0;
        hideRobotDialog();
        runBruteforce();
    };

    const quizList = [
        {
            question:
                'Quel est le framework utilisé pour construire cette application ?',
            options: ['Vue', 'React', 'Angular', 'Vite'],
            correct: 'Vue',
        },
        {
            question: 'Combien de couleurs sont choisis pour le fond étoilé ?',
            options: ['16', '32', '24', '6'],
            correct: '6',
        },
        {
            question: 'A combien de fps voient les yeux humains ?',
            options: ['32', '26', '24', '13'],
            correct: '13',
        },
        {
            question: 'icl ts pmo ikiag w u gurt yo: 🥀🥀🥀',
            options: ['🌭', '🔋', '🌹', '❤️'],
            correct: '🔋',
        },
    ];

    const activeQuizItem = computed(() => quizList[activeQuestionIndex.value]);

    const openQuizPanel = () => {
        isQuizPanelOn.value = true;
        chosenAnswer.value = null;
        answerFeedback.value = '';
        isFeedbackVisible.value = false;
        isBlurOn.value = true;
        localStorage.setItem('quizCompleted', 'false');
    };

    const closeQuizPanel = () => {
        isQuizPanelOn.value = false;
        chosenAnswer.value = null;
        isBlurOn.value = false;

        if (
            isBruteforceOn.value &&
            (activeQuestionIndex.value < quizList.length - 1 ||
                currentTryIndex.value < activeQuizItem.value.options.length)
        ) {
            setTimeout(() => {
                runBruteforce();
            }, 1000);
        } else {
            activeQuestionIndex.value = 0;
            isBruteforceOn.value = false;
        }
    };

    const handleAnswerSelect = (answer) => {
        chosenAnswer.value = answer;
        isFeedbackVisible.value = true;
        isBlurOn.value = true;

        const correct = answer === activeQuizItem.value.correct;
        answerFeedback.value = correct ? 'Bonne réponse' : 'Mauvaise réponse';

        setTimeout(() => {
            if (correct) {
                if (activeQuestionIndex.value < quizList.length - 1) {
                    activeQuestionIndex.value++;
                    currentTryIndex.value = 0;
                    resetQuizFeedback();
                    if (isBruteforceOn.value) runBruteforce();
                } else {
                    answerFeedback.value = 'Bravo, vous avez terminé le quiz !';
                    localStorage.setItem('quizCompleted', 'true');
                    isBruteforceOn.value = false;
                    setTimeout(() => router.push('/contact'), 1500);
                }
            } else {
                closeQuizPanel();
            }
        }, 1500);
    };

    const resetQuizFeedback = () => {
        chosenAnswer.value = null;
        answerFeedback.value = '';
        isFeedbackVisible.value = false;
    };

    const runBruteforce = () => {
        if (!isQuizPanelOn.value) openQuizPanel();
        setTimeout(() => {
            const tryAnswer =
                activeQuizItem.value.options[currentTryIndex.value];
            handleAnswerSelect(tryAnswer);
            currentTryIndex.value++;
        }, 500);
    };

    watch(
        () => route.query.quizRequired,
        (required) => {
            if (required === 'true') isBlockedNoticeOn.value = true;
        },
        { immediate: true },
    );

    const toggleCalculator = () => {
        isCalculatorOn.value = !isCalculatorOn.value;
    };

    const goToResume = () => {
        router.push('/cv');
    };
</script>

<style scoped>
    .modal-enter-active,
    .modal-leave-active {
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }
    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: scale(0.9);
    }
    .blur-enter-active,
    .blur-leave-active {
        transition: opacity 0.3s ease;
    }
    .blur-enter-from,
    .blur-leave-to {
        opacity: 0;
    }
    .calc-enter-active,
    .calc-leave-active {
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }
    .calc-enter-from,
    .calc-leave-to {
        opacity: 0;
        transform: scale(0.9);
    }
</style>
