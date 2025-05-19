<template>
    <div class="flex h-screen overflow-hidden relative">
        <div
            class="absolute inset-0 pointer-events-none z-10"
            style="
                background: radial-gradient(
                    ellipse at center,
                    rgba(0, 0, 0, 0) 40%,
                    rgba(0, 0, 0, 0.6) 75%,
                    rgba(0, 0, 0, 0.85) 100%
                );
            "
        ></div>

        <div
            v-for="({ label, src, key }, index) in sections"
            :key="key"
            class="w-1/3 group relative overflow-hidden cursor-pointer transition-all duration-500 hover:w-[40%]"
            @click="handleClick(key)"
            @mouseenter="setRandomColor(index)"
            v-if="!activeSection"
        >
            <img
                :src="src"
                :alt="label"
                class="object-cover w-full h-full transition duration-500 group-hover:scale-105 group-hover:brightness-120"
            />
            <div
                class="absolute inset-0 flex justify-center items-center pointer-events-none"
            >
                <h2
                    class="relative text-3xl font-bold transition duration-300 group-hover:scale-110 group-hover:brightness-125"
                    :style="{
                        color: hoverColors[index] || 'white',
                        textShadow: `0 0 15px ${hoverColors[index] || 'rgba(255, 255, 255, 0.9)'}`,
                    }"
                >
                    {{ label }}
                </h2>
            </div>
        </div>

        <transition
            name="overlay"
            mode="out-in"
        >
            <div
                v-if="activeSection"
                class="absolute inset-0 z-50 bg-black/70 flex items-center justify-center"
                @click.self="closeOverlay"
            >
                <div
                    class="w-[90%] h-[90%] bg-white text-black rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center relative transition-all duration-500"
                    @click.stop
                >
                    <h1 class="text-4xl font-bold mb-4">
                        {{ activeSectionLabel }}
                    </h1>
                    <p class="text-lg text-center mb-4">
                        <!-- Code here need to change, texte has to be differents between panels -->
                    </p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';

    import computerImg from '../assets/computer.png';
    import gamesImg from '../assets/expedition33.jpeg';
    import animesImg from '../assets/lain.jpeg';

    const sections = [
        { key: 'informatics', label: 'Informatics', src: computerImg },
        { key: 'games', label: 'Video Games', src: gamesImg },
        { key: 'animes', label: 'Animes', src: animesImg },
    ];

    const hoverColors = ref([]);
    const activeSection = ref(null);

    const getRandomColor = () => {
        return `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`
    }

    const setRandomColor = (index) => {
        hoverColors.value[index] = getRandomColor();
    };

    const handleClick = (section) => {
        activeSection.value = section;
        history.replaceState(null, '', `#${section}`);
    };

    const closeOverlay = () => {
        activeSection.value = null;
        history.replaceState(null, '', window.location.pathname);
    };

    const activeSectionLabel = computed(() => {
        const match = sections.find((s) => s.key === activeSection.value);
        return match?.label || '';
    });
</script>

<style scoped>
    .overlay-enter-active,
    .overlay-leave-active {
        transition: all 0.4s ease;
    }
    .overlay-enter-from {
        opacity: 0;
        transform: scale(0.9);
    }
    .overlay-leave-to {
        opacity: 0;
        transform: scale(0.95);
    }
</style>
