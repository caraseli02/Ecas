<template>
  <div class="items-stretch shadow-xs bg-white flex w-full w-full lg:max-w-[476px] xl:max-w-[330px] flex-col p-6 rounded-xl">
    <header class="justify-between items-stretch flex gap-5">
      <div class="justify-center items-stretch flex flex-col whitespace-nowrap">
        <div class="text-zinc-800 text-2xl font-semibold leading-7"> € 2,438.77 </div>
        <div class="text-gray-500 text-xs leading-4 mt-1">Available Credit</div>
      </div>
      <a href="#" class="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full self-start" aria-label="Image Link">
         <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c3a48b557f6d75ec713417e01948b264bcfcd72d843a6cb0331258289464d65?apiKey=20497529553648aab918fa2d322ece87&" />
      </a>
    </header>
    <div class="items-stretch bg-gray-200 flex flex-col justify-center mt-6 pr-12 rounded-[100px]">
      <div class="justify-end items-center bg-emerald-500 flex shrink-0 h-3 flex-col rounded-[100px]"></div>
    </div>
    <form class="justify-between items-stretch flex w-full gap-5 mt-4">
      <div class="items-stretch flex justify-between gap-2 text-sm whitespace-nowrap">
        <label for="balance" class="text-gray-500 leading-[143%] grow">Balance:</label>
        <div class="text-zinc-800 font-semibold leading-[143%] grow"> € 7,561.23 </div>
      </div>
      <div class="flex items-center justify-between gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.3335 5.66992L14.6668 5.66992" stroke="#5E6278" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 11.0034H5.33333" stroke="#5E6278" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 11.0034H9.66667" stroke="#5E6278" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.2935 2.33643L11.7002 2.33643C14.0735 2.33643 14.6668 2.92309 14.6668 5.26309L14.6668 10.7364C14.6668 13.0764 14.0735 13.6631 11.7068 13.6631L4.2935 13.6631C1.92683 13.6698 1.3335 13.0831 1.3335 10.7431L1.3335 5.26309C1.3335 2.92309 1.92683 2.33643 4.2935 2.33643Z" stroke="#5E6278" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <button type="submit" class="text-gray-500 text-sm font-medium leading-5 grow whitespace-nowrap"> Pay now </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
