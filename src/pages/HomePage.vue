<template>
    <div class="bg-black min-h-screen overflow-hidden relative text-white flex items-center justify-center">
        <header></header>
        
        <!-- Bruteforce Banner -->
        <BruteforceBanner :show="isBruteforcing" @stop="isBruteforcing = false" />        
        
        <!-- Main UI components -->
        <WelcomeBanner
            @add-stars="addStars"
            @open-quiz="openQuiz"
        />
        <QuizModal
            v-if="isQuizOpen"
            :question="currentQuestion"
            :selectedAnswer="selectedAnswer"
            :feedbackMessage="feedbackMessage"
            @close="closeModal"
            @select="selectAnswer"
        />
        <transition name="blur">
            <div
                v-if="backgroundBlur"
                id="backgroundBlur"
                class="absolute inset-0 w-full backdrop-blur-[8px] z-10"
            ></div>
        </transition>

        <!-- Floating interaction buttons -->
        <FloatingButton @open-modal="openRobotModal" />
        <RobotModal
            :show="isRobotModalOpen"
            @close="closeRobotModal"
            @yes="handleRobotConfirmation"
        />
        <StarField :stars="stars" />

        <AlertModal
            v-if="showAccessDeniedModal"
            :show="showAccessDeniedModal"
            title="Accès refusé"
            message="Vous devez compléter le quiz avant d'accéder à cette page."
            @close="showAccessDeniedModal = false"
        />

        <!-- Footer -->
        <footer
            id="footer"
            class="fixed bottom-0 left-0 w-full h-[30px] bg-[#181818] p-[5px_0] text-white z-10 text-sm flex items-center px-4"
        >
            <p>My Website © 2025 - Built using Tailwind CSS + DaisyUI</p>
        </footer>
    </div>
</template>

<script setup>
    import { ref, reactive, computed, watch } from "vue";
    import { useRoute } from "vue-router";
    import { useRouter } from "vue-router";

    // Component imports
    import WelcomeBanner from "../components/WelcomeBanner.vue";
    import QuizModal from "../components/QuizModal.vue";
    import StarField from "../components/StarField.vue";
    import FloatingButton from "../components/FloatingButton.vue";
    import RobotModal from "../components/RobotModal.vue";
    import AlertModal from "../components/AlertModal.vue";
    import BruteforceBanner from "../components/BruteforceBanner.vue";


    // UI State
    const stars = ref([]);
    const backgroundBlur = ref(false);
    const isQuizOpen = ref(false);
    const selectedAnswer = ref(null);
    const feedbackMessage = ref("");
    const showFeedback = ref(false);
    const currentQuestionIndex = ref(0);
    const isRobotModalOpen = ref(false);
    const currentAttemptIndex = ref(0);
    const isBruteforcing = ref(false);
    const showAccessDeniedModal = ref(false);
    const route = useRoute();
    const router = useRouter();

    // === StarField Logic ===
    const addStar = () => {
        const star = reactive({
            size: Math.floor(Math.random() * 6) + 4,
            top: Math.floor(Math.random() * 100),
            left: Math.floor(Math.random() * 100),
            color: getRandomHexColor(),
            opacity: 0,
            transform: "scale(0.1)",
        });

        stars.value.push(star);

        // Animate star after render
        setTimeout(() => {
            star.opacity = 1;
            star.transform = "scale(0.8)";
        }, 0);
    };

    const addStars = () => {
        for (let i = 0; i < 100; i++) addStar();
    };

    const getRandomHexColor = () => {
        const hexDigits = "0123456789ABCDEF";
        return (
            "#" +
            Array.from({ length: 6 })
                .map(() => hexDigits[Math.floor(Math.random() * 16)])
                .join("")
        );
    };

    // === Robot Modal Control ===
    const openRobotModal = () => {
        isRobotModalOpen.value = true;
        backgroundBlur.value = true;
    };

    const closeRobotModal = () => {
        isRobotModalOpen.value = false;
        backgroundBlur.value = false;
    };

    const handleRobotConfirmation = () => {
        isBruteforcing.value = true;
        currentAttemptIndex.value = 0;
        currentQuestionIndex.value = 0;
        closeRobotModal();
        startBruteforce();
    };

    // === Quiz Logic ===
    const questions = [
        {
            question: "Quel est le framework utilisé pour construire cette application ?",
            options: ["Vue", "React", "Angular", "Vite"],
            correct: "Vue",
        },
        {
            question: "Combien de couleurs sont choisis pour le fond étoilé ?",
            options: ["16", "32", "24", "6"],
            correct: "6",
        },
        {
            question: "A combien de fps voient les yeux humains ?",
            options: ["32", "26", "24", "13"],
            correct: "13",
        },
        {
            question: "icl ts pmo ikiag w u gurt yo: 🥀🥀🥀",
            options: ["🥭", "🔋", "🌹", "❤️"],
            correct: "🔋",
        },
    ];

    const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

    const openQuiz = () => {
        isQuizOpen.value = true;
        selectedAnswer.value = null;
        feedbackMessage.value = "";
        showFeedback.value = false;
        backgroundBlur.value = true;
    };

    const closeModal = () => {
        isQuizOpen.value = false;
        selectedAnswer.value = null;
        backgroundBlur.value = false;

        if (isBruteforcing.value && (currentQuestionIndex.value < questions.length - 1 || currentAttemptIndex.value < currentQuestion.value.options.length)) {
            setTimeout(() => {
                startBruteforce();
            }, 1000);
        } else {
            currentQuestionIndex.value = 0;
            isBruteforcing.value = false;
        }
    };

    const selectAnswer = (answer) => {
        selectedAnswer.value = answer;
        showFeedback.value = true;
        backgroundBlur.value = true;

        const isCorrect = answer === currentQuestion.value.correct;
        feedbackMessage.value = isCorrect ? "Bonne réponse" : "Mauvaise réponse";

        setTimeout(() => {
            if (isCorrect) {
                if (currentQuestionIndex.value < questions.length - 1) {
                    currentQuestionIndex.value++;
                    currentAttemptIndex.value = 0;
                    resetFeedback();
                    if (isBruteforcing.value) startBruteforce();
                } else {
                    feedbackMessage.value = "Bravo, vous avez terminé le quiz !";
                    localStorage.setItem("quizCompleted", "true");
                    isBruteforcing.value = false;
                    setTimeout(router.push("/contact"), 1500);
                }
            } else {
                closeModal();
            }
        }, 1500);
    };

    const resetFeedback = () => {
        selectedAnswer.value = null;
        feedbackMessage.value = "";
        showFeedback.value = false;
    };

    // Brute-force simulation
    const startBruteforce = () => {
        if (!isQuizOpen.value) openQuiz();

        setTimeout(() => {
            const attemptAnswer = currentQuestion.value.options[currentAttemptIndex.value];
            selectAnswer(attemptAnswer);
            currentAttemptIndex.value++;
        }, 500);
    };

    // === Access Denied Modal ===
    watch(
        () => route.query.quizRequired,
        (newVal) => {
            if (newVal === "true") {
                showAccessDeniedModal.value = true;
            }
        },
        { immediate: true }, // This triggers the watch right away on first load
    );
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
</style>
