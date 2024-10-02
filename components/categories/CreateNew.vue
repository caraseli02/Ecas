<script setup lang="ts">
import { ref } from 'vue';
import { useCategories } from '@/composables/useCategories';
import type { ICreatePayload } from '~/types/dashboard/categories';

const title = ref('');
const icon = ref('PlugIcon');

const { createCategory, selectedCategories, categories, categoriesOptions } = useCategories();

const isOpen = ref(false);
const selected = ref<string>('');

async function makeCreate(){
  const payload: ICreatePayload = {
          name: title.value,
          icon: icon.value,
        }
  if(selected.value) {
    payload.parentId = selected.value;
  }
  const response = await createCategory(payload)
  if(response){
    title.value = '';
    isOpen.value = false;
  }
}

watch(isOpen, () => {
  if(isOpen.value) {    
    selected.value = categoriesOptions.value.find(c => c.id === selectedCategories.value[0])?.id || '';
    title.value = ''
  }
})

</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton :disabled="selectedCategories.length > 1">+ Create New</UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-[640px]">
      <UiDialogHeader>
        <UiDialogTitle>Create Category</UiDialogTitle>
      </UiDialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col items-start gap-4">
          <UiLabel for="title" class="text-right">
            Title
          </UiLabel>
          <UiInput id="title" v-model="title" class="col-span-3" />
        </div>
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
                <UiSelectItem v-for="item in categoriesOptions" :key="item.id" :value="item.id">
                  {{ item.name }}
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </div>
        <div class="flex flex-col items-start gap-4">
          <IconSelect v-model="icon" title="Select Icon" />
        </div>
        <CategoriesSmartPricing />
      </div>
      <UiDialogFooter>
        <UiButton variant="secondary" @click="isOpen = false">
          Cancel
        </UiButton>
        <UiButton @click="makeCreate()">
          Create
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
