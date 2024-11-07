<script setup lang="ts">
import { DotsVerticalIcon } from '@radix-icons/vue';
import { MapPin, CheckCircle, RefreshCcw, BarcodeIcon, PackageCheck, ArrowRight, InfoIcon } from 'lucide-vue-next';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const isAdmin = ref(true);
const bankTransferPayment = ref(true);

const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanSm = breakpoints.smaller('sm') // sm and larger
const smAndLarger = breakpoints.greaterOrEqual('sm') // sm and larger
</script>

<template>
  <section class="flex flex-col">
    <div class="flex justify-end  md:justify-between flex-wrap gap-3 items-center w-full max-md:max-w-full">
      <UiPopover v-if="isAdmin && smAndLarger">
        <UiPopoverTrigger>
          <section class="flex gap-3 items-center text-sm leading-6 whitespace-nowrap text-zinc-800">
            <h2 class="self-stretch my-auto text-gray-500">AWB</h2>
            <RefreshCcw class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
            <div
              class="flex overflow-hidden gap-2 justify-center items-center self-stretch my-auto leading-none rounded-md">
              <span class="flex shrink-0 self-stretch my-auto w-3 h-3 bg-amber-500 rounded-full fill-amber-500"
                aria-hidden="true"></span>
              <p class="self-stretch my-auto">Pending</p>
            </div>
            <p class="self-stretch my-auto font-medium">MDPS241030007</p>
          </section>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-fit flex flex-col gap-2 p-2" align="end">
          <UiButton class="hover:text-blue-500 justify-start gap-1" variant="ghost" size="sm">
            <BarcodeIcon class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
            Generate AWB
            <span class="flex shrink-0 self-stretch my-auto w-3 h-3 bg-amber-500 rounded-full fill-amber-500"
              aria-hidden="true"></span>
          </UiButton>
          <UiButton disabled class="hover:text-blue-500 justify-start gap-1" variant="ghost" size="sm">
            <BarcodeIcon class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
            Generate AWB
            <span class="flex shrink-0 self-stretch my-auto w-3 h-3 bg-emerald-500 rounded-full fill-emerald-500"
              aria-hidden="true"></span>
          </UiButton>
        </UiPopoverContent>
      </UiPopover>
      <div v-else class="hidden md:flex gap-3 items-center self-stretch my-auto text-sm leading-none">
        <h4 class="self-stretch my-auto text-gray-500">Order Status</h4>
        <OrderConfirmStatusDisplay status-color="bg-emerald-500" status-text="Completed" />
      </div>
      <section class="flex gap-2">
        <div v-if="isAdmin" class="flex gap-3 items-center self-stretch my-auto text-sm leading-none">
          <h4 class="self-stretch my-auto text-gray-500">Order Status</h4>
          <OrderConfirmStatusSelect /> 
        </div>
        <div class="flex gap-3 items-center self-stretch my-auto">
          <UiButton v-if="!isAdmin" size="xs"
            class="flex overflow-hidden justify-center items-center self-stretch px-4 py-0 my-auto text-sm font-medium leading-6 text-white bg-sky-500 rounded-md">
            <MapPin class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
            <span class="self-stretch py-1 pl-2 my-auto">Track Order</span>
          </UiButton>
          <UiPopover>
            <UiPopoverTrigger>
              <UiButton variant="ghost" size="icon"
                class="flex overflow-hidden justify-center items-center self-stretch p-1 my-auto w-8 h-8 rounded-md bg-zinc-100"
                aria-label="Additional options">
                <DotsVerticalIcon alt="" class="object-contain self-stretch my-auto w-6 aspect-square" />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent class="w-fit flex flex-col gap-2 p-2" align="end">
              <UiButton class="hover:text-blue-500 justify-start gap-2 min-w-[164px]" variant="ghost" size="sm">
                <PackageCheck class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                Fulfill Order
              </UiButton>
              <UiButton class="hover:text-blue-500 justify-start gap-2 min-w-[164px]" variant="ghost" size="sm">
                <CheckCircle class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                Mark as Paid
              </UiButton>
              <UiButton class="hover:text-blue-500 justify-start gap-2 min-w-[164px]" variant="ghost" size="sm">
                <MapPin class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                Track Order
              </UiButton>
            </UiPopoverContent>
          </UiPopover>
        </div>
      </section>
    </div>
    <div
      class="flex flex-wrap gap-4 md:gap-10 justify-between items-start p-4 mt-4 w-full rounded-lg border border-solid bg-stone-50 border-grey-300 max-md:max-w-full">
      <div v-if="!isAdmin && smallerThanSm" class="flex md:hidden justify-between w-full gap-3 items-center self-stretch my-auto text-sm leading-none">
        <h4 class="self-stretch my-auto text-gray-500">Order Status</h4>
        <OrderConfirmStatusDisplay status-color="bg-emerald-500" status-text="Completed" />
      </div>
      <UiPopover v-if="isAdmin && smallerThanSm">
        <UiPopoverTrigger class="w-full">
          <section class="flex justify-between w-full gap-3 items-center text-sm leading-6 whitespace-nowrap text-zinc-800">
            <h2 class="self-stretch my-auto text-gray-500">AWB</h2>
            <section class="flex gap-1">
              <div
                class="flex overflow-hidden gap-2 justify-center items-center self-stretch my-auto leading-none rounded-md">
                <span class="flex shrink-0 self-stretch my-auto w-3 h-3 bg-amber-500 rounded-full fill-amber-500"
                  aria-hidden="true"></span>
                <p class="self-stretch my-auto">Pending</p>
              </div>
              <p class="self-stretch my-auto font-medium">MDPS241030007</p>
              <RefreshCcw class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
            </section>
          </section>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-fit flex flex-col gap-2 p-2" align="end">
          <UiButton class="hover:text-blue-500 justify-start gap-1" variant="ghost" size="sm">
            <BarcodeIcon class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
            Generate AWB
            <span class="flex shrink-0 self-stretch my-auto w-3 h-3 bg-amber-500 rounded-full fill-amber-500"
              aria-hidden="true"></span>
          </UiButton>
          <UiButton disabled class="hover:text-blue-500 justify-start gap-1" variant="ghost" size="sm">
            <BarcodeIcon class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
            Generate AWB
            <span class="flex shrink-0 self-stretch my-auto w-3 h-3 bg-emerald-500 rounded-full fill-emerald-500"
              aria-hidden="true"></span>
          </UiButton>
        </UiPopoverContent>
      </UiPopover>
      <div class="flex justify-between w-full md:w-fit gap-4 items-center min-h-[20px]">
        <span class="self-stretch my-auto text-sm leading-none text-gray-500">Order Type</span>
        <div class="flex overflow-hidden gap-2 justify-center items-center self-stretch my-auto rounded-md">
          <span
            class="overflow-hidden self-stretch p-0.5 my-auto w-4 h-4 text-xs font-medium leading-none text-center text-white whitespace-nowrap bg-emerald-500 rounded-[100px]">S</span>
          <span class="self-stretch my-auto text-sm leading-none text-zinc-800">Stock Order</span>
        </div>
      </div>
      <UiPopover>
        <UiPopoverTrigger class="w-full md:w-fit">
          <div class="flex gap-3 justify-between w-full md:w-fit items-center text-sm leading-none min-h-[20px]">
            <span class="self-stretch my-auto text-gray-500">Payment Status</span>
            <span class="flex gap-2"> 
              <OrderConfirmStatusDisplay status-color="bg-emerald-500" status-text="Paid" />
              <InfoIcon class="w-4 h-4" />
            </span>
          </div>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-fit flex flex-col gap-2 p-3 max-w-xs rounded-xl" align="end">
          <article class="flex flex-col w-full">
            <h2 class="text-sm font-medium leading-6 text-zinc-800">
              Payment Details
            </h2>
            <div class="flex flex-col mt-3 w-full">
              <dl class="flex flex-col w-full text-xs leading-loose">
                <div class="flex gap-10 justify-between items-start w-full">
                  <dt class="text-gray-500">Amount</dt>
                  <dd class="text-zinc-800">$ 1,572.39</dd>
                </div>
                <div class="flex gap-10 justify-between items-start mt-2 w-full">
                  <dt class="text-gray-500">Date</dt>
                  <dd class="text-zinc-800">
                    27 DEC 2024
                  </dd>
                </div>
                <div class="flex gap-10 justify-between items-start mt-2 w-full whitespace-nowrap">
                  <dt class="text-gray-500">
                    Reference
                  </dt>
                  <dd class="text-zinc-800">
                    S-241105007UPGS
                  </dd>
                </div>
              </dl>
              <template v-if=bankTransferPayment>
                <div class="gap-2 self-stretch mt-2 w-full text-gray-500 whitespace-nowrap">
                  Comments
                </div>
                <p
                  class="overflow-hidden text-xs flex-1 shrink gap-2 p-3 mt-2 w-full leading-5 rounded-lg border border-solid bg-stone-50 border-neutral-100 text-zinc-800">
                  Please deliver after 4PM and call me prior to delivery. Please deliver after 4PM and call me prior to
                  delivery.
                </p>
              </template>
              <UiSeparator v-else class="bg-grey-100 mt-3" />
            </div>
            <div class="flex justify-end items-center">
            <UiButton class="w-fit gap-1 mt-1" variant="link">
              View more
              <ArrowRight class="w-4 h-4" />
            </UiButton>
          </div>
          </article>
        </UiPopoverContent>
      </UiPopover>
    </div>
  </section>
</template>

<style scoped></style>
