<template>
    <div class="fixed inset-0 bg-black overflow-hidden">
        <canvas
            ref="canvas"
            class="w-full h-full"
        ></canvas>
        <div
            class="absolute inset-0 bg-gradient-to-tr from-emerald-900/5 to-red-900/5 mix-blend-overlay"
        ></div>
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
    import { ref, onMounted, onUnmounted } from 'vue';

    const canvas = ref(null);
    let ctx;
    let animationFrame;
    let offsetX = 0;
    let offsetY = 0;
    const speed = 0.25;

    const randomDirection = () => (Math.random() > 0.5 ? 1 : -1);

    const setupCanvas = () => {
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

    const drawGrid = (dx = 0, dy = 0) => {
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
        ctx.strokeStyle = 'rgba(61,35,83, 0.7)';
        ctx.lineWidth = 1;

        for (let x = -100 + dx; x <= canvas.value.width + 100; x += 100) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.value.height);
            ctx.stroke();
        }
        for (let y = -100 + dy; y <= canvas.value.height + 100; y += 100) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.value.width, y);
            ctx.stroke();
        }
    };

    const animate = () => {
        let dirX = randomDirection();
        let dirY = randomDirection();
        let changeTimer = 0;

        const loop = () => {
            changeTimer++;
            if (changeTimer > 600) {
                dirX = randomDirection();
                dirY = randomDirection();
                changeTimer = 0;
            }

            offsetX = (offsetX + speed * dirX) % 100;
            offsetY = (offsetY + speed * dirY) % 100;

            if (offsetX < 0) offsetX += 100;
            if (offsetY < 0) offsetY += 100;

            drawGrid(offsetX, offsetY);
            animationFrame = requestAnimationFrame(loop);
        };

        loop();
    };

    onMounted(() => {
        setupCanvas();
        animate();
    });

    onUnmounted(() => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', setupCanvas);
    });
</script>
