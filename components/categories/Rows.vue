<script setup lang="ts">
import { CopyIcon, MoveIcon, Trash2Icon, PlugIcon, MergeIcon, PencilLine } from 'lucide-vue-next';
import CategoriesRecursive from '@/components/categories/Recursive.vue';
import { categories } from '@/data/categories';

import { useCategories } from '@/composables/useCategories';

const {
  selectCategory,
  deleteCategories,
  showMergeModal
} = useCategories();

const router = useRouter();
</script>

<!-- CategoryRow.vue -->
<template>
  <UiAccordion v-for="category in categories" ref="target" :key="category._id" type="single"
    class="w-full border-b flex flex-col gap-1 bg-white first:rounded-t-lg last:rounded-b-lg min-w-[700px]" collapsible>
    <UiAccordionItem :value="category.name" class="relative border-none">
      <div class="flex items-center gap-1 px-3">
        <UiCheckbox @update:checked="selectCategory(category.name)" />
        <UiAccordionTrigger class="flex-row-reverse justify-center gap-2.5 py-1 truncate w-10 max-w-[50px] h-7" />
        <section class="w-full flex gap-2 items-center py-2 ">
          <article class="flex flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 ">
            <figure class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
              <PlugIcon class="w-5 aspect-square stroke-1" />
            </figure>
            <p class="my-auto text-sm font-medium leading-4 text-zinc-700 max-md:max-w-full min-w-[260px]">
              {{
                category.name }}</p>
            <div class="flex items-center text-sm">
              <span class="h-4 w-4 mr-2 rounded-full flex justify-center items-center"
                :class="category.status === 'published' ? 'bg-green-600' : 'bg-rose-600'" />
              {{ category.status === 'published' ? 'Published' : 'Unpublished' }}
            </div>
          </article>
          <div class="flex items-center gap-1 self-stretch px-3 my-auto">
                    <UiButton variant="ghost"><MergeIcon @click="showMergeModal = true" class="w-5 h-5 text-slate-500 cursor-pointer" /></UiButton>
                    <PencilLine class="w-5 h-5  text-slate-500" />
                </div>
          <UiPopover>
            <UiPopoverTrigger as-child>
              <UiButton variant="secondary" class="bg-dark-50" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
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
              <UiButton class="gap-1 w-full justify-start" size="sm" variant="ghost"
                @click="deleteCategories"
              >
                <Trash2Icon class="w-4 h-4" />
                Delete
              </UiButton>
            </UiPopoverContent>
          </UiPopover>
        </section>
      </div>
      <UiAccordionContent class="pt-0 ml-0 pb-0 border-none">
        <CategoriesRecursive v-if="category.items" :items="category.items" />
      </UiAccordionContent>
    </UiAccordionItem>
  </UiAccordion>
</template>




<style scoped>
</style>
