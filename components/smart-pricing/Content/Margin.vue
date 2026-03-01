<script setup lang="ts">
import { SearchIcon, Trash2Icon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { usePricingStore } from '~/store/pricingStore';
import { PriceSettingsTypeEnum } from '~/model/prices/price-settings.interface';
import { useNuxtApp } from '#app';

const pricingStore = usePricingStore();
const { showMarginModal, pricing, margin } = storeToRefs(pricingStore);

const { $api } = useNuxtApp();

const marginList = ref(pricingStore.margin);

watch(
  () => pricingStore.margin,
  (newRange) => {
    marginList.value = newRange;
  },
  { deep: true }, // Deep watch to detect changes within the array
);

const deleteItem = async (itemValue: { value: string[]; selected: boolean; label: string; _id: string }) => {
  const response = await $api.smartPricing.deleteSmartPricingEntity(PriceSettingsTypeEnum.Margins, itemValue._id);
  if (response.status !== 'success') {
    // Add your logic here to handle the deletion error
    return;
  }
  pricingStore.removeMarginRange(itemValue._id);
  marginList.value = marginList.value.filter(i => i._id !== itemValue._id);
};

function deleteAllSelected() {
  const selectedItems = marginList.value.filter(i => i.selected);

  selectedItems.map(async (margin) => {
    const response = await $api.smartPricing.deleteSmartPricingEntity(PriceSettingsTypeEnum.Margins, margin._id);
    if (response.status !== 'success') {
      // Add your logic here to handle the deletion error
      return;
    }
    pricingStore.removeMarginRange(margin._id);
    marginList.value = marginList.value.filter(i => i._id !== margin._id);
  });
}

const selectedCount = computed(() => marginList.value.filter(i => i.selected).length);

const editItem = async (itemValue: { value: string[]; selected: boolean; label: string; _id: string }) => {
  if (!pricing) {
    console.error('Pricing is not defined');
    return;
  }
  const filteredItems = margin.value ? margin.value.filter(i => i._id === itemValue._id) : [];
  pricingStore.editMarginModal = filteredItems.length > 0 ? filteredItems[0] : null;
  showMarginModal.value = true;
};
</script>

<template>
  <div class="w-full h-30 bg-light-200 flex flex-col sm:flex-row justify-between items-center p-3 gap-2">
    <div class="relative w-full max-w-sm items-center">
      <UiInput
        id="search"
        type="text"
        placeholder="Search..."
        class="pr-10 placeholder:text-grey-600"
      />
      <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
        <SearchIcon class="size-5 text-grey-600" />
      </span>
    </div>
    <div
      v-if="selectedCount > 0"
      class="self-end flex items-center"
    >
      <span class="text-neutral-700 mr-2 text-sm">{{ selectedCount }} {{ selectedCount > 1 ? 'items' : 'item' }} selected</span>
      <UiButton
        class="gap-1"
        variant="secondary"
        @click="deleteAllSelected"
      >
        <Trash2Icon class="w-4 h-4" />
        Delete
      </UiButton>
    </div>
  </div>
  <section class="flex flex-wrap gap-4">
    <SmartPricingCheckItem
      v-for="item in marginList"
      :key="item.label"
      :item="item"
      @delete-item="deleteItem(item)"
      @update-selected="item.selected = $event"
      @edit-item="editItem(item)"
    />
  </section>
</template>

<style scoped></style>
