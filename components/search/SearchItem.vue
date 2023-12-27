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
                            <CopyIcon class="w-[22px] h-[22px] text-slate-500 transition-colors duration-300 hover:text-blue-500" />
                        </button>
                    </div>
                    <button
                        class="flex items-center text-slate-500 px-3 py-[5px] max-w-max border border-gray-300 rounded-[25px] mb-2.5 transition-colors duration-300 hover:text-blue-500 hover:border-blue-500 md:mb-0"
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
                        <button class="flex items-center transition-colors duration-300 mr-[9px] hover:text-blue-500">
                            <PDFIcon class="w-[22px] h-[22px] mr-[5px]" />
                            <span class="text-xs leading-tight font-medium">Datasheet</span>
                        </button>
                        <button class="flex items-center transition-colors duration-300 hover:text-blue-500">
                            <LeafIcon class="w-[22px] h-[22px] mr-[5px]" />
                            <span class="text-xs leading-tight font-medium">RoHS</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="lg:pr-[75px]">
            <div class="flex">
                <div class="flex flex-col items-start min-w-fit gap-2 xl:gap-1.5">
                    <span class="text-xs text-green-500 leading-tight font-semibold md:mr-[15px] lg:mr-0 flex mb-2">
                        <CheckIcon class="w-[15px] h-[15px] mr-1" />
                        {{ item.stock }} in stock
                    </span>
                    <span class="hidden text-[13px] leading-tight text-neutral-700 font-normal mr-[15px] md:inline"> Price for: Each </span>
                    <span class="hidden text-[13px] leading-tight text-neutral-700 font-normal mr-[15px] md:inline"> Multiple: 1 </span>
                    <span class="hidden text-[13px] leading-tight text-neutral-700 font-normal mr-[15px] md:inline">
                        Minimum Order: {{ minPriceConfiguration ? minPriceConfiguration.quantity : 0 }}
                    </span>
                </div>
                <section class="flex gap-2 min-w-fit">
                    <div class="flex flex-col items-start gap-1.5">
                        <span class="text-xs leading-tight font-normal mb-2"> Quantity (pcs) </span>
                        <span v-for="(quantity, _) in bulkQuantities" class="text-[13px] leading-tight"> {{ quantity[0] }}+ </span>
                    </div>
                    <div class="flex flex-col items-start gap-1.5">
                        <span class="text-xs leading-tight font-normal mb-2"> Price (Ex VAT)</span>
                        <span
                            v-for="(quantity, _) in bulkQuantities"
                            class="text-[13px] leading-tight"
                            :class="[productDiscount ? 'text-red' : '']"
                        >
                            $ {{ quantity[1].toFixed(2) }}
                        </span>
                    </div>
                </section>
            </div>
            <div class="grid grid-cols-2 pt-2.5 mb-[15px] md:grid-cols-[70%,30%] md:mb-5 lg:grid-cols-[40%,60%] lg:mb-0">
                <div class="text-sm font-medium font-Poppins text-blue text-blue-500">View More</div>
            </div>
        </div>
        <div class="flex gap-2.5 md:col-span-2 xl:col-span-1 xl:items-end">
            <QuantityButtons
                v-if="minPriceConfiguration"
                v-model="quantity"
                size="lg"
                :object="{action : 'add', min: minPriceConfiguration.quantity, id: item._id} as ProductActionObject"
            />
            <button
                :disabled="quantity === 0"
                class="flex items-center flex-1 justify-center bg-blue-500 rounded text-white px-5 py-[9px]"
                @click="addToCart(item)"
            >
                <CartIcon class="w-6 h-6 mr-2" />
                <span class="text-sm font-medium">Add to cart</span>
            </button>
        </div>
        <div class="absolute top-0 right-0 flex flex-col gap-2.5">
            <button class="flex justify-end text-gray-500 transition-colors duration-300 hover:text-blue">
                <HeartIcon class="w-6 h-6" />
            </button>
            <button class="flex justify-end text-gray-500 transition-colors duration-300 hover:text-blue">
                <ShareIcon class="w-6 h-6" />
            </button>
        </div>
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
import { ProductActionObject } from '~/model/cart/response/cart.interface';
import { useNuxtApp } from '#app';
import Emitter from 'tiny-emitter/instance.js';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { addToCartHelper, initializeQuantities, parseProductPriceConfiguration } from '~/helpers/prices.helper';
import { PriceConfigurationSettingsInterface, ProductInterface } from '~/model/products/response/ProductResponse';

const { $api } = useNuxtApp();
const quantity = ref(1);
const initialRequestedQuantity = ref(0);

const props = defineProps({
    item: {
        type: Object as PropType<ProductInterface>,
        required: true,
    },
});

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

const minPriceConfiguration = ref<PriceConfigurationSettingsInterface | undefined>(undefined);
const currentPriceConfiguration = ref<PriceConfigurationSettingsInterface | undefined>(undefined);
const discountPrice = ref(0);
const userDiscount = ref(0);
const productDiscount = ref(0);

const getPricesConfiguration = () => {
    const discountsHelper = parseProductPriceConfiguration(props.item, getUserDetails.value, quantity.value);

    minPriceConfiguration.value = discountsHelper?.minimumOrderQuantityConfiguration;
    currentPriceConfiguration.value = discountsHelper?.priceConfiguration;
    discountPrice.value = discountsHelper?.discountPrice || 0;
    userDiscount.value = discountsHelper?.userDiscount || 0;
    productDiscount.value = discountsHelper?.productDiscount || 0;
};

const fetchCart = async () => {
    const { data } = await $api.cart.fetchCartList();
    Emitter.emit('update-cart', data);

    initializeQuantities(props.item, data, quantity, initialRequestedQuantity, minPriceConfiguration.value);
    getPricesConfiguration();
};

await fetchCart();

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
    const stock = initialRequestedQuantity.value > 0 ? quantity.value - initialRequestedQuantity.value : quantity.value;

    const response = (await addToCartHelper(product, stock)) as any;

    if (response.status === 'success') {
        await fetchCart();
    }
};

const showCustomProductPartNumberModal = ref(false);

buildBulkQuantities();
</script>