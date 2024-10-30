<template>
    <div class="pt-[30px] lg:pt-10">
        <div class="grid grid-cols-1">
            <div class="container px-4">
                <OrderSummaryHeader />
                <div class="gap-6 xl:grid xl:grid-cols-[1fr,392px]">
                    <div class="flex flex-col gap-9 max-w-[992px]">
                        <OrderSummaryBackOrderWarning v-if="showWarning" />
                        <OrderSummaryTable :loading="loading" @update-subtotal="calculateSubtotal($event, order)" @delete-selected="deleteSelected" />
                        <div class="hidden lg:flex flex-col">
                            <OrderSummarySimilarProducts :loading="loading" />
                            <OrderSummaryBannerImageCard class="hidden xl:flex" />
                        </div>
                    </div>
                    <div class="flex flex-col justify-start">
                        <OrderStockType
                            :items="cartItems"
                            :account-credit="accountCredit"
                            :order="order"
                            :general-settings="generalSettings"
                            :cards="cards"
                            :card="card"
                            :is-new-card-selected="isNewCardSelected"
                            @update-payment-details="order.paymentDetails = $event"
                        />
                        <OrderSummaryNoteSection />
                        <OrderSummary :order="order" :general-settings="generalSettings" />
                        <OrderSummaryCheckoutButtons :isCheckoutDisabled="isCheckoutDisabled" />
                        <OrderSummaryBannerCard />
                        <OrderSummaryEcxlusiveOffer class="max-lg:hidden" />
                        <OrderSummarySimilarProducts :loading="loading" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import OrderStockType from '~/components/order-summary/OrderStockType.vue';

import { CartProductsInterface } from '~/model/cart/response/cart.interface';
import {  PaymentDetails, StripeCardInfoInterface } from '~/types';
import { CustomerCreditInterface } from '~/types/auth/account-settings';
import {
    BackorderShippingTypesInterface,
    DeliveryTypesInterface,
    GeneralSettingsInterface,
    SmallOrderChargeInterface,
    StockorderShippingTypesInterface,
} from '~/types/general-settings/general-settings';

import _ from 'lodash';
import Emitter from 'tiny-emitter/instance.js';

import { useAuthStore } from '~/store/authStore';
import { useCheckoutStore } from '~/store/checkout';
import { storeToRefs } from 'pinia';

const { user, getShipping, getBilling } = useUser();
const { cartId, cartItems, fetchList, calculateSubtotal, calculateDiscount, showWarning } = useCart();

const userId = user.value?.firebaseId;
const creditObject = ref({} as CustomerCreditInterface);
const orderType = ref(0);
const note = ref('');
const paymentType = ref({
    type: 0 as number,
    selected: false,
});

const { $api } = useNuxtApp();
useHead({
    title: 'Order Summary',
});

const loading = ref(true);

watch(
    [cartItems],
    ([_items]) => {
        calculateSubtotal(_items, order);
        calculateDiscount(_items, order);
    },
    { deep: true }
);
const generalSettings = ref<GeneralSettingsInterface | null>({} as GeneralSettingsInterface);
const authStore = useAuthStore();
const { getGeneralSettings } = storeToRefs(authStore);

const getGeneralSettingsFunction = () => {
    generalSettings.value = getGeneralSettings.value;
};

const card = ref<any | null>({});
const cards = ref<StripeCardInfoInterface[]>([]);
const isNewCardSelected = ref<boolean>(false);

const fetchCards = async () => {
    const response = (await $api.user.userCards()) as unknown as {
        status: string;
        data: StripeCardInfoInterface[];
    };

    if (response.status === 'success') {
        if (response.data.length) {
            cards.value = response.data;
            card.value = _.cloneDeep(cards.value.find((card: any) => card.default));
        } else {
            isNewCardSelected.value = true;
        }
    }
};

await fetchCards();

getGeneralSettingsFunction();

// const mapCartItems = (cart: CartProductsInterface[] = []) => {
//     cartItems.value = cart?.map((product: CartProductsInterface) => ({
//         id: product.id,
//         stock: product.stock,
//         backorder_stock: product.backorder_stock || 0,
//         isFolder: false,
//         initialUnitPrice: product.initialUnitPrice,
//         unitPriceAfterDiscounts: product.unitPriceAfterDiscounts,
//         subtotal: product.subtotal || 0,
//         total: product.total || 0,
//         discount: product.discount || {
//             value: 0,
//             startDate: '',
//             endDate: '',
//         },
//         productEntity: product.productEntity,
//         liked: false,
//         selected: false,
//     }));
// };

