<template>
    <div class="min-h-screen overflow-hidden relative text-white flex items-center justify-center">
        <LainBackground />

        <header></header>

        <!-- Contact form banner -->
        <ContactBanner />

        <!-- Persistent footer -->
        <FooterBar />
    </div>
</template>

<script setup>
    // ContactPage.vue
    import ContactBanner from '../components/ContactBanner.vue';
    import FooterBar from '../components/FooterBar.vue';
    import LainBackground from '../components/LainBackground.vue';
</script>