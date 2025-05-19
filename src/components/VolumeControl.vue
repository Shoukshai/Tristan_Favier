<template>
    <div class="flex items-center gap-2">
        <label
            for="volume"
            class="text-white text-sm"
            >Volume</label
        >
        <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model="localVolume"
            class="w-full sm:w-32 range range-xs range-success [--range-thumb:white]"
        />
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';

    const emit = defineEmits(['update:volume']);

    const localVolume = ref(0.5);

    onMounted(() => {
        const saved = localStorage.getItem('mediaVolume');
        if (saved) {
            localVolume.value = parseFloat(saved);
            emit('update:volume', localVolume.value);
        }
    });

    watch(localVolume, (newVal) => {
        localStorage.setItem('mediaVolume', newVal.toString());
        emit('update:volume', newVal);
    });
</script>
