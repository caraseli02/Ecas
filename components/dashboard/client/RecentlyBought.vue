<template>
  <div class="h-[474px] max-w-[330px] items-stretch shadow-xs bg-white hidden lg:flex flex-col p-6 rounded-xl">
    <header class="text-zinc-800 text-base font-semibold leading-6">Recently Bought</header>
    <section class="w-[282px] h-[312px] overflow-hidden flex flex-col gap-7 mt-8 ">
      <div v-for="item in 5" :key="item" class="items-stretch flex justify-between gap-3">
        <div
          class="justify-center items-center border border-neutral-300 flex aspect-square flex-col w-10 h-10 rounded-lg border-solid">
          <SvgoNotFound class="w-10 h-10" />
        </div>
        <div class="items-stretch flex grow basis-[0%] flex-col whitespace-nowrap max-w-[230px]">
          <div class="text-neutral-800 text-sm font-semibold leading-4 text-ellipsis overflow-hidden">RSCSK3343R3D02008T
          </div>
          <div class="overflow-hidden text-gray-500 text-ellipsis text-xs leading-4 mt-2 inline">
            Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW
          </div>
        </div>
      </div>
    </section>
    <div class="self-end align-end flex justify-end items-end gap-2 h-fit grow">
      <a href="..." class="text-gray-500 text-sm font-medium leading-5 grow whitespace-nowrap"
        aria-label="View Orders">View Orders</a>
      <svg 
        class="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden shrink-0 max-w-full mb-0.5"
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

</script>

<style scoped>
</style>
