<template>
  <UiSheet v-model:open="modelValue">
    <UiSheetContent class="overflow-auto py-0" as-child :side="side">
      <slot />
    </UiSheetContent>
  </UiSheet>
</template>

<script setup lang="ts">

defineProps<{
  side: 'left' | 'right'
}>()

const modelValue = defineModel<boolean>()
</script>

<style scoped>

</style>
