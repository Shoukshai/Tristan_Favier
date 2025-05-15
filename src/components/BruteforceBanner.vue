<template>
    <transition name="fade">
        <div
            v-if="isBruteNoticeOn"
            @click="$emit('stop')"
            class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-sm px-4 py-2 rounded-full shadow-lg z-[9999] cursor-pointer hover:bg-red-700 transition"
            title="Click to stop bruteforce"
        >
            Bruteforce on
        </div>
    </transition>
</template>

<script setup>
    defineProps({
        isBruteNoticeOn: Boolean,
    });

    defineEmits(['stop']);
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }
</style>
