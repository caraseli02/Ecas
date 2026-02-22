<template>
    <div class="relative min-h-screen md:w-full">
        <UiSkeleton v-show="showSkeletonLoader" class="absolute inset-0 h-full w-full" />

        <div v-if="initError" class="container flex min-h-[60vh] flex-col items-center justify-center gap-4">
            <div class="text-center">
                <h1 class="text-xl font-semibold text-foreground">Payment session unavailable</h1>
                <p class="mt-1 text-sm text-muted-foreground">
                    This payment session may have expired or wasn’t created. Please return to your order and try again.
                </p>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-2">
                <UiButton variant="default" @click="goToOrderSummary">Back to order summary</UiButton>
                <UiButton variant="outline" @click="goHome">Back home</UiButton>
            </div>
        </div>

        <form
            v-else
            id="payment-form"
            class="mx-auto w-full max-w-xl items-center p-[30px] md:w-1/2 lg:pt-10"
            @submit.prevent="handleSubmit"
        >
            <div id="payment-element" />
            <div v-if="!showSkeletonLoader" class="mt-2 flex items-center justify-end">
                <UiButton id="submit" :disabled="isLoading">Pay now</UiButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import type { PaymentIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';
import { useCartStore } from '~/store/cartStore';
import { storeToRefs } from 'pinia';

const { $api } = useNuxtApp();

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const cartStore = useCartStore();
const { getOrderClientSecret } = storeToRefs(cartStore);
const isLoading = ref(false);
const orderId = ref<string>();
const initError = ref(false);

let stripe: Stripe | null;
let elements: StripeElements;
let paymentIntent: PaymentIntentResult;
let submitAttempt = false;

const showSkeletonLoader = ref(false);
onMounted(async () => {
    showSkeletonLoader.value = true;
    orderId.value = <string>route.query.id;

    stripe = await loadStripe(config.public.stripePublishableKey as string);

    if (!stripe || !getOrderClientSecret.value) {
        initError.value = true;
        showSkeletonLoader.value = false;
        return;
    }

    try {
        paymentIntent = await stripe.retrievePaymentIntent(getOrderClientSecret.value);
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
    } catch {
        initError.value = true;
    } finally {
        showSkeletonLoader.value = false;
    }
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
            return_url: `${window.location.origin}/order-summary/${orderId.value}?new=true`,
        },
        clientSecret: tempClientSecret,
        elements,
    });

    if (result.error) {
        cartStore.setPreviousCheckoutError(result.error);
        await router.push({ path: `/checkout/fail`, query: { id: orderId.value } });
        isLoading.value = false;
        return;
    }

    await router.push({ path: `/order-summary/${orderId.value}`, query: { new: 'true' } });
    cartStore.emptyOrderClientSecret();

    // if (result.paymentIntent.status === 'requires_action' && result.paymentIntent.next_action?.redirect_to_url?.url) {
    //     window.location.href = result.paymentIntent.next_action.redirect_to_url.url;
    // } else {
    //     await router.push({ path: `/order-summary/${orderId.value}` });
    // }
};

onBeforeRouteLeave(async () => {
    if (!submitAttempt && !!getOrderClientSecret.value && orderId.value) {
        await $api.orders.cancelOrder(orderId.value);

        cartStore.emptyPreviousCheckoutError();
        cartStore.emptyOrderClientSecret();
    }
});

const goHome = async () => {
    await router.push('/');
};

const goToOrderSummary = async () => {
    if (orderId.value) {
        await router.push(`/order-summary/${orderId.value}`);
        return;
    }

    await router.push('/order-summary');
};
</script>
