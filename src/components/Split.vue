<template>
    <div class="flex h-screen overflow-hidden">
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
                        textShadow: `0 0 15px ${hoverColors[index] || 'rgba(255,255,255,0.9)'}`,
                    }"
                >
                    {{ label }}
                </h2>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    import computerImg from '../assets/computer.png';
    import gamesImg from '../assets/expedition33.jpeg';
    import animesImg from '../assets/lain.jpeg';

    const router = useRouter();

    const sections = [
        { key: 'informatics', label: 'Informatics', src: computerImg },
        { key: 'games', label: 'Video Games', src: gamesImg },
        { key: 'animes', label: 'Animes', src: animesImg },
    ];

    const hoverColors = ref([]);

    const getRandomColor = () => {
        return `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`
    }

    const setRandomColor = (index) => {
        hoverColors.value[index] = getRandomColor();
    };

    const handleClick = (section) => {
        router.push(`/passions/${section}`);
    };
</script>
