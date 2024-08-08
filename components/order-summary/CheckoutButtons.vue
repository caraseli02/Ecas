<template>
    <div class="flex flex-col mb-9 gap-9">
        <div class="flex flex-col gap-4">
            <div>
                <button class="px-6 flex flex-row items-center justify-center w-full bg-light-500 rounded-lg">
                    <ArrowLeft class="text-slate-500" />
                    <div class="p-2">
                        <span class="text-slate-500 text-base font-medium leading-7">Continue Shopping</span>
                    </div>
                </button>
            </div>
            <div>
                <button
                    :disabled="checkout"
                    class="px-6 flex flex-row items-center justify-center w-full bg-blue-500 rounded-lg"
                    @click.once="
                        checkout = true;
                        stopButtonTrigger();
                    "
                >
                    <ShieldIcon class="text-white" />
                    <div class="p-2">
                        <span class="text-white text-base font-medium leading-7">Secure Checkout</span>
                    </div>
                </button>
            </div>
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
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ShieldIcon from '@/assets/icons/shield.svg';
import BadgeVisa from '@/assets/icons/badge-visa.svg';
import BadgeMaster from '@/assets/icons/badge-master.svg';
import BadgeApplePay from '@/assets/icons/badge-applepay.svg';
import BadgeGooglePay from '@/assets/icons/badge-googlepay.svg';
import BadgeStripe from '@/assets/icons/badge-stripe.svg';
import { useCheckoutStore } from '~/store/checkout';
import { storeToRefs } from 'pinia';

const stopButtonTrigger = async () => {
    console.log('Button clicked');
};

const checkoutStore = useCheckoutStore();
const { checkout } = storeToRefs(checkoutStore);
</script>