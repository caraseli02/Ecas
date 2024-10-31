<template>
    <div class="pt-[30px] lg:pt-10">
        <div class="grid grid-cols-1">
            <div class="container px-4">
                <OrderSummaryHeader />
                <div class="gap-6 xl:grid xl:grid-cols-[1fr,392px]">
                    <div class="flex flex-col gap-9 max-w-[992px]">
                        <OrderSummaryBackOrderWarning v-if="showWarning" />
                        <OrderSummaryTable
                            :loading="loading"
                            @update-subtotal="calculateSubtotal($event, order)"
                            @delete-selected="deleteSelected"
                        />
                        <div class="hidden lg:flex flex-col">
                            <OrderSummarySimilarProducts :loading="loading" />
                            <OrderSummaryBannerImageCard class="hidden xl:flex" />
                        </div>
                    </div>
                    <div class="flex flex-col justify-start">
                        <OrderStockType
                            v-if="shippingPreferences"
                            :items="cartItems"
                            :account-credit="accountCredit"
                            :order="order"
                            :shipping-preferences="shippingPreferences"
                            :general-settings="generalSettings"
                            :cards="cards"
                            :card="card"
                            :is-new-card-selected="isNewCardSelected"
                            @update-payment-details="order.paymentDetails = $event"
                        />
                        <OrderSummaryNoteSection />
                        <OrderSummary :order="order" :general-settings="generalSettings" />
                        <OrderSummaryCheckoutButtons :is-checkout-disabled="isCheckoutDisabled" />
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

// Types and Interfaces
import { CartProductsInterface } from '~/model/cart/response/cart.interface';
import { PaymentDetails } from '~/types';
import { BackorderShippingTypesInterface, SmallOrderChargeInterface } from '~/types/general-settings/general-settings';

// Composables
import { useUser } from '~/composables/useUser';
import { useCart } from '~/composables/useCart';
import { usePaymentCards } from '~/composables/usePaymentCards';
import { useOrder } from '~/composables/useOrder';

// Stores
import { useAuthStore } from '~/store/authStore';
import { useCheckoutStore } from '~/store/checkout';
import { storeToRefs } from 'pinia';

// Utilities
import Emitter from 'tiny-emitter/instance.js';
import { ShippingOrderPricingOption, ShippingOrderPricingResponse } from '~/types/order-summary/shipping-services';

// Setup and Initialization
const router = useRouter();
const { $api } = useNuxtApp();
useHead({ title: 'Order Summary' });

// User Information
const { user, getShipping, getBilling } = useUser();
const userId = computed(() => user.value?.firebaseId);

// Cart Management
const { cartId, cartItems, fetchList, calculateSubtotal, calculateDiscount, showWarning } = useCart();

const orderItems = computed(() => {
    return cartItems.value.map((item) => {
        const { selected, liked, ...rest } = item;
        return rest as CartProductsInterface;
    });
});

// Payment Processing
const { card, cards, isNewCardSelected, fetchCards } = usePaymentCards();
const paymentDetails = ref<PaymentDetails | null>(null);
const paymentType = ref({ type: 0, selected: false });

// Order Processing
const { makeCheckout } = useOrder();
const orderType = ref(0);
const note = ref('');

const order = ref({
    total: 0,
    subtotal: 0,
    products: orderItems.value,
    discount: { value: 0, total: 0 },
    shippingDetails: {
        address: getShipping(),
        billingAddress: getBilling(),
    },
    paymentDetails: {} as PaymentDetails,
    type: '',
    backorderOption: null as BackorderShippingTypesInterface | null,
    deliveryMethod: null as ShippingOrderPricingOption | null,
    smallOrder: null as SmallOrderChargeInterface | null,
});

// General Settings
const authStore = useAuthStore();
const { getGeneralSettings } = storeToRefs(authStore);
const generalSettings = computed(() => getGeneralSettings.value);

// Account Credit
const loading = ref(true);
const accountCredit = ref({
    limit: 0,
    spent: 0,
    available: 0,
    dueDate: '',
    tillDue: '',
    term: '',
});

const getCustomerCredit = async () => {
    if (!userId.value) return;

    try {
        const response = await $api.user.fetchCustomerCredit(userId.value);

        if (response.status === 'success') {
            const creditData = response.data;
            accountCredit.value = {
                limit: creditData.limit,
                spent: creditData.spent,
                available: creditData.available,
                dueDate: creditData.dueDate,
                tillDue: creditData.tillDue,
                term: creditData.term,
            };
        }
    } catch (error) {
        console.error('Failed to fetch customer credit:', error);
    } finally {
        loading.value = false;
    }
};

const fetchShippingPrices = async () => {
    return (await $api.orders.getShippingPricesForOrder(order.value)).data as ShippingOrderPricingResponse;
};

const shippingPreferences = ref(null as ShippingOrderPricingResponse | null);

// Checkout Control
const checkoutStore = useCheckoutStore();
const { checkout } = storeToRefs(checkoutStore);
const stopButtonTrigger = ref(true);

const isCheckoutDisabled = computed(() => {
    const hasShippingAddress = !!order.value.shippingDetails.address;
    const hasBillingAddress = !!order.value.shippingDetails.billingAddress;
    const hasShippingPreference = !!order.value.deliveryMethod;
    const hasPaymentMethod = !!order.value.paymentDetails && 'type' in order.value.paymentDetails;

    return !(hasShippingAddress && hasBillingAddress && hasShippingPreference && hasPaymentMethod);
});

watch(checkout, (newVal) => {
    if (newVal && stopButtonTrigger.value) {
        makeCheckout(
            orderType.value,
            cartId.value,
            order.value.deliveryMethod,
            order.value.backorderOption,
            order.value.smallOrder,
            order.value.paymentDetails,
            note.value
        );
        stopButtonTrigger.value = false;
    }
});

// Event Handling
Emitter.on('order-type', (type: number) => {
    orderType.value = type;
});

Emitter.on('payment-type', (object: { type: number; selected: boolean }) => {
    paymentType.value = { ...object };
});

Emitter.on('note', (noteText: string) => {
    note.value = noteText;
});

Emitter.on('delete-product-item', (object: { id: string }) => {
    cartItems.value = cartItems.value.filter((product) => product.id !== object.id);
});

// Watches and Reactions
watch(
    cartItems,
    () => {
        calculateSubtotal(cartItems.value, order);
        calculateDiscount(cartItems.value, order);
        order.value.products = orderItems.value;
    },
    { deep: true }
);

// Initialization
onMounted(async () => {
    await fetchCards(); // Fetch user's payment cards
    await getCustomerCredit(); // Fetch customer credit information
    await fetchList(); // Fetch cart items
    shippingPreferences.value = await fetchShippingPrices(); // Fetch shipping prices

    // Initial calculations
    calculateSubtotal(cartItems.value, order);
    calculateDiscount(cartItems.value, order);
    order.value.products = orderItems.value;
    loading.value = false;
});
</script>
