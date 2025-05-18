<template>
    <div
        class="bg-black min-h-screen overflow-hidden relative text-white flex items-center justify-center"
    >

        <LainBackground />
        <FooterBar />
    </div>
</template>

<script setup>
    import FooterBar from "../components/FooterBar.vue";
    import LainBackground from "../components/LainBackground.vue";
</script>