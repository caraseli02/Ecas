<template>
  <UiButton variant="ghost" class="hover:text-blue-500 hover:bg-transparent text-start pl-0 text-neutral-700">
    <ul class="flex flex-col min-w-[228px]">
      <li class="text-sm font-medium">{{ name }}</li>
      <li class="text-xs font-normal">{{ email }}</li>
    </ul>
  </UiButton>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  email: string
}>()
</script>

<style scoped>

</style>
