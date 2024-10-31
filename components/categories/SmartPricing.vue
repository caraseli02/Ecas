<script setup lang="ts">
import { computed, ref } from 'vue';

const smartPricing = ref(true);
const selectedQuantityLength = ref<number | null>(null); // Holds the selected length in Quantity
const selectedMarginLength = ref<number | null>(null); // Holds the selected length in Margin

const emit = defineEmits<{
    (e: 'update:entry-price', value: string): void;
    (e: 'update:quantity', value: string): void;
    (e: 'update:margin', value: string): void;
}>();

// Emit event to parent
const handleEntryPriceUpdate = (value: string) => {
    console.log(value);
    emit('update:entry-price', value);
};
const handleQuantityUpdate = (value: string) => {
    console.log(value);
    emit('update:quantity', value);
};
const handleMarginUpdate = (value: string) => {
    console.log(value);
    emit('update:margin', value);
};

// Computed to filter Quantity options based on Margin selection
const filterQuantityLength = computed(() => selectedMarginLength.value ?? null);

// Computed to filter Margin options based on Quantity selection
const filterMarginLength = computed(() => selectedQuantityLength.value ?? null);

// Update selectedQuantityLength when a selection is made in Quantity
const handleQuantitySelectionChange = (length: number | null) => {
    selectedQuantityLength.value = length;
    if (length === null) selectedMarginLength.value = null; // Reset if Quantity selection is cleared
    // emit('update:quantity', selectedQuantityLength.value);
};

// Update selectedMarginLength when a selection is made in Margin
const handleMarginSelectionChange = (length: number | null) => {
    selectedMarginLength.value = length;
    if (length === null) selectedQuantityLength.value = null; // Reset if Margin selection is cleared
};
</script>

<template>
    <section>
        <div class="flex items-center justify-between space-x-2 mb-6">
            <UiLabel for="airplane-mode">Smart Pricing</UiLabel>
            <UiSwitch id="airplane-mode" v-model:checked="smartPricing" />
        </div>
        <div v-if="smartPricing">
            <CategoriesSelectEntryPrice title="Entry Price" @update:entry-price="handleEntryPriceUpdate" />

            <!-- Pass filtering props and update events -->
            <CategoriesSelectQuantity
                title="Quantity"
                :filter-length="filterQuantityLength"
                @update:selection-length="handleQuantitySelectionChange"
                @update:quantity="handleQuantityUpdate"
            />
            <CategoriesSelectMargin
                title="Margin"
                :filter-length="filterMarginLength"
                @update:selection-length="handleMarginSelectionChange"
                @update:margin="handleMarginUpdate"
            />
        </div>
    </section>
</template>
