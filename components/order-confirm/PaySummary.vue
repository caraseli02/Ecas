<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next';

const orderPaySum = {
  subtotal: 419.24,
  discountPercentage: 10,
  discountAmount: 10,
  handlingCharge: 5.49,
  shippingCost: 10,
  taxPercentage: 10,
  taxAmount: 0,
  backorderItemsTotal: 0,
  stockItemsTotal: 0,
  orderTotal: 0,
  payableNow: 0
};

</script>

<template>
      <div class="flex flex-col gap-4 w-full order-2">
        <header class="w-full text-sm font-semibold leading-6 text-neutral-700">
          Order Payment Summary
        </header>
        <section class="flex flex-col gap-2">
    <!-- Display Subtotal -->
    <div class="flex gap-2 justify-between w-full text-sm font-medium leading-6">
      <div class="text-gray-500">Subtotal</div>
      <div class="text-neutral-700">${{ orderPaySum.subtotal.toFixed(2) }}</div>
    </div>
    <!-- Display Discount and its computed value -->
    <div class="flex gap-2 justify-between w-full text-sm leading-6">
      <div class="flex gap-5 justify-between whitespace-nowrap">
        <div class="font-medium text-gray-500">Discount</div>
        <div class="text-neutral-700">{{ orderPaySum.discountPercentage }} %</div>
      </div>
      <div class="font-medium text-neutral-700">${{ orderPaySum.discountAmount.toFixed(2) }}</div>
    </div>
    <!-- Handling Charge -->
    <div class="flex gap-5 text-sm leading-6">
      <div class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500">
        <div class="flex gap-2">
          Handling Charge
          <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
        </div>
        <div>Small order charge</div>
      </div>
      <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
        ${{ orderPaySum.handlingCharge.toFixed(2) }}
      </div>
    </div>
    <!-- Shipping Costs -->
    <div class="flex gap-5 text-sm leading-6">
      <div class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500">
        <div class="flex gap-2">
          Shipping
          <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
        </div>
        <div>Standard Delivery (3-5 Days)</div>
      </div>
      <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
        ${{ orderPaySum.shippingCost.toFixed(2) }}
      </div>
    </div>
    <!-- Tax Information -->
    <div class="flex gap-2 justify-between w-full text-sm leading-6">
      <div class="flex gap-5 justify-between whitespace-nowrap">
        <div class="flex gap-2 font-medium text-gray-500">
          <div>Tax:</div>
          <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
        </div>
        <div class="text-neutral-700">({{ orderPaySum.taxPercentage }} %)</div>
      </div>
      <div class="font-medium text-neutral-700">${{ orderPaySum.taxAmount.toFixed(2) }}</div>
    </div>
    <!-- Totals for Backorder and Stock Items -->
    <div class="flex gap-2 justify-between w-full text-neutral-700">
      <div class="text-xl leading-9">Backorder Items Total</div>
      <div class="text-2xl font-semibold leading-9">${{ orderPaySum.backorderItemsTotal.toFixed(2) }}</div>
    </div>
    <div class="flex gap-2 justify-between w-full text-neutral-700">
      <div class="text-xl leading-9">Stock Items Total</div>
      <div class="text-2xl font-semibold leading-9">${{ orderPaySum.stockItemsTotal.toFixed(2) }}</div>
    </div>
    <!-- Final Order Totals -->
    <UiSeparator class="bg-light-500" />
    <div class="flex gap-2 justify-between w-full text-neutral-700">
      <div class="text-xl leading-9">Order Total</div>
      <div class="text-2xl font-semibold leading-9">${{ orderPaySum.orderTotal.toFixed(2) }}</div>
    </div>
    <div class="flex gap-2 justify-between w-full text-neutral-700">
      <div class="text-xl leading-9">Payable now</div>
      <div class="text-2xl font-semibold leading-9">${{ orderPaySum.payableNow.toFixed(2) }}</div>
    </div>
  </section>
      </div>
</template>

<style scoped>

</style>

