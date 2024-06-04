<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next';
import { CartProductsInterface } from '~/types';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const lgAndLarger = breakpoints.greaterOrEqual('lg') // sm and larger

const props = defineProps<{
  data: CartProductsInterface[]
}>()

const backOrderItems: ComputedRef<CartProductsInterface[]> = computed(() => {
  return props.data.filter(
    (item: CartProductsInterface) => item.productEntity?.stock !== undefined && item.productEntity.stock < item.stock
  );
});

const payment = computed(() => {
  let subtotal = 0;
  let discountAmount = 0;
  for (const item of backOrderItems.value) {
    subtotal += item.stock * item.unitPriceAfterDiscounts;
    discountAmount += (item.initialUnitPrice - item.unitPriceAfterDiscounts) * item.stock;
  }
  const taxRate = 19; // Consider moving to a dynamic setting or config
  const taxAmount = subtotal * (taxRate / 100);
  const discountRate = (discountAmount / subtotal) * 100;

  return {
    subtotal,
    discountRate,
    discountAmount,
    handlingCharge: 5.49, // Consider making dynamic if applicable
    shippingCost: 7.49, // Consider making dynamic if applicable
    taxRate,
    taxAmount,
    stockOrderTotal: subtotal + taxAmount + 5.49 + 7.49 // Include other charges dynamically if needed
  };
});
</script>

