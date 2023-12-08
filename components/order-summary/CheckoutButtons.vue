<template>
    <div class="flex flex-col mb-9 gap-9">
        <div class="flex flex-col gap-4">
            <div>
                <button class="px-6 flex flex-row items-center justify-center w-full bg-[#EBEBEB] rounded-lg">
                    <ArrowLeft class="text-[#5E6278]"/>
                    <div class="p-2">
                        <span class="text-[#5E6278] text-base font-medium leading-7">Continue Shopping</span>
                    </div>
                </button>
            </div>
            <div>
                <button class="px-6 flex flex-row items-center justify-center w-full bg-[#007FFF] rounded-lg">
                    <ShieldIcon class="text-[#FFFFFF]"/>
                    <div class="p-2">
                        <span class="text-[#FFFFFF] text-base font-medium leading-7">Secure Checkout</span>
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
<script lang="ts">
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ShieldIcon from '@/assets/icons/shield.svg';
import BadgeVisa from '@/assets/icons/badge-visa.svg';
import BadgeMaster from '@/assets/icons/badge-master.svg';
import BadgeApplePay from '@/assets/icons/badge-applepay.svg';
import BadgeGooglePay from '@/assets/icons/badge-googlepay.svg';
import BadgeStripe from '@/assets/icons/badge-stripe.svg';

export default defineComponent({
    name: 'CheckoutButtons',
    components: {
        ArrowLeft,
        ShieldIcon,
        BadgeVisa,
        BadgeMaster,
        BadgeApplePay,
        BadgeGooglePay,
        BadgeStripe,
    },
});
</script>