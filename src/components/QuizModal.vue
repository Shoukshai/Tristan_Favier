<template>
  <transition name="modal">
    <div
      id="quizModal"
      class="modal modal-open fixed inset-0 flex justify-center bg-black bg-opacity-75 overflow-y-auto"
    >
      <div class="relative z-[20] bg-black text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 class="text-2xl font-bold mb-4" id="questionTitle">Question</h2>

        <!-- Question and Options -->
        <div id="questionContainer" class="p-5 text-center">
          <p class="font-bold">{{ question.question }}</p>

          <div v-for="(option, index) in question.options" :key="index">
            <button
              class="btn btn-outline w-full my-2"
              :class="{
                'btn-success': selectedAnswer && option === question.correct,
                'btn-error': selectedAnswer && option === selectedAnswer && option !== question.correct,
              }"
              @click="!selectedAnswer && $emit('select', option)"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- Feedback and Close -->
        <div class="modal-action">
          <p id="feedbackMessage" class="text-center w-full">
            {{ feedbackMessage }}
          </p>
          <button @click="$emit('close')" class="btn">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
// QuizModal.vue
// Props:
//   question: an object with question text and multiple options
//   selectedAnswer: user's chosen answer
//   feedbackMessage: string feedback after selection

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  selectedAnswer: String,
  feedbackMessage: String,
});
</script>

<style scoped>
/* Override Tailwind buttons with custom feedback colors */
.btn-success {
  background-color: #22c55e; /* Green */
  color: white;
}
.btn-error {
  background-color: #ef4444; /* Red */
  color: white;
}
</style>
