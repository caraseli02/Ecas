<script setup lang="ts">
import { DotsVerticalIcon } from '@radix-icons/vue';
import { MapPin, CheckCircle } from 'lucide-vue-next';

const isAdmin = ref(true);
</script>

<template>
  <section class="flex flex-col">
    <div class="flex justify-end flex-wrap gap-3 items-center w-full max-md:max-w-full">
      <div class="flex gap-3 items-center self-stretch my-auto text-sm leading-none">
        <h4 class="self-stretch my-auto text-gray-500">Order Status</h4>
       <OrderConfirmStatusSelect v-if="isAdmin"></OrderConfirmStatusSelect>
       <OrderConfirmStatusDisplay status-color="bg-emerald-500" status-text="Completed" v-else />
      </div>
      <div class="flex gap-3 items-center self-stretch my-auto">
        <UiBadge v-if="isAdmin"
          class="font-medium text-white bg-emerald-500 hover:bg-emerald-500">
          <CheckCircle class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
          <span class="self-stretch py-1 pl-2 my-auto">Order Completed</span>
        </UiBadge>
        <UiButton v-if="!isAdmin" size="xs"
          class="flex overflow-hidden justify-center items-center self-stretch px-4 py-0 my-auto text-sm font-medium leading-6 text-white bg-sky-500 rounded-md">
          <MapPin class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
          <span class="self-stretch py-1 pl-2 my-auto">Track Order</span>
        </UiButton>
        <UiPopover>
          <UiPopoverTrigger>
            <UiButton
              variant="ghost"
              size="icon"
              class="flex overflow-hidden justify-center items-center self-stretch p-1 my-auto w-8 h-8 rounded-md bg-zinc-100"
              aria-label="Additional options">
              <DotsVerticalIcon alt="" class="object-contain self-stretch my-auto w-6 aspect-square" />
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent class="w-fit flex flex-col gap-2 p-2" align="end">
            <UiButton class="hover:text-blue-500 justify-start min-w-[164px]" variant="ghost" size="sm">
              <CheckCircle class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
              Mark as Paid
            </UiButton>
            <UiButton class="hover:text-blue-500 justify-start min-w-[164px]" variant="ghost" size="sm">
              <MapPin class="mr-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
              Track Order
            </UiButton>
          </UiPopoverContent>
        </UiPopover>
      </div>
    </div>
    <div
      class="flex flex-wrap gap-10 justify-between items-start p-4 mt-4 w-full rounded-lg border border-solid bg-stone-50 border-grey-300 max-md:max-w-full">
      <div class="flex gap-4 items-center min-h-[20px]">
        <span class="self-stretch my-auto text-sm leading-none text-gray-500">Order Type</span>
        <div class="flex overflow-hidden gap-2 justify-center items-center self-stretch my-auto rounded-md">
          <span
            class="overflow-hidden self-stretch p-0.5 my-auto w-4 h-4 text-xs font-medium leading-none text-center text-white whitespace-nowrap bg-emerald-500 rounded-[100px]">S</span>
          <span class="self-stretch my-auto text-sm leading-none text-zinc-800">Stock Order</span>
        </div>
      </div>
      <div class="flex gap-3 items-center text-sm leading-none min-h-[20px]">
        <span class="self-stretch my-auto text-gray-500">Payment Status</span>
        <OrderConfirmStatusDisplay status-color="bg-emerald-500" status-text="Card" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
