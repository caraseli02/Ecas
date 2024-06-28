<template>
    <div class="pt-5 md:pt-0">
        <ProductBreadcrumbs :product="product" />
        <div class="container mb-[30px] lg:mb-10">
            <div class="hidden items-center justify-end gap-5 mb-2.5 md:flex">
                <button class="flex items-center text-gray-500 transition-colors duration-300 hover:text-blue-500">
                    <MessageCircleQuestion class="w-[22px] h-[22px] mr-[5px]" />
                    <span class="text-xs leading-tight">Ask about the product</span>
                </button>
                <button class="flex items-center text-gray-500 transition-colors duration-300 hover:text-blue-500">
                    <AlertTriangle class="w-[22px] h-[22px] mr-[5px]" />
                    <span class="text-xs leading-tight">Report an error</span>
                </button>
                <button class="flex items-center text-gray-500 transition-colors duration-300 hover:text-blue-500">
                    <PrinterIcon class="w-[22px] h-[22px] mr-[5px]" />
                    <span class="text-xs leading-tight">Print this page</span>
                </button>
            </div>
            <div
                class="grid grid-cols-1 gap-[30px] mb-[30px] md:grid-cols-2 md:gap-5 lg:grid-rows-1 lg:items-start lg:mb-10 xl:grid-cols-[340px,590px,461px]"
            >
                <ProductGallery class="" :images="images" :product="product" />
                <ProductDetails class="" :product="product" />
                <ProductQuantity class="" :product="product" />
            </div>
            <ProductTable :features="product.details.ParametricData.Features" />
        </div>
        <ProductBanners />
        <NewProducts> Similar Products </NewProducts>
        <Banner class="hidden lg:flex xl:hidden" />
        <div class="container mb-[30px] lg:mb-10 xl:mb-[60px]">
            <div class="grid grid-cols-1 gap-[15px] md:grid-cols-[40%,calc(60%-20px)] md:gap-5 xl:grid-cols-[41%,calc(59%-20px)]">
                <QuickBuy />
                <EcxlusiveOffer />
            </div>
        </div>
        <ProductBlocks :rows-number="2" class="mb-7 lg:mb-[38px] xl:mb-[58px]" :filters="filters" />
        <News />
        <Manufacturers />
    </div>
</template>

<script setup lang="ts">
import { AlertTriangle, MessageCircleQuestion, PrinterIcon } from 'lucide-vue-next';

import { ProductDetail } from '~~/model/products/response/ProductDetailResponse';
import { ProductImage } from '~~/model/response/products/ProductResponse';
import { useNuxtApp } from '#app';

const { $api } = useNuxtApp();

useHead({
    title: 'Product',
});

const route = useRoute();

const { data } = await $api.product.fetchSingleProduct(route.params.slug);
const product = data as ProductDetail;

const images: ProductImage[] = Array(3).fill(product.details.ProductImage);

const filters = ['Featured', 'Best Sellers', 'Hot Deals', 'Top Searched'];
</script>
