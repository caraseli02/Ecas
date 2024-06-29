<template>
    <div class="h-[368px] lg:h-[298px] w-full flex flex-col justify-between relative bg-white rounded-md px-2.5 pt-2 pb-5 shadow-m md:px-[15px] lg:pt-[15px] lg:self-start">
        <div class="absolute top-0 left-0 px-2.5 py-2 flex items-center rounded-tl-md rounded-br-md bg-green-500">
            <CheckCircle2 class="w-4 h-4 mr-1 text-white" />
            <span class="text-[11px] font-Inter leading-tight font-semibold text-white"> {{ product.stock }} in stock </span>
        </div>
        <div class="flex justify-end text-xs mb-[18px] lg:hidden">
            For larger quantities ask
            <NuxtLink
                to="/"
                class="relative text-blue-500 font-medium ml-1 after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:origin-right after:scale-x-0 after:rounded-full after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
                here.
            </NuxtLink>
        </div>
        <div class="lg:grid lg:grid-cols-2">
            <div class="lg:order-2 mt-6">
                <div class="flex items-center justify-between gap-3 text-xs leading-tight text-slate-500 pl-[5px] mb-[5px]">
                    <div class="flex-shrink-0">Quantity</div>
                    <div>Price ( Ex VAT )</div>
                </div>
                <div class="font-Inter mb-4 lg:mb-[9px]">
                    <div
                        v-for="(quantity, index) in bulkQuantities"
                        :key="index"
                        class="flex items-center justify-between gap-3 px-2.5 py-1 text-[13px] leading-tight rounded"
                        :class="currentPriceConfiguration?.quantity === quantity[0] ? 'bg-light-300' : ''"
                    >
                        <div>{{ quantity[0] }}+</div>
                        <div :class="[productDiscount ? 'text-red' : '']">${{ quantity[1].toFixed(2) }}</div>
                    </div>
                </div>
                <div class="hidden justify-end text-slate-500 text-xs mb-[9px] lg:flex">
                    For larger quantities ask
                    <NuxtLink
                        to="/"
                        class="relative text-blue-500 font-medium ml-1 after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:origin-right after:scale-x-0 after:rounded-full after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
                    >
                        here.
                    </NuxtLink>
                </div>
            </div>
            <div class="lg:order-1 lg:pt-[60px] xl:pt-[29px]">
                <div
                    class="flex items-center justify-center gap-3 bg-light-300 rounded px-[13px] py-1 text-xs leading-snug mb-[22px] lg:flex-col lg:items-start lg:justify-start lg:bg-transparent lg:gap-[5px] lg:p-0"
                >
                    <div class="flex items-center">
                        <span class="text-slate-500 mr-[5px]">Price for:</span>
                        <span class="lg:text-slate-500">Each</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-slate-500 mr-[5px]">Multiple:</span>
                        <span class="font-Inter lg:text-slate-500">1</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-slate-500 mr-[5px]">Minimum Order:</span>
                        <span class="font-Inter lg:text-slate-500">{{ minPriceConfiguration ? minPriceConfiguration.quantity : 1 }}</span>
                    </div>
                </div>
                <div class="flex items-center justify-between font-Inter mb-[22px] lg:justify-start lg:items-end lg:absolute xl:relative bottom-0">
                    <div class="lg:mr-[15px]">
                        <div v-if="productDiscount" class="text-sm leading-tight line-through">
                            {{
                                minPriceConfiguration
                                    ? `$ ${minPriceConfiguration.price.toFixed(2)} (${minPriceConfiguration.quantity}+)`
                                    : '-'
                            }}
                        </div>
                        <div class="text-lg leading-tight" :class="[productDiscount ? 'text-rose-500' : '']">
                            <strong>
                                {{ discountPrice ? `$ ${discountPrice.toFixed(2)}` : minPriceConfiguration?.price.toFixed(2) || '-' }}
                            </strong>
                            {{ currentPriceConfiguration ? `(${currentPriceConfiguration.quantity}+)` : '-' }}
                        </div>
                    </div>
                    <div
                        v-if="productDiscount"
                        class="flex items-center justify-center w-10 h-5 border border-rose-500 text-rose-500 rounded-full font-Inter text-sm leading-tight font-semibold"
                    >
                        {{ productDiscount }}%
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-2.5 w-full lg:w-[486px] xl:w-fit self-end">
            <QuantityButtons
                v-if="minPriceConfiguration"
                v-model="quantity"
                size="lg"
                :object="{ id: product._id, min: minPriceConfiguration.quantity , action : 'add'} as ProductActionObject"
            />
            <button
                class="flex items-center flex-1 justify-center bg-blue-500 rounded-lg text-white px-5 py-[9px]"
                @click="addToCart(props.product)"
            >
                <CartIcon class="w-6 h-6 mr-2" />
                <span v-if="minPriceConfiguration && quantity" class="text-sm font-medium"
                    >{{ quantity > minPriceConfiguration.quantity ? 'Update' : 'Add to' }} cart</span
                >
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next';

