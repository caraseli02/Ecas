<template>
    <NuxtLink
        :to="`/product/${product._id}`"
        class="flex flex-col relative font-Inter bg-white rounded-md shadow-xs overflow-hidden h-full px-2.5 pt-[34px] pb-2 md:px-[15px] md:pt-10 md:pb-3 xl:pt-[34px]"
    >
        <div
            class="absolute top-0 left-0 px-2.5 py-1 flex items-center rounded-tl-md rounded-br-md"
            :class="[product.stock ? 'bg-green' : 'bg-orange']"
        >
            <CheckIcon v-if="product.stock" class="w-4 h-4 mr-1 text-white" />
            <InfoIcon v-else class="w-4 h-4 mr-1 text-white" />
            <span class="text-[11px] leading-tight font-semibold text-white">
                {{ product.stock ? `${product.stock} in stock` : 'On request' }}
            </span>
        </div>
        <img
            :src="product.details.ProductImage.ProductImageLarge"
            :alt="product.alias"
            class="w-[84px] h-[84px] object-contain mx-auto mb-2.5 md:w-[110px] md:h-[110px] md:mb-[15px] xl:w-[120px] xl:h-[120px]"
        />
        <div class="flex items-center mb-[5px]">
            <h3 class="text-[13px] font-semibold mr-1 md:text-base">
                {{ product.alias }}
            </h3>
            <button class="flex">
                <InfoIcon class="w-[14px] h-[14px] text-white md:w-4 md:h-4 xl:w-[18px] xl:h-[18px]" />
            </button>
        </div>
        <div class="text-xs leading-tight font-semibold text-gray-300 mb-[9px] md:mb-[5px]">
            {{ 'TBD' }}
        </div>
        <div class="hidden text-xs text-gray-300 truncate mb-4 md:block">{{ product.description }}</div>
        <div class="mt-auto">
            <div v-if="productDiscount" class="text-[11px] leading-tight line-through mb-px md:text-xs">
                {{ priceConfiguration ? `$ ${priceConfiguration.price.toFixed(2)} (${priceConfiguration.quantity}+)` : '-' }}
            </div>
            <div class="text-[13px] leading-tight md:text-base" :class="[productDiscount ? 'text-red' : '']">
                <strong>
                    {{ productDiscount ? `$ ${discountPrice.toFixed(2)}` : priceConfiguration?.price.toFixed(2) || '-' }}
                </strong>
                {{ priceConfiguration ? `(${priceConfiguration.quantity}+)` : '-' }}
            </div>
        </div>
        <div class="absolute top-3 right-0 flex flex-col gap-2.5 md:top-[15px]">
            <div class="pr-3 flex flex-col gap-2.5 md:pr-[15px]">
                <button
                    class="flex justify-end text-gray-100 transition-colors duration-300 hover:text-blue"
                    @click="addToFavourite(product)"
                >
                    <HeartIcon class="w-6 h-6" />
                </button>
                <button class="flex justify-end text-gray-100 transition-colors duration-300 hover:text-blue">
                    <ShareIcon class="w-6 h-6" />
                </button>
                <button class="hidden justify-end text-gray-100 transition-colors duration-300 hover:text-blue md:flex">
                    <D3Icon class="w-6 h-6" />
                </button>
            </div>
            <div
                v-if="productDiscount"
                class="bg-red rounded-l-[25px] p-[5px] text-[11px] font-semibold text-white md:px-2.5 md:text-sm xl:translate-y-12"
            >
                {{ productDiscount }}%
            </div>
        </div>
        <div
            v-if="product.stock"
            class="absolute bottom-0 right-0 bg-blue px-[13px] py-1 rounded-br-md rounded-tl-md md:px-[18px] md:py-[9px]"
            @click.prevent="addToCart(product, priceConfiguration ? priceConfiguration.quantity : 1)"
        >
            <CartIcon class="w-6 h-6 text-white" />
        </div>
        <button v-else class="absolute bottom-0 right-0 bg-blue px-[13px] py-1 rounded-br-md rounded-tl-md md:px-[18px] md:py-[9px]">
            <ArrowsIcon class="w-6 h-6" />
        </button>
    </NuxtLink>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import InfoIcon from '@/assets/icons/info-circle.svg';
import CartIcon from '@/assets/icons/cart.svg';
import ArrowsIcon from '@/assets/icons/double-arrows.svg';
import CheckIcon from '@/assets/icons/check-circle.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import ShareIcon from '@/assets/icons/share.svg';
import D3Icon from '@/assets/icons/3d.svg';
import { useNuxtApp } from '#app';
import { FavouriteFolderRequestInterface } from '~/model/favourite-folder/request/favourite-folder.interface';
import { AddToCartRequestInterface } from '~/model/cart/request/cart.interface';
import Emitter from 'tiny-emitter/instance.js';
import { PriceConfigurationSettingsInterface, ProductInterface } from '~/model/products/response/ProductResponse';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/authStore';
import { UserDetails } from '~/types/auth/user-details';

const { $api } = useNuxtApp();
const props = defineProps({
    product: {
        type: Object as PropType<ProductInterface>,
        required: true,
    },
});

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

const priceConfiguration = ref<PriceConfigurationSettingsInterface | null>(null);
const discountPrice = ref(0);
const userDiscount = ref(0);
const productDiscount = ref(0);

const parseProductPriceConfiguration = () => {
    priceConfiguration.value = props.product?.priceConfiguration?.configuration[0] || null;

    userDiscount.value = (getUserDetails.value as unknown as UserDetails)?.adminSettings?.discount?.value || 0;
    productDiscount.value = props.product.adminSettings?.discount?.value || 0;

    if (priceConfiguration.value) {
        discountPrice.value = userDiscount
            ? priceConfiguration.value?.price * (1 - userDiscount.value / 100)
            : priceConfiguration.value?.price * (1 - productDiscount.value / 100);
    }
};

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

    const object = await $api.cart.addEntityToCart(payload);

    if (object.status === 'success') {
        const { data } = await $api.cart.fetchCartList();
        Emitter.emit('update-cart', data);
    }
};

parseProductPriceConfiguration();
</script>