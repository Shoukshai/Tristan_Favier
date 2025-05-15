<template>
    <div
        class="min-h-screen overflow-hidden relative text-white flex items-center justify-center"
    >
        <LainBackground />
        <ContactBanner />
        <FooterBar />
    </div>
</template>

<script setup>
    import ContactBanner from '../components/ContactBanner.vue';
    import FooterBar from '../components/FooterBar.vue';
    import LainBackground from '../components/LainBackground.vue';
</script>