const shippingFee = (shippingType: number) => {
    console.log(shippingType);
};

const orderItems = computed((): CartProductsInterface[] => {
    return cartItems.value?.map((item: any) => {
        const { selected, liked, ...rest } = item;
        return rest as CartProductsInterface;
    });
});

const getCustomerCredit = async () => {
    if (!userId) {
        return;
    }
    const response = await $api.user.fetchCustomerCredit(userId);

    if (response.status !== 'success') {
        setTimeout(() => {
            loading.value = false;
        }, 100);
        return;
    } else {
        setTimeout(() => {
            loading.value = false;
        }, 100);
    }

    creditObject.value = response.data;
};

await getCustomerCredit();

const accountCredit = ref({
    limit: creditObject.value?.limit,
    spent: creditObject.value?.spent,
    available: creditObject.value?.available,
    dueDate: creditObject.value?.dueDate,
    tillDue: creditObject.value?.tillDue,
    term: creditObject.value?.term,
});

const order = ref({
    total: 0,
    subtotal: 0,
    products: orderItems.value,
    discount: {
        value: 0,
        total: 0,
    },
    shippingDetails: {
        address: getShipping(),
        billingAddress: getBilling(),
    },
    paymentDetails: {} as PaymentDetails,
    type: '',
    backorderOption: null,
    deliveryMethod: null,
    smallOrder: null,
});

const deliveryMethod = ref<DeliveryTypesInterface | null>(null);
const backOrderOption = ref<BackorderShippingTypesInterface | null>(null);
const stockOrderOption = ref<StockorderShippingTypesInterface | null>(null);
const smallOrder = ref<SmallOrderChargeInterface | null>(null);
const paymentDetails = ref<PaymentDetails | null>(null);

const isCheckoutDisabled = computed(() => {
  // Check if the necessary conditions are fulfilled
  const hasShippingAddress = !!order.value.shippingDetails.address;
  const hasBillingAddress = !!order.value.shippingDetails.billingAddress;
  const hasShippingPreference = !!deliveryMethod.value;
  const hasPaymentMethod = !!paymentDetails.value && 'type' in paymentDetails.value;

  // If any of the conditions are not met, disable the checkout button
  return !(hasShippingAddress && hasBillingAddress && hasShippingPreference && hasPaymentMethod);
});

watch(
    [order],
    ([_order]) => {
        deliveryMethod.value = _order.deliveryMethod;
        backOrderOption.value = _order.backorderOption;
        stockOrderOption.value = _order.stockorderOption;
        smallOrder.value = _order.smallOrder;
        paymentDetails.value = _order.paymentDetails;
    },
    { deep: true }
);

watch(
    [card],
    ([_card]) => {
        card.value = _card;
    },
    { deep: true }
);

Emitter.on('order-type', async (type: number) => {
    orderType.value = type;
});

Emitter.on('payment-type', async (object: { type: number; selected: boolean }) => {
    paymentType.value.type = object.type;
    paymentType.value.selected = object.selected;
});

Emitter.on('note', async (noteText: string) => {
    note.value = noteText;
});

Emitter.on('delete-product-item', async (object: { id: string }) => {
    setTimeout(() => {
        cartItems.value = cartItems.value.filter((product) => product.id !== object.id);
        // mapCartItems(cartItems.value);
    }, 1000);
});

const checkoutStore = useCheckoutStore();
const { checkout } = storeToRefs(checkoutStore);

const { makeCheckout } = useOrder();

const stopButtonTrigger = ref(true);
watch(
    () => checkout,
    (newVal) => {
        if (newVal && stopButtonTrigger.value) {
            makeCheckout(
                orderType.value,
                cartId.value,
                deliveryMethod.value,
                backOrderOption.value,
                smallOrder.value,
                paymentDetails.value,
                note.value
            );
            stopButtonTrigger.value = false;
        }
    },
    { deep: true }
);

await fetchList();

calculateSubtotal(cartItems.value, order);
calculateDiscount(cartItems.value, order);
</script>
