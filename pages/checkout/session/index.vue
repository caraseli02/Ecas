<template>
    <form id="payment-form" class="p-[30px] items-center lg:pt-10 w-1/2" @submit.prevent="handleSubmit">
        <div id="payment-element" />
        <button id="submit" :disabled="isLoading">Pay now</button>
    </form>
    <div id="card-list" />
</template>

<script setup lang="ts">
import { loadStripe, PaymentIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';
import { useCartStore } from '~/store/cartStore';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { getOrderClientSecret } = storeToRefs(cartStore);

const isLoading = ref(false);

let stripe: Stripe;
let elements: StripeElements;
let paymentIntent: PaymentIntentResult;

onMounted(async () => {
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
    // await stripe.

    const card = elements.create('payment', {
        layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false,
        },
    });

    card.mount('#payment-element');
});

const handleSubmit = async () => {
    if (isLoading.value || !getOrderClientSecret.value) {
        return;
    }

    isLoading.value = true;

    await elements.submit();
    const { error } = await stripe.confirmPayment({
        clientSecret: getOrderClientSecret.value,
        elements,
        confirmParams: {
            return_url: `${window.location.origin}/checkout/success`,
        },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
        console.log(error.message);
    }
    console.log(error);
    isLoading.value = false;
};

// Fetch Checkout Session and retrieve the client secret
// async function initialize() {
//     const response = await fetch('/create-checkout-session', {
//         method: 'POST',
//     });
//
//     const { clientSecret } = await response.json();
//
//     const checkout = await stripe.initEmbeddedCheckout({
//         clientSecret,
//     });
//
//     // Mount Checkout
//     checkout.mount('#checkout');
// }
</script>