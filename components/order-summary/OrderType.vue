<template>
  <div class="flex flex-col p-4 xl:p-6 rounded-xl bg-[#FFF] items-start shadow-xs gap-4 mb-6">
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
        <button
            class="flex flex-row justify-between py-2 group header-transition"
            @click="expandShippingAndBilling">
                    <span
                        class="text-base font-medium leading-6 transition duration-300 group-hover:text-[#007FFF]"
                        :class="shippingAndBillingExpanded ? 'text-[#007FFF]' : 'text-[#222]'">Shipping and Billing</span>
          <div class="flex flex-row gap-6">
            <div v-if="shippingAndBillingMissingInfoWarning" class="flex flex-row gap-2 items-center">
              <Tooltip theme="black" position="top" class="flex sm:hidden lg:flex">
                <WarningErrorYellow/>
                <template #content>
                  <span class="capitalize">Missing Info</span>
                </template>
              </Tooltip>
              <WarningErrorYellow class="hidden sm:flex lg:hidden"/>
              <span class="text-[#5E6278] text-xs font-medium leading-4 hidden sm:flex lg:hidden">Missing
                                Info</span>
            </div>
            <ChevronDownIcon
                class="w-5 h-5 flex-shrink-0 rounded-full transition duration-300 flex"
                :class="[shippingAndBillingExpanded ? 'rotate-180 text-[#007FFF]' : 'text-gray-300']"/>
          </div>
        </button>
        <Transition name="expand">
          <OrderSummaryShippingAndBillingSection v-if="shippingAndBillingExpanded" :order="order" class="item"/>
        </Transition>
      </div>
      <div class="h-[1px] rounded-lg bg-[#EBEBEB] block"></div>
      <div class="flex flex-col">
        <button class="flex flex-row justify-between py-2 group" @click="expandShippingPreferences">
                    <span
                        class="text-base font-medium leading-6 transition duration-300 group-hover:text-[#007FFF]"
                        :class="shippingPreferencesExpanded ? 'text-[#007FFF]' : 'text-[#222]'">Shipping Preferences</span>
          <div class="flex flex-row gap-6">
            <div
                v-if="!shippingPreferencesExpanded && order.backorderOption === 0 && mixedOrBackOrder"
                class="flex flex-row gap-2 items-center">
              <Tooltip theme="black" position="top" class="flex sm:hidden lg:flex">
                <WarningErrorHuge/>
                <template #content>
                  <span class="capitalize">Mandatory</span>
                </template>
              </Tooltip>
              <WarningErrorHuge class="hidden sm:flex lg:hidden"/>
              <span
                  class="text-[#5E6278] text-xs font-medium leading-4 hidden sm:flex lg:hidden">Mandatory</span>
            </div>
            <ChevronDownIcon
                class="w-5 h-5 flex-shrink-0 rounded-full transition duration-300 flex"
                :class="[shippingPreferencesExpanded ? 'rotate-180 text-[#007FFF]' : 'text-gray-300']"/>
          </div>
        </button>
        <Transition name="expand">
          <OrderSummaryShippingPreferencesSection
              v-if="shippingPreferencesExpanded" :order="order"
              class="item"/>
        </Transition>
      </div>
      <div class="h-[1px] rounded-lg bg-[#EBEBEB] block"></div>
      <button class="flex flex-row justify-between py-2 group" @click="expandPaymentMethod">
                <span
                    class="text-base font-medium leading-6 transition duration-300 group-hover:text-[#007FFF]"
                    :class="paymentMethodExpanded ? 'text-[#007FFF]' : 'text-[#222]'">Payment Method</span>
        <div class="flex flex-row gap-6">
          <div v-if="paymentMethodWarning" class="flex flex-row gap-2 items-center">
            <Tooltip theme="black" position="top" class="flex sm:hidden lg:flex">
              <WarningErrorHuge/>
              <template #content>
                <span class="capitalize">Mandatory</span>
              </template>
            </Tooltip>
            <WarningErrorHuge class="hidden sm:flex lg:hidden"/>
            <span class="text-[#5E6278] text-xs font-medium leading-4 hidden sm:flex lg:hidden">Mandatory</span>
          </div>
          <ChevronDownIcon
              class="w-5 h-5 flex-shrink-0 rounded-full transition duration-300 flex"
              :class="[paymentMethodExpanded ? 'rotate-180 text-[#007FFF]' : 'text-gray-300']"/>
        </div>
      </button>
      <Transition name="expand">
        <OrderSummaryPaymentMethodSection
            v-if="paymentMethodExpanded" :order="order" :account-credit="accountCredit"
            class="item"/>
      </Transition>
    </div>
  </div>
</template>
<script lang="ts">
import {CartProductsInterface, OrderInterface} from '~/types';
import ChevronDownIcon from '@/assets/icons/dashboard/chevron-down.svg';
import WarningErrorYellow from '@/assets/icons/warning-error-yellow.svg';
import WarningErrorHuge from '@/assets/icons/warning-error-huge.svg';
import Tooltip from '~/components/global/Tooltip.vue';
import {CustomerCreditInterface} from '~/types/auth/account-settings';
import Emitter from 'tiny-emitter/instance.js';

export default defineComponent({
  name: 'OrderType',
  components: {
    ChevronDownIcon,
    WarningErrorYellow,
    Tooltip,
    WarningErrorHuge,
  },
  props: {
    items: {
      type: Array as PropType<CartProductsInterface[]>,
      required: true,
    },
    accountCredit: {
      type: Object as PropType<CustomerCreditInterface>,
      required: true,
    },
    order: {
      type: Object as PropType<OrderInterface>,
      required: true,
    },
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
    orderType() {
      if (this.stockOrder) {
        Emitter.emit('order-type', 0)
        return 0;
      } else if (this.backOrder) {
        Emitter.emit('order-type', 1)
        return 1;
      } else {
        Emitter.emit('order-type', 2)
        return 2;
      }
    },
    shippingAndBillingMissingInfoWarning() {
      if (this.order.shippingDetails.address && this.order.shippingDetails.billingAddress) {
        return !this.order.shippingDetails?.address?.name1 || !this.order.shippingDetails?.address?.city || !this.order.shippingDetails?.address?.region || !this.order.shippingDetails?.address?.postcode || !this.order.shippingDetails?.address?.country || !this.order.shippingDetails?.billingAddress?.name1 || !this.order.shippingDetails?.billingAddress?.city || !this.order.shippingDetails?.billingAddress?.region || !this.order.shippingDetails?.billingAddress?.postcode || !this.order.shippingDetails?.billingAddress?.country;
      }
    },
    mixedOrBackOrder() {
      return this.order.type === 1 || this.order.type === 2;
    },
    paymentMethodWarning() {
      return this.order.paymentDetails?.type === null;
    },
  },
  watch: {
    orderType() {
      this.order.type = this.orderType;
    },
  },
  created() {
    this.order.type = this.orderType;
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
  opacity: 0.5;
  max-height: 0;
  overflow: hidden;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 1000px; /* Adjust this value as needed */
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.5s cubic-bezier(0, 0.3, 0.6, 1), opacity 0.5s ease;
}

.item {
  transform-origin: top;
}

.header-transition {
  transition-property: box-shadow, border-radius, opacity;
  transition-timing-function: cubic-bezier(0, 0.3, 0.6, 1);
  transition-duration: 150ms;
}
</style>