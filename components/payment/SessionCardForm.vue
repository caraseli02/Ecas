<template>
    <div class="relative min-h-screen md:w-full">
        <UiSkeleton v-show="showSkeletonLoader" class="w-full h-full absolute inset-0" />
        <form id="payment-form" class="p-[30px] items-center lg:pt-10 w-full md:w-1/2 mx-auto" @submit.prevent="handleSubmit">
            <div id="payment-element" />
            <div v-if="!showSkeletonLoader" class="flex justify-end items-center mt-2">
                <UiButton id="submit" :disabled="isLoading">Pay now</UiButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { loadStripe, PaymentIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';
import { useCartStore } from '~/store/cartStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const { getOrderClientSecret } = storeToRefs(cartStore);
const isLoading = ref(false);
const orderId = ref<string>();

let stripe: Stripe | null;
let elements: StripeElements;
let paymentIntent: PaymentIntentResult;

const showSkeletonLoader = ref(false);
onMounted(async () => {
    showSkeletonLoader.value = true;
    orderId.value = <string>route.query.id;

    stripe = await loadStripe(
        'pk_test_51MovuoHH6OAXXqHTJaUf46KvhzKeTRHqN0iohnBKiazdOoYorFeHSYTMtq1Tdd9zK8uNf1BPed3mMbxighKBSDTl002ysjwmrw'
    );

    if (!stripe || !getOrderClientSecret.value) {
        return null;
    }

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
    setTimeout(() => {
        showSkeletonLoader.value = false;
    }, 1000);
});

const handleSubmit = async () => {
    if (isLoading.value || !getOrderClientSecret.value || !stripe) {
        return;
    }

    isLoading.value = true;

    await elements.submit();
    const tempClientSecret = getOrderClientSecret.value;

    cartStore.emptyOrderClientSecret();
    cartStore.emptyPreviousCheckoutError();

    const result = await stripe.confirmPayment({
        redirect: 'if_required',
        clientSecret: tempClientSecret,
        elements,
    });

    if (result.error) {
        cartStore.setPreviousCheckoutError(result.error);
        await router.push({ path: '/checkout/fail', query: {} });
    } else {
        await router.push({ path: `/order-summary/${orderId.value}` });
    }

    isLoading.value = false;
};
</script>
