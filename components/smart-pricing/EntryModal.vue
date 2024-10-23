<script setup lang="ts">
import PriceRange from './PriceRange.vue';

type PriceRangeType = {
    min: number | null;
    max: number | null;
};
const isOpen = ref(false);
const priceRange = ref<PriceRangeType>({ min: null, max: null });
// Handle the "Create" button click
const handleCreate = () => {
    console.log('Min Price:', priceRange.value.min);
    console.log('Max Price:', priceRange.value.max);
    console.log(priceRange.value);
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
