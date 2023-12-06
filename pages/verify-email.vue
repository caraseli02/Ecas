<template>
    <div class="py-20 md:py-[120px] lg:py-[150px] xl:pb-[276px]">
        <div class="container max-w-[406px]">
            <h1 class="text-xl leading-[1.4] font-semibold text-center mb-10">Verify your email</h1>
            <div class="grid gap-4 mt-4">
                <button
                    class="flex items-center justify-center p-2 rounded-lg bg-blue leading-[1.67] h-12 text-white font-medium"
                    @click="verifyEmail()"
                >
                    Verify
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';

const { $api } = useNuxtApp();
const route = useRoute();

const verifyEmail = async () => {
    if (!route.query.oobCode) {
        return false;
    }

    await $api.auth.verifyEmail(route.query.oobCode as string);
};

useHead({
    title: 'Verify Email',
});
</script>
