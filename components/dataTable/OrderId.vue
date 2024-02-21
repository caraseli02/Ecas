<template>
  <div class="min-w-[128px] flex justify-between">
    <span class="text-sm">#{{ orderId }}</span>
    <NuxtLink v-if="notes" to="#">
      <svg class="w-4 h-4 hover:text-blue-500" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.66683 12.6663H5.3335C2.66683 12.6663 1.3335 11.9997 1.3335 8.66634V5.33301C1.3335 2.66634 2.66683 1.33301 5.3335 1.33301H10.6668C13.3335 1.33301 14.6668 2.66634 14.6668 5.33301V8.66634C14.6668 11.333 13.3335 12.6663 10.6668 12.6663H10.3335C10.1268 12.6663 9.92683 12.7663 9.80016 12.933L8.80016 14.2663C8.36016 14.853 7.64016 14.853 7.20016 14.2663L6.20016 12.933C6.0935 12.7863 5.84683 12.6663 5.66683 12.6663Z"
          stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4.6665 5.33301H11.3332" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
        <path d="M4.6665 8.66699H8.6665" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  orderId: string
  notes?: string
}>()
</script>

<style scoped>
</style>
