<template>
    <div
        class="relative font-Inter lg:grid lg:grid-cols-[60%,40%] lg:gap-[25px] xl:grid-cols-[45%,30%,25%] xl:pb-[15px] xl:gap-0 xl:border-b xl:border-gray-200"
    >
        <div class="flex items-start">
            <NuxtLink :to="`/product/${item._id}`" class="flex flex-shrink-0 mr-2.5 md:mr-[15px]">
                <img
                    :src="item.details.ProductImage.ProductImageLarge"
                    :alt="item.alias"
                    class="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
                />
            </NuxtLink>
            <div>
                <div class="md:flex md:items-center md:mb-[14px]">
                    <div class="flex items-center mb-2.5 md:mb-0 md:mr-5">
                        <NuxtLink :to="`/product/${item._id}`" class="text-xl leading-tight font-semibold mr-1.5">
                            {{ item.alias }}
                        </NuxtLink>
                        <button class="flex">
                            <CopyIcon class="w-[22px] h-[22px] text-gray-300 transition-colors duration-300 hover:text-blue" />
                        </button>
                    </div>
                    <button
                        class="flex items-center text-gray-300 px-3 py-[5px] max-w-max border border-gray-300 rounded-[25px] mb-2.5 transition-colors duration-300 hover:text-blue hover:border-blue md:mb-0"
                        @click="showCustomProductPartNumberModal = true"
                    >
                        <span class="text-[15px] leading-tight font-medium mr-2">
                            {{ item.manufacturerCode }}
                        </span>
                        <EditIcon class="w-5 h-5" />
                    </button>
                </div>
                <div class="grid grid-cols-1 gap-[5px] text-xs leading-tight mb-[15px] md:gap-2 md:mb-[25px] lg:mb-0">
                    <div>
                        {{ item.description }}
                    </div>
                    <div>Manufacturer: {{ item.manufacturer }}</div>
                    <div>Manufacturer part number: {{ item.manufacturerCode }}</div>
                    <div class="flex items-center">
                        <button class="flex items-center transition-colors duration-300 mr-[9px] hover:text-blue">
                            <PDFIcon class="w-[22px] h-[22px] mr-[5px]" />
                            <span class="text-xs leading-tight font-medium">Datasheet</span>
                        </button>
                        <button class="flex items-center transition-colors duration-300 hover:text-blue">
                            <LeafIcon class="w-[22px] h-[22px] mr-[5px]" />
                            <span class="text-xs leading-tight font-medium">RoHS</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="lg:pr-[75px]">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="w-[50%] text-green pb-2.5 md:w-[70%] lg:w-[40%]">
                            <div class="flex items-center">
                                <CheckIcon class="w-4 h-4 mr-1" />
                                <span class="text-xs leading-tight font-semibold md:mr-[15px] lg:mr-0"> {{ item.stock }} in stock </span>
                                <span class="hidden text-[13px] leading-tight text-dark font-normal mr-[15px] md:inline lg:hidden">
                                    Price for: Each
                                </span>
                                <span class="hidden text-[13px] leading-tight text-dark font-normal mr-[15px] md:inline lg:hidden">
                                    Multiple: 1
                                </span>
                                <span class="hidden text-[13px] leading-tight text-dark font-normal mr-[15px] md:inline lg:hidden">
                                    Minimum Order: {{ priceConfiguration ? priceConfiguration.quantity : 0 }}
                                </span>
                            </div>
                        </th>
                        <th class="text-gray-300 text-left pb-2.5">
                            <span class="text-xs leading-tight font-normal"> Quantity (pcs) </span>
                        </th>
                        <th class="text-gray-300 text-right pb-2.5">
                            <span class="text-xs leading-tight font-normal"> Price (Ex VAT) </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            class="text-[13px] leading-tight pb-[5px] md:opacity-0 md:pointer-events-none lg:opacity-100 lg:pointer-events-auto"
                        >
                            Price for: Each
                        </td>
                        <td class="text-[13px] leading-tight pb-[5px] md:pb-2">1+</td>
                        <td class="text-[13px] leading-tight text-right pb-[5px] md:pb-2">$150,00</td>
                    </tr>
                    <tr>
                        <td
                            class="text-[13px] leading-tight pb-[5px] md:opacity-0 md:pointer-events-none lg:opacity-100 lg:pointer-events-auto"
                        >
                            Multiple: 1
                        </td>
                        <td class="text-[13px] leading-tight pb-[5px] md:pb-2">5+</td>
                        <td class="text-[13px] leading-tight text-right pb-[5px] md:pb-2">$150,00</td>
                    </tr>
                    <tr>
                        <td class="text-[13px] leading-tight md:opacity-0 md:pointer-events-none lg:opacity-100 lg:pointer-events-auto">
                            Minimum Order: 1
                        </td>
                        <td class="text-[13px] leading-tight">10+</td>
                        <td class="text-[13px] leading-tight text-right">$150,00</td>
                    </tr>
                </tbody>
            </table>
            <div class="grid grid-cols-2 pt-2.5 mb-[15px] md:grid-cols-[70%,30%] md:mb-5 lg:grid-cols-[40%,60%] lg:mb-0">
                <div class="text-sm font-medium font-Poppins text-blue text-center">View More</div>
            </div>
        </div>
        <div class="flex gap-2.5 md:col-span-2 xl:col-span-1 xl:items-end">
            <QuantityButtons v-model="quantity" size="lg" :object="{action : ProductAction.Add, id: item._id} as ProductActionObject" />
            <button
                :disabled="quantity === 0"
                class="flex items-center flex-1 justify-center bg-blue rounded text-white px-5 py-[9px]"
                @click="addToCart(item)"
            >
                <CartIcon class="w-6 h-6 mr-2" />
                <span class="text-sm font-medium">Add to cart</span>
            </button>
        </div>
        <div class="absolute top-0 right-0 flex flex-col gap-2.5">
            <button class="flex justify-end text-gray-100 transition-colors duration-300 hover:text-blue">
                <HeartIcon class="w-6 h-6" />
            </button>
            <button class="flex justify-end text-gray-100 transition-colors duration-300 hover:text-blue">
                <ShareIcon class="w-6 h-6" />
            </button>
        </div>
        <!--        <div-->
        <!--            v-if="item.discount"-->
        <!--            class="absolute left-0 top-[120px] flex bg-red rounded-[25px] px-1.5 py-[3px] text-xs font-extrabold leading-tight text-white md:left-[unset] md:right-0 md:top-[88px] xl:right-11 xl:top-0"-->
        <!--        >-->
        <!--            {{ item.discount }}%-->
        <!--        </div>-->
    </div>
    <Teleport to="body">
        <Transition name="fade">
            <LayoutCustomProductPartNumberModal
                v-if="showCustomProductPartNumberModal"
                :manufacturer-code="item.manufacturerCode"
                @close="showCustomProductPartNumberModal = false"
            />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import CopyIcon from '@/assets/icons/copy.svg';
