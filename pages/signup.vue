<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <InfoIcon class="w-8 h-8 text-blue-500" />
      </div>
      <h1 class="text-2xl font-bold text-gray-900 mb-4">
        Portfolio Demo Mode
      </h1>
      <p class="text-gray-600 mb-8">
        Account registration is intentionally disabled for this portfolio demo. Please use the pre-configured demo credentials on the Sign In page to explore the platform's customer and admin features.
      </p>
      <div class="space-y-4">
        <NuxtLink to="/?signin=true">
          <UiButton class="w-full">
            Go to Sign In
          </UiButton>
        </NuxtLink>
        <NuxtLink to="/">
          <UiButton
            variant="ghost"
            class="w-full"
          >
            Back to Home
          </UiButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next';

definePageMeta({
  layout: 'empty',
});

useHead({
  title: 'Signup - Portfolio Demo',
});
</script>
