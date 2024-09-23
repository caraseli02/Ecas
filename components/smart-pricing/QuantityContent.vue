<script setup lang="ts">
import { SearchIcon, Trash2Icon } from 'lucide-vue-next';

const quantityList = ref([
  { label: 'QTY-1', value: ['1 - 10'], selected: true },
  { label: 'QTY-2', value: ['1 - 10', '11 - 49'], selected: true },
  { label: 'QTY-3', value: ['1 - 10', '11 - 49', '50 - 99'], selected: false },
  { label: 'QTY-4', value: ['1 - 10', '11 - 49', '50 - 99', '100 - 149'], selected: false },
  { label: 'QTY-5', value: ['1 - 10', '11 - 49', '50 - 99', '100 - 149', '150 - 449'], selected: false },
])

const deleteItem = (itemLabel: string) => {
  quantityList.value = quantityList.value.filter((i) => i.label !== itemLabel);
}
function deleteAllSelected() {
  quantityList.value = quantityList.value.filter((i) => !i.selected);
}

const selectedCount = computed(() => quantityList.value.filter((i) => i.selected).length);
</script>

<template>
  <div class="w-full h-30 bg-light-200 flex flex-col sm:flex-row justify-between items-center p-3 gap-2">
    <div class="relative w-full max-w-sm items-center">
      <UiInput id="search" type="text" placeholder="Search..." class="pr-10" />
      <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
        <SearchIcon class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div class="self-end flex items-center" v-if="selectedCount > 0">
      <span class="text-gray-500 mr-2 text-sm">{{ selectedCount }} {{ selectedCount > 1 ? 'items' : 'item' }}
        selected</span>
      <UiButton class="gap-1" variant="secondary" @click="deleteAllSelected">
        <Trash2Icon class="w-4 h-4" />
        Delete
      </UiButton>
    </div>
  </div>
  <section class="flex flex-wrap gap-4">
    <SmartPricingCheckItem v-for="item in quantityList" :key="item.label" :item="item"
      @updateSelected="item.selected = $event" @deleteItem="deleteItem(item.label)" />
  </section>
</template>

<style scoped></style>
