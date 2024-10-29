<template>
    <p>setup card</p>
    <br />
    <form id="setup-form" class="p-[30px] items-center lg:pt-10 w-1/2" @submit.prevent="handleSubmit">
        <div id="setup-element" />
        <button id="submit" :disabled="isLoading">Save card</button>
    </form>
</template>

<script setup lang="ts">
import { loadStripe, SetupIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';

const { $api } = useNuxtApp();

const isLoading = ref(false);
let stripe: Stripe | null;
let elements: StripeElements;
let setupIntent: SetupIntentResult;
const setupIntentId = ref(null);

onMounted(async () => {
    stripe = await loadStripe(
        'pk_test_51MovuoHH6OAXXqHTJaUf46KvhzKeTRHqN0iohnBKiazdOoYorFeHSYTMtq1Tdd9zK8uNf1BPed3mMbxighKBSDTl002ysjwmrw'
    );

    const fetchSetupIntentResult = await $api.orders.createAndRetrieveSetupIntent();

    if (fetchSetupIntentResult.status !== 'success') {
        return;
    }
    console.log(fetchSetupIntentResult);
    setupIntentId.value = fetchSetupIntentResult.data.value;

    if (!stripe || !setupIntentId.value) {
        return;
    }

    setupIntent = await stripe.retrieveSetupIntent(setupIntentId.value);
    elements = stripe.elements({
        mode: 'setup',
        currency: 'ron',
        payment_method_types: setupIntent.setupIntent?.payment_method_types,
    });

    const card = elements.create('payment', {
        layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false,
        },
        terms: {
            applePay: 'auto',
        },
        fields: {
            billingDetails: {
                name: 'auto',
            },
        },
    });

    card.mount('#setup-element');
});

const handleSubmit = async () => {
    if (isLoading.value || !setupIntentId.value || !stripe) {
        return;
    }

    isLoading.value = true;

    await elements.submit();
    const { error } = await stripe.confirmSetup({
        clientSecret: setupIntentId.value,
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
</script>
