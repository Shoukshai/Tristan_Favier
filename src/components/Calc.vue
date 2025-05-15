<template>
    <div
        class="bg-purple-500/30 p-6 rounded-xl shadow-lg w-full max-w-md text-white z-20 relative border-2 border-emerald-800 cursor-move select-none backdrop-blur-[6px]"
        :style="{ top: position.y + 'px', left: position.x + 'px' }"
        @mousedown="startDragging"
        ref="dragBox"
    >
        <h2 class="text-2xl font-bold mb-4 text-emerald-600 tracking-wider">
            /calc
        </h2>

        <input
            v-model="expression"
            @keyup.enter="calculate"
            type="text"
            placeholder="Enter expression"
            :class="[
                'input input-bordered w-full',
                hasError
                    ? 'border-red-500 placeholder-red-400 text-red-300'
                    : 'text-white',
            ]"
        />

        <div class="mt-4">
            <button
                class="btn btn-outline z-10 w-full hover:bg-emerald-800"
                @click="calculate"
            >
                Compute
            </button>
        </div>

        <div class="mt-6 text-lg">
            <p class="text-gray-400">Result:</p>
            <p class="text-white font-mono">{{ result }}</p>
        </div>

        <div
            v-if="hasError"
            class="mt-2 text-red-400 text-sm"
        >
            {{ errorMsg }}
        </div>
    </div>
</template>

<script setup>
    import { ref, onBeforeUnmount } from 'vue';

    const expression = ref('');
    const result = ref('');
    const errorMsg = ref('');
    const hasError = ref(false);

    const calculate = () => {
        try {
            if (!/^[0-9+\-*/().\s]+$/.test(expression.value)) {
                throw new Error('Invalid characters');
            }
            const calc = Function(`"use strict"; return (${expression.value})`);
            result.value = calc().toString();
            errorMsg.value = '';
            hasError.value = false;
        } catch {
            result.value = '';
            errorMsg.value = 'Invalid expression';
            hasError.value = true;
        }
    };

    const position = ref({ x: 100, y: 100 });
    const dragBox = ref(null);
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    const startDragging = (e) => {
        dragging = true;
        offsetX = e.clientX - position.value.x;
        offsetY = e.clientY - position.value.y;
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDragging);
    };

    const onDrag = (e) => {
        if (dragging) {
            position.value.x = e.clientX - offsetX;
            position.value.y = e.clientY - offsetY;
        }
    };

    const stopDragging = () => {
        dragging = false;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDragging);
    };

    onBeforeUnmount(stopDragging);
</script>

<style scoped>
    div[style] {
        position: absolute;
    }
</style>
