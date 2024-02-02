<template>
  <div class="flex flex-col p-4 xl:p-6 rounded-xl bg-[#FFF] items-start shadow-xs gap-4 mb-6">
    <div class="flex flex-col gap-6">
      <h2 class="text-neutral-700 text-base font-medium leading-6">Order Type</h2>
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
        <button class="flex flex-row justify-between py-2 group header-transition" @click="expandShippingAndBilling">
                    <span
                        class="text-base font-medium leading-6 transition duration-300 group-hover:text-[#007FFF]"
                        :class="shippingAndBillingExpanded ? 'text-[#007FFF]' : 'text-neutral-700'"
                    >Shipping and Billing</span
                    >
          <div class="flex flex-row gap-6">
            <div v-if="shippingAndBillingMissingInfoWarning" class="flex flex-row gap-2 items-center">
              <Tooltip theme="black" position="top" class="flex sm:hidden lg:flex">
                <WarningErrorYellow/>
                <template #content>
                  <span class="capitalize">Missing Info</span>
                </template>
              </Tooltip>
              <WarningErrorYellow class="hidden sm:flex lg:hidden"/>
              <span class="text-[#5E6278] text-xs font-medium leading-4 hidden sm:flex lg:hidden">Missing Info</span>
            </div>
            <ChevronDownIcon
                class="w-5 h-5 flex-shrink-0 rounded-full transition duration-300 flex"
                :class="[shippingAndBillingExpanded ? 'rotate-180 text-[#007FFF]' : 'text-slate-500']"
            />
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
                        :class="shippingPreferencesExpanded ? 'text-[#007FFF]' : 'text-neutral-700'"
                    >Shipping Preferences</span
                    >
          <div class="flex flex-row gap-6">
            <div
                v-if="!shippingPreferencesExpanded && order.backorderOption && mixedOrBackOrder"
                class="flex flex-row gap-2 items-center"
            >
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
                :class="[shippingPreferencesExpanded ? 'rotate-180 text-[#007FFF]' : 'text-slate-500']"
            />
          </div>
        </button>
        <Transition name="expand">
          <OrderSummaryShippingPreferencesSection
              v-if="shippingPreferencesExpanded"
              :order="order"
              class="item"
              :general-settings="generalSettings"
              @selectBackorderPreference="selectBackorderPreference"
          />
        </Transition>
      </div>
      <div class="h-[1px] rounded-lg bg-[#EBEBEB] block"></div>
      <button class="flex flex-row justify-between py-2 group" @click="expandPaymentMethod">
                <span
                    class="text-base font-medium leading-6 transition duration-300 group-hover:text-[#007FFF]"
                    :class="paymentMethodExpanded ? 'text-[#007FFF]' : 'text-neutral-700'"
                >Payment Method</span
                >
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
              :class="[paymentMethodExpanded ? 'rotate-180 text-[#007FFF]' : 'text-slate-500']"
          />
        </div>
      </button>
      <Transition name="expand">
        <OrderSummaryPaymentMethodSection
            v-if="paymentMethodExpanded"
            :order="order"
            :account-credit="accountCredit"
            :card="card"
            :cards="cards"
            :is-new-card-selected="isNewCardSelected"
            class="item"
        />
      </Transition>
      <AppModal v-model="showCardsModal">
        <OrderSummaryPaymentModal
            :cards="cards"
            :order="order"
            :card="card"
            :is-new-card-selected="isNewCardSelected"
            @change-is-new-card-selected="isNewCardSelected = $event"
        />
      </AppModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {CartProductsInterface, OrderInterface} from '~/types';
import ChevronDownIcon from '@/assets/icons/dashboard/chevron-down.svg';
import WarningErrorYellow from '@/assets/icons/warning-error-yellow.svg';
import WarningErrorHuge from '@/assets/icons/warning-error-huge.svg';
import {CustomerCreditInterface} from '~/types/auth/account-settings';
import Emitter from 'tiny-emitter/instance.js';
import {useAuthStore} from '~/store/authStore';
import {usePaymentStore} from '~/store/paymentStore';
import {storeToRefs} from 'pinia';

const props = defineProps<{
  items: CartProductsInterface[];
  accountCredit: CustomerCreditInterface;
  order: OrderInterface;
  cards: any;
  card: any;
}>();

const isNewCardSelected = ref(false);

const shippingAndBillingExpanded = ref(false);
const shippingPreferencesExpanded = ref(false);
const paymentMethodExpanded = ref(false);

const generalSettings = useAuthStore().generalSettings;

const stockOrder = computed(() => {
  const stockItems = props.items.filter(
      (item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock >= item.stock
  );
  return stockItems.length === props.items.length;
});

const backOrder = computed(() => {
  const backOrderItems = props.items.filter(
      (item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock === 0
  );
  return backOrderItems.length === props.items.length;
});

const orderType = computed(() => {
  if (stockOrder.value) {
    Emitter.emit('order-type', 0);
    return 0;
  } else if (backOrder.value) {
    Emitter.emit('order-type', 1);
    return 1;
  } else {
    Emitter.emit('order-type', 2);
    return 2;
  }
});

const shippingAndBillingMissingInfoWarning = computed(() => {
  if (props.order.shippingDetails?.address && props.order.shippingDetails?.billingAddress) {
    return (
        !props.order.shippingDetails.address.name1 ||
        !props.order.shippingDetails.address.city ||
        !props.order.shippingDetails.address.region ||
        !props.order.shippingDetails.address.postcode ||
        !props.order.shippingDetails.address.country ||
        !props.order.shippingDetails.billingAddress.name1 ||
        !props.order.shippingDetails.billingAddress.city ||
        !props.order.shippingDetails.billingAddress.region ||
        !props.order.shippingDetails.billingAddress.postcode ||
        !props.order.shippingDetails.billingAddress.country
    );
  }
});

const mixedOrBackOrder = computed(() => props.order.type === 1 || props.order.type === 2);

const paymentMethodWarning = computed(() => props.order.paymentDetails?.type === null);

watch(orderType, (newOrderType) => {
  props.order.type = orderType.value;
});

onMounted(() => {
  props.order.type = orderType.value;
});

onBeforeUnmount(() => {
  // Cleanup logic, if needed
});

function expandShippingAndBilling() {
  shippingAndBillingExpanded.value = !shippingAndBillingExpanded.value;
}

function expandShippingPreferences() {
  shippingPreferencesExpanded.value = !shippingPreferencesExpanded.value;
}

function expandPaymentMethod() {
  paymentMethodExpanded.value = !paymentMethodExpanded.value;
}

const paymentStore = usePaymentStore();
const {showCardsModal} = storeToRefs(paymentStore);
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