<script setup lang="ts">
import PriceRange from './PriceRange.vue'

const isOpen = ref(false)
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton class="justify-start hover:text-blue-500" variant="ghost">Entry Price</UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-sm p-4 sm:max-w-[480px] gap-10 border-none rounded-xl shadow-s">
      <UiDialogHeader>
        <UiDialogTitle>Create Entry Price Template</UiDialogTitle>
      </UiDialogHeader>
      <div class="flex items-center space-x-2">
        <PriceRange />
      </div>
      <UiDialogFooter class="gap-4 sm:justify-start">
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
