<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';

const isOpen = ref(false)

const quantityList = ref([
  { id: 1, min: 1, max: 10 },
  { id: 2, min: 10, max: 20 },
  { id: 3, min: 20, max: 30 },
])

function addQuantity() {
  quantityList.value.push({ id: quantityList.value.length + 1, min: 0, max: 0 });
}

function removeQuantity(id: number) {
  quantityList.value = quantityList.value.filter(q => q.id !== id);
}

// function updateQuantity(id: number, quantity: { min: number; max: number }) {
//   const index = quantityList.value.findIndex(q => q.id === id);
//   if (index !== -1) {
//     quantityList.value[index] = { ...quantityList.value[index], ...quantity };
//   }
// }
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton class="justify-start" variant="ghost">Quantity</UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-md gap-10">
      <UiDialogHeader>
        <UiDialogTitle>Create Quantity Template</UiDialogTitle>
      </UiDialogHeader>
      <section class="flex flex-col gap-4">
        <SmartPricingQuantityRange v-for="quantity in quantityList" :key="quantity.id" :quantity="quantity" @delete="removeQuantity(quantity.id)" />
      </section>
      <UiDialogFooter class="sm:justify-start">
        <UiButton type="button" class="min-w-10 h-10 p-0" variant="secondary" @click="addQuantity()">
          <PlusIcon class="w-6 h-6" />
        </UiButton>
        <UiButton class="w-full" type="button">
          Create
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
