<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';

const authStore = useAuthStore();
const _redirectPath = '/cart';

const _isAuthed = computed(() => Boolean(authStore.token?.value));

// In a demo, we want to allow guests to see their cart/summary.
// We redirect everyone to order-summary, and handle the auth there.
await navigateTo('/order-summary', { replace: true });
</script>

<template>
  <div class="container flex min-h-[60vh] items-center justify-center text-muted-foreground">
    Redirecting to cart...
  </div>
</template>
