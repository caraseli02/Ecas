<template>
  <NuxtLayout>
    <NuxtPage class="relative" id="nuxt_page" />
  </NuxtLayout>
  <LazyAppInfo v-model="appStore.showAppInBeta" />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
</script>
