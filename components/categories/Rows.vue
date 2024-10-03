<script setup lang="ts">
import { PlugIcon } from 'lucide-vue-next';
import CategoriesRecursive from '@/components/categories/Recursive.vue';

import { useCategories } from '@/composables/useCategories';

const { selectCategory, filteredAndSortedData, getCategories, selectedCategories, isLoading } = useCategories();

getCategories()
</script>

<!-- CategoryRow.vue -->
<template>
  <UiSkeleton v-if="isLoading" class="w-full h-[calc(100vh-450px)] 2xl:max-h-[calc(100vh-450px)]" />
  <UiAccordion
v-for="category in filteredAndSortedData" v-else ref="target" :key="category.id" type="single"
    class="w-full border-b flex flex-col gap-1 bg-white first:rounded-t-lg last:rounded-b-lg min-w-[700px]" collapsible>
    <UiAccordionItem v-slot="{open}" :value="category.name" class="relative border-none">
      <div class="flex items-center gap-1 px-3 hover:bg-light-200" :class="{'bg-light-200 border-t': open}">
        <UiCheckbox :checked="selectedCategories.includes(category.id)" @update:checked="selectCategory(category.id)" />
        <UiAccordionTrigger 
          class="flex-row-reverse justify-center gap-2.5 py-1 truncate w-10 max-w-[50px] h-7"
          :class="{'opacity-0': category.subcategory?.length === 0}" 
        />
        <section class="w-full flex gap-2 items-center py-2 ">
          <article class="flex flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 ">
            <figure class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
              <IconAsync v-if="category.icon" :name="category.icon" class="h-5 w-5 stroke-1" />
              <PlugIcon v-else class="w-5 aspect-square stroke-1" />
            </figure>
            <p
              class="my-auto text-sm font-medium leading-4 text-neutral-700 max-md:max-w-full min-w-[260px] flex flex-col justify-between h-full py-0.5">
              {{ category.name }}
              <span v-if="category.productCount" class="text-xs text-slate-500">{{ category.productCount }} items</span>
            </p>
            <div class="flex items-center text-sm">
              <span
class="h-4 w-4 mr-2 rounded-full flex justify-center items-center"
                :class="category.isPublished ? 'bg-green-600' : 'bg-rose-600'" />
              {{ category.isPublished ? 'Published' : 'Unpublished' }}
            </div>
          </article>
          <CategoriesRowActions :category="category" />
        </section>
      </div>
      <UiAccordionContent :class="{'last:border-b': open}" class="pt-0 ml-0 pb-0 border-none">
        <CategoriesRecursive v-if="category.subcategory" :parent-id="category.id" :items="category.subcategory" :depth="1"/>
      </UiAccordionContent>
    </UiAccordionItem>
  </UiAccordion>
</template>




<style scoped></style>
