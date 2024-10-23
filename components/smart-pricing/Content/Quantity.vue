<script setup lang="ts">
import { SearchIcon, Trash2Icon } from 'lucide-vue-next';
import { usePricingStore } from '~/store/pricingStore';

const pricingStore = usePricingStore();
const quantityList = ref(pricingStore.quantity);

const deleteItem = (itemLabel: string) => {
    quantityList.value = quantityList.value.filter((i) => i.label !== itemLabel);
};

function deleteAllSelected() {
    quantityList.value = quantityList.value.filter((i) => !i.selected);
}

const selectedCount = computed(() => quantityList.value.filter((i) => i.selected).length);
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
            v-for="item in quantityList"
            :key="item.label"
            :item="item"
            @updateSelected="item.selected = $event"
            @deleteItem="deleteItem(item.label)"
        />
    </section>
</template>

<style scoped></style>
