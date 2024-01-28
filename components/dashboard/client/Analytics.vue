<template>
  <div class="relative items-stretch shadow-xs bg-white flex min-w-[358px] md:w-full lg:w-fit md:min-w-[476px] xl:min-w-[472px] flex-col p-6 rounded-xl">
    <header class="text-neutral-800 text-base font-semibold leading-6">Analytics</header>
    <div class="items-stretch flex justify-between gap-3 mt-6">
      <div class="justify-between items-stretch flex basis-[0%] flex-col text-xs text-gray-500 whitespace-nowrap pb-8">
        <div class="leading-[133%]">67</div>
        <div class="leading-[133%] mt-4">15</div>
        <div class="leading-[133%] mt-4">10</div>
        <div class="leading-[133%] mt-4">0</div>
      </div>
      <section class="flex flex-col w-full overflow-y-auto scroll-smooth">
        <div class="items-stretch flex grow basis-[0%] flex-col">
          <div class="items-stretch flex gap-0">
            <div class="flex grow basis-[0%] flex-col items-stretch">
              <div class="flex justify-between gap-5 mt-1 items-end ml-1">
                <div class="bg-sky-500 flex w-3 shrink-0 h-24 flex-col mt-4 rounded-[50px] self-start"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-[63px] flex-col mt-12 rounded-[50px] self-end"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-[81px] flex-col mt-8 rounded-[50px] self-end"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-28 flex-col rounded-[50px]"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-[33px] flex-col mt-16 rounded-[50px]"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-12 flex-col mt-12 rounded-[50px]"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-12 flex-col mt-12 rounded-[50px]"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-[81px] flex-col mt-5 rounded-[50px] self-start"></div>
                <div class="bg-sky-500 self-stretch flex w-3 shrink-0 h-[99px] flex-col rounded-[50px]"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-[63px] flex-col mt-9 rounded-[50px]"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-12 flex-col mt-12 rounded-[50px]"></div>
                <div class="bg-sky-500 flex w-3 shrink-0 h-[33px] flex-col mt-16 rounded-[50px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="items-stretch flex gap-1 text-xs text-gray-500 whitespace-nowrap text-center mt-4">
          <div v-for="item in months" :key="item" class="justify-center leading-[133%] flex-1">{{ item }}</div>
        </div>
      </section>
    </div>
    <section
      class="items-stretch ring-1 ring-neutral-300 shadow-xs bg-white flex max-w-[110px] flex-col rounded-lg border-solid absolute right-0">
      <article
        class="items-stretch border-b border-neutral-300 bg-zinc-100 flex w-full flex-col justify-center px-2 py-1 rounded-t-lg border-solid">
        <header class="items-stretch flex justify-between gap-2">
          <span
            class="justify-center items-center bg-sky-500 flex w-2 shrink-0 h-2 flex-col my-auto rounded-[100px]"></span>
          <span class="text-neutral-800 text-sm leading-6 grow">September</span>
        </header>
      </article>
      <div class="text-neutral-800 text-sm leading-6 self-center whitespace-nowrap mt-1">17 Orders</div>
    </section>
  </div>
</template>

<script setup lang="ts">
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
</script>

<style scoped>
</style>
