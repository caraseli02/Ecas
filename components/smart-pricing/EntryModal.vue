<script setup lang="ts">
import PriceRange from './PriceRange.vue';
import { useNuxtApp } from '#app';
import { usePricingStore } from '~/store/pricingStore';
import { storeToRefs } from 'pinia';

const pricingStore = usePricingStore();
const { showEntryModal } = storeToRefs(pricingStore);

const { $api } = useNuxtApp();

type PriceRangeType = {
    min: number | null;
    max: number | null;
    label: string | null;
};

const priceRange = ref<PriceRangeType>({ min: null, max: null, label: null });
// Handle the "Create" button click
const handleCreate = async () => {
    console.log(priceRange.value);
    if (
        priceRange.value.min === null ||
        priceRange.value.max === null ||
        priceRange.value.min >= priceRange.value.max ||
        priceRange.value.min < 0 ||
        priceRange.value.max < 0
    ) {
        // Add your logic here to handle the creation without the price range values
        return;
    }
    const response = await $api.smartPricing.setNewPriceRange({
        min: priceRange.value.min,
        max: priceRange.value.max,
        label: priceRange.value.label || `EP-${pricingStore.range?.length + 1}`,
    });
    if (response.status !== 'success' || !response.data.id) {
        // Add your logic here to handle the creation error
        return;
    }
    pricingStore.addPriceRange(
        {
            min: priceRange.value.min,
            max: priceRange.value.max,
        },
        priceRange.value.label || `EP-${pricingStore.range?.length + 1}`,
        response.data.id
    );
    // Add your logic here to handle the creation with the price range values
};


</script>

<template>
    <UiDialog v-model:open="showEntryModal">
        <UiDialogContent class="max-w-sm p-4 sm:max-w-[480px] gap-10 border-none rounded-xl shadow-s">
            <UiDialogHeader>
                <UiDialogTitle>Create Entry Price Template</UiDialogTitle>
            </UiDialogHeader>
            <div class="flex items-center space-x-2">
                <PriceRange @update:price-range="priceRange = $event" />
            </div>
            <UiDialogFooter class="gap-4 sm:justify-start">
                <UiDialogClose as-child>
                    <UiButton type="button" variant="secondary"> Cancel</UiButton>
                </UiDialogClose>
                <UiButton
                    class="w-full"
                    type="button"
                    @click="
                        handleCreate();
                        isOpen = false;
                    "
                >
                    Create
                </UiButton>
            </UiDialogFooter>
        </UiDialogContent>
    </UiDialog>
</template>
