<template>
    <div
        class="bg-black min-h-screen overflow-hidden relative text-white flex items-center justify-center"
    >
        <header></header>

        <BruteforceBanner
            :isBruteNoticeOn="isBruteforceOn"
            @stop="isBruteforceOn = false"
        />

        <WelcomeBanner
            @add-stars="handleAddStars"
            @open-quiz="openQuizPanel"
            @toggle-calc="toggleCalculator"
            @router-passion="goToPassion"
            :isCalcOpen="isCalculatorOn"
        />

        <QuizModal
            v-if="isQuizPanelOn"
            :question="activeQuizItem"
            :selectedAnswer="chosenAnswer"
            :feedbackMessage="answerFeedback"
            :isQuizCompleted="isQuizCompleted"
            @close="closeQuizPanel"
            @select="handleAnswerSelect"
            @skip-quiz="skipQuiz"
        />

        <transition name="blur">
            <div
                v-if="isBlurOn"
                id="backgroundBlur"
                class="absolute inset-0 w-full backdrop-blur-[8px] z-10"
            ></div>
        </transition>

        <transition name="fade">
            <FloatingButton v-if="isQuizPanelOn" @open-modal="showRobotDialog" />
        </transition>

        <RobotModal
            :show="isRobotDialogOn"
            @close="hideRobotDialog"
            @yes="confirmRobotFlow"
        />
        <StarField :stars="stars" />

        <transition name="fade">
            <AlertModal
                v-if="isBlockedNoticeOn"
                :isAlertOn="isBlockedNoticeOn"
                title="Acces refused"
                message="You need to complete the quiz to access this page."
                @close="isBlockedNoticeOn = false"
            />
        </transition>

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
    const isQuizCompleted = ref(false)

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
        return `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`
    }

    const showRobotDialog = () => {
        isRobotDialogOn.value = true;
        isBlurOn.value = true;
        isQuizPanelOn.value = false;
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
            question: 'What framework is used to create this website ?',
            options: ['Vue', 'React', 'Angular', 'Vite'],
            correct: 'Vue',
        },
        {
            question: 'How many stars appears in the background ?',
            options: ['100', '200', '300', '400'],
            correct: '100',
        },
        {
            question: 'At how many fps does the human eye see ?',
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
        isQuizCompleted.value = localStorage.getItem('quizCompleted') === 'true';
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
        answerFeedback.value = correct ? 'Correct' : 'Incorrect';

        setTimeout(() => {
            if (correct) {
                if (activeQuestionIndex.value < quizList.length - 1) {
                    activeQuestionIndex.value++;
                    currentTryIndex.value = 0;
                    resetQuizFeedback();
                    if (isBruteforceOn.value) runBruteforce();
                } else {
                    answerFeedback.value = 'Congratulation you have completed the quiz !';
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

    const goToPassion = () => {
        router.push('/passion');
    };

    const skipQuiz = () => {
        router.push('/contact');
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
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
