<template>
    <div class="pt-5 md:pt-0">
        <ProductBreadcrumbs :product="product" />
        <div class="container mb-[30px] lg:mb-10">
            <div class="w-full flex items-center justify-end md:gap-0w mb-3">
                <UiDropdownMenu :modal="false">
                    <UiDropdownMenuTrigger as-child>
                        <UiButton variant="ghost" class="flex h-10 w-10 p-0 text-slate-500 sm:hidden">
                            <MoreVertical class="h-5 w-5" />
                            <span class="sr-only">Product actions</span>
                        </UiButton>
                    </UiDropdownMenuTrigger>
                    <UiDropdownMenuContent align="end" class="w-[220px] sm:hidden">
                        <UiDropdownMenuItem @click="askDialog?.open()">Ask about the product</UiDropdownMenuItem>
                        <UiDropdownMenuItem @click="reportErrorDialog?.open()">Report an error</UiDropdownMenuItem>
                        <UiDropdownMenuItem @click="printPage">Print this page</UiDropdownMenuItem>
                    </UiDropdownMenuContent>
                </UiDropdownMenu>

                <ProductAskDialog ref="askDialog" trigger-class="hidden sm:inline-flex" />
                <DialogReportError ref="reportErrorDialog" trigger-class="hidden sm:inline-flex" />
                <UiButton variant="link" @click="printPage" class="hidden sm:inline-flex text-slate-300 gap-1">
                    <PrinterIcon class="w-[22px] h-[22px]" />
                    <span class="text-xs leading-tight">Print this page</span>
                </UiButton>
            </div>
            <div
                class="grid grid-cols-1 gap-y-[30px] mb-[30px] md:grid-cols-2 md:gap-6 lg:grid-rows-1 lg:items-start lg:mb-10 2xl:grid-cols-[340px,542px,460px]"
            >
                <ProductGallery
                    v-if="product && images"
                    v-model="activeImageIndex"
                    class="col-span-2 lg:col-span-1"
                    :images="images"
                    :product="product"
                    @show-zoom-modal="showZoomGallery = true"
                />
                <ProductDetails v-if="product" class="col-span-2 lg:col-span-1" :product="product" />
                <ProductQuantity v-if="product" class="col-span-2 2xl:col-span-1" :product="product" />
            </div>
            <LazyProductTable v-if="product" :features="product?.details?.ParametricData?.Features" />
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
        <ProductZoomGallery
            v-model:selectedIndex="activeImageIndex"
            v-model:open="showZoomGallery"
            :alias="product.alias"
            :images="images"
        />
    </div>
</template>

<script setup lang="ts">
import { MoreVertical, PrinterIcon } from 'lucide-vue-next';

import type { ProductDetail } from '~~/model/products/response/ProductDetailResponse';
import { useNuxtApp } from '#app';

const { $api } = useNuxtApp();

useHead({
    title: 'Product',
});

const route = useRoute();

const product = ref<ProductDetail | null>(null);
const { data } = await $api.product.fetchSingleProduct(route.params.slug);
product.value = data;

const images = computed(() => {
    return Array.isArray(product.value?.details?.ProductImage)
        ? product.value?.details?.ProductImage
        : [product.value?.details?.ProductImage];
});

const filters = ['Featured', 'Best Sellers', 'Hot Deals', 'Top Searched'];

const activeImageIndex = ref(0);
const showZoomGallery = ref(false);

const askDialog = ref<{ open: () => void } | null>(null);
const reportErrorDialog = ref<{ open: () => void } | null>(null);

const printPage = () => {
    if (process.client) {
        window.print();
    }
};
</script>
