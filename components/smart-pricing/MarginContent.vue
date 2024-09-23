<script setup lang="ts">
import { SearchIcon, Trash2Icon } from 'lucide-vue-next';

const marginList = ref([
  { label: 'NM-1', value: ['1000%', '800%'], selected: true },
  { label: 'NM-2', value: ['1000%', '800%', '500%'], selected: true },
  { label: 'NM-3', value: ['1000%', '800%', '500%', '250%'], selected: false },
  { label: 'NM-4', value: ['1000%', '800%', '500%', '250%', '200%'], selected: false },
  { label: 'NM-5', value: ['1000%', '800%', '500%', '250%', '200%', '150%'], selected: false },
])

const deleteItem = (itemLabel: string) => {
  marginList.value = marginList.value.filter((i) => i.label !== itemLabel);
}
function deleteAllSelected() {
  marginList.value = marginList.value.filter((i) => !i.selected);
}

const selectedCount = computed(() => marginList.value.filter((i) => i.selected).length);
</script>

<template>
  <div class="w-full h-16 bg-light-200 flex justify-between items-center p-3">
    <div class="relative w-full max-w-sm items-center">
      <UiInput id="search" type="text" placeholder="Search..." class="pr-10" />
      <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
        <SearchIcon class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div v-if="selectedCount > 0">
      <span class="text-gray-500 mr-2 text-sm">{{ selectedCount }} {{ selectedCount > 1 ? 'items' : 'item' }}
        selected</span>
      <UiButton class="gap-1" variant="secondary" @click="deleteAllSelected">
        <Trash2Icon class="w-4 h-4" />
        Delete
      </UiButton>
    </div>
  </div>
  <section class="flex flex-wrap gap-4">
    <SmartPricingCheckItem 
      @deleteItem="deleteItem(item.label)" 
      @updateSelected="item.selected = $event" 
      v-for="item in marginList" 
      :key="item.label"
      :item="item" 
    />
  </section>
</template>

<style scoped></style>
