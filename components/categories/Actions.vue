<script setup lang="ts">
import { CopyIcon, MoveIcon, Trash2Icon, MergeIcon, ArrowDownNarrowWide, RefreshCcw } from 'lucide-vue-next';
import { useCategories } from '@/composables/useCategories';

const {
  selectedCategories,
  showMergeModal,
  moveCategories,
  duplicateCategory,
  deleteCategories
} = useCategories();
</script>

<template>
  <div class="bg-light-200 flex justify-between items-center h-14 min-w-[700px] sticky top-0 z-10">
    <template v-if="selectedCategories.length === 0">
      <section class="flex">
        <div class="w-[374px]">
          <UiButton variant="ghost" class="w-fit justify-start ml-16">
            Name
            <ArrowDownNarrowWide class="ml-2 h-4 w-4" />
          </UiButton>
        </div>
        <UiButton variant="ghost" class="w-fit">
          Status
          <ArrowDownNarrowWide class="ml-2 h-4 w-4" />
        </UiButton>
      </section>
      <section class="flex items-center gap-4 pr-3">
        <UiButton variant="ghost" class="justify-start">
          Actions
        </UiButton>
        <UiButton size="icon" variant="ghost">
          <RefreshCcw class="w-5 h-5" />
        </UiButton>
      </section>
    </template>
    <template v-else>
      <section class="pl-3 text-sm">{{ selectedCategories.length }} items selected</section>
      <section class="pr-3 flex gap-3 py-1">
        <UiButton class="gap-1" variant="secondary" size="sm" :disabled="selectedCategories.length > 0"
          @click="showMergeModal = true">
          <MergeIcon class="w-4 h-4 text-slate-500" />
          Merge
        </UiButton>
        <UiButton class="gap-1" variant="secondary" size="sm" :disabled="selectedCategories.length === 0"
          @click="moveCategories('newParentId')">
          <MoveIcon class="w-4 h-4" />
          Move
        </UiButton>
        <UiButton class="gap-1" variant="secondary" size="sm" :disabled="selectedCategories.length !== 1"
          @click="duplicateCategory(selectedCategoryId)">
          <CopyIcon class="w-4 h-4" />
          Duplicate
        </UiButton>
        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton class="gap-1" variant="secondary" size="sm" :disabled="selectedCategories.length === 0">
              <Trash2Icon class="w-4 h-4" />
              Delete
            </UiButton>
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
              <UiAlertDialogDescription>
                This action cannot be undone. This will permanently delete and remove categories from our servers.
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
              <UiAlertDialogAction @click="deleteCategories(selectedCategories)">Continue</UiAlertDialogAction>
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>
      </section>
    </template>
  </div>
</template>
