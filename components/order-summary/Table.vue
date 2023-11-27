<template>
    <div class="flex flex-col gap-6 mb-6">
        <OrderSummaryTableHead @checkAll="checkAll" @addToFavs="addToFavs" />
        <div v-if="stockItems.length">
            <span class="text-[#222] text-base font-semibold leading-6">Stock Items: {{ stockItems.length }}</span>
        </div>
        <SkeletonLoader v-if="loading" />
        <OrderSummaryTableItem v-for="item in stockItems" :item="item" :stock-item="true" @update-quantity="updateSubtotal"/>
        <div v-if="backOrderItems.length">
            <span class="text-[#222] text-base font-semibold leading-6">Backorder Items: {{ backOrderItems.length }}</span>
        </div>
        <SkeletonLoader v-if="loading" />
        <OrderSummaryTableItem v-for="item in backOrderItems" :item="item" :stock-item="false" @update-quantity="updateSubtotal"/>
    </div>
</template>
<script lang="ts">
import { CartProductsInterface } from '~/types';
import SkeletonLoader from '~/components/global/SkeletonLoader.vue';
export default defineComponent({
    name: 'Table',
    props: {
        items: {
            type: Array as PropType<CartProductsInterface[]>,
            required: true,
        },
        loading: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    computed: {
        stockItems() {
            return this.items.filter((item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock >= item.stock);
        },
        backOrderItems() {
            return this.items.filter((item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock < item.stock);
        },
    },
    methods: {
        checkAll(checked: boolean) {
            this.$emit('checkAll', checked);
        },
        addToFavs(liked: boolean) {
            this.$emit('addToFavs', liked);
        },
        updateSubtotal() {
            this.$emit('updateSubtotal');
        },
    },
});
</script>
