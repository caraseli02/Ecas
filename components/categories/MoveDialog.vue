<script setup lang="ts">
import { TaxonomyInterface } from '~/types/dashboard/categories';
import { MoveIcon } from 'lucide-vue-next';

const { categories, moveCategories } = useCategories();

const props = defineProps<
  { category: TaxonomyInterface }
>()

const isOpen = ref(false);
const selected = ref<string>('');

const handleMove = async () => {
  await moveCategories([props.category.id], selected.value);
  isOpen.value = false;
};
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger class="w-full">
      <UiButton class="gap-1 w-full justify-start" size="sm" variant="ghost">
        <MoveIcon class="w-4 h-4" />
        Move
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
        <UiButton @click="handleMove" type="submit">
          Move
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
