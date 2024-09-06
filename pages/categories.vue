<script setup lang="ts">
import { BookIcon, CopyIcon, MoveIcon, Trash2Icon, PlugIcon, MergeIcon, PencilLine, SearchIcon, XIcon, ArrowDownNarrowWide, ArrowUpNarrowWide, RefreshCcw } from 'lucide-vue-next';
import CategoriesRecursive from '@/components/categories/Recursive.vue';
import { categories } from '@/data/categories';

const breadcrumb = [{ label: 'Categories', href: '/categories', icon: BookIcon }];

// Define status options
const statusOptions = [
    { label: 'Published', value: 'published', color: 'bg-green-600' },
    { label: 'Unpublished', value: 'unpublished', color: 'bg-rose-600' },
];

const router = useRouter();

const selectedCategories = ref<string[]>([]);
const mergedCategoryName = ref('');

const selectCategory = (categoryId: string) => {
    if (selectedCategories.value.includes(categoryId)) {
        selectedCategories.value = selectedCategories.value.filter(id => id !== categoryId);
    } else {
        selectedCategories.value.push(categoryId);
    }
};

// Merge Logic
const mergeCategories = () => {
    if (selectedCategories.value.length < 2) {
        alert('Please select at least two categories to merge.');
        return;
    }

    const mergedItems = selectedCategories.value.map(id => categories.find(cat => cat._id === id)).flat();
    categories.push({
        _id: Date.now().toString(), // Generate a new ID
        name: mergedCategoryName.value || 'Merged Category',
        items: mergedItems,
        status: 'unpublished',
    });

    selectedCategories.value = [];
};

// Move Logic
const moveCategories = (newParentId: string) => {
    const newParentCategory = categories.find(cat => cat._id === newParentId);
    if (newParentCategory) {
        selectedCategories.value.forEach(id => {
            const category = categories.find(cat => cat._id === id);
            if (category) {
                newParentCategory.items.push(category);
            }
        });
        selectedCategories.value = [];
    }
};

// Duplicate Logic
const duplicateCategory = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    if (category) {
        const duplicatedCategory = { ...category, _id: Date.now().toString(), name: `${category.name} (Copy)` };
        categories.push(duplicatedCategory);
    }
};

// Delete Logic
const deleteCategories = () => {
    categories = categories.filter(cat => !selectedCategories.value.includes(cat._id));
    selectedCategories.value = [];
};
</script>

<template>
    <div class="flex flex-col w-full relative p-6">
        <section class="flex justify-between">
            <h4 class="text-xl font-semibold">Categories</h4>
            <UiButton>+ Create New Category</UiButton>
        </section>

        <section class="flex gap-4 self-stretch py-4 bg-white flex-wrap">
            <div class="relative w-full md:max-w-[220px] items-center">
                <UiInput id="search" type="text" placeholder="Filter category name..." class="pr-10 h-9" />
                <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                    <SearchIcon class="size-6 text-muted-foreground" />
                </span>
            </div>
            <CategoriesRange title="Items Total" />
            <CategoriesFacetedFilter title="Status" :options="statusOptions" />
            <UiButton v-if="true" variant="ghost" class="h-9 px-2 lg:px-3 flex items-center text-neutral-700">
                Reset
                <XIcon class="ml-2 h-4 w-4" />
            </UiButton>
        </section>

        <section
            ref="scrollRef"
            class="flex flex-col rounded-lg max-h-[calc(100vh-250px)] overflow-y-auto relative border border-grey-200">
            <div class="bg-light-200 flex justify-between items-center h-14 min-w-[700px]">
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
                    <section class="pr-3 flex gap-3">
                        <UiButton class="gap-1" variant="secondary" size="sm" :disabled="selectedCategories.length < 2" @click="mergeCategories">
                            <MergeIcon class="w-4 h-4 text-slate-500" />
                            Merge
                        </UiButton>
                        <UiButton class="gap-1" variant="secondary" size="sm" :disabled="selectedCategories.length === 0" @click="moveCategories('newParentId')">
                            <MoveIcon class="w-4 h-4" />
                            Move
                        </UiButton>
                        <UiButton class="gap-1" variant="secondary" size="sm" :disabled="selectedCategories.length !== 1" @click="duplicateCategory(selectedCategoryId)">
                            <CopyIcon class="w-4 h-4" />
                            Duplicate
                        </UiButton>
                        <UiButton class="gap-1" variant="secondary" size="sm" :disabled="selectedCategories.length === 0" @click="deleteCategories">
                            <Trash2Icon class="w-4 h-4" />
                            Delete
                        </UiButton>
                    </section>
                </template>
            </div>

            <UiAccordion
v-for="category in categories" ref="target" :key="category._id" type="single"
                class="w-full border-b flex flex-col gap-1 bg-white first:rounded-t-lg last:rounded-b-lg min-w-[700px]" collapsible>
                <UiAccordionItem :value="category.name" class="relative border-none">
                    <div class="flex items-center gap-1 px-3">
                        <UiCheckbox @update:checked="selectCategory(category.name)" />
                        <UiAccordionTrigger
                            class="flex-row-reverse justify-center gap-2.5 py-1 truncate w-10 max-w-[50px] h-7" />
                        <section class="w-full flex gap-2 items-center py-2 ">
                            <article
                                class="flex flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 ">
                                <figure class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
                                    <PlugIcon class="w-5 aspect-square stroke-1" />
                                </figure>
                                <p
                                    class="my-auto text-sm font-medium leading-4 text-zinc-700 max-md:max-w-full min-w-[260px]">
                                    {{
                                        category.name }}</p>
                                <div class="flex items-center text-sm">
                                    <span
class="h-4 w-4 mr-2 rounded-full flex justify-center items-center"
                                        :class="category.status === 'published' ? 'bg-green-600' : 'bg-rose-600'" />
                                    {{ category.status === 'published' ? 'Published' : 'Unpublished' }}
                                </div>
                            </article>
                            <div class="flex items-center gap-4 self-stretch px-3 my-auto">
                                <MergeIcon class="w-5 h-5 text-slate-500" />
                                <PencilLine class="w-5 h-5  text-slate-500" />
                            </div>
                            <UiPopover>
                                <UiPopoverTrigger as-child>
                                    <UiButton variant="secondary" class="bg-dark-50" size="icon">
                                        <svg
xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" class="lucide lucide-ellipsis-vertical">
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="12" cy="5" r="1" />
                                            <circle cx="12" cy="19" r="1" />
                                        </svg>
                                    </UiButton>
                                </UiPopoverTrigger>
                                <UiPopoverContent
side="left" :collision-padding="10"
                                    class="flex gap-1 flex-col items-start p-2 w-40">
                                    <UiButton class="gap-1 w-full justify-start" size="sm" variant="ghost">
                                        <CopyIcon class="w-4 h-4" />
                                        Duplicate
                                    </UiButton>
                                    <UiButton class="gap-1 w-full justify-start" size="sm" variant="ghost">
                                        <MoveIcon class="w-4 h-4" />
                                        Move
                                    </UiButton>
                                    <UiButton
class="gap-1 w-full justify-start" size="sm" variant="ghost"
                                        @click="router.push('/categories/create-file')">
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
        </section>
    </div>
</template>
