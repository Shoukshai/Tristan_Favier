<template>
    <div
        id="starContainer"
        class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]"
    >
        <div
            v-for="(star, index) in stars"
            :key="index"
            :class="[
                'rounded-full',
                'transition-all',
                'ease-in-out',
                'duration-500',
            ]"
            :style="mapStyle(star)"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        stars: {
            type: Array,
            required: true,
        },
    });

    const mapStyle = (star) => ({
        width: `${star.size}px`,
        height: `${star.size}px`,
        position: 'absolute',
        top: `${star.top}%`,
        left: `${star.left}%`,
        backgroundColor: star.color,
        opacity: star.opacity,
        transform: star.transform,
        boxShadow: `0 0 8px ${star.color}, 0 0 16px ${star.color}`,
    });
</script>

<style scoped>
    .star {
        transition:
            transform 0.5s ease-out,
            opacity 0.5s ease-out;
    }
</style>
