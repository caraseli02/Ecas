<script setup lang="ts">
import { CheckIcon } from 'lucide-vue-next';
// Define the data object with properties
const shippingAddress = {
  address1: '5073 Mark Brown Rd',
  address2: 'NE Dalton, Georgia (GA)',
  postalCode: '30721',
  country: 'United States',
};

const billingAddress = {
  // ... copy the same structure as shippingAddress
  address1: '5073 Mark Brown Rd',
  address2: 'NE Dalton, Georgia (GA)',
  postalCode: '30721',
  country: 'United States',
};
</script>

<template>
  <div class="flex gap-9 max-md:flex-col max-md:gap-0">
    <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div class="flex flex-col grow max-md:mt-9 max-md:max-w-full">
        <h2 class="text-base font-semibold leading-7 text-neutral-700 max-md:max-w-full">
          Shipping Address
        </h2>
        <div class="flex gap-5 justify-between mt-9 w-full max-md:flex-wrap max-md:max-w-full">
          <h3 class="text-sm font-semibold leading-6 text-neutral-700">Address Alias 1</h3>
          <div
            class="flex gap-1 items-center justify-center px-2 py-1 text-xs font-medium leading-4 text-emerald-500 whitespace-nowrap bg-white border border-emerald-500 border-solid rounded-[100px]"
          >
            <CheckIcon class="w-4 h-4 rounded-full text-slate-50 bg-green-500"/>
            <span>Default</span>
          </div>
        </div>
        <p class="mt-2 text-sm font-medium leading-5 text-gray-500 max-md:max-w-full">
          {{ shippingAddress.address1 }}
        </p>
        <p class="mt-2 text-sm font-medium leading-5 text-gray-500 max-md:max-w-full">
          {{ shippingAddress.address2 }}
        </p>
        <p class="mt-2 text-sm font-medium leading-5 text-gray-500 max-md:max-w-full">
          {{ shippingAddress.postalCode }}, {{ shippingAddress.country }}
        </p>
      </div>
    </div>
    <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div class="flex flex-col px- text-sm font-medium leading-5 text-gray-500 max-md:mt-9 max-md:max-w-full">
        <h2 class="text-base font-semibold leading-7 text-neutral-700 max-md:max-w-full">
          Billing Address
        </h2>
        <p class="mt-9 max-md:max-w-full">{{ billingAddress.address1 }}</p>
        <p class="mt-2 max-md:max-w-full">{{ billingAddress.address2 }}</p>
        <p class="mt-2 max-md:max-w-full">{{ billingAddress.postalCode }}, {{ billingAddress.country }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
