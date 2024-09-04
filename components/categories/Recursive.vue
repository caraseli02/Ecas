<script setup lang="ts">
import { CopyIcon, MoveIcon, Trash2Icon, StarIcon, GraduationCap, PlugIcon, MergeIcon, PencilLine } from 'lucide-vue-next';
import DomainsRecursive from './Recursive.vue';

defineProps<{
    items: unknown[];
}>();


</script>

<template>
    <template v-for="item in items" :key="item.uuid ?? item.localId">
        <section class="w-full border-none flex flex-col gap-1">
            <section
                v-if="item.img && !item.items"
                class="w-full flex items-center gap-2 py-2 border-b border-gray-200 border-solid max-md:flex-wrap"
            >
                <article class="flex items-center flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                    <span class="flex justify-center items-center w-10 h-10">
                        <StarIcon class="stroke-1" />
                    </span>
                    <figure class="flex justify-center items-center w-10 h-10 rounded-lg bg-light-300">
                        <PlugIcon class="w-5 aspect-square stroke-1" />
                    </figure>
                    <p class="my-auto text-sm font-medium leading-4 text-zinc-700 max-md:max-w-full">
                        {{ item.name }}
                    </p>
                </article>

                <div class="flex items-center gap-4 self-stretch px-3 my-auto">
                    <MergeIcon class="w-5 h-5 text-slate-500" />
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
                    <UiPopoverContent class="w-80 flex flex-col items-start">
                        <UiButton class="gap-1" size="xs" variant="ghost">
                                        <CopyIcon class="w-4 h-4" />
                                        Duplicate
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <MoveIcon class="w-4 h-4" />
                                        Move
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost" @click="router.push('/domains/create-file')">
                                        <Trash2Icon class="w-4 h-4" />
                                        Delete
                                    </UiButton>
                    </UiPopoverContent>
                </UiPopover>
            </section>
            <UiAccordion v-else type="multiple" class="w-full border-none flex flex-col gap-1" collapsible>
                <UiAccordionItem :value="item.name" class="relative">
                    <div class="flex items-center gap-1">
                        <UiAccordionTrigger class="flex-row-reverse justify-center gap-2.5 py-1 truncate w-10 max-w-[50px] h-7" />
                        <section class="w-full flex gap-2 items-center py-2 border-b border-gray-200 border-solid max-md:flex-wrap">
                            <article class="flex flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                                <figure class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
                                    <PlugIcon class="w-5 aspect-square stroke-1" />
                                </figure>
                                <p class="my-auto text-sm font-medium leading-4 text-zinc-700 max-md:max-w-full">{{ item.name }}</p>
                            </article>
                            <aside class="flex items-center gap-2 self-stretch px-3 my-auto">
                                <div class="flex items-center gap-4 self-stretch px-3 my-auto">
                                    <MergeIcon class="w-5 h-5 text-slate-500" />
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
                                <UiPopoverContent class="w-80 flex flex-col items-start">
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <CopyIcon class="w-4 h-4" />
                                        Duplicate
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <MoveIcon class="w-4 h-4" />
                                        Move
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost" @click="router.push('/domains/create-file')">
                                        <Trash2Icon class="w-4 h-4" />
                                        Delete
                                    </UiButton>
                                </UiPopoverContent>
                            </UiPopover>
                        </section>
                    </div>
                    <UiAccordionContent class="pt-1 ml-4 pb-0 flex flex-col gap-1">
                        <component :is="DomainsRecursive" v-if="item.items.lenght > 0" :items="item.items" />
                        <div v-else class="flex flex-col">
                            <template v-for="child in item.items" :key="child.uuid">
                                <section class="w-full flex gap-2 items-center py-2 border-b border-gray-200 border-solid max-md:flex-wrap">
                                    <article
                                        class="flex items-center flex-1 gap-2 self-stretch px-5 rounded-lg bg-white bg-opacity-0 max-md:flex-wrap"
                                    >
                                        <span class="flex justify-center items-center w-10 h-10">
                                            <StarIcon class="stroke-1" />
                                        </span>
                                        <figure class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
                                            <PlugIcon class="w-5 aspect-square stroke-1" />
                                        </figure>
                                        <p class="my-auto text-sm font-medium leading-4 text-zinc-700 max-md:max-w-full">
                                            {{ child.name }}
                                        </p>
                                    </article>
                                    <aside class="flex items-center gap-2 self-stretch px-3 my-auto">
                                        <div class="flex items-center gap-4 self-stretch px-3 my-auto">
                                            <MergeIcon class="w-5 h-5 text-slate-500" />
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
                                        <UiPopoverContent class="w-80 flex flex-col items-start">
                                            <UiButton class="gap-1" size="xs" variant="ghost">
                                                <CopyIcon class="w-4 h-4" />
                                                Duplicate
                                            </UiButton>
                                            <UiButton class="gap-1" size="xs" variant="ghost">
                                                <MoveIcon class="w-4 h-4" />
                                                Move
                                            </UiButton>
                                            <UiButton class="gap-1" size="xs" variant="ghost" @click="router.push('/domains/create-file')">
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
