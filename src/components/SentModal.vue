<template>
    <div
        v-if="show"
        class="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
    >
        <div
            class="bg-black text-white rounded-lg shadow-lg p-6 w-full max-w-md border border-green-500/50"
        >
            <div class="flex items-center mb-4">
                <!-- Success Icon -->
                <svg
                    class="w-6 h-6 text-green-400 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </svg>

                <h2 class="text-xl font-bold">{{ title }}</h2>
            </div>

            <p class="mb-6">{{ message }}</p>

            <div class="flex justify-end">
                <button
                    class="btn btn-success"
                    @click="$emit('close')"
                >
                    OK
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    // SentModal.vue
    // Props: show (Boolean), title (String), message (String)
    // Emits: 'close' event when dismissed

    defineProps({
        show: Boolean,
        title: String,
        message: String,
    });

    defineEmits(['close']);
</script>
