<template>
  <ul class="flex flex-col">
    <li>{{ name }}</li>
    <li>{{ email }}</li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  email: string
}>()
</script>

<style scoped>

</style>
