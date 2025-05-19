<template>
    <button
        class="btn btn-outline fixed bottom-6 right-6 shadow-lg rounded-full w-14 h-14 flex items-center justify-center z-[99999] hover:bg-emerald-800"
        @click="$emit('go-home')"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
            />
        </svg>
    </button>
</template>

<script setup>
    defineEmits(['go-home']);
</script>
