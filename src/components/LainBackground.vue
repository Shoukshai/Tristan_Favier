<template>
    <div class="fixed inset-0 bg-black overflow-hidden">
        <!-- Dynamic canvas background -->
        <canvas
            ref="canvas"
            class="w-full h-full"
        ></canvas>

        <!-- Subtle gradient overlay with blend modes -->
        <div
            class="absolute inset-0 bg-gradient-to-tr from-emerald-900/5 to-red-900/5 mix-blend-overlay"
        ></div>

        <!-- Vignette layer for cinematic effect -->
        <div
            class="absolute inset-0 pointer-events-none z-10"
            style="
                background: radial-gradient(
                    circle,
                    transparent 0%,
                    transparent 25%,
                    rgba(0, 0, 0, 0.5) 50%,
                    rgba(0, 0, 0, 0.9) 100%
                );
            "
        ></div>
    </div>
</template>

<script setup>
    // LainBackground.vue
    // Animated grid background with canvas rendering and blending layers

    import { ref, onMounted, onUnmounted } from 'vue';

    const canvas = ref(null);
    let ctx;
    let animationFrame;

    // Animation parameters
    const speed = 0.25; // Control grid scroll speed
    let offsetX = 0;
    let offsetY = 0;

    /**
     * Utility to randomly flip direction (+1 or -1)
     */
    const getRandomDirection = () => (Math.random() > 0.5 ? 1 : -1);

    /**
     * Initialize canvas size and scaling
     */
    const initCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        ctx = canvas.value.getContext('2d');

        const resize = () => {
            canvas.value.width = window.innerWidth * dpr;
            canvas.value.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', resize);
        resize();
    };

    /**
     * Draw a grid with given offset
     */
    const drawGrid = (offsetX = 0, offsetY = 0) => {
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

        const gridSize = 100;
        ctx.strokeStyle = 'rgba(61,35,83, 0.7)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (
            let x = -gridSize + offsetX;
            x <= canvas.value.width + gridSize;
            x += gridSize
        ) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.value.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (
            let y = -gridSize + offsetY;
            y <= canvas.value.height + gridSize;
            y += gridSize
        ) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.value.width, y);
            ctx.stroke();
        }
    };

    /**
     * Starts the animation loop with random direction changes
     */
    const animate = () => {
        let directionX = getRandomDirection();
        let directionY = getRandomDirection();
        let directionChangeTimer = 0;

        const loop = () => {
            // Every ~5 seconds change direction
            directionChangeTimer++;
            if (directionChangeTimer > 300) {
                directionX = getRandomDirection();
                directionY = getRandomDirection();
                directionChangeTimer = 0;
            }

            // Update offsets and apply looping logic
            offsetX = (offsetX + speed * directionX) % 100;
            offsetY = (offsetY + speed * directionY) % 100;

            if (offsetX < 0) offsetX += 100;
            if (offsetY < 0) offsetY += 100;

            drawGrid(offsetX, offsetY);
            animationFrame = requestAnimationFrame(loop);
        };

        loop();
    };

    // Lifecycle hooks
    onMounted(() => {
        initCanvas();
        animate();
    });

    onUnmounted(() => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', resize);
    });
</script>
