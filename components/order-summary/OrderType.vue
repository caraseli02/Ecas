<template>
    <div class="flex flex-col p-4 rounded-xl bg-[#FFF] items-start shadow-xs gap-4 mb-6">
        <div class="flex flex-col gap-6">
            <h2 class="text-[#222] text-base font-medium leading-6">Order Type</h2>
            <div class="flex flex-row gap-3">
                <div v-if="stockOrder" class="px-3 py-[3px] justify-center flex rounded bg-[#00D39526]">
                    <span class="text-[#006D4D] text-sm font-medium leading-5">Stock Order</span>
                </div>
                <div v-if="backOrder" class="px-3 py-[3px] justify-center flex rounded bg-[#FF8A0026]">
                    <span class="text-[#FF8A00] text-sm font-medium leading-5">Back Order</span>
                </div>
                <div v-if="!stockOrder && !backOrder" class="px-3 py-[3px] justify-center flex rounded bg-[#007FFF26]">
                    <span class="text-[#023F7E] text-sm font-medium leading-5">Mixed Order</span>
                </div>
            </div>
        </div>
        <div class="gap-2 flex flex-col w-full">
            <div class="h-[1px] rounded-lg bg-[#EBEBEB] block"></div>
            <div class="flex flex-col">
                <button @click="expandShippingAndBilling"
                    class="flex flex-row justify-between py-2 group header-transition">
                    <span class="text-base font-medium leading-6 transition duration-300 group-hover:text-[#007FFF]"
                        :class="shippingAndBillingExpanded ? 'text-[#007FFF]' : 'text-[#222]'">Shipping and Billing</span>
                    <ChevronDownIcon class="w-5 h-5 flex-shrink-0 rounded-full transition duration-300 flex"
                        :class="[shippingAndBillingExpanded ? 'rotate-180 text-[#007FFF]' : 'text-gray-300']" />
                </button>
                <Transition name="expand">
                    <OrderSummaryShippingAndBillingSection v-if="shippingAndBillingExpanded" class="item" />
                </Transition>
            </div>
            <div class="h-[1px] rounded-lg bg-[#EBEBEB] block"></div>
            <div class="flex flex-col">
                <button @click="expandShippingPreferences" class="flex flex-row justify-between py-2 group">
                    <span class="text-base font-medium leading-6 transition duration-300 group-hover:text-[#007FFF]"
                        :class="shippingPreferencesExpanded ? 'text-[#007FFF]' : 'text-[#222]'">Shipping Preferences</span>
                    <ChevronDownIcon class="w-5 h-5 flex-shrink-0 rounded-full transition duration-300 flex"
                        :class="[shippingPreferencesExpanded ? 'rotate-180 text-[#007FFF]' : 'text-gray-300']" />
                </button>
                <Transition name="expand">
                    <OrderSummaryShippingPreferencesSection v-if="shippingPreferencesExpanded" class="item" />
                </Transition>
            </div>
            <div class="h-[1px] rounded-lg bg-[#EBEBEB] block"></div>
            <button @click="expandPaymentMethod" class="flex flex-row justify-between py-2 group">
                <span class="text-base font-medium leading-6 transition duration-300 group-hover:text-[#007FFF]"
                    :class="paymentMethodExpanded ? 'text-[#007FFF]' : 'text-[#222]'">Payment Method</span>
                <ChevronDownIcon class="w-5 h-5 flex-shrink-0 rounded-full transition duration-300 flex"
                    :class="[paymentMethodExpanded ? 'rotate-180 text-[#007FFF]' : 'text-gray-300']" />
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import { CartProductsInterface } from '~/types';
import ChevronDownIcon from '@/assets/icons/dashboard/chevron-down.svg';

export default defineComponent({
    name: 'OrderType',
    props: ['items'],
    components: {
        ChevronDownIcon,
    },
    data() {
        return {
            shippingAndBillingExpanded: false,
            shippingPreferencesExpanded: false,
            paymentMethodExpanded: false,
        };
    },
    computed: {
        stockOrder() {
            const stockItems = this.items.filter((item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock >= item.stock);
            return stockItems.length === this.items.length;
        },
        backOrder() {
            const backOrderItems = this.items.filter((item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock === 0);
            return backOrderItems.length === this.items.length;
        },
    },
    methods: {
        expandShippingAndBilling() {
            this.shippingAndBillingExpanded = !this.shippingAndBillingExpanded;
        },
        expandShippingPreferences() {
            this.shippingPreferencesExpanded = !this.shippingPreferencesExpanded;
        },
        expandPaymentMethod() {
            this.paymentMethodExpanded = !this.paymentMethodExpanded;
        },
    },
});
</script>
<style scoped>
.expand-enter-from,
.expand-leave-to {
    /* opacity: 0; */
    transform: scaleY(0) translateY(-10%);
}

.expand-enter-active,
.expand-leave-active {
    transition: all 0.5s ease;
}

.item {
    transform-origin: top;
}

.header-transition {
    transition-property: box-shadow, border-radius;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-delay: 300ms;
}</style>