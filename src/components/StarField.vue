<template>
    <div
        id="starContainer"
        class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]"
    >
        <!-- Render each star dynamically with its own style -->
        <div
            v-for="(star, index) in stars"
            :key="index"
            :class="['rounded-full', 'transition-all', 'ease-in-out', 'duration-500']"
            :style="getStarStyle(star)"
        />
    </div>
</template>

<script setup>
    // StarField.vue
    // Props: stars (array of star objects with styling properties)

    const props = defineProps({
        stars: {
            type: Array,
            required: true,
        },
    });

    /**
     * Converts star object properties to inline styles for dynamic rendering
     */
    const getStarStyle = (star) => ({
        width: `${star.size}px`,
        height: `${star.size}px`,
        position: "absolute",
        top: `${star.top}%`,
        left: `${star.left}%`,
        backgroundColor: star.color,
        opacity: star.opacity,
        transform: star.transform,
    });
</script>

<style scoped>
    .star {
        transition:
            transform 0.5s ease-out,
            opacity 0.5s ease-out;
    }
</style>
