<template>
    <div
        class="bg-black min-h-screen overflow-hidden relative text-white flex items-center justify-center"
    >
        <header></header>

        <!-- Contact form banner -->
        <ContactBanner />

        <!-- Persistent footer -->
        <FooterBar />
    </div>
</template>

<script setup>
    // ContactPage.vue
    // Combines the contact form and footer into a full page
    import ContactBanner from '../components/ContactBanner.vue';
    import FooterBar from '../components/FooterBar.vue';
</script>