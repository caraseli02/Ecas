<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';

const authStore = useAuthStore();
const redirectPath = '/cart';

const isAuthed = computed(() => Boolean(authStore.token?.value));

if (!isAuthed.value) {
    await navigateTo(`/?signin=true&redirect=${encodeURIComponent(redirectPath)}`, { replace: true });
} else {
    await navigateTo('/order-summary', { replace: true });
}
</script>

<template>
    <div class="container flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Redirecting to cart...
    </div>
</template>
