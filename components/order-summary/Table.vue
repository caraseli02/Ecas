<template>
    <div v-if="items.length" class="flex flex-col gap-6 mb-6">
        <OrderSummaryTableHead @checkAll="checkAll" @addToFavs="addToFavs" @deleteSelected="deleteSelected" />
        <div v-if="stockItems.length">
            <span class="text-neutral-700 text-base font-semibold leading-6">Stock Items: {{ stockItems.length }}</span>
        </div>
        <SkeletonLoader v-if="loading" />
        <OrderSummaryTableItem v-for="item in stockItems" :key="`stock-${item.id}`" :item="item" :stock-item="true" @update-quantity="updateSubtotal" />
        <div v-if="backOrderItems.length">
            <span class="text-neutral-700 text-base font-semibold leading-6">Backorder Items: {{ backOrderItems.length }}</span>
        </div>
        <SkeletonLoader v-if="loading" />
        <OrderSummaryTableItem v-for="item in backOrderItems" :key="`back-${item.id}`" :item="item" :stock-item="false" @update-quantity="updateSubtotal" />
    </div>
</template>

<script setup lang="ts">
import type { CartProductsInterface } from '~/types';

const props = defineProps<{
    items: CartProductsInterface[],
    loading: boolean
}>();

const emits = defineEmits(['checkAll', 'addToFavs', 'updateSubtotal', 'deleteSelected']);

const stockItems: ComputedRef<CartProductsInterface[]> = computed(() => {
    return props.items.filter(
        (item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock >= item.stock
    );
});

const backOrderItems: ComputedRef<CartProductsInterface[]> = computed(() => {
    return props.items.filter(
        (item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock < item.stock
    );
});

function checkAll(checked: boolean): void {
    emits('checkAll', checked);
}

function addToFavs(liked: boolean): void {
    emits('addToFavs', liked);
}

function updateSubtotal(): void {
    emits('updateSubtotal');
}

function deleteSelected(): void {
    emits('deleteSelected', true);
}
</script>
