<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-row justify-between items-center">
      <span class="text-neutral-700 text-sm font-medium leading-6">Select Payment</span>
      <button class="group">
        <SettingCog class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-300" />
      </button>
    </div>
    <div class="flex flex-col gap-4 relative">
      <OrderSummaryPayByCard
        has-card
        :is-selected="order.paymentDetails?.type === 0"
        @select-payment-option="selectPaymentOption($event)"
        view="payment"
      />
      <!-- <button
        class="p-3 flex flex-col gap-2.5 border rounded-lg hover:bg-[#007FFF0D] hover:border-[#007FFF] transition duration-300 group"
        :class="order.paymentDetails?.type === 0 ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#D4D4D4] bg-[#FFF]'"
        @click="selectPaymentOption('Card')">
        <div class="flex flex-row justify-between w-full">
          <RadioButtonChecked
v-if="order.paymentDetails?.type === 0"
            class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
          <RadioButton
v-else
            class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
          <SvgoCardIcon />
        </div>
        <div class="flex justify-between w-full">
          <span class="text-neutral-700 text-sm font-normal leading-6">Pay by card</span>
          <div class="flex gap-2 items-center">
            <SvgoChangeCard />
            <span class="text-neutral-700 text-sm font-normal leading-6">Change card</span>
          </div>
        </div>
      </button> -->
      <button
        class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-[#007FFF] transition duration-300 group"
        :class="order.paymentDetails?.type === 3 ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#D4D4D4] bg-[#FFF]'"
        @click="selectPaymentOption('Bank')">
        <div class="flex flex-row justify-between w-full">
          <RadioButtonChecked
v-if="order.paymentDetails?.type === 3"
            class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
          <RadioButton
v-else
            class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
          <BankIcon />
        </div>
        <div>
          <span class="text-neutral-700 text-sm font-normal leading-6">Bank Transfer</span>
        </div>
      </button>
      <button
        class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-[#007FFF] transition duration-300 group"
        :class="order.paymentDetails?.type === 1 ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#D4D4D4] bg-[#FFF]'"
        :disabled="accountCredit.active" @click="selectPaymentOption('Credit')">
        <div class="flex flex-row justify-between w-full">
          <RadioButtonChecked
v-if="order.paymentDetails?.type === 1"
            class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
          <RadioButton
v-else
            class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
          <PieChart />
        </div>
        <div class="flex flex-row justify-between w-full">
          <span class="text-neutral-700 text-sm font-normal leading-6">Pay from credit</span>
          <div class="flex flex-row gap-2">
            <span class="text-neutral-700 text-sm font-normal leading-6">Available:</span>
            <button @click="showCreditInfoModal = true">
              <!-- <span class="text-[#007FFF] text-sm font-semibold leading-6">$ {{ accountCredit.available }}</span> -->
              <span class="text-[#007FFF] text-sm font-semibold leading-6">{{
                accountCredit?.available?.toFixed(2) || 0
              }}</span>
              <!-- placeholder (uncomment the above line) -->
            </button>
          </div>
        </div>
      </button>
      <Transition name="fade-bottom">
        <div
v-if="showCreditInfoModal" v-click-outside="() => (showCreditInfoModal = false)"
          class="absolute bottom-[160px] right-0">
          <OrderSummaryCreditInfoModal :account-credit="accountCredit" />
        </div>
      </Transition>
      <button
        class="p-3 flex flex-col gap-3 border rounded-lg hover:bg-[#007FFF0D] hover:border-[#007FFF] transition duration-300 group"
        :class="order.paymentDetails?.type === 2 ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#D4D4D4] bg-[#FFF]'"
        @click="selectPaymentOption('Cash')">
        <div class="flex flex-row justify-between w-full">
          <RadioButtonChecked
v-if="order.paymentDetails?.type === 2"
            class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
          <RadioButton
v-else
            class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
          <MoneyIcon />
        </div>
        <div>
          <span class="text-neutral-700 text-sm font-normal leading-6">Cash on delivery</span>
        </div>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SettingCog from '@/assets/icons/setting-cog.svg';
import RadioButton from '@/assets/icons/radio-button.svg';
import RadioButtonChecked from '@/assets/icons/radio-button-checked.svg';
import BankIcon from '@/assets/icons/bank.svg';
import PieChart from '@/assets/icons/pie-chart.svg';
import MoneyIcon from '@/assets/icons/money.svg';
import { OrderInterface, PaymentTypeEnum } from '~/types';
import { CustomerCreditInterface } from '~/types/auth/account-settings';
import Emitter from 'tiny-emitter/instance.js';

const props = defineProps<{
  order: OrderInterface
  accountCredit: CustomerCreditInterface
}>()

const showCreditInfoModal = ref(false)

function selectPaymentOption(option: string) {
  if (props.order.paymentDetails) {
    props.order.paymentDetails.type = PaymentTypeEnum[option as keyof typeof PaymentTypeEnum] as number;
    Emitter.emit('payment-type', { type: props.order.paymentDetails.type, selected: true });
  }
}
</script>
