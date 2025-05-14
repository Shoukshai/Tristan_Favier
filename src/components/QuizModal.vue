<template>
  <transition name="modal">
    <div
      id="quizModal"
      class="modal modal-open fixed inset-0 flex justify-center bg-black bg-opacity-75 overflow-y-auto"
    >
      <div class="relative z-[20] bg-black text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 class="text-2xl font-bold mb-4" id="questionTitle">Question</h2>
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
        <div class="modal-action">
          <p id="feedbackMessage" class="text-center w-full">{{ feedbackMessage }}</p>
          <button @click="$emit('close')" class="btn">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  question: Object,
  selectedAnswer: String,
  feedbackMessage: String,
})
</script>
