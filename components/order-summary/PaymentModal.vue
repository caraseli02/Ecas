<template>
  <section class="items-start shadow-sm bg-white flex max-w-[326px] md:max-w-[400px] flex-col px-4 md:px-6 py-6 rounded-xl">
    <div
      class="justify-between items-center self-stretch flex gap-5">
      <div class="text-zinc-800 text-base font-semibold leading-7 my-auto">
        Payment Method
      </div>
      <Button
        @click="paymentStore.toggleCardModal"
        class="justify-center items-center bg-zinc-100 self-stretch flex aspect-square flex-col w-8 h-8 px-1 rounded-lg">
        <SvgoX class="aspect-square object-contain object-center w-full justify-center items-center overflow-hidden" />
      </Button>
    </div>
    <div class="flex flex-col gap-3">
      <h4 class="text-zinc-800 text-sm font-medium leading-6 self-stretch mt-10">
        Saved cards
      </h4>
      <OrderSummaryPayByCard view="modal" has-card card-type="visa"/>
      <OrderSummaryPayByCard view="modal" has-card is-selected is-expired card-type="master" />
      <OrderSummaryPayByCard view="modal" has-card card-type="amex" />
      <OrderSummaryNewCard />
      <OrderSummaryNewCard is-selected />
    </div>
    <div class="items-stretch self-center flex gap-3 mt-10">
      <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
fill-rule="evenodd" clip-rule="evenodd"
          d="M9.38747 7.85107L17.7847 3.94024C19.5224 3.13092 21.506 3.13092 23.2437 3.94024L31.6076 7.83556C34.0534 8.97466 35.6589 11.5348 35.4875 14.3338C34.8302 25.0698 31.9011 29.9231 23.9831 35.5537C21.8935 37.0396 19.1371 37.036 17.046 35.5524C9.15234 29.9524 6.11452 25.1667 5.51028 14.2961C5.35572 11.5156 6.95858 8.98228 9.38747 7.85107ZM26.4407 17.4897C26.8953 16.9702 26.8426 16.1805 26.3231 15.7259C25.8035 15.2713 25.0138 15.3239 24.5592 15.8435L19.776 21.31C19.6292 21.4778 19.3763 21.5002 19.2022 21.3609L16.2808 19.0239C15.7417 18.5926 14.9551 18.68 14.5239 19.2191C14.0926 19.7581 14.18 20.5448 14.7191 20.976L17.6404 23.3131C18.8593 24.2882 20.6297 24.1309 21.6575 22.9562L26.4407 17.4897Z"
          fill="#00C088" />
      </svg>
      <div class="text-zinc-800 text-sm leading-6 self-center grow whitespace-nowrap my-auto">
        Secure credit card payment
      </div>
    </div>
    <div class="justify-center items-center self-stretch bg-sky-500 flex w-full flex-col mt-10 px-16 py-2 rounded-lg">
      <span class="flex items-center gap-2">
        <div class="text-white text-base font-medium leading-7 grow whitespace-nowrap">
          Continue
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
d="M14 8L18 12M18 12L14 16M18 12L6 12" stroke="white" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePaymentStore } from '~/store/paymentStore';

const paymentStore = usePaymentStore();
</script>

<style scoped>
</style>
