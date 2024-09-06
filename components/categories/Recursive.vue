<script setup lang="ts">
import { CopyIcon, MoveIcon, Trash2Icon, PlugIcon, MergeIcon, PencilLine } from 'lucide-vue-next';
import DomainsRecursive from './Recursive.vue';
import { Subcategory } from '~/data/categories';

defineProps<{
    items: Subcategory[];
}>();

const router = useRouter();

const {
  deleteCategories,
  showMergeModal
} = useCategories();
</script>

<template>
    <template v-for="item in items" :key="item.uuid ?? item.localId">
        <section class="w-full border-none flex flex-col gap-1">
            <section
                v-if="!item.items"
                class="w-full flex items-center gap-2 py-2 max-md:flex-wrap "
            >
                <article class="flex items-center flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                    <UiCheckbox /> 
                    <figure class="ml-10 flex justify-center items-center w-10 h-10 rounded-lg bg-light-300">
                        <PlugIcon class="w-5 aspect-square stroke-1" />
                    </figure>
                    <p class="w-[260px] my-auto text-sm font-medium leading-4 text-zinc-700 max-md:max-w-full">
                        {{ item.name }}
                    </p>
                    <div class="flex items-center text-sm">
                                    <span
                                        class="h-4 w-4 mr-2 rounded-full flex justify-center items-center" :class="item.status === 'published' ? 'bg-green-600' : 'bg-rose-600'" />
                                    {{ item.status === 'published' ? 'Published' : 'Unpublished' }}
                                </div>
                </article>

                <div class="flex items-center gap-1 self-stretch px-3 my-auto">
                    <UiButton variant="ghost"><MergeIcon @click="showMergeModal = true" class="w-5 h-5 text-slate-500 cursor-pointer" /></UiButton>
                    <PencilLine class="w-5 h-5  text-slate-500" />
                </div>
                <UiPopover>
                                <UiPopoverTrigger as-child>
                                    <UiButton variant="secondary" class="bg-dark-50" size="icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-ellipsis-vertical"
                                        >
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="12" cy="5" r="1" />
                                            <circle cx="12" cy="19" r="1" />
                                        </svg>
                                    </UiButton>
                                </UiPopoverTrigger>
                                <UiPopoverContent side="left" :collision-padding="10" class="w-fit flex flex-col items-start">
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <CopyIcon class="w-4 h-4" />
                                        Duplicate
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <MoveIcon class="w-4 h-4" />
                                        Move
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost" @click="deleteCategories">
                                        <Trash2Icon class="w-4 h-4" />
                                        Delete
                                    </UiButton>
                                </UiPopoverContent>
                            </UiPopover>
            </section>
            <UiAccordion v-else type="multiple" class="w-full border-none flex flex-col gap-1" collapsible>
                <UiAccordionItem :value="item.name">
                    <div class="flex items-center gap-1 px-3">
                        <UiCheckbox /> 
                        <UiAccordionTrigger class="flex-row-reverse justify-center gap-2.5 py-1 truncate w-10 max-w-[50px] h-7" />
                        <section class="w-full flex gap-2 items-center py-2  max-md:flex-wrap">
                            <article class="flex flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                                <figure class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
                                    <PlugIcon class="w-5 aspect-square stroke-1" />
                                </figure>
                                <p class="w-[260px] my-auto text-sm font-medium leading-4 text-zinc-700 max-md:max-w-full">{{ item.name }}</p>
                                <div class="flex items-center text-sm">
                                    <span
                                        class="h-4 w-4 mr-2 rounded-full flex justify-center items-center" :class="item.status === 'published' ? 'bg-green-600' : 'bg-rose-600'" />
                                    {{ item.status === 'published' ? 'Published' : 'Unpublished' }}
                                </div>
                            </article>
                            <aside class="flex items-center gap-2 self-stretch my-auto">
                                <div class="flex items-center gap-1 self-stretch px-3 my-auto">
                                    <UiButton variant="ghost"><MergeIcon @click="showMergeModal = true" class="w-5 h-5 text-slate-500 cursor-pointer" /></UiButton>
                                    <PencilLine class="w-5 h-5  text-slate-500" />
                                </div>
                            </aside>
                            <UiPopover>
                                <UiPopoverTrigger as-child>
                                    <UiButton variant="secondary" class="bg-dark-50" size="icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-ellipsis-vertical"
                                        >
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="12" cy="5" r="1" />
                                            <circle cx="12" cy="19" r="1" />
                                        </svg>
                                    </UiButton>
                                </UiPopoverTrigger>
                                <UiPopoverContent side="left" :collision-padding="10" class="w-fit flex flex-col items-start">
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <CopyIcon class="w-4 h-4" />
                                        Duplicate
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <MoveIcon class="w-4 h-4" />
                                        Move
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost" @click="deleteCategories">
                                        <Trash2Icon class="w-4 h-4" />
                                        Delete
                                    </UiButton>
                                </UiPopoverContent>
                            </UiPopover>
                        </section>
                    </div>
                    <UiAccordionContent class="pt-1 px-3 ml-0 pb-0 flex flex-col gap-1">
                        <component :is="DomainsRecursive" v-if="item.items.length > 0" :items="item.items" />
                        <div v-else class="flex flex-col px-3">
                            <template v-for="child in item.items" :key="child.uuid">
                                <section class="w-full flex gap-2 items-center py-2  max-md:flex-wrap">
                                    <UiCheckbox /> 
                                    <article
                                        class="flex items-center flex-1 gap-2 self-stretch ml-5 px-5 rounded-lg bg-white bg-opacity-0 max-md:flex-wrap"
                                    >
                                        <figure class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
                                            <PlugIcon class="w-5 aspect-square stroke-1" />
                                        </figure>
                                        <p class="w-[260px] my-auto text-sm font-medium leading-4 text-zinc-700 max-md:max-w-full">
                                            {{ child.name }}
                                        </p>
                                        <div class="flex items-center text-sm">
                                    <span
                                        class="h-4 w-4 mr-2 rounded-full flex justify-center items-center" :class="item.status === 'published' ? 'bg-green-600' : 'bg-rose-600'" />
                                    {{ item.status === 'published' ? 'Published' : 'Unpublished' }}
                                </div>
                                    </article>
                                        <div class="flex items-center gap-1 self-stretch px-3 my-auto">
                                            <UiButton variant="ghost"><MergeIcon @click="showMergeModal = true" class="w-5 h-5 text-slate-500 cursor-pointer" /></UiButton>
                                            <PencilLine class="w-5 h-5  text-slate-500" />
                                        </div>
                                    <UiPopover>
                                <UiPopoverTrigger as-child>
                                    <UiButton variant="secondary" class="bg-dark-50" size="icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-ellipsis-vertical"
                                        >
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="12" cy="5" r="1" />
                                            <circle cx="12" cy="19" r="1" />
                                        </svg>
                                    </UiButton>
                                </UiPopoverTrigger>
                                <UiPopoverContent side="left" :collision-padding="10" class="w-fit flex flex-col items-start">
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <CopyIcon class="w-4 h-4" />
                                        Duplicate
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <MoveIcon class="w-4 h-4" />
                                        Move
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost" @click="deleteCategories">
                                        <Trash2Icon class="w-4 h-4" />
                                        Delete
                                    </UiButton>
                                </UiPopoverContent>
                            </UiPopover>
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
