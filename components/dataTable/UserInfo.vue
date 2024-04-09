<template>
  <div class="flex justify-between items-center">
  <UiButton variant="ghost" class="hover:text-blue-500 hover:bg-transparent text-start pl-0 text-neutral-700 relative">
    <ul class="flex flex-col min-w-[228px]">
      <li class="text-sm font-medium">{{ name }}</li>
      <li class="text-xs font-normal">{{ email }}</li>
    </ul>
    <NuxtLink v-if="navigateToRoute" class="w-full h-full absolute inset-0" :to="navigateToRoute" />
  </UiButton>  
  <UiBadge class="h-[22px] text-xs !pt-[3px]" variant="outline" v-if="discount">
  {{ discount }}%
  </UiBadge>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  email: string
  navigateToRoute?: string,
  discount?: number
}>()
</script>

<style scoped>

</style>
