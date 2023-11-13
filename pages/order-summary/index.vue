<template>
    <div class="pt-[30px] lg:pt-10">
        <div class="grid grid-cols-1">
            <div class="container">
                <div class="flex items-end justify-between mb-[15px]">
                    <h1 class="text-xl font-semibold">Order Summary</h1>
                    <div class="flex items-center">
                        <button
                            class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue mr-[15px]">
                            <TriangleIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Report an error </span>
                        </button>
                        <button class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue">
                            <PrintIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Print this page </span>
                        </button>
                    </div>
                </div>
                <div class="lg:grid lg:grid-cols-[1fr,310px] lg:gap-5 lg:items-start lg:mb-10 xl:grid-cols-[1fr,340px]">
                    <OrderSummaryTable :items="cartItems" :loading="loading"/>
                    <div class="lg:grid lg:grid-cols-1">
                        <OrderSummary />
                        <OrderSummaryEcxlusiveOffer class="max-lg:hidden" />
                    </div>
                </div>
            </div>
            <Banner />
            <NewProducts title="Hot Deals" />
            <div class="container mb-10 lg:hidden">
                <OrderSummaryEcxlusiveOffer />
            </div>
            <News />
        </div>
    </div>
</template>

<script setup lang="ts">
import TriangleIcon from '@/assets/icons/triangle.svg';
import PrintIcon from '@/assets/icons/print.svg';
import { CartProductsInterface } from '~/types';
import { ProductInterface } from '~/model/products/response/ProductResponse';
import { DiscountInterface } from '~/types/auth/account-settings';

useHead({
    title: 'Order Summary',
});

const mockProducts = [
    {
        id: 'RSCSK3143R3D02008TSCSK38TDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        stock: 121,
        isFolder: true,
        initialPrice: 104,
        discountPrice: 98,
        discount: {
            value: 6,
            startDate: '2021-09-01T00:00:00.000Z',
            endDate: '2021-09-30T00:00:00.000Z',
        } as DiscountInterface,
        productEntity: {
            stock: 0,
        } as ProductInterface,
    },
    {
        id: 'CSMSK3143R3D02008TSCSK38FGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        stock: 1,
        isFolder: true,
        initialPrice: 124,
        discountPrice: 92,
        discount: {
            value: 26,
            startDate: '2021-09-01T00:00:00.000Z',
            endDate: '2021-09-30T00:00:00.000Z',
        } as DiscountInterface,
        productEntity: {
            stock: 2,
        } as ProductInterface,
    },
    {
        id: 'RSCSK3143R3D02008TSCSK38TD',
        stock: 56,
        isFolder: false,
        initialPrice: 160,
        discountPrice: 101,
        discount: {
            value: 36,
            startDate: '2021-09-01T00:00:00.000Z',
            endDate: '2021-09-30T00:00:00.000Z',
        } as DiscountInterface,
        productEntity: {
            stock: 98,
        } as ProductInterface,
    },
];

const { $api } = useNuxtApp();
const loading = ref(false);

const cartItems = ref([] as CartProductsInterface[]);
const fetchCartItems = async () => {
    try {
        loading.value = true;
        const response = await $api.cart.fetchCartProducts();
        if (response.status === 'success') {
            let products: CartProductsInterface[] = [];
            // response.data.products.forEach((product: string) => {
            //     products.push(JSON.parse(product));
            // });
            products = mockProducts;
            cartItems.value = products.map((product: CartProductsInterface) => {
                return {
                    id: product.id,
                    stock: product.stock,
                    isFolder: product.isFolder,
                    initialPrice: product.initialPrice,
                    discount: product.discount,
                    productEntity: product.productEntity,
                };
            });
        }
        else {
            console.log('error');
        }
    } catch {
        console.log('error');
    }
};

await fetchCartItems().then(() => loading.value = false);

</script>
