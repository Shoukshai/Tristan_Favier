<template>
    <transition name="fade">
        <div
            v-if="show"
            class="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
        >
            <div
                class="bg-black text-white rounded-lg shadow-lg p-6 w-full max-w-md border border-red-500/50"
            >
                <div class="flex items-center mb-4">
                    <svg
                        class="w-6 h-6 text-red-400 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                        />
                    </svg>
                    <h2 class="text-xl font-bold">{{ title }}</h2>
                </div>

                <p class="mb-6">{{ message }}</p>

                <div class="flex justify-end">
                    <button
                        class="btn btn-error"
                        @click="$emit('close')"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
    defineProps({
        show: Boolean,
        title: String,
        message: String,
    });
    defineEmits(['close']);
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
