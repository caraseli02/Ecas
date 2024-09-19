<script setup lang="ts">
import PriceRange from './PriceRange.vue'

const isOpen = ref(false)
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton class="justify-start" variant="ghost">Entry Price</UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-md gap-10">
      <UiDialogHeader>
        <UiDialogTitle>Create Entry Price Template</UiDialogTitle>
      </UiDialogHeader>
      <div class="flex items-center space-x-2">
        <PriceRange />
      </div>
      <UiDialogFooter class="sm:justify-start">
        <UiDialogClose as-child>
          <UiButton type="button" variant="secondary">
            Cancel
          </UiButton>
        </UiDialogClose>
        <UiButton class="w-full" type="button">
            Create
          </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
