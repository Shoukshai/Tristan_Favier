<template>
  <div
    class="bg-black min-h-screen overflow-hidden relative text-white flex items-center justify-center"
  >
    <header></header>

    <WelcomeBanner @add-stars="addStars" @open-quiz="openQuiz" />
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

    <FloatingButton @open-modal="openRobotModal" />

    <RobotModal
      :show="isRobotModalOpen"
      @close="closeRobotModal"
      @yes="handleRobotYes"
    />
    <StarField :stars="stars" />

    <footer
      id="footer"
      class="fixed bottom-0 left-0 w-full h-[30px] bg-[#181818] p-[5px_0] text-white z-10 text-sm flex items-center px-4"
    >
      <p>My Website © 2025 - Built using Tailwind CSS + DaisyUI</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import WelcomeBanner from './components/WelcomeBanner.vue'
import QuizModal from './components/QuizModal.vue'
import StarField from './components/StarField.vue'

import FloatingButton from './components/FloatingButton.vue'
import RobotModal from './components/RobotModal.vue'

const stars = ref([])

const addStar = () => {
  const star = reactive({
    size: Math.floor(Math.random() * 6) + 4,
    top: Math.floor(Math.random() * 100),
    left: Math.floor(Math.random() * 100),
    color: getRandomColor(),
    opacity: 0,
    transform: 'scale(0.1)',
  })
  stars.value.push(star)
  setTimeout(() => {
    star.opacity = 1
    star.transform = 'scale(0.8)'
  }, 0)
}

const addStars = () => {
  for (let i = 0; i < 100; i++) addStar()
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const backgroundBlur = ref(false)
const isQuizOpen = ref(false)
const selectedAnswer = ref(null)
const feedbackMessage = ref('')
const showFeedback = ref(false)
const currentQuestionIndex = ref(0)

const isRobotModalOpen = ref(false)

const openRobotModal = () => {
  isRobotModalOpen.value = true
  backgroundBlur.value = true
}

const closeRobotModal = () => {
  isRobotModalOpen.value = false
  backgroundBlur.value = false
}

const handleRobotYes = () => {
  console.log("User agreed to help the robot!")
  closeRobotModal()
}

const questions = [
  {
    question: 'Quel est le framework utilisé pour construire cette application ?',
    options: ['Vue', 'React', 'Angular', 'Vite'],
    correct: 'Vue',
  },
  {
    question: 'Combien de couleurs sont choisis pour le fond étoilé ?',
    options: ['16', '32', '24', '6'],
    correct: '6',
  },
]

const currentQuestion = computed(() => questions[currentQuestionIndex.value])

const openQuiz = () => {
  isQuizOpen.value = true
  selectedAnswer.value = null
  feedbackMessage.value = ''
  showFeedback.value = false
  backgroundBlur.value = true
}

const closeModal = () => {
  isQuizOpen.value = false
  selectedAnswer.value = null
  currentQuestionIndex.value = 0
  backgroundBlur.value = false
}

const selectAnswer = (answer) => {
  selectedAnswer.value = answer;
  showFeedback.value = true;
  backgroundBlur.value = true;

  const isCorrect = answer === currentQuestion.value.correct;
  if (isCorrect && currentQuestionIndex.value < questions.length - 1) {
    feedbackMessage.value = 'Bonne réponse';
    setTimeout(() => {
      selectedAnswer.value = null;
      feedbackMessage.value = '';
      showFeedback.value = false;
      currentQuestionIndex.value++;
    }, 1500);
  } else if (!isCorrect) {
    feedbackMessage.value = 'Mauvaise réponse';
    setTimeout(() => {
      closeModal();
    }, 1500);
  } else {
    feedbackMessage.value = 'Bravo, vous avez terminé le quiz !';
    setTimeout(() => {
      closeModal();
    }, 1500);
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
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
