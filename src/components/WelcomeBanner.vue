<template>
  <div class="z-10 text-center">
    <h1 class="text-5xl font-bold">Welcome to my website</h1>
    <br />
    <div class="grid grid-cols-2 gap-x-6 gap-y-4">
      <button @click="$emit('add-stars')" class="btn btn-outline z-10 basis-66">
        Add stars
      </button>
      <button @click="$emit('open-quiz')" class="btn btn-outline z-10 basis-66">
        Open the QUIZ
      </button>
    </div>
  </div>
</template>

<script setup>
</script>
