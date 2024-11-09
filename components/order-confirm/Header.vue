<template>
  <div class="flex flex-col md:flex-row gap-4 justify-between w-full">
    <section class="flex flex-col gap-4 w-full">
      <div class="flex flex-wrap gap-8 xl:gap-10">
        <h4 class="text-2xl leading-8 text-slate-500">
          Order ID: <span class="text-neutral-700 ml-4">{{ orderId }}</span>
        </h4>
        <section class="flex gap-4 items-center">
          <h2 class="self-stretch my-auto text-sm leading-none text-gray-500">Order Type</h2>
          <div class="flex overflow-hidden gap-2 justify-center items-center self-stretch my-auto rounded-md">
            <span
              class="overflow-hidden flex justify-center items-center p-0.5 my-auto w-4 h-4 text-xs font-medium leading-none text-center text-white whitespace-nowrap bg-emerald-500 rounded-[100px]">
              {{ orderType.badge.text }}
            </span>
            <p class="self-stretch my-auto text-sm leading-none text-zinc-800">
              {{ orderType.label }}
            </p>
          </div>
        </section>
      </div>
      <div
        class="flex flex-col xl:flex-row flex-wrap gap-3 pr-20 mt-3 lg:mt-0 text-sm font-medium leading-6 max-md:flex-wrap max-md:pr-5">
        <div class="flex gap-2">
          <div class="text-slate-500">Order Date:</div>
          <div class="text-neutral-700">{{ date }}</div>
        </div>
        <UiSeparator class="hidden lg:block h-4 bg-grey-100" orientation="vertical" />
        <div class="flex gap-2">
          <div class="text-slate-500">Shipping Method:</div>
          <div class="text-neutral-700">{{ shippingMethod }}</div>
        </div>
        <UiSeparator v-if="pickupDate" class="hidden lg:block h-4 bg-grey-100" orientation="vertical" />
        <div v-if="pickupDate" class="flex gap-2">
          <div class="text-slate-500">Estimated pick-up date:</div>
          <div class="text-neutral-700">{{ pickupDate }}</div>
        </div>
      </div>
    </section>
    <div
      class="md:w-full lg:w-fit flex justify-between md:justify-end gap-2 md:gap-4 text-sm font-medium leading-6 text-white max-md:flex-wrap">
      <UiButton v-if="paymentMethod?.type === PaymentTypeEnum.Bank" variant="secondary" size="xs"
        class="flex gap-2 justify-center text-slate-500 rounded-lg bg-zinc-100" @click="onDownloadDocument">
        <FileText class="shrink-0 w-4 aspect-square stroke-[1.5]" />
        Proforma Invoice
      </UiButton>
      <UiButton v-if="paymentMethod?.type !== PaymentTypeEnum.Bank" variant="secondary" size="xs"
        class="flex gap-2 justify-center text-slate-500 rounded-lg bg-zinc-100" @click="onDownloadDocument">
        <FileText class="shrink-0 w-4 aspect-square stroke-[1.5]" />
        Invoices
      </UiButton>
      <UiButton variant="secondary" size="icon"
        class="flex gap-2 h-8 justify-center text-slate-500 rounded-lg bg-zinc-100">
        <DotsVerticalIcon class="shrink-0 w-4 aspect-square stroke-[1.5]" />
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText } from 'lucide-vue-next';
import { DotsVerticalIcon } from '@radix-icons/vue';
import { PaymentTypeEnum } from '~/types';

interface OrderTypeValue {
  badge: { text: string };
  label: string;
}

interface Props {
  orderId: string;
  orderType: OrderTypeValue;
  date: string;
  shippingMethod?: string;
  pickupDate?: string;
  paymentMethod?: Record<string, any>;
  onDownloadDocument: () => void;
}

defineProps<Props>();
</script>
