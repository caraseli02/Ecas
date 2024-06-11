<template>
  <UiSheet v-model:open="modelValue">
    <UiSheetContent class="overflow-auto" asChild side="left">
      <slot />
    </UiSheetContent>
  </UiSheet>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>()
</script>

<style scoped>

</style>
