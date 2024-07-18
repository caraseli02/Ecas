<template>
    <form id="payment-form" class="p-[30px] items-center lg:pt-10 w-1/2" @submit.prevent="handleSubmit">
        <div id="payment-element" />
        <button id="submit" :disabled="isLoading">Pay now</button>
    </form>
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
    console.log(route);
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
    console.log(paymentIntent);
    const card = elements.create('payment', {
        layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false,
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

    const { error } = await stripe.confirmPayment({
        clientSecret: tempClientSecret,
        elements,
        confirmParams: {
            return_url: `${window.location.origin}/order-summary/${orderId.value}`,
        },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
        console.log(error.message);
        cartStore.setPreviousCheckoutError(error);
        await router.push({ path: '/checkout/fail', query: {} });
    } else {
        await router.push({ path: '/checkout/success', query: {} });
    }
    console.log(error);
    isLoading.value = false;
};
</script>
