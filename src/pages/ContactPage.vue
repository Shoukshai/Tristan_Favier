<template>
    <div
        class="min-h-screen overflow-hidden relative text-white flex items-center justify-center"
    >
        <LainBackground />
        <ContactBanner />
        <FooterBar />
        <FloatingHomeButton
            @go-home="goHome"
        />
    </div>
</template>

<script setup>
    import ContactBanner from '../components/ContactBanner.vue';
    import FooterBar from '../components/FooterBar.vue';
    import LainBackground from '../components/LainBackground.vue';
    import FloatingHomeButton from '../components/FloatingHomeButton.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const goHome = () => {
        router.push('/');
    };
</script>
