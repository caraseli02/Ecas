<template>
  <div class="items-stretch shadow-xs bg-white flex w-full lg:max-w-[476px] xl:max-w-md flex-col p-6 rounded-xl">
    <section class="justify-between items-stretch flex gap-5">
      <div class="text-neutral-800 text-sm font-medium leading-5 capitalize">Card</div>
      <button>
        <SvgoEditGray24 class="text-slate-300 hover:text-blue-500"/>
      </button>
    </section>
    <div v-if="card && card.type" class="items-stretch flex justify-between gap-3 mt-6 pr-7">
      <component :is="cardImg[card?.card?.brand as keyof typeof cardImg]"/>
      <div class="justify-center items-stretch flex grow basis-[0%] flex-col">
        <div class="items-stretch flex gap-2">
          <div class="text-zinc-800 text-base font-medium leading-5 capitalize">{{ card?.card?.brand }}</div>
          <div class="text-zinc-800 text-base font-medium leading-5">
            <span class="font-extrabold">{{ '••••' }}</span> {{ card?.card?.last4 }}
          </div>
          <SvgoCheckCircle20
              class="text-green-600 aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
          />
        </div>
        <div class="items-stretch flex gap-1 text-sm text-slate-500 mt-1">
          <div class="leading-5 shrink basis-auto">Expiration date:</div>
          <div class="font-medium leading-5 grow shrink basis-auto">
            {{ card?.card?.exp_month + '/' + card?.card?.exp_year }}
          </div>
        </div>
      </div>
    </div>
    <button class="items-stretch flex gap-2 mt-6 self-end text-slate-500 hover:text-blue-500">
      <div class="text-sm font-medium leading-5 grow">Transactions</div>
      <SvgoArrowLeft16
          class="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto "
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import amexIcon from '@/assets/icons/amex58.svg';
import masterIcon from '@/assets/icons/mastercard58.svg';
import visaIcon from '@/assets/icons/visa58.svg';
import {StripeCardInterface} from '~/types';

defineProps<{
  card: StripeCardInterface
}>()

const cardImg = {
  mastercard: masterIcon,
  amex: amexIcon,
  visa: visaIcon
}
</script>

<style scoped>
</style>
