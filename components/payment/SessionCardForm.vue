<template>
    <div class="flex justify-center flex-col items-center bg-gray-100">
        <div class="align-center p-8 rounded-lg w-full">
            <p class="text-center text-2xl font-bold mb-6">Setup Card</p>
            <form id="payment-form" class="p-[30px] items-center lg:pt-10 w-1/2" @submit.prevent="handleSubmit">
                <div id="payment-element" />
                <button id="submit" :disabled="isLoading" class="flex items-center rounded-lg bg-gray-100 px-6 py-3">
                    <span class="leading-normal text-slate-500 font-medium mr-2"> Pay now </span>
                </button>
            </form>
        </div>
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

onMounted(async () => {
    orderId.value = <string>route.query.id;

    stripe = await loadStripe(
        'pk_test_51MovuoHH6OAXXqHTJaUf46KvhzKeTRHqN0iohnBKiazdOoYorFeHSYTMtq1Tdd9zK8uNf1BPed3mMbxighKBSDTl002ysjwmrw'
    );

    if (!stripe || !getOrderClientSecret.value) {
        return;
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
