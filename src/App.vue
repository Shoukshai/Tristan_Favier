import * from './main.js';

<template>
  <div class="bg-black min-h-screen overflow-hidden relative text-white flex items-center justify-center">
    <header></header>

    <div class="z-10 text-center">
      <h1 class="text-5xl font-bold">Welcome to my website</h1>

      <br>

      <button @click="addStars" class="btn btn-outline z-10">Add a star</button>
      <button @click="openQuiz" class="btn btn-outline z-10">Open the QUIZ</button>
    </div>

    <div v-if="isQuizOpen" id="quizModal" class="modal modal-open fixed inset-0 flex justify-center bg-black bg-opacity-75 overflow-y-auto">
      <div class="relative z-[20] bg-black text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 class="text-2xl font-bold mb-4" id="questionTitle">Question</h2>
        <div id="questionContainer" class="p-5 text-center">
          <p>{{ currentQuestion.question }}</p>
          <div v-for="(option, index) in currentQuestion.options" :key="index">
            <button
              class="btn btn-outline w-full my-2"
              :class="{
                'btn-success': selectedAnswer && option === currentQuestion.correct,
                'btn-error': selectedAnswer && option === selectedAnswer && option !== currentQuestion.correct,
              }"
              @click="!selectedAnswer && selectAnswer(option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div class="modal-action">
          <p id="feedbackMessage" class="text-center w-full">{{ feedbackMessage }}</p>
          <button @click="closeModal" class="btn">Close</button>
        </div>
      </div>
    </div>

    <div id="starContainer" class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
    <div
      v-for="(star, index) in stars"
      :key="index"
      :class="['rounded-full', 'transition-all', 'ease-in-out', 'duration-500']"
      :style="getStarStyle(star)"
    ></div>
  </div>

    <footer id="footer" class="fixed bottom-0 left-0 w-full h-[30px] bg-[#181818] p-[5px_0] text-white z-10 text-sm flex items-center px-4">
      <p>My Website © 2025 - Built using Tailwind CSS + DaisyUI</p>
    </footer>

    <div v-if="backgroundBlur" id="backgroundBlur" class="absolute inset-0 w-full backdrop-blur-[8px] z-10"></div>
  </div>
</template>

<script setup>
  import { ref, reactive, nextTick , computed} from 'vue'

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
      star.opacity = 1;
      star.transform = 'scale(0.8)';
    }, 0);
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

  const getStarStyle = (star) => ({
    width: `${star.size}px`,
    height: `${star.size}px`,
    position: 'absolute',
    top: `${star.top}%`,
    left: `${star.left}%`,
    backgroundColor: star.color,
    opacity: star.opacity,
    transform: star.transform,
  })

  const backgroundBlur = ref(false)
  const isQuizOpen = ref(false)
  const selectedAnswer = ref(null)
  const feedbackMessage = ref('')
  const showFeedback = ref(false)
  const currentQuestionIndex = ref(0)

  const questions = [
    {
      question: 'Quelle est la capitale de la France ?',
      options: ['Paris', 'Lyon', 'Marseille', 'Nice'],
      correct: 'Paris',
    },
    {
      question: 'Quelle est 2 + 2 ?',
      options: ['3', '4', '5', '22'],
      correct: '4',
    },
  ]

  const currentQuestion = computed(() => questions[currentQuestionIndex.value])

  const openQuiz = () => {
    isQuizOpen.value = true
    selectedAnswer.value = null
    feedbackMessage.value = ''
    showFeedback.value = false
    backgroundBlur.value = false
  }

  const closeModal = () => {
    isQuizOpen.value = false
    backgroundBlur.value = false
    selectedAnswer.value = null
    currentQuestionIndex.value = 0
  }

  const selectAnswer = (answer) => {
    selectedAnswer.value = answer
    showFeedback.value = true
    backgroundBlur.value = true

    const isCorrect = answer === currentQuestion.value.correct
    feedbackMessage.value = isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse...'

    setTimeout(() => {
      if (currentQuestionIndex.value < questions.length - 1) {
        currentQuestionIndex.value++
        selectedAnswer.value = null
        feedbackMessage.value = ''
        showFeedback.value = false
        backgroundBlur.value = false
      } else {
        closeModal()
      }
    }, 1500)
  }
</script>

<style scoped>
  .star {
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  }
</style>