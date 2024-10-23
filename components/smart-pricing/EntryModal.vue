<script setup lang="ts">
import PriceRange from './PriceRange.vue';
import { useNuxtApp } from '#app';
import { usePricingStore } from '~/store/pricingStore';

const pricingStore = usePricingStore();

const { $api } = useNuxtApp();

type PriceRangeType = {
    min: number | null;
    max: number | null;
    label: string | null;
};
const isOpen = ref(false);
const priceRange = ref<PriceRangeType>({ min: null, max: null, label: null });
// Handle the "Create" button click
const handleCreate = async () => {
    if (priceRange.value.min === null || priceRange.value.max === null) {
        // Add your logic here to handle the creation without the price range values
        return;
    }
    console.log({
        min: priceRange.value.min,
        max: priceRange.value.max,
        label: priceRange.value.label || `${pricingStore.range?.length + 1}`,
    });
    const response = await $api.smartPricing.setNewPriceRange({
        min: priceRange.value.min,
        max: priceRange.value.max,
        label: priceRange.value.label || `EP-${pricingStore.range?.length + 1}`,
    });
    if (response.status !== 'success') {
        // Add your logic here to handle the creation error
        return;
    }
    pricingStore.addPriceRange(
        {
            min: priceRange.value.min,
            max: priceRange.value.max,
        },
        priceRange.value.label || `EP-${pricingStore.range?.length + 1}`
    );
    // Add your logic here to handle the creation with the price range values
};
</script>

<template>
    <UiDialog v-model:open="isOpen">
        <UiDialogTrigger as-child>
            <UiButton class="justify-start hover:text-blue-500" variant="ghost">Entry Price</UiButton>
        </UiDialogTrigger>
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
