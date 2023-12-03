<template>
    <div class="flex flex-col flex-1 max-w-full h-full">
        <div class="py-4 px-4 flex-1 h-full overflow-y-auto overscroll-contain scrollbar-thin max-h-vh md:py-6">
            <div class="grid grid-cols-1 gap-4">
                <LayoutFavoritesCartModalFavoritesProductItem v-for="(item, index) in items" :key="index" :product="item" in-cart />
            </div>
        </div>
        <div
            class="px-4 pt-4 pb-6 md:p-6"
            :style="{
                boxShadow: '0px 0px 8px 0px rgba(133, 133, 133, 0.25)',
            }"
        >
            <div class="flex items-center justify-between leading-[1.25] font-semibold mb-4 md:text-xl md:leading-[1.2] md:mb-6">
                <div>Total</div>
                <div class="text-right">$ 457.92</div>
            </div>
            <button
                class="flex items-center justify-center gap-2 bg-blue text-white rounded-lg px-[15px] py-2 leading-[1.75] font-medium w-full"
            >
                <CartIcon class="w-6 h-6" />
                <span> Go to Checkout </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FavoriteItem } from '@/types';
import ProductCover from '@/assets/media/home/product-2.jpg';
import CartIcon from '@/assets/icons/cart.svg';
import InfoIcon from '@/assets/icons/info-circle.svg';

const items = ref<FavoriteItem[]>([
    {
        id: '1',
        type: 'product',
        title: 'ADIN2111BCPZ',
        description: 'Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ',
        quantity: 16,
        image: ProductCover,
    },
    {
        id: '2',
        type: 'product',
        title: 'ADIN2111BCPZ',
        description: 'Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ',
        quantity: 16,
        image: ProductCover,
    },
    {
        id: '3',
        type: 'product',
        title: 'ADIN2111BCPZ',
        description: 'Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ',
        quantity: 16,
        image: ProductCover,
    },
    {
        id: '4',
        type: 'product',
        title: 'ADIN2111BCPZ',
        description: 'Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ',
        quantity: 16,
        image: ProductCover,
    },
    {
        id: '5',
        type: 'product',
        title: 'ADIN2111BCPZ',
        description: 'Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ',
        quantity: 16,
        image: ProductCover,
    },
    {
        id: '6',
        type: 'product',
        title: 'ADIN2111BCPZ',
        description: 'Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ',
        quantity: 16,
        image: ProductCover,
    },
    {
        id: '7',
        type: 'product',
        title: 'ADIN2111BCPZ',
        description: 'Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ',
        quantity: 16,
        image: ProductCover,
    },
    {
        id: '8',
        type: 'product',
        title: 'ADIN2111BCPZ',
        description: 'Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ',
        quantity: 16,
        image: ProductCover,
    },
    {
        id: '9',
        type: 'product',
        title: 'ADIN2111BCPZ',
        description: 'Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ',
        quantity: 16,
        image: ProductCover,
    },
]);
</script>
