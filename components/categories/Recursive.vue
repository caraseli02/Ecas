<script setup lang="ts">
import { CopyIcon, MoveIcon, Trash2Icon, PlugIcon, MergeIcon, PencilLine } from 'lucide-vue-next';
import DomainsRecursive from './Recursive.vue';
export interface TaxonomyInterface {
    id?: any;
    name: string;
    averageWeight?: number;
    productCount?: number;
    subcategory?: TaxonomyInterface[];
    path: string;
    isPublished: boolean
}

defineProps<{
    items: TaxonomyInterface[];
}>();
</script>

<template>
    <template v-for="item in items" :key="item.uuid ?? item.localId">
        <section class="w-full border-none flex flex-col gap-1">
            <section v-if="!item.subcategory" class="w-full flex items-center gap-2 py-2 max-md:flex-wrap">
                <article
                    class="flex items-center flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                    <UiCheckbox />
                    <figure class="ml-10 flex justify-center items-center w-10 h-10 rounded-lg bg-light-300">
                        <PlugIcon class="w-5 aspect-square stroke-1" />
                    </figure>
                    <p class="my-auto text-sm font-medium leading-4 text-neutral-700 max-md:max-w-full min-w-[260px] flex flex-col justify-between h-full">
                        {{ item.name }}
                        <span v-if="item.productCount" class="text-xs text-slate-500">{{ item.productCount }} items</span>
                    </p>
                    <div class="flex items-center text-sm">
                        <span
class="h-4 w-4 mr-2 rounded-full flex justify-center items-center"
                            :class="item.isPublished ? 'bg-green-600' : 'bg-rose-600'" />
                        {{ item.isPublished ? 'Published' : 'Unpublished' }}
                    </div>
                </article>
                <CategoriesRowActions />
            </section>
            <UiAccordion v-else type="multiple" class="w-full border-none flex flex-col gap-1" collapsible>
                <UiAccordionItem :value="item.name">
                    <div class="flex items-center gap-1">
                        <UiCheckbox />
                        <UiAccordionTrigger
                            class="flex-row-reverse justify-center gap-2.5 py-1 truncate w-10 max-w-[50px] h-7" />
                        <section class="w-full flex gap-2 items-center py-2  max-md:flex-wrap">
                            <article
                                class="flex flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                                <figure
                                    class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
                                    <PlugIcon class="w-5 aspect-square stroke-1" />
                                </figure>
                                <p class="my-auto text-sm font-medium leading-4 text-neutral-700 max-md:max-w-full min-w-[260px] flex flex-col justify-between h-full">
                                    {{ item.name }}
                                    <span v-if="item.productCount" class="text-xs">{{ item.productCount }} items</span>
                                </p>
                                <div class="flex items-center text-sm">
                                    <span
class="h-4 w-4 mr-2 rounded-full flex justify-center items-center"
                                        :class="item.isPublished ? 'bg-green-600' : 'bg-rose-600'" />
                                    {{ item.isPublished ? 'Published' : 'Unpublished' }}
                                </div>
                            </article>
                            <CategoriesRowActions />
                        </section>
                    </div>
                    <UiAccordionContent class="pt-1 ml-0 pb-0 flex flex-col gap-1">
                        <component
:is="DomainsRecursive" v-if="item.subcategory.length > 0"
                            :items="item.subcategory" />
                        <div v-else class="flex flex-col px-3">
                            <template v-for="child in item.subcategory" :key="child.uuid">
                                <section class="w-full flex gap-2 items-center py-2  max-md:flex-wrap">
                                    <UiCheckbox />
                                    <article
                                        class="flex items-center flex-1 gap-2 self-stretch ml-5 px-5 rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                                        <figure
                                            class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
                                            <PlugIcon class="w-5 aspect-square stroke-1" />
                                        </figure>
                                        <p class="my-auto text-sm font-medium leading-4 text-neutral-700 max-md:max-w-full min-w-[260px] flex flex-col justify-between h-full">
                                            {{ child.name }}
                                            <span v-if="child.productCount" class="text-xs">{{ child.productCount }} items</span>
                                        </p>
                                        <div class="flex items-center text-sm">
                                            <span
class="h-4 w-4 mr-2 rounded-full flex justify-center items-center"
                                                :class="item.isPublished ? 'bg-green-600' : 'bg-rose-600'" />
                                            {{ item.isPublished ? 'Published' : 'Unpublished' }}
                                        </div>
                                    </article>
                                    <CategoriesRowActions />
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
