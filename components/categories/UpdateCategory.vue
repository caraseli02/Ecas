<script setup lang="ts">
import { ref } from 'vue';
import { useCategories } from '@/composables/useCategories';
import type { ICreatePayload, TaxonomyInterface } from '~/types/dashboard/categories';
import { PencilLine } from 'lucide-vue-next';
import { type IconName } from '@/types/Icons';

const props = defineProps<
  { category: TaxonomyInterface }
>()

const title = ref('');
const icon = ref<IconName>('PlugIcon');
const smartPricing = ref(false);

onMounted(() => {
  title.value = props.category.name;
  icon.value = props.category.icon || 'PlugIcon';
})

const { updateCategory, selectedCategories } = useCategories();

const isOpen = ref(false);

async function makeUpdate(){
  const payload: ICreatePayload = {
          name: title.value,
          icon: icon.value,
        }
  if(selectedCategories.value[0]) {
    payload.parentId = selectedCategories.value[0];
  }
  const response = await updateCategory(props.category.id, payload)
  if(response){
    title.value = '';
    isOpen.value = false;
  }
}
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton variant="ghost" size="icon" :disabled="selectedCategories.length > 1">
        <PencilLine class="w-5 h-5  text-slate-500" />
      </UiButton>
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
          <IconSelect v-model="icon" title="Select Icon" />
        </div>
        <div class="flex items-center justify-between space-x-2">
          <UiLabel for="airplane-mode">Smart Pricing</UiLabel>
          <UiSwitch id="airplane-mode" v-model="smartPricing" />
        </div>
      </div>
      <UiDialogFooter>
        <UiButton variant="secondary" @click="isOpen = false">
          Cancel
        </UiButton>
        <UiButton @click="makeUpdate()">
          Update
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
