<template>
    <transition name="modal">
        <div
            id="quizModal"
            class="modal modal-open fixed inset-0 flex justify-center bg-black bg-opacity-75 overflow-y-auto"
        >
            <div
                class="relative z-[20] bg-black text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md border-2"
            >
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold">Question</h2>
                    <button
                        :disabled="!isQuizCompleted"
                        class="btn btn-sm"
                        :class="{
                            'btn-error opacity-55 cursor-not-allowed': !isQuizCompleted,
                            'bg-emerald-800 hover:bg-emerald-700': isQuizCompleted,
                        }"
                        @click="$emit('skip-quiz')"
                    >
                        Skip quiz
                    </button>
                </div>

                <div
                    id="questionContainer"
                    class="p-5 text-center"
                >
                    <p class="font-bold">{{ question.question }}</p>

                    <div
                        v-for="(option, index) in question.options"
                        :key="index"
                    >
                        <button
                            class="btn btn-outline w-full my-2 hover:bg-emerald-800"
                            :class="{
                                'btn-success':
                                    selectedAnswer
                                    && option === question.correct,
                                'btn-error':
                                    selectedAnswer
                                    && option === selectedAnswer
                                    && option !== question.correct,
                            }"
                            @click="!selectedAnswer && $emit('select', option)"
                        >
                            {{ option }}
                        </button>
                    </div>
                </div>

                <div class="modal-action">
                    <p
                        id="feedbackMessage"
                        class="text-center w-full"
                    >
                        {{ feedbackMessage }}
                    </p>
                    <button
                        @click="$emit('close')"
                        class="btn btn-outline hover:bg-emerald-800"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
    defineEmits(['skip-quiz']);

    const props = defineProps({
        question: Object,
        selectedAnswer: String,
        feedbackMessage: String,
        isQuizCompleted: Boolean,
    });
</script>

<style scoped>
    .btn-success {
        background-color: #22c55e;
        color: white;
    }
    .btn-error {
        background-color: #ef4444;
        color: white;
    }
</style>
