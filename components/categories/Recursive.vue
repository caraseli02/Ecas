<script setup lang="ts">
import { PlugIcon } from 'lucide-vue-next';
import DomainsRecursive from './Recursive.vue';
import type { TaxonomyInterface } from '~/types/dashboard/categories';

const props = defineProps<{
    items: TaxonomyInterface[];
    parentId: string;
    depth?: number;
}>();

const { selectCategory } = useCategories();

const computedPadding = computed(() => {
    return 16 + (props.depth || 0);
})
</script>

<template>
    <template v-for="item in items" :key="item.uuid ?? item.localId">
        <section class="w-full border-none flex flex-col gap-1">
            <section v-if="item.subcategory?.length === 0"
                class="w-full flex items-center gap-2 py-2 max-md:flex-wrap px-3">
                <article
                    class="flex items-center flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                    <UiCheckbox @update:checked="selectCategory(item.id)" />
                    <div :style="{ 'padding-left': computedPadding + 'px' }" class="flex gap-2 max-w-[348px]">
                        <figure class="ml-10 flex justify-center items-center min-w-10 h-10 rounded-lg bg-light-300">
                            <IconAsync v-if="item.icon" :name="item.icon" class="h-5 w-5 stroke-1" />
                            <PlugIcon v-else class="w-5 aspect-square stroke-1" />
                        </figure>
                        <p
                            class="my-auto text-sm font-medium leading-4 text-neutral-700 max-md:max-w-full min-w-[260px] flex flex-col justify-between h-full">
                            {{ item.name }}
                            <span v-if="item.productCount" class="text-xs text-slate-500">{{ item.productCount }}
                                items</span>
                        </p>
                    </div>
                    <div class="flex items-center text-sm">
                        <span class="h-4 w-4 mr-2 rounded-full flex justify-center items-center"
                            :class="item.isPublished ? 'bg-green-600' : 'bg-rose-600'" />
                        {{ item.isPublished ? 'Published' : 'Unpublished' }}
                    </div>
                </article>
                <CategoriesRowActions :parentId="parentId" :category="item" />
            </section>
            <UiAccordion v-else type="multiple" class="w-full border-none flex flex-col gap-1" collapsible>
                <UiAccordionItem v-slot="{ open }" :value="item.name">
                    <div class="flex items-center gap-1 hover:bg-light-200 px-3"
                        :class="{ 'bg-light-200 border-t': open }">
                        <UiCheckbox @update:checked="selectCategory(item.id)" />
                        <UiAccordionTrigger
                            class="flex-row-reverse justify-center gap-2.5 py-1 truncate min-w-10 max-w-[50px] h-7" />
                        <section class="w-full flex gap-2 items-center py-2  max-md:flex-wrap">
                            <article
                                class="flex flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                                <div :style="{ 'padding-left': computedPadding + 'px' }" class="flex gap-2 max-w-[308px]">
                                    <figure
                                        class="flex justify-center items-center px-2.5 min-w-10 h-10 rounded-lg bg-light-300">
                                        <IconAsync v-if="item.icon" :name="item.icon" class="h-5 w-5 stroke-1" />
                                        <PlugIcon v-else class="w-5 aspect-square stroke-1" />
                                    </figure>
                                    <p
                                        class="my-auto text-sm font-medium leading-4 text-neutral-700 max-md:max-w-full min-w-[260px] flex flex-col justify-between h-full">
                                        {{ item.name }}
                                        <span v-if="item.productCount" class="text-xs">{{ item.productCount }}
                                            items</span>
                                    </p>
                                </div>
                                <div class="flex items-center text-sm">
                                    <span class="h-4 w-4 mr-2 rounded-full flex justify-center items-center"
                                        :class="item.isPublished ? 'bg-green-600' : 'bg-rose-600'" />
                                    {{ item.isPublished ? 'Published' : 'Unpublished' }}
                                </div>
                            </article>
                            <CategoriesRowActions :parentId="parentId" :category="item" />
                        </section>
                    </div>
                    <UiAccordionContent :class="{ 'last:border-b': open }" class="pt-1 ml-0 pb-0 flex flex-col gap-1">
                        <component :is="DomainsRecursive" v-if="item.subcategory.length > 0" :items="item.subcategory" :parentId="parentId"
                            :depth="16" />
                        <div v-else class="flex flex-col px-3">
                            <template v-for="child in item.subcategory" :key="child.uuid">
                                <section class="w-full flex gap-2 items-center py-2  max-md:flex-wrap">
                                    <UiCheckbox @update:checked="selectCategory(item.id)" />
                                    <article
                                        class="flex items-center flex-1 gap-2 self-stretch ml-5 px-5 rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                                        <div :style="{ 'padding-left': computedPadding + 'px' }" class="flex gap-2 max-w-[348px]">
                                            <figure
                                                class="flex ml-4 justify-center items-center px-2.5 min-w-10 h-10 rounded-lg bg-light-300">
                                                <IconAsync v-if="item.icon" :name="item.icon"
                                                    class="h-5 w-5 stroke-1" />
                                                <PlugIcon v-else class="w-5 aspect-square stroke-1" />
                                            </figure>
                                            <p
                                                class="my-auto text-sm font-medium leading-4 text-neutral-700 max-md:max-w-full min-w-[260px] flex flex-col justify-between h-full">
                                                {{ child.name }}
                                                <span v-if="child.productCount" class="text-xs">{{ child.productCount }}
                                                    items</span>
                                            </p>
                                        </div>
                                        <div class="flex items-center text-sm">
                                            <span class="h-4 w-4 mr-2 rounded-full flex justify-center items-center"
                                                :class="item.isPublished ? 'bg-green-600' : 'bg-rose-600'" />
                                            {{ item.isPublished ? 'Published' : 'Unpublished' }}
                                        </div>
                                    </article>
                                    <CategoriesRowActions :parentId="item.id" :category="item" />
                                </section>
                            </template>
                        </div>
                    </UiAccordionContent>
                </UiAccordionItem>
            </UiAccordion>
        </section>
    </template>
</template>

<style scoped></style>
