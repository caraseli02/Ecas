<script setup lang="ts">
import { DotsVerticalIcon } from '@radix-icons/vue';
import { MapPin } from 'lucide-vue-next';
</script>

<template>
  <section class="flex flex-col">
    <div class="flex justify-end flex-wrap gap-3 items-center w-full max-md:max-w-full">
      <div class="flex gap-3 items-center self-stretch my-auto text-sm leading-none">
        <h2 class="self-stretch my-auto text-gray-500">Order Status</h2>
        <div class="flex overflow-hidden gap-2 justify-center items-center self-stretch my-auto whitespace-nowrap rounded-md text-zinc-800">
          <span class="flex shrink-0 self-stretch my-auto w-3 h-3 bg-emerald-500 rounded-full fill-emerald-500" aria-hidden="true"></span>
          <span>Completed</span>
        </div>
      </div>
      <div class="flex gap-3 items-center self-stretch my-auto">
        <UiButton size="xs" class="flex overflow-hidden justify-center items-center self-stretch px-4 py-0 my-auto text-sm font-medium leading-6 text-white bg-sky-500 rounded-md">
          <MapPin class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
          <span class="self-stretch py-1 pl-2 my-auto">Track Order</span>
        </UiButton>
        <button class="flex overflow-hidden justify-center items-center self-stretch p-1 my-auto w-8 h-8 rounded-md bg-zinc-100" aria-label="Additional options">
          <DotsVerticalIcon alt="" class="object-contain self-stretch my-auto w-6 aspect-square" />
        </button>
      </div>
    </div>
    <div class="flex flex-wrap gap-10 justify-between items-start p-4 mt-4 w-full rounded-lg border border-solid bg-stone-50 border-grey-300 max-md:max-w-full">
      <div class="flex gap-4 items-center min-h-[20px]">
        <span class="self-stretch my-auto text-sm leading-none text-gray-500">Order Type</span>
        <div class="flex overflow-hidden gap-2 justify-center items-center self-stretch my-auto rounded-md">
          <span class="overflow-hidden self-stretch p-0.5 my-auto w-4 h-4 text-xs font-medium leading-none text-center text-white whitespace-nowrap bg-emerald-500 rounded-[100px]">S</span>
          <span class="self-stretch my-auto text-sm leading-none text-zinc-800">Stock Order</span>
        </div>
      </div>
      <div class="flex gap-3 items-center text-sm leading-none min-h-[20px]">
        <span class="self-stretch my-auto text-gray-500">Payment Status</span>
        <div class="flex overflow-hidden gap-2 justify-center items-center self-stretch my-auto whitespace-nowrap rounded-md text-zinc-800">
          <span class="flex shrink-0 self-stretch my-auto w-3 h-3 bg-emerald-500 rounded-full fill-emerald-500" aria-hidden="true"></span>
          <span>Card</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
