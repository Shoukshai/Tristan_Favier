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
                        textShadow: `0 0 15px ${hoverColors[index] || 'rgba(255,255,255,0.9)'}`,
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
                class="absolute inset-0 z-50 flex items-center justify-center"
                @click.self="closeOverlay"
            >
                <div
                    class="w-[90%] h-[90%] bg-transparent text-black rounded-xl shadow-2xl p-4 flex flex-col gap-4 justify-between relative transition-all duration-500"
                    @click.stop
                >
                    <div
                        v-for="(panel, index) in activePanels"
                        :key="index"
                        class="group relative w-full h-1/3 overflow-hidden rounded-lg cursor-pointer transition-all duration-500 hover:scale-[1.01]"
                    >
                        <img
                            :src="panel.image"
                            class="absolute inset-0 w-full h-full object-cover left-1/2 -translate-x-1/2 brightness-75 group-hover:brightness-100 transition duration-500 rounded-lg"
                            :alt="panel.title"
                        />
                        <div
                            class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-black/30"
                        >
                            <div
                                class="border-2 rounded-xl shadow-lg backdrop-blur-[6px] p-4 flex flex-col items-center justify-center transition duration-300 group-hover:scale-120"
                            >
                                <h2
                                    class="text-3xl font-bold mb-1 group-hover:text-emerald-400 transition duration-300"
                                >
                                    {{ panel.title }}
                                </h2>
                                <p
                                    class="text-2x1 group-hover:text-gray-200 transition duration-300"
                                >
                                    {{ panel.text }}
                                    <div v-if="panel.text2">{{ panel.text2 }}</div>
                                    <div v-if="panel.text3">{{ panel.text3 }}</div>
                                    <div v-if="panel.text4">{{ panel.text4 }}</div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <FloatingHomeButton
            v-if="!activeSection"
            @go-home="goHome"
        />
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    
    import FloatingHomeButton from './FloatingHomeButton.vue';

    import computerImg from '../assets/computer.png';
    import gamesImg from '../assets/expedition33.jpeg';
    import animesImg from '../assets/lain.jpeg';

    import codingImg from '../assets/coding.jpg';
    import hardwareImg from '../assets/hardware.jpg';
    import linuxImg from '../assets/systeme.png';

    import game1Img from '../assets/expedition33.png';
    import game2Img from '../assets/league.jpg';
    import game3Img from '../assets/thebigblack.jpg';

    import anime1Img from '../assets/thirdimpact.jpeg';
    import anime2Img from '../assets/apothecary.png';
    import anime3Img from '../assets/lain3.jpeg';
    
    const router = useRouter();

    const sections = [
        { key: 'informatics', label: 'Informatics', src: computerImg },
        { key: 'games', label: 'Video Games', src: gamesImg },
        { key: 'animes', label: 'Animes', src: animesImg },
    ];

    const overlayData = {
        informatics: [
            {
                title: 'Coding',
                text: 'WebDev, Js, C and some games related stuff.',
                text2: 'Ive done some projects, some of them are on my github.',
                image: codingImg,
            },
            {
                title: 'Hardware',
                text: 'I love looking through specs of new hardware and compare them.',
                text2: 'I took about 2 months of searching before buying my laptop.',
                image: hardwareImg,
            },
            {
                title: 'Systemes',
                text: 'Just the average Linux enjoyer, I like ricing my system.',
                image: linuxImg,
            },
        ],
        games: [
            {
                title: 'Clair Obscur: Expedition 33',
                text: 'One of the best games I have ever played yet.',
                text2: 'The story is amazing, and the ost are just insane.',
                image: game1Img,
            },
            {
                title: 'League of Legends',
                text: 'A game I played for about 9 years, I am currently on a break.',
                text2: 'I peaked at diamond 2 with more then 60% winrate, I could have gone higher in rank.',
                image: game2Img,
            },
            {
                title: 'Osu!',
                text: 'An amazing and entertaining rhythm game.',
                text2: 'Ive been playing it for a very long time.',
                text3: 'I am currently ranked in the top 15k in the world.',
                image: game3Img,
            },
        ],
        animes: [
            {
                title: 'Evangelion',
                text: 'One of the best animes I have ever watched, the story is a bit hard to understand.',
                text2: 'I had to watch multiples video to understand the story.',
                text3: 'The ost are stunning, and the animation is just incredible for such an old anime.',
                text4: 'It is a classic, and I recommend it to everyone.',
                image: anime1Img,
            },
            {
                title: 'The apothecary diaries',
                text: 'A new anime that I started watching, and maybe a contender for the best animes of my list.',
                text2: 'The animation is so good, the opening is one of the best I have ever heard/seen.',
                text3: 'I am very excited to see how the story will evolve.',
                image: anime2Img,
            },
            {
                title: 'Serial Experiments Lain',
                text: 'An interesting anime, this website is a bit inspired by it.',
                text2: 'The story is a bit hard to understand, but it is very interesting.',
                text3: 'Is is such a classic aswell.',
                image: anime3Img,
            },
        ],
    };

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

    const activePanels = computed(() => overlayData[activeSection.value] || []);

    const goHome = () => {
        router.push('/');
    };

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
