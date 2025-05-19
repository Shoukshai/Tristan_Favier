<template>
    <button
        class="btn btn-outline fixed bottom-10 right-2 shadow-lg rounded-full w-14 h-14 flex items-center justify-center z-50 hover:bg-emerald-800"
        @click="$emit('open-modal')"
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
                d="M12 2c.732 0 1.38.195 1.94.523A3.5 3.5 0 0118 6v3h1a2 2 0 012 2v2a2 2 0 01-2 2h-1v3a3.5 3.5 0 01-4.06 3.477A3.495 3.495 0 0112 22a3.495 3.495 0 01-2.94-1.523A3.5 3.5 0 015 16v-3H4a2 2 0 01-2-2v-2a2 2 0 012-2h1V6a3.5 3.5 0 014.06-3.477A3.495 3.495 0 0112 2z"
            />
        </svg>
    </button>
</template>

<script setup>
    defineEmits(['open-modal']);
</script>