import EditIcon from '@/assets/icons/edit.svg';
import PDFIcon from '@/assets/icons/pdf.svg';
import LeafIcon from '@/assets/icons/leaf.svg';
import CheckIcon from '@/assets/icons/check-circle.svg';
import CartIcon from '@/assets/icons/cart.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import ShareIcon from '@/assets/icons/share.svg';
import { ProductAction, ProductActionObject } from '~/model/cart/response/cart.interface';
import { AddToCartRequestInterface } from '~/model/cart/request/cart.interface';
import { useNuxtApp } from '#app';
import Emitter from 'tiny-emitter/instance.js';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { parseProductPriceConfiguration } from '~/helpers/prices.helper';
import { PriceConfigurationSettingsInterface, ProductInterface } from '~/model/products/response/ProductResponse';

const { $api } = useNuxtApp();
const quantity = ref(1);

const props = defineProps({
    item: {
        type: Object as PropType<ProductInterface>,
        required: true,
    },
});

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

const discountsHelper = parseProductPriceConfiguration(props.item, getUserDetails.value);

const priceConfiguration = ref<PriceConfigurationSettingsInterface | null>(discountsHelper.priceConfiguration);
const discountPrice = ref(discountsHelper.discountPrice);
const userDiscount = ref(discountsHelper.userDiscount);
const productDiscount = ref(discountsHelper.productDiscount);

const quantityInfo = [
    {
        title: 'Price for',
        value: 'Each',
    },
    {
        title: 'Multiple',
        value: 1,
    },
    {
        title: 'Minimum order',
        value: priceConfiguration.value ? priceConfiguration.value.quantity : 1,
    },
];

const bulkQuantities = new Map<number, number>();

const buildBulkQuantities = () => {
    if (!props.item.priceConfiguration) {
        return;
    }

    props.item.priceConfiguration.configuration.forEach((configuration: PriceConfigurationSettingsInterface) => {
        const discount = productDiscount.value || userDiscount.value || 0;
        bulkQuantities.set(configuration.quantity, (configuration.price * (100 - Number(discount))) / 100);
    });
};

const addToCart = async (product: ProductInterface) => {
    if (product && product._id) {
        const payload: AddToCartRequestInterface = {
            userId: '',
            products: [{ id: product._id, stock: quantity.value, isFolder: false }],
        };

        const object = await $api.cart.addEntityToCart(payload);

        if (object.status === 'success') {
            const { data } = await $api.cart.fetchCartList();
            Emitter.emit('update-cart', data);
        }
    }
};

const showCustomProductPartNumberModal = ref(false);

buildBulkQuantities();
</script>