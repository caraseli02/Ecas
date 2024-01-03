<template>
    <NuxtLink
        :to="`/product/${product._id}`"
        class="flex flex-col gap-2 relative font-Inter bg-white rounded-xl shadow-xs overflow-hidden h-full px-2.5 pt-[34px] pb-2 md:px-4 md:pt-10 md:pb-3 xl:pt-[34px] min-h-[280px]"
    >
        <ProductCardStock :stock="product.stock" />
        <div class="relative">
            <img :src="product.details.ProductImage.ProductImageLarge" :alt="product.alias" class="object-contain mx-auto max-h-[120px]" />
            <div
                v-if="productDiscount"
                class="ring-1 ring-rose-500 rounded-full p-[5px] text-sm font-semibold text-rose-500 md:px-2.5 md:text-sm absolute top-2 left-0"
            >
                {{ productDiscount ?? 0 }}%
            </div>
        </div>

        <section class="flex flex-col gap-1">
            <div class="flex gap-2 items-center">
                <h3 class="font-semibold text-neutral-700">
                    {{ product.alias }}
                </h3>
                <button class="flex">
                    <InfoIcon class="w-4 h-4 text-slate-500" />
                </button>
            </div>
            <div class="flex flex-col gap-1 text-xs max-w-[220px]">
                <h4 class="text-xs leading-tight font-semibold text-slate-500">Category</h4>
                <p class="hidden text-xs text-slate-500 truncate md:block">{{ product.description }}</p>
            </div>
        </section>
        <div class="mt-auto h-full">
            <div class="text-xs min-h-[14px] leading-tight line-through mb-px md:text-xs">
                <template v-if="productDiscount">
                    {{ priceConfiguration ? `$ ${priceConfiguration.price.toFixed(2)} (${priceConfiguration.quantity}+)` : '-' }}
                </template>
            </div>
            <div class="flex gap-1 items-center" :class="[productDiscount ? 'text-rose-500' : '']">
                <strong>
                    {{ discountPrice ? `$ ${discountPrice.toFixed(2)}` : priceConfiguration?.price.toFixed(2) || '-' }}
                </strong>
                <span class="text-xs">
                    {{ priceConfiguration ? `(${priceConfiguration.quantity}+)` : '-' }}
                </span>
            </div>
        </div>
        <div class="absolute right-0 flex flex-col gap-3 md:top-[32px]">
            <div class="pr-3 flex flex-col gap-2.5 md:pr-4">
                <button
                    class="flex justify-end text-gray-500 transition-colors duration-300 hover:text-blue-500"
                    @click="addToFavourite(product)"
                >
                    <SvgoCardHeartIcon class="w-6 h-6 text-gray-500" />
                </button>
                <button class="flex justify-end text-gray-500 transition-colors duration-300 hover:text-blue-500">
                    <SvgoCardShareIcon class="w-6 h-6 text-gray-500" />
                </button>
                <button class="justify-end text-gray-500 transition-colors duration-300 hover:text-blue-500">
                    <SvgoCardD3Icon class="w-6 h-6 text-gray-500" />
                </button>
            </div>
        </div>
        <div
            v-if="product.stock"
            class="absolute bottom-0 right-0 bg-blue-500 rounded-br-xl rounded-tl-xl px-6 py-3"
            @click.prevent="addToCart(product, priceConfiguration ? priceConfiguration.quantity : 1)"
        >
            <CartIcon class="w-6 h-6 text-white" />
        </div>
        <button v-else class="absolute bottom-0 right-0 bg-blue-500 px-[13px] py-1 rounded-br-md rounded-tl-md md:px-[18px] md:py-[9px]">
            <ArrowsIcon class="w-6 h-6" />
        </button>
    </NuxtLink>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import InfoIcon from '@/assets/icons/info-circle.svg';
import CartIcon from '@/assets/icons/cart.svg';
import ArrowsIcon from '@/assets/icons/double-arrows.svg';
import { useNuxtApp } from '#app';
import type { FavouriteFolderRequestInterface } from '~/model/favourite-folder/request/favourite-folder.interface';
import type { AddToCartRequestInterface } from '~/model/cart/request/cart.interface';
import { PriceConfigurationSettingsInterface, ProductInterface } from '~/model/products/response/ProductResponse';
import { parseProductPriceConfiguration } from '~/helpers/prices.helper';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { useCartStore } from '~/store/cartStore';
import ProductCardStock from '~/components/global/ProductCardStock.vue';

const authStore = useAuthStore();
const cartStore = useCartStore();

const { getUserDetails } = storeToRefs(authStore);

const { $api } = useNuxtApp();
const props = defineProps({
    product: {
        type: Object as PropType<ProductInterface>,
        required: true,
    },
});

const discountsHelper = parseProductPriceConfiguration(props.product, getUserDetails.value, props.product?.stock);

const priceConfiguration = ref<PriceConfigurationSettingsInterface | undefined>(discountsHelper?.minimumOrderQuantityConfiguration);
const discountPrice = ref(discountsHelper?.discountPrice || 0);
const userDiscount = ref(discountsHelper?.userDiscount || 0);
const productDiscount = ref(discountsHelper?.productDiscount || 0);

const addToFavourite = async (product: ProductInterface) => {
    const payload: FavouriteFolderRequestInterface = {
        name: product.alias,
        isFolder: false,
        products: { id: product._id, stock: product.stock || 1 },
    };

    await $api.favouriteFolder.addEntityToFavouriteList(payload);
};

const addToCart = async (product: ProductInterface, stockToAdd = 1) => {
    const payload: AddToCartRequestInterface = {
        userId: '',
        products: [{ id: product._id, stock: stockToAdd, isFolder: false }],
    };
    console.log('adding to cart');
    await $api.cart.addEntityToCart(payload);
    console.log('test');
    await cartStore.updateAndReturnCart();
};
</script>