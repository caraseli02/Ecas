<template>
    <div v-if="cartStore.mappedCartItems.length" class="flex flex-col gap-6 mb-6">
        <OrderSummaryTableHead @checkAll="checkAll" @addToFavs="addToFavs" @deleteSelected="deleteSelected" />
        <div v-if="stockItems && stockItems.length">
            <span class="text-neutral-700 text-base font-semibold leading-6">Stock Items: {{ stockItems.length }}</span>
        </div>
        <SkeletonLoader v-if="loading" />
        <OrderSummaryTableItem
            v-for="item in stockItems"
            :key="`stock-${item.id}`"
            :item="item"
            :stock-item="true"
            @update-quantity="updateSubtotal"
            @addToFavs="addToFavs($event.liked)"
        />
        <div v-if="backOrderItems && backOrderItems.length">
            <span class="text-neutral-700 text-base font-semibold leading-6">Backorder Items: {{ backOrderItems.length }}</span>
        </div>
        <SkeletonLoader v-if="loading" />
        <OrderSummaryTableItem
            v-for="item in backOrderItems"
            :key="`back-${item.id}`"
            :item="item"
            :stock-item="false"
            @update-quantity="updateSubtotal"
            @addToFavs="addToFavs($event.liked)"
        />
    </div>
</template>

<script setup lang="ts">
import { CartProductsInterface } from '~/model/cart/response/cart.interface';
import { useCartStore } from '~/store/cartStore';

const props = defineProps<{
    loading: boolean;
}>();

const emits = defineEmits(['checkAll', 'addToFavs', 'updateSubtotal', 'deleteSelected']);

const cartStore = useCartStore();
onMounted(() => {
    if(cartStore.cart){
        cartStore.cart.products = mapCartItems(cartStore.cart?.products);
    }
})

const stockItems = computed(() => {
    return cartStore.cart?.products.filter((item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.stock > 0);
});

const backOrderItems = computed(() => {
    return cartStore.cart?.products.filter((item: CartProductsInterface) => {
        return item.productEntity?.stock !== undefined &&  item?.backorder_stock && item?.backorder_stock > 0;
    });
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
