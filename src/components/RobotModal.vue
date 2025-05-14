<template>
    <transition name="modal">
        <div
            v-if="show"
            class="modal modal-open fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-40"
        >
            <div class="bg-neutral p-6 rounded-lg shadow-xl text-white w-full max-w-md">
                <h2 class="text-xl font-bold mb-4">Do you want to bruteforce the quiz?</h2>

                <!-- Modal action buttons -->
                <div class="flex justify-end gap-4">
                    <button
                        class="btn btn-success"
                        @click="$emit('yes')"
                    >
                        Yes
                    </button>
                    <button
                        class="btn btn-error"
                        @click="$emit('close')"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
    // RobotModal.vue
    // Props: show (Boolean) - whether to show the modal
    // Emits: 'yes' - user confirms brute-force
    //         'close' - user cancels

    const props = defineProps({
        show: {
            type: Boolean,
            required: true,
        },
    });

    const emit = defineEmits(["close", "yes"]);
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
</style>
