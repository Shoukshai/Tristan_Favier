<template>
    <div class="z-10 relative px-6 py-12 max-w-3xl mx-auto">
        <h1 class="text-5xl font-bold text-center mb-10">Contact Me</h1>

        <form
            @submit.prevent="submitForm"
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            <div>
                <label
                    for="email"
                    class="label font-semibold"
                    >Your email*</label
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

            <div>
                <label
                    for="name"
                    class="label font-semibold"
                    >Your name*</label
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

            <div class="md:col-span-2">
                <label
                    for="message"
                    class="label font-semibold"
                    >Message*</label
                >
                <textarea
                    id="message"
                    class="textarea textarea-bordered w-full min-h-[150px]"
                    :class="{ 'textarea-error': errors.message }"
                    placeholder="Type your message here..."
                    v-model="form.message"
                ></textarea>
            </div>

            <div class="md:col-span-2 flex justify-end">
                <button
                    type="submit"
                    class="btn btn-outline hover:bg-emerald-950"
                >
                    Send
                </button>
            </div>
        </form>

        <SentModal
            :show="isSentModalOn"
            title="Message Sent"
            message="Your message has been successfully sent"
            @close="isSentModalOn = false"
        />
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    
    import SentModal from './SentModal.vue';

    const form = reactive({
        email: '',
        name: '',
        subject: '',
        message: '',
    });

    const errors = reactive({
        email: false,
        name: false,
        message: false,
    });

    const isSentModalOn = ref(false);

    const submitForm = () => {
        errors.email = !form.email.trim();
        errors.name = !form.name.trim();
        errors.message = !form.message.trim();

        const hasIssue = errors.email || errors.name || errors.message;

        if (!hasIssue) {
            isSentModalOn.value = true;
            form.email = '';
            form.name = '';
            form.subject = '';
            form.message = '';
        }
    };
</script>
