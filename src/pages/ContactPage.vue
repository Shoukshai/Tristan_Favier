<template>
    <div
        class="bg-black min-h-screen overflow-hidden relative text-white flex items-center justify-center"
    >
        <header></header>

        <!-- Contact form banner -->
        <ContactBanner
            :form="form"
            :errors="errors"
            @submit-form="handleSubmit"
        />

        <!-- Persistent footer -->
        <FooterBar />
    </div>
</template>

<script setup>
    // ContactPage.vue
    // Combines the contact form and footer into a full page

    import { reactive } from 'vue';
    import ContactBanner from '../components/ContactBanner.vue';
    import FooterBar from '../components/FooterBar.vue';

    // Reactive form state
    const form = reactive({
        email: '',
        name: '',
        subject: '',
        message: '',
    });

    // Reactive validation flags
    const errors = reactive({
        email: false,
        name: false,
        message: false,
    });

    // Form validation and reset
    function handleSubmit() {
        errors.email = !form.email.trim();
        errors.name = !form.name.trim();
        errors.message = !form.message.trim();

        const hasError = errors.email || errors.name || errors.message;

        if (!hasError) {
            alert('Message sent!');
            form.email = '';
            form.name = '';
            form.subject = '';
            form.message = '';
        }
    }
</script>
