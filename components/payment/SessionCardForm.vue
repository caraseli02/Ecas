<template>
    <div v-if="getOrderClientSecret" class="relative min-h-screen md:w-full">
        <UiSkeleton v-show="showSkeletonLoader" class="w-full h-full absolute inset-0" />
        <form id="payment-form" class="p-[30px] items-center lg:pt-10 w-full md:w-1/2 mx-auto" @submit.prevent="handleSubmit">
            <div id="payment-element" />
            <div v-if="!showSkeletonLoader" class="flex justify-end items-center mt-2">
                <UiButton id="submit" :disabled="isLoading">Pay now</UiButton>
            </div>
        </form>
    </div>
    <div v-else>
        <p>No data available</p>
    </div>
</template>

<script setup lang="ts">
import { loadStripe, PaymentIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';
import { useCartStore } from '~/store/cartStore';
import { storeToRefs } from 'pinia';

const { $api } = useNuxtApp();

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const { getOrderClientSecret } = storeToRefs(cartStore);
const isLoading = ref(false);
const orderId = ref<string>();

let stripe: Stripe | null;
let elements: StripeElements;
let paymentIntent: PaymentIntentResult;
let submitAttempt = false;

const showSkeletonLoader = ref(false);
onMounted(async () => {
    showSkeletonLoader.value = true;
    orderId.value = <string>route.query.id;

    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

    if (!stripe || !getOrderClientSecret.value) {
        return null;
    }

    console.log('Retrieving payment intent', getOrderClientSecret.value);
    paymentIntent = await stripe.retrievePaymentIntent(getOrderClientSecret.value);
    console.log(paymentIntent);
    elements = stripe.elements({
        mode: 'payment',
        amount: paymentIntent.paymentIntent?.amount,
        currency: paymentIntent.paymentIntent?.currency,
        setup_future_usage: paymentIntent.paymentIntent?.setup_future_usage,
        payment_method_types: paymentIntent.paymentIntent?.payment_method_types,
    });

    const card = elements.create('payment', {
        layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false,
        },
        wallets: {
            applePay: 'auto',
        },
        fields: {
            billingDetails: {
                name: 'auto',
            },
        },
    });

    card.mount('#payment-element');
    setTimeout(() => {
        showSkeletonLoader.value = false;
    }, 1000);
});

const handleSubmit = async () => {
    submitAttempt = true;
    if (isLoading.value || !getOrderClientSecret.value || !stripe) {
        return;
    }

    isLoading.value = true;

    await elements.submit();
    const tempClientSecret = getOrderClientSecret.value;

    cartStore.emptyPreviousCheckoutError();

    const result = await stripe.confirmPayment({
        redirect: 'if_required',
        confirmParams: {
            return_url: `${window.location.origin}/order-summary/${orderId.value}`,
        },
        clientSecret: tempClientSecret,
        elements,
    });

    if (result.error) {
        console.log('error', result.error);
        cartStore.setPreviousCheckoutError(result.error);
        await router.push({ path: `/checkout/fail`, query: { id: orderId.value } });
        isLoading.value = false;
        return;
    }

    await router.push({ path: `/order-summary/${orderId.value}` });
    cartStore.emptyOrderClientSecret();

    // if (result.paymentIntent.status === 'requires_action' && result.paymentIntent.next_action?.redirect_to_url?.url) {
    //     window.location.href = result.paymentIntent.next_action.redirect_to_url.url;
    // } else {
    //     await router.push({ path: `/order-summary/${orderId.value}` });
    // }
};

onBeforeRouteLeave(async () => {
    console.log('Leaving session page');

    if (!submitAttempt && orderId.value) {
        console.log('Cancelling order. Payment not attempted');
        await $api.orders.cancelOrder(orderId.value);

        cartStore.emptyPreviousCheckoutError();
        cartStore.emptyOrderClientSecret();
    }
});
</script>
