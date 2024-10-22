<script setup lang="ts">
import { SearchIcon, Trash2Icon } from 'lucide-vue-next';
import { usePricingStore } from '~/store/pricingStore';

const pricingStore = usePricingStore();

const entryPriceList = ref(
    pricingStore.pricing
        ? pricingStore.pricing
              .filter((smartPricing) => smartPricing.type === 0)
              .map((item, index) => ({
                  ...item,
                  selected: false,
                  value: item.range && [`$${item.range.min} - $${item.range.max}`],
                  label: item.label || `EP-${index}`,
              }))
        : []
);

const deleteItem = (itemValue: string) => {
    entryPriceList.value = entryPriceList.value.filter((i) => i.value !== itemValue);
};

function deleteAllSelected() {
    entryPriceList.value = entryPriceList.value.filter((i) => !i.selected);
}

const selectedCount = computed(() => entryPriceList.value.filter((i) => i.selected).length);
</script>

<template>
    <div class="w-full h-30 bg-light-200 flex flex-col sm:flex-row justify-between items-center p-3 gap-2">
        <div class="relative w-full max-w-sm items-center">
            <UiInput id="search" type="text" placeholder="Search..." class="pr-10 placeholder:text-grey-600" />
            <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                <SearchIcon class="size-5 text-grey-600" />
            </span>
        </div>
        <div v-if="selectedCount > 0" class="self-end flex items-center">
            <span class="text-neutral-700 mr-2 text-sm">{{ selectedCount }} {{ selectedCount > 1 ? 'items' : 'item' }} selected</span>
            <UiButton class="gap-1" variant="secondary" @click="deleteAllSelected">
                <Trash2Icon class="w-4 h-4" />
                Delete
            </UiButton>
        </div>
    </div>
    <section class="flex flex-wrap gap-4">
        <SmartPricingCheckItem
            v-for="item in entryPriceList"
            :key="item.value"
            :item="item"
            @deleteItem="deleteItem(item.value)"
            @updateSelected="item.selected = $event"
        />
    </section>
</template>

<style scoped></style>
