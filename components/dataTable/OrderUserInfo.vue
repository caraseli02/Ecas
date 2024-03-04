<template>
  <UiButton variant="ghost" class="hover:text-blue-500 hover:bg-transparent">
    <ul class="flex flex-col min-w-[228px]">
      <li>{{ name }}</li>
      <li>{{ email }}</li>
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
