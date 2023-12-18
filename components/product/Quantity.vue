<template>
    <div class="relative bg-white rounded-md px-2.5 pt-2 pb-5 shadow-m md:px-[15px] lg:pt-[15px] lg:self-start">
        <div class="absolute top-0 left-0 px-2.5 py-2 flex items-center rounded-tl-md rounded-br-md bg-green">
            <CheckIcon class="w-4 h-4 mr-1 text-white" />
            <span class="text-[11px] font-Inter leading-tight font-semibold text-white"> {{ product.stock }} in stock </span>
        </div>
        <div class="flex justify-end text-xs mb-[18px] lg:hidden">
            For larger quantities ask
            <NuxtLink
                to="/"
                class="relative text-blue font-medium ml-1 after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-blue after:origin-right after:scale-x-0 after:rounded-full after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
                here.
            </NuxtLink>
        </div>
        <div class="lg:grid lg:grid-cols-2">
            <div class="lg:order-2">
                <div class="flex items-center justify-between gap-3 text-xs leading-tight text-gray-300 pl-[5px] mb-[5px]">
                    <div class="flex-shrink-0">Quantity</div>
                    <div>Price ( Ex VAT )</div>
                </div>
                <div class="font-Inter mb-4 lg:mb-[9px]">
                    <div
                        v-for="(quantity, index) in bulkQuantities"
                        :key="index"
                        class="flex items-center justify-between gap-3 px-2.5 py-1 text-[13px] leading-tight bg-[#F2F2F2] rounded"
                    >
                        <div>{{ quantity[0] }}+</div>
                        <div>${{ quantity[1].toFixed(2) }}</div>
                    </div>
                </div>
                <div class="hidden justify-end text-gray-300 text-xs mb-[9px] lg:flex">
                    For larger quantities ask
                    <NuxtLink
                        to="/"
                        class="relative text-blue font-medium ml-1 after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-blue after:origin-right after:scale-x-0 after:rounded-full after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
                    >
                        here.
                    </NuxtLink>
                </div>
            </div>
            <div class="lg:order-1 lg:pt-[29px]">
                <div
                    class="flex items-center justify-between bg-[#F2F2F2] rounded px-[13px] py-1 text-xs leading-snug mb-[22px] lg:flex-col lg:items-start lg:justify-start lg:bg-transparent lg:gap-[5px] lg:p-0"
                >
                    <div class="flex items-center">
                        <span class="text-gray-300 mr-[5px]">Price for:</span>
                        <span class="lg:text-gray-300">Each</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-300 mr-[5px]">Multiple:</span>
                        <span class="font-Inter lg:text-gray-300">1</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-300 mr-[5px]">Minimum Order:</span>
                        <span class="font-Inter lg:text-gray-300">{{ priceConfiguration ? priceConfiguration.quantity : 1 }}</span>
                    </div>
                </div>
                <div class="flex items-center justify-between font-Inter mb-[22px] lg:justify-start lg:items-end">
                    <div class="lg:mr-[15px]">
                        <div v-if="productDiscount" class="text-sm leading-tight line-through">
                            {{ priceConfiguration ? `$ ${priceConfiguration.price.toFixed(2)} (${priceConfiguration.quantity}+)` : '-' }}
                        </div>
                        <div class="text-lg leading-tight" :class="[productDiscount ? 'text-red' : '']">
                            <strong>
                                {{ discountPrice ? `$ ${discountPrice.toFixed(2)}` : priceConfiguration?.price.toFixed(2) || '-' }}
                            </strong>
                            {{ priceConfiguration ? `(${priceConfiguration.quantity}+)` : '-' }}
                        </div>
                    </div>
                    <div
                        v-if="productDiscount"
                        class="bg-red rounded-[25px] px-2.5 py-1 font-Inter text-sm leading-tight font-semibold text-white"
                    >
                        {{ productDiscount }}%
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-2.5">
            <QuantityButtons
                v-if="priceConfiguration"
                v-model="priceConfiguration.quantity"
                size="lg"
                :object="{action : ProductAction.Add, id: product._id, min: priceConfiguration.quantity} as ProductActionObject"
            />
            <button
                class="flex items-center flex-1 justify-center bg-blue rounded text-white px-5 py-[9px]"
                @click="addToCart(props.product)"
            >
                <CartIcon class="w-6 h-6 mr-2" />
                <span class="text-sm font-medium">Add to cart</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import CheckIcon from '@/assets/icons/check-circle.svg';
import CartIcon from '@/assets/icons/cart.svg';
import { AddToCartRequestInterface } from '~/model/cart/request/cart.interface';
import { useNuxtApp } from '#app';
import { ProductAction, ProductActionObject } from '~/model/cart/response/cart.interface';
import Emitter from 'tiny-emitter/instance.js';
import { PriceConfigurationSettingsInterface, ProductInterface } from '~/model/products/response/ProductResponse';
import { parseProductPriceConfiguration } from '~/helpers/prices.helper';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

const { $api } = useNuxtApp();
const props = defineProps<{
    product: ProductInterface;
}>();

const discountsHelper = parseProductPriceConfiguration(props.product, getUserDetails.value);

const priceConfiguration = ref<PriceConfigurationSettingsInterface | null>(discountsHelper.priceConfiguration);
const discountPrice = ref(discountsHelper.discountPrice);
const userDiscount = ref(discountsHelper.userDiscount);
const productDiscount = ref(discountsHelper.productDiscount);

const bulkQuantities = new Map<number, number>();

const buildBulkQuantities = () => {
    if (!props.product.priceConfiguration) {
        return;
    }

    props.product.priceConfiguration.configuration.forEach((configuration: PriceConfigurationSettingsInterface) => {
        bulkQuantities.set(configuration.quantity, configuration.price);
    });
};

const addToCart = async (product: ProductInterface) => {
    const payload: AddToCartRequestInterface = {
        userId: '',
        products: [
            {
                id: product._id,
                stock: priceConfiguration.value ? priceConfiguration.value.quantity : 1,
                isFolder: false,
            },
        ],
    };

    const object = await $api.cart.addEntityToCart(payload);

    if (object.status === 'success') {
        const { data } = await $api.cart.fetchCartList();
        Emitter.emit('update-cart', data);
    }
};

buildBulkQuantities();
</script>