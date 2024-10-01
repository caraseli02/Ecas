<script setup lang="ts">
import { SearchIcon, Trash2Icon } from 'lucide-vue-next';

const entryPriceList = ref([
  { label: 'EP-1', value: '$0.5 - $0.99', selected: true },
  { label: 'EP-2', value: '$1.00 - $4.99', selected: true },
  { label: 'EP-3', value: '$5.00 - $9.99', selected: false },
  { label: 'EP-4', value: '$10.00 - $24.99', selected: false },
  { label: 'EP-5', value: '$24.00 - $44.99', selected: false },
])

const deleteItem = (itemValue: string) => {
  entryPriceList.value = entryPriceList.value.filter((i) => i.value !== itemValue);
}
function deleteAllSelected() {
  entryPriceList.value = entryPriceList.value.filter((i) => !i.selected);
}

const selectedCount = computed(() => entryPriceList.value.filter((i) => i.selected).length);
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
    <SmartPricingCheckItem v-for="item in entryPriceList" :key="item.value" :item="item"
      @deleteItem="deleteItem(item.value)" @updateSelected="item.selected = $event" />
  </section>
</template>

<style scoped></style>
