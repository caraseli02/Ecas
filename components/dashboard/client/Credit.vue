<template>
  <div
    class="items-stretch shadow-xs bg-white flex w-full lg:max-w-[476px] xl:max-w-[330px] flex-col p-6 rounded-xl">
    <header class="justify-between items-stretch flex gap-5">
      <div class="justify-center items-stretch flex flex-col whitespace-nowrap">
        <div class="text-zinc-800 text-2xl font-semibold leading-7"> € {{ availableCredit }} </div>
        <div class="text-gray-500 text-xs leading-4 mt-1">Available Credit</div>
      </div>
      <button>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10.2002 4.80001C10.2002 3.80589 11.0061 3 12.0002 3C12.9943 3 13.8002 3.80589 13.8002 4.80001C13.8002 5.79413 12.9943 6.60003 12.0002 6.60003C11.0061 6.60003 10.2002 5.79413 10.2002 4.80001ZM10.2002 12C10.2002 11.0059 11.0061 10.2 12.0002 10.2C12.9944 10.2 13.8002 11.0059 13.8002 12C13.8002 12.9941 12.9944 13.8 12.0002 13.8C11.0061 13.8 10.2002 12.9941 10.2002 12ZM12.0002 17.4C11.0061 17.4 10.2002 18.2059 10.2002 19.2C10.2002 20.1941 11.0061 21 12.0002 21C12.9944 21 13.8002 20.1941 13.8002 19.2C13.8002 18.2059 12.9944 17.4 12.0002 17.4Z"
            fill="#9396A5" />
        </svg>
      </button>
    </header>
    <div class="items-stretch bg-gray-200 flex flex-col justify-center mt-6 pr-12 rounded-[100px]">
      <div class="justify-end items-center bg-green-500 flex shrink-0 h-3 flex-col rounded-[100px]"></div>
    </div>
    <form class="justify-between items-stretch flex w-full gap-5 mt-4">
      <div class="items-stretch flex justify-between gap-2 text-sm whitespace-nowrap">
        <label for="balance" class="text-gray-500 leading-5 grow">Balance:</label>
        <div class="text-zinc-800 font-semibold leading-5 grow"> € {{ balance }} </div>
      </div>
      <div class="flex items-center justify-between gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.3335 5.66992L14.6668 5.66992" stroke="#5E6278" stroke-miterlimit="10" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M4 11.0034H5.33333" stroke="#5E6278" stroke-miterlimit="10" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M7 11.0034H9.66667" stroke="#5E6278" stroke-miterlimit="10" stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M4.2935 2.33643L11.7002 2.33643C14.0735 2.33643 14.6668 2.92309 14.6668 5.26309L14.6668 10.7364C14.6668 13.0764 14.0735 13.6631 11.7068 13.6631L4.2935 13.6631C1.92683 13.6698 1.3335 13.0831 1.3335 10.7431L1.3335 5.26309C1.3335 2.92309 1.92683 2.33643 4.2935 2.33643Z"
            stroke="#5E6278" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <button type="submit" class="text-gray-500 text-sm font-medium leading-5 grow whitespace-nowrap hover:text-blue-500"> Pay now
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const availableCredit = '2,438.77'
const balance = '7,561.23'
</script>

<style scoped>
</style>
