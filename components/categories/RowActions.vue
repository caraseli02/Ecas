<script setup lang="ts">
import { CopyIcon, MoveIcon, Trash2Icon, MergeIcon, PencilLine, FileCheck, FileMinus } from 'lucide-vue-next';

const {
  deleteCategories,
  showMergeModal
} = useCategories();
</script>

<template>
  <div class="flex items-center gap-1 self-stretch px-3 my-auto">
    <UiButton variant="ghost">
      <MergeIcon class="w-5 h-5 text-slate-500 cursor-pointer" @click="showMergeModal = true" />
    </UiButton>
    <PencilLine class="w-5 h-5  text-slate-500" />
  </div>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton variant="secondary" class="bg-dark-50" size="icon">
        <svg
xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-ellipsis-vertical">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent side="left" :collision-padding="10" class="flex gap-1 flex-col items-start p-2 w-40">
      <UiButton class="gap-1 w-full justify-start" size="sm" variant="ghost">
        <CopyIcon class="w-4 h-4" />
        Duplicate
      </UiButton>
      <UiButton class="gap-1 w-full justify-start" size="sm" variant="ghost">
        <MoveIcon class="w-4 h-4" />
        Move
      </UiButton>
      <UiButton class="gap-1 w-full justify-start" size="sm" variant="ghost">
        <FileCheck class="w-4 h-4" />
        Publish
      </UiButton>
      <UiButton class="gap-1 w-full justify-start" size="sm" variant="ghost">
        <FileMinus class="w-4 h-4" />
        Unpublish
      </UiButton>
      <UiButton class="gap-1 w-full justify-start" size="sm" variant="ghost" @click="deleteCategories">
        <Trash2Icon class="w-4 h-4" />
        Delete
      </UiButton>
    </UiPopoverContent>
  </UiPopover>
</template>

<style scoped></style>