import CartIcon from '@/assets/icons/cart.svg';
import { CartInterface, ProductActionObject } from '~/model/cart/response/cart.interface';
import { PriceConfigurationSettingsInterface, ProductInterface } from '~/model/products/response/ProductResponse';
import { addToCartHelper, initializeQuantities, parseProductPriceConfiguration } from '~/helpers/prices.helper';
import { useAuthStore } from '~/store/authStore';
import { useCartStore } from '~/store/cartStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const cartStore = useCartStore();

const { getUserDetails } = storeToRefs(authStore);
const { getCart } = storeToRefs(cartStore);

const props = defineProps<{
    product: ProductInterface;
}>();

const quantity = ref(0);
const initialRequestedQuantity = ref(0);

const minPriceConfiguration = ref<PriceConfigurationSettingsInterface | undefined>(undefined);
const currentPriceConfiguration = ref<PriceConfigurationSettingsInterface | undefined>(undefined);
const discountPrice = ref(0);
const userDiscount = ref(0);
const productDiscount = ref(0);

const getPricesConfiguration = () => {
    const discountsHelper = parseProductPriceConfiguration(props.product, getUserDetails.value, quantity.value);

    minPriceConfiguration.value = discountsHelper?.minimumOrderQuantityConfiguration;
    currentPriceConfiguration.value = discountsHelper?.priceConfiguration;
    discountPrice.value = discountsHelper?.discountPrice || 0;
    userDiscount.value = discountsHelper?.userDiscount || 0;
    productDiscount.value = discountsHelper?.productDiscount || 0;
};

const fetchCart = async () => {
    const data = (await getCart.value) as CartInterface;

    getPricesConfiguration();
    initializeQuantities(props.product, data, quantity, initialRequestedQuantity, minPriceConfiguration.value);
    getPricesConfiguration();
};

await fetchCart();

const bulkQuantities = new Map<number, number>();

const buildBulkQuantities = () => {
    if (!props.product.priceConfiguration) {
        return;
    }

    props.product.priceConfiguration.configuration.forEach((configuration: PriceConfigurationSettingsInterface) => {
        const discount = productDiscount.value || userDiscount.value || 0;
        bulkQuantities.set(configuration.quantity, (configuration.price * (100 - Number(discount))) / 100);
    });
};

const addToCart = async (product: ProductInterface) => {
    const stock = initialRequestedQuantity.value > 0 ? quantity.value - initialRequestedQuantity.value : quantity.value;

    const response = (await addToCartHelper(product, stock)) as any;

    if (response.status === 'success') {
        await cartStore.updateAndReturnCart();
        await fetchCart();
    }
};

watch(quantity, (_quantity) => {
    getPricesConfiguration();
});

buildBulkQuantities();
</script>
