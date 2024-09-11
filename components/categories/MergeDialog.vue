<script setup lang="ts">
import { TaxonomyInterface } from '~/types/dashboard/categories';
import { MergeIcon } from 'lucide-vue-next';

const { categories, mergeCategories, taxonomyId } = useCategories();

const props = defineProps<
  { category: TaxonomyInterface }
>()

const isOpen = ref(false);
const selected = ref<string>('');

const handleMerge = async () => {
  await mergeCategories(props.category.id, selected.value, {name: props.category.name, parentId: taxonomyId.value});
  isOpen.value = false;
};
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger>
      <UiButton variant="ghost">
      <MergeIcon class="w-5 h-5 text-slate-500 cursor-pointer" />
    </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-[640px]">
      <UiDialogHeader>
        <UiDialogTitle>Merge Selected</UiDialogTitle>
      </UiDialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col items-start gap-4">
          <UiLabel for="destination" class="text-right">
            Destination Category
          </UiLabel>
          <UiSelect v-model="selected">
            <UiSelectTrigger>
              <UiSelectValue placeholder="Select a Category" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectLabel>Category</UiSelectLabel>
                <UiSelectItem v-for="item in categories" :key="item.id" :value="item.id">
                  {{ item.name }}
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </div>
      </div>
      <UiDialogFooter>
        <UiButton variant="secondary" type="submit" @click="isOpen = false">
          Cancel
        </UiButton>
        <UiButton @click="handleMerge" type="submit">
          Merge
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
