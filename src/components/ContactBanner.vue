<template>
    <div class="z-10 relative px-6 py-12 max-w-3xl mx-auto">
        <h1 class="text-5xl font-bold text-center mb-10">Contact Me</h1>

        <!-- Contact Form -->
        <form
            @submit.prevent="handleSubmit"
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            <!-- Email Field -->
            <div>
                <label
                    for="email"
                    class="label font-semibold"
                    >Your email</label
                >
                <input
                    id="email"
                    type="email"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': errors.email }"
                    placeholder="your@email.com"
                    v-model="form.email"
                />
            </div>

            <!-- Name Field -->
            <div>
                <label
                    for="name"
                    class="label font-semibold"
                    >Your name</label
                >
                <input
                    id="name"
                    type="text"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': errors.name }"
                    placeholder="Your name"
                    v-model="form.name"
                />
            </div>

            <!-- Subject Field -->
            <div class="md:col-span-2">
                <label
                    for="subject"
                    class="label font-semibold"
                    >Subject</label
                >
                <input
                    id="subject"
                    type="text"
                    class="input input-bordered w-full"
                    placeholder="Subject"
                    v-model="form.subject"
                />
            </div>

            <!-- Message Field -->
            <div class="md:col-span-2">
                <label
                    for="message"
                    class="label font-semibold"
                    >Message</label
                >
                <textarea
                    id="message"
                    class="textarea textarea-bordered w-full min-h-[150px]"
                    :class="{ 'textarea-error': errors.message }"
                    placeholder="Type your message here..."
                    v-model="form.message"
                ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="md:col-span-2 flex justify-end">
                <button
                    type="submit"
                    class="btn btn-outline hover:bg-emerald-950"
                >
                    Send
                </button>
            </div>
        </form>

        <!-- Sent Confirmation Modal -->
        <SentModal
            :show="showModal"
            title="Message Sent"
            message="Your message has been successfully sent"
            @close="showModal = false"
        />
    </div>
</template>

<script setup>
    // ContactBanner.vue
    // Handles contact form state and validation logic

    import { reactive, ref } from 'vue';
    import SentModal from './SentModal.vue';

    // Form data
    const form = reactive({
        email: '',
        name: '',
        subject: '',
        message: '',
    });

    // Error tracking
    const errors = reactive({
        email: false,
        name: false,
        message: false,
    });

    // Modal state
    const showModal = ref(false);

    /**
     * Validates form and shows modal on success
     */
    function handleSubmit() {
        errors.email = !form.email.trim();
        errors.name = !form.name.trim();
        errors.message = !form.message.trim();

        const hasError = errors.email || errors.name || errors.message;

        if (!hasError) {
            showModal.value = true;

            // Reset form fields
            form.email = '';
            form.name = '';
            form.subject = '';
            form.message = '';
        }
    }
</script>
