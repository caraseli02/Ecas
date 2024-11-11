<template>
    <div class="relative min-h-[50vh] md:w-full">
        <UiSkeleton v-show="showSkeletonLoader" class="w-full h-full absolute inset-0" />
        <form id="payment-form" class="p-4 md:p-[30px] items-center lg:pt-10 w-full max-w-[500px] mx-auto" @submit.prevent="handleSubmit">
            <div id="setup-element" />
            <div v-if="!showSkeletonLoader" class="flex justify-end items-center mt-2">
                <UiButton id="submit" :disabled="isLoading">Save now</UiButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { loadStripe, SetupIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';

const { $api } = useNuxtApp();

const isLoading = ref(false);
let stripe: Stripe | null;
let elements: StripeElements;
let setupIntent: SetupIntentResult;
const setupIntentId = ref(null);

const showSkeletonLoader = ref(false);
const setupElementHeight = ref(0); // Define setupElementHeight here
let resizeObserver: ResizeObserver | null = null; // Declare resizeObserver outside onMounted

onMounted(async () => {
    const config = useRuntimeConfig();

    showSkeletonLoader.value = true;
    stripe = await loadStripe(config.public.stripePublishableKey as string);

    const fetchSetupIntentResult = await $api.orders.createAndRetrieveSetupIntent();

    if (fetchSetupIntentResult.status !== 'success') {
        return;
    }

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

    await card.mount('#setup-element');
    showSkeletonLoader.value = false;

    const setupElement = document.getElementById('setup-element');
    if (setupElement) {
        resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setupElementHeight.value = entry.contentRect.height;
                if (setupElementHeight.value > 500) {
                    showSkeletonLoader.value = false;
                    resizeObserver?.disconnect(); // Stop observing once the condition is met
                }
            }
        });

        resizeObserver.observe(setupElement);
    }
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
            return_url: `${window.location.origin}/dashboard/client`,
        },
    });

    if (error?.type === 'card_error' || error?.type === 'validation_error') {
        console.log(error.message);
    }
    console.log(error);
    isLoading.value = false;
};

onBeforeUnmount(() => {
    // Clean up the observer on component unmount
    resizeObserver?.disconnect();
});
</script>
