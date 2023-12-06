<template>
    <div class="flex flex-col flex-1 max-w-full h-full">
        <div class="pt-6 px-4 pb-10 flex-1 h-full overflow-y-auto overscroll-contain scrollbar-thin max-h-vh">
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
            <div class="flex items-center justify-between text-sm font-medium mb-2 md:font-semibold md:leading-[1.43]">
                <div>Subtotal</div>
                <div class="text-right">$ 419.24</div>
            </div>
            <div class="flex items-center justify-between text-xs mb-2 md:text-sm md:leading-[1.43]">
                <div class="flex items-center gap-6 font-medium">
                    <span> Discount </span>
                    <span class="font-normal text-gray-300">(10%)</span>
                </div>
                <div class="text-right md:font-medium">- $ 41.924</div>
            </div>
            <div class="flex items-center justify-between text-xs mb-2 pb-2 border-b border-gray-200 md:text-sm md:leading-[1.43]">
                <div class="flex items-center gap-6 font-medium">
                    <button class="group flex items-center gap-2">
                        <span>Tax</span>
                        <InfoIcon class="w-4 h-4 text-gray-300 transition-colors duration-300 group-hover:text-blue" />
                    </button>
                    <span class="font-normal text-gray-300">(VAT 19%)</span>
                </div>
                <div class="text-right md:font-medium">$ 38.68</div>
            </div>
            <div class="flex items-center justify-between leading-[1.2] font-semibold text-xl mb-6 md:text-base md:leading-normal">
                <div>Total</div>
                <div class="text-right">$ 457.92</div>
            </div>
            <button
                class="flex items-center justify-center gap-2 bg-blue text-white rounded-lg px-[15px] py-2 leading-[1.75] font-medium w-full mb-6 md:mb-4"
            >
                <CartIcon class="w-6 h-6" />
                <span> Go to Checkout </span>
            </button>
            <button
                class="flex items-center gap-1 justify-center text-blue w-full text-sm font-medium leading-[1.43] md:bg-gray-200 md:rounded-lg md:text-gray-300 md:text-base md:leading-[1.75] md:py-2"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 md:w-6 md:h-6"
                >
                    <path
                        d="M10 16L6 12M6 12L10 8M6 12L18 12"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>

                <span>Continue Shopping</span>
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
