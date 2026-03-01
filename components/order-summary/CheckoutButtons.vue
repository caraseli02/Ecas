<template>
  <div class="flex flex-col mb-9 gap-4">
    <div class="flex flex-col gap-4">
      <div>
        <button
          class="px-6 flex flex-row items-center justify-center w-full bg-light-500 rounded-lg hover:bg-light-600 transition-colors"
          @click="router.push('/search')"
        >
          <ArrowLeft class="text-slate-500" />
          <div class="p-2">
            <span class="text-slate-500 text-base font-medium leading-7">Continue Shopping</span>
          </div>
        </button>
      </div>
      <div>
        <UiButton
          :disabled="isCheckoutDisabled"
          class="w-full h-auto py-3"
          @click.once="
            checkout = true;
          "
        >
          <ShieldIcon class="text-white" />
          <div class="flex flex-col items-center">
            <span class="text-white text-base font-medium leading-none mb-1">Secure Checkout</span>
            <span
              v-if="isCheckoutDisabled"
              class="text-[10px] text-white/80 font-normal"
            >{{ missingRequirementText }}</span>
          </div>
        </UiButton>
      </div>
    </div>

    <!-- Validation feedback when disabled -->
    <div
      v-if="isCheckoutDisabled"
      class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[13px] text-amber-800"
    >
      <p class="font-semibold mb-1">
        Please complete the following to checkout:
      </p>
      <ul class="list-disc list-inside space-y-0.5">
        <li v-if="!validationStatus.hasShippingAddress">
          Select a shipping address
        </li>
        <li v-if="!validationStatus.hasBillingAddress">
          Select a billing address
        </li>
        <li v-if="!validationStatus.hasShippingPreference">
          Choose a delivery method
        </li>
        <li v-if="!validationStatus.hasPaymentMethod">
          Select a payment method
        </li>
      </ul>
    </div>

    <div class="flex flex-row sm:gap-6 sm:justify-start lg:justify-between lg:gap-0 justify-between">
      <BadgeVisa />
      <BadgeMaster />
      <BadgeApplePay />
      <BadgeGooglePay />
      <BadgeStripe />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ShieldIcon from '@/assets/icons/shield.svg';
import BadgeVisa from '@/assets/icons/badge-visa.svg';
import BadgeMaster from '@/assets/icons/badge-master.svg';
import BadgeApplePay from '@/assets/icons/badge-applepay.svg';
import BadgeGooglePay from '@/assets/icons/badge-googlepay.svg';
import BadgeStripe from '@/assets/icons/badge-stripe.svg';
import { useCheckoutStore } from '~/store/checkout';

const props = defineProps<{
  validationStatus: {
    hasShippingAddress: boolean;
    hasBillingAddress: boolean;
    hasShippingPreference: boolean;
    hasPaymentMethod: boolean;
  };
}>();

const router = useRouter();
const checkoutStore = useCheckoutStore();
const { checkout } = storeToRefs(checkoutStore);

const isCheckoutDisabled = computed(() => {
  return !Object.values(props.validationStatus).every(Boolean);
});

const missingRequirementText = computed(() => {
  if (isCheckoutDisabled.value) {
    const missing = [];
    if (!props.validationStatus.hasShippingAddress) missing.push('Address');
    if (!props.validationStatus.hasShippingPreference) missing.push('Shipping');
    if (!props.validationStatus.hasPaymentMethod) missing.push('Payment');
    return `Missing: ${missing.join(', ')}`;
  }
  return '';
});
</script>
