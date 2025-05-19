<template>
    <transition name="fade">
        <div
            v-if="visible"
            @click="handleClickContainer"
            class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full sm:w-3/4 md:w-1/2 xl:w-1/3 bg-base-300 bg-opacity-80 text-base-content rounded-4xl border-3 shadow-lg backdrop-blur-md flex flex-wrap items-center p-4 md:p-2 scale-90"
            role="alert"
        >
            <div class="flex-1 min-w-[200px]">
                <p class="text-base md:text-lg font-semibold truncate mb-2">
                    {{ title }}
                </p>
                <div class="relative">
                    <input
                        type="range"
                        min="0"
                        :max="duration"
                        step="0.1"
                        v-model="currentTime"
                        @input="seekAudio"
                        class="range range-xs range-success [--range-thumb:white]"
                    />
                </div>
            </div>

            <VolumeControl
                v-model:volume="volume"
                class="hidden sm:flex"
            />

            <button
                @click.stop="togglePlay"
                class="btn btn-ghost btn-circle hover:scale-110 transition-transform"
                aria-label="Play/Pause"
            >
                <svg
                    v-if="!isPlaying"
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M8 5v14l11-7z" />
                </svg>
                <svg
                    v-else
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                </svg>
            </button>

            <button
                @click.stop="closePlayer"
                class="btn btn-ghost btn-circle hover:scale-110 transition-transform"
                aria-label="Close player"
            >
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                >
                    <line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                    />
                    <line
                        x1="6"
                        y1="18"
                        x2="18"
                        y2="6"
                    />
                </svg>
            </button>
        </div>
    </transition>
</template>

<script setup>
    import { ref, watch, onBeforeUnmount, onMounted } from 'vue';
    import VolumeControl from './VolumeControl.vue';

    const volume = ref(0.5);

    const props = defineProps({
        src: String,
        title: String,
        visible: Boolean,
    });

    const emit = defineEmits(['close']);

    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    let audio = null;
    let syncInterval = null;

    const windowWidth = ref(window.innerWidth);

    const updateWindowWidth = () => {
        windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
        window.addEventListener('resize', updateWindowWidth);

        if (audio) {
            audio.volume = volume.value;
        }
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateWindowWidth);
        clearInterval(syncInterval);
        if (audio) audio.pause();
    });

    const togglePlay = () => {
        if (!audio) return;
        isPlaying.value ? audio.pause() : audio.play();
        isPlaying.value = !isPlaying.value;
    };

    const seekAudio = () => {
        if (audio) audio.currentTime = currentTime.value;
    };

    const closePlayer = () => {
        if (audio) audio.pause();
        isPlaying.value = false;
        emit('close');
    };

    const handleClickContainer = () => {
        if (windowWidth.value < 640) {
            closePlayer();
        }
    };

    watch(
        () => props.src,
        (newSrc) => {
            if (audio) audio.pause();
            audio = new Audio(newSrc);
            audio.volume = volume.value;
            audio.addEventListener('loadedmetadata', () => {
                duration.value = audio.duration;
            });
            audio.play();
            isPlaying.value = true;
            syncInterval = setInterval(() => {
                if (audio) currentTime.value = audio.currentTime;
            }, 300);
            audio.addEventListener('ended', () => {
                closePlayer();
            });
        },
        { immediate: true },
    );

    watch(volume, (newVal) => {
        if (audio) {
            audio.volume = newVal;
        }
    });
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
    }
</style>
