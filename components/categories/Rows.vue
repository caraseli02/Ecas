<script setup lang="ts">
import { PlugIcon } from 'lucide-vue-next';
import CategoriesRecursive from '@/components/categories/Recursive.vue';
import { useAuthStore } from '@/store/authStore';

import { useCategories } from '@/composables/useCategories';

export interface TaxonomyInterface {
  id?: any;
  name: string;
  averageWeight?: number;
  productCount?: number;
  subcategory?: TaxonomyInterface[];
  path: string;
  isPublished: boolean

}

const { selectCategory } = useCategories();

const router = useRouter();

const categories = ref<TaxonomyInterface[]>([]);

const token = useAuthStore().getToken();
const config = useRuntimeConfig();
try {
  const response = await $fetch<{ status: string, data: TaxonomyInterface[] }>(`${config.public.BASE_URL_API}/taxonomy`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  categories.value = response.data;

} catch (error) {
  console.error('Failed to fetch counts from API:', error);
}

</script>

<!-- CategoryRow.vue -->
<template>
  <UiAccordion v-for="category in categories" ref="target" :key="category.id" type="single"
    class="w-full border-b flex flex-col gap-1 bg-white first:rounded-t-lg last:rounded-b-lg min-w-[700px]" collapsible>
    <UiAccordionItem :value="category.name" class="relative border-none">
      <div class="flex items-center gap-1 px-3 hover:bg-light-200">
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
                :class="category.isPublished ? 'bg-green-600' : 'bg-rose-600'" />
              {{ category.isPublished ? 'Published' : 'Unpublished' }}
            </div>
          </article>
          <CategoriesRowActions />
        </section>
      </div>
      <UiAccordionContent class="pt-0 ml-0 pb-0 border-none px-3">
        <CategoriesRecursive v-if="category.subcategory" :items="category.subcategory" />
      </UiAccordionContent>
    </UiAccordionItem>
  </UiAccordion>
</template>




<style scoped></style>