<template>
  <div v-if="backOrderItems.length > 0" class="flex flex-col gap-4">
    <p>
      <UiBadge class="bg-rose-500 text-white w-fit rounded-md h-7 text-sm">Back Order</UiBadge>
    <span class="text-rose-500 ml-2">
      {{ backOrderItems.length }} Items will pe placed on Backorder
    </span>
    </p>
    <section class="flex flex-col gap-10 px-4 py-6 md:p-6 border border-gray-300 rounded-xl">
      <div class="flex flex-col lg:flex-row gap-2 lg:gap-4 justify-between self-stretch">
        <span class="hidden lg:inline text-sm font-semibold leading-6 text-neutral-700 w-full max-w-[412px]">Product
          Details</span>
        <span class="hidden lg:inline text-sm font-semibold leading-6 text-neutral-700 text-center min-w-[86px]">Unit
          Price</span>
        <span
          class="hidden lg:inline text-sm font-semibold leading-6 text-neutral-700 text-center min-w-[86px]">Quantity</span>
        <span class="hidden lg:inline text-sm font-semibold leading-6 text-neutral-700 text-center min-w-[86px]">Tax
          (19%)</span>
        <span
          class="hidden lg:inline text-sm font-semibold leading-6 text-neutral-700 text-center min-w-[86px]">Subtotal</span>
      </div>
      <div class="flex flex-col gap-10">
        <div
          v-for="item in backOrderItems" :key="'stock-' + item.id"
          class="flex flex-col lg:flex-row gap-2 lg:gap-4 justify-between self-stretch">
          <div class="flex gap-3 mt-6 w-full lg:max-w-[412px]">
            <figure class="flex justify-center items-center rounded-lg border border-solid border-grey-300">
              <img
                  :src="item.productEntity.details.ProductImage.ProductImageSmall" alt="Product image"
                class="aspect-square min-w-[60px] lg:w-[72px] rounded-lg" />
            </figure>
            <div class="flex flex-col w-full max-w-[254px] md:max-w-none lg:max-w-[328px]">
              <div class="flex flex-col sm:flex-row gap-2">
                <span class="text-sm font-medium leading-6 text-gray-500">Item:</span>
                <div class="flex gap-5 justify-between">
                  <span class="text-sm font-medium leading-6 text-neutral-700">{{ item.productEntity.alias }}</span>
                  <span
                    class="justify-center px-2 my-auto text-xs font-semibold leading-5 text-red-500 bg-white rounded-3xl border border-red-500 border-solid">
                    {{ item.discount.value }} %
                  </span>
                </div>
              </div>
              <div class="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap">
                <span class="text-gray-500">Description:</span>
                <span class="text-ellipsis text-neutral-700 w-full lg:max-w-[328px] truncate">
                  {{ item.productEntity.description }}
                </span>
              </div>
              <div class="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap">
                <span class="text-gray-500">Manufacturer:</span>
                <span class="text-ellipsis text-neutral-700">{{ item.productEntity.manufacturer }}</span>
              </div>
            </div>
          </div>
          <template v-if="lgAndLarger">
            <div class="flex flex-col justify-center text-sm self-stretch px-6 py-4 leading-5">
              <p class="text-neutral-700">
                <span class="font-semibold text-neutral-700">$</span><span class="text-neutral-700 line-through">
                  {{ item.initialUnitPrice.toFixed(2) }}
                </span>
              </p>
              <p class="mt-1 text-red-500">
                <span class="font-semibold text-red-500">$</span><span class="text-red-500"> {{
                  item.unitPriceAfterDiscounts.toFixed(2) }}</span>
              </p>
            </div>
            <div class="flex flex-col p-6 text-sm">
              <p class="font-semibold">{{ item.stock }}</p>
            </div>
            <div class="flex flex-col p-6 text-sm">
              <p><span class="font-semibold">$</span> {{ (item.stock * item.unitPriceAfterDiscounts).toFixed(2) }}</p>
            </div>
            <div class="flex flex-col p-6 text-sm">
              <p><span class="font-semibold">$</span> {{ (item.stock * item.unitPriceAfterDiscounts * payment.taxRate /
                100).toFixed(2)
              }}</p>
            </div>
          </template>
          <template v-else>
            <section class="flex flex-col self-stretch pb-2 max-w-2xl text-sm">
              <article class="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <p class="my-auto leading-6 text-neutral-800">Unit Price</p>
                <section class="flex flex-col leading-[143%]">
                  <p class="text-neutral-800 line-through">
                    <span class="leading-5 text-neutral-800">$</span><span class="leading-5">{{
                      item.initialUnitPrice.toFixed(2) }}</span>
                  </p>
                  <p class="font-medium text-red-500 ">
                    <span class="text-red-500">$</span><span> {{ item.unitPriceAfterDiscounts.toFixed(2) }}</span>
                  </p>
                </section>
              </article>
              <article
                class="flex gap-5 justify-between mt-1 w-full leading-6 whitespace-nowrap text-neutral-800 max-md:flex-wrap max-md:max-w-full">
                <p>Quantity</p>
                <p>{{ item.stock }}</p>
              </article>
              <article
                class="flex gap-5 justify-between mt-1 w-full leading-6 text-neutral-800 max-md:flex-wrap max-md:max-w-full">
                <p>Tax (VAT 19%)</p>
                <p>${{ (item.stock * item.unitPriceAfterDiscounts * payment.taxRate / 100).toFixed(2) }}</p>
              </article>
              <article
                class="flex gap-5 justify-between mt-1 w-full leading-6 whitespace-nowrap text-neutral-800 max-md:flex-wrap max-md:max-w-full">
                <p>Subtotal</p>
                <p>${{ (item.stock * item.unitPriceAfterDiscounts).toFixed(2) }}</p>
              </article>
            </section>
          </template>
        </div>
      </div>
      <UiSeparator class="bg-light-500" />
      <div class="flex flex-col gap-4 w-full">
        <header class="w-full text-sm font-semibold leading-6 text-neutral-700">
          Back Order Payment Summary
        </header>
        <section class="flex flex-col gap-2">
          <div class="flex gap-2 justify-between w-full text-sm font-medium leading-6">
            <div class="text-gray-500">Subtotal</div>
            <div class="text-neutral-700">${{ payment.subtotal.toFixed(2) }}</div>
          </div>
          <div class="flex gap-2 justify-between w-full text-sm leading-6">
            <div class="flex gap-5 justify-between whitespace-nowrap">
              <div class="font-medium text-gray-500">Discount</div>
              <div class="text-neutral-700">{{ payment.discountRate.toFixed(2) }}%</div>
            </div>
            <div class="font-medium text-neutral-700">${{ payment.discountAmount.toFixed(2) }}</div>
          </div>
          <div class="flex gap-5 text-sm leading-6">
            <div
              class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500">
              <div class="flex gap-2">
                Handling Charge
                <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
              </div>
              <div>Small order charge</div>
            </div>
            <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
              ${{ payment.handlingCharge.toFixed(2) }}
            </div>
          </div>
          <div class="flex gap-5 text-sm leading-6">
            <div
              class="flex flex-col md:flex-row justify-between md:justify-start w-full gap-2 font-medium text-gray-500">
              <div class="flex gap-2">
                Shipping
                <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
              </div>
              <div>Standard Delivery (3-5 Days)</div>
            </div>
            <div class="flex justify-end text-neutral-700 font-medium min-w-12 w-full">
              ${{ payment.shippingCost.toFixed(2) }}
            </div>
          </div>
          <div class="flex gap-2 justify-between w-full text-sm leading-6">
            <div class="flex gap-5 justify-between whitespace-nowrap">
              <div class="flex gap-2 font-medium text-gray-500">
                <div>Tax:</div>
                <InfoIcon class="shrink-0 my-auto w-4 aspect-square text-slate-500" />
              </div>
              <div class="text-neutral-700">({{ payment.taxRate }}%)</div>
            </div>
            <div class="font-medium text-neutral-700">${{ payment.taxAmount.toFixed(2) }}</div>
          </div>
          <UiSeparator class="bg-light-500" />
          <div class="flex gap-2 justify-between mt-2 w-full text-neutral-700">
            <div class="text-xl leading-9">Back Order Total</div>
            <div class="text-2xl font-semibold leading-9">${{ payment.stockOrderTotal.toFixed(2) }}</div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
