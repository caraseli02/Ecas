<template>
    <div class="py-20 md:py-[120px] lg:py-[150px] xl:pb-[276px]">
        <div class="container max-w-[406px]">
            <h1 class="text-xl leading-[1.4] font-semibold text-center mb-10">Password Reset</h1>
            <form class="grid grid-cols-1 gap-6" @submit.prevent="handleSubmit">
                <FormInput
                    v-model="form.email.value"
                    :error="form.email.error"
                    type="email"
                    label="Email Address"
                    placeholder="Enter Your Email Address"
                />
                <FormPassword
                    v-model="form.newPassword.value"
                    :error="form.newPassword.error"
                    type="email"
                    label="New Password"
                    placeholder="New Password"
                />
                <FormPassword
                    v-model="form.repeatPassword.value"
                    :error="form.repeatPassword.error"
                    type="email"
                    label="Repeat Password"
                    placeholder="Repeat Password"
                />
                <div class="grid grid-cols-[140px,1fr] gap-4 mt-4">
                    <NuxtLink
                        to="/"
                        class="flex items-center justify-center px-8 py-2 rounded-lg bg-gray-100 leading-[1.67] h-12 text-slate-500 font-medium"
                    >
                        Cancel
                    </NuxtLink>
                    <button
                        class="flex items-center justify-center p-2 rounded-lg bg-blue-500 leading-[1.67] h-12 text-white font-medium"
                        @click="resetPassword(form.email.value, form.newPassword.value, form.repeatPassword.value, $route.query.oobCode)"
                    >
                        Save Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();

const form = ref({
    email: {
        value: '',
        error: '',
    },
    newPassword: {
        value: '',
        error: '',
    },
    repeatPassword: {
        value: '',
        error: '',
    },
});

const resetPassword = async (email: string, newPassword: string, repeatPassowrd: string, code: string) => {
    const response = await $api.user.resetPassword(email, newPassword, code);

    if (response.status !== 'success') {
        return;
    }
};

useHead({
    title: 'Password Reset',
});
</script>
