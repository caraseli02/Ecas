<template>
  <div class="items-stretch shadow-xs bg-white flex w-full lg:max-w-[476px] xl:max-w-md flex-col p-6 rounded-xl">
    <header class="justify-between items-stretch flex gap-5">
      <div class="text-neutral-800 text-sm font-medium leading-5">{{ cardData.title }}</div>
      <SvgoEditGray24/>
    </header>
    <div class="items-stretch flex justify-between gap-3 mt-6 pr-7">
      <component :is="cardImg[cardData.type]" />
      <div class="justify-center items-stretch flex grow basis-[0%] flex-col">
        <div class="items-stretch flex gap-2">
          <div class="text-zinc-800 text-base font-medium leading-5">{{ cardData.type }}</div>
          <div class="text-zinc-800 text-base font-medium leading-5">
            <span class="font-extrabold">{{ cardData.mask }}</span> {{ cardData.lastDigits }}
          </div>
          <svg class="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full" width="20"
            height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.6665 9.99984L8.77874 11.9008C9.13832 12.2245 9.697 12.1749 9.994 11.7931L13.3332 7.49984M9.99984 18.3332C14.6022 18.3332 18.3332 14.6022 18.3332 9.99984C18.3332 5.39747 14.6022 1.6665 9.99984 1.6665C5.39747 1.6665 1.6665 5.39747 1.6665 9.99984C1.6665 14.6022 5.39747 18.3332 9.99984 18.3332Z"
              stroke="#00C088" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="items-stretch flex gap-1 text-sm text-gray-500 mt-1">
          <div class="leading-5 shrink basis-auto">Expiration date:</div>
          <div class="font-medium leading-5 grow shrink basis-auto">{{ cardData.expiryDate }}</div>
        </div>
      </div>
    </div>
    <div class="items-stretch flex gap-2 mt-6 self-end">
      <div class="text-gray-500 text-sm font-medium leading-5 grow">Transactions</div>
      <svg
        class="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto"
        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.62012 3.95312L13.6668 7.99979L9.62012 12.0465" stroke="#5E6278" stroke-width="1.5"
          stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2.3335 8L13.5535 8" stroke="#5E6278" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import amexIcon from '@/assets/icons/amex58.svg';
import masterIcon from '@/assets/icons/mastercard58.svg';
import visaIcon from '@/assets/icons/visa58.svg';

const cardData = ref({
  title: 'Card',
  type: 'Visa',
  mask: '••••',
  lastDigits: '2476',
  expiryDate: '05/2026'
});

const cardImg = {
  Mastercard: masterIcon,
  Amex: amexIcon,
  Visa: visaIcon
}
</script>

<style scoped>
</style>
