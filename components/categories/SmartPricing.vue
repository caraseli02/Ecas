<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    entryPrice: string;
    quantity: string;
    margin: string;
    enabled: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:entry-price', value: string): void;
    (e: 'update:quantity', value: string): void;
    (e: 'update:margin', value: string): void;
    (e: 'update:enabled', value: boolean): void;
}>();

const smartPricing = ref(props.enabled);
const selectedQuantityLength = ref<number | null>(null);
const selectedMarginLength = ref<number | null>(null);
const firstSelected = ref<'quantity' | 'margin' | null>(null); // Tracks which was selected first

// Emit events to parent
const handleEntryPriceUpdate = (value: string) => emit('update:entry-price', value);
const handleQuantityUpdate = (value: string) => emit('update:quantity', value);
const handleMarginUpdate = (value: string) => emit('update:margin', value);

// Computed to filter options based on the first selection
const filterQuantityLength = computed(() => (firstSelected.value === 'margin' ? selectedMarginLength.value : null));
const filterMarginLength = computed(() => (firstSelected.value === 'quantity' ? selectedQuantityLength.value : null));

// Lock the first-selected component and propagate its length
const handleQuantitySelectionChange = (length: number | null) => {
    if (!firstSelected.value && length !== null) {
        firstSelected.value = 'quantity';
    }
    selectedQuantityLength.value = length;
};

const handleMarginSelectionChange = (length: number | null) => {
    if (!firstSelected.value && length !== null) {
        firstSelected.value = 'margin';
    }
    selectedMarginLength.value = length;
};

// Reset the selection logic when Smart Pricing is toggled off
watch(
    () => smartPricing.value,
    (value) => {
        if (!value) {
            firstSelected.value = null;
            selectedQuantityLength.value = null;
            selectedMarginLength.value = null;
        }
        emit('update:enabled', value);
    },
    { immediate: true }
);
</script>

<template>
    <section>
        <div class="flex items-center justify-between space-x-2 mb-6">
            <UiLabel for="smart-pricing">Smart Pricing</UiLabel>
            <UiSwitch id="smart-pricing" v-model:checked="smartPricing" />
        </div>
        <div v-if="smartPricing">
            <CategoriesSelectEntryPrice title="Entry Price" :entry-price="props.entryPrice" @update:entry-price="handleEntryPriceUpdate" />
            <CategoriesSelectQuantity
                title="Quantity"
                :filter-length="filterQuantityLength"
                :quantity="props.quantity"
                @update:selection-length="handleQuantitySelectionChange"
                @update:quantity="handleQuantityUpdate"
            />
            <CategoriesSelectMargin
                title="Margin"
                :filter-length="filterMarginLength"
                :margin="props.margin"
                @update:selection-length="handleMarginSelectionChange"
                @update:margin="handleMarginUpdate"
            />
        </div>
    </section>
</template>
