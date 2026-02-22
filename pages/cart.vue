<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';

const authStore = useAuthStore();

const isAuthed = computed(() => Boolean(authStore.token?.value));

if (!isAuthed.value) {
    await navigateTo('/?signin=true', { replace: true });
} else {
    await navigateTo('/order-summary', { replace: true });
}
</script>

<template>
    <div class="container flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Redirecting to order summary...
    </div>
</template>
