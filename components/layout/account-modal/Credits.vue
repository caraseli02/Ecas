<template>
  <div class="items-stretch self-stretch bg-neutral-100 flex flex-col p-3 rounded-xl">
    <div class="justify-between items-stretch flex gap-5 px-0.5">
      <div class="text-neutral-800 text-xs font-medium leading-4 whitespace-nowrap">
        Available Credit
      </div>
      <div class="text-neutral-800 text-xs font-semibold leading-4 whitespace-nowrap">
        € 10,000
      </div>
    </div>
    <div class="bg-gray-200 flex items-start justify-start shrink-0 h-4 flex-col mt-3 rounded-full">
      <div class="bg-green rounded-full text-xs leading-none h-full z-10" style="width: 50%"></div>
    </div>
    <div class="justify-between items-stretch flex w-full gap-5 mt-3 px-0.5">
      <div class="items-stretch flex justify-between gap-1">
        <div class="text-gray-500 text-xs font-medium leading-5 whitespace-nowrap">
          Spent:
        </div>
        <div class="text-gray-500 text-xs font-medium leading-5 whitespace-nowrap">
          € 0.00
        </div>
      </div>
      <div class="items-stretch flex justify-between gap-2">
        <div class="text-sky-500 text-sm font-medium leading-5 grow whitespace-nowrap">
          View more
        </div>
        <ArrowRightIcon
          class="w-4 h-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@/assets/icons/menu/arrow-right.svg';

</script>

<style scoped>
</style>
