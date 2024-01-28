<template>
  <div class="items-stretch shadow-xs bg-white flex w-full lg:max-w-[476px] xl:max-w-md flex-col p-6 rounded-xl">
    <header class="justify-between items-stretch flex gap-5">
      <div class="text-neutral-800 text-sm font-medium leading-5">Card</div>
      <svg
        class="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#9296AA" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M16.0399 3.01976L8.15988 10.8998C7.85988 11.1998 7.55988 11.7898 7.49988 12.2198L7.06988 15.2298C6.90988 16.3198 7.67988 17.0798 8.76988 16.9298L11.7799 16.4998C12.1999 16.4398 12.7899 16.1398 13.0999 15.8398L20.9799 7.95976C22.3399 6.59976 22.9799 5.01976 20.9799 3.01976C18.9799 1.01976 17.3999 1.65976 16.0399 3.01976Z"
          stroke="#9296AA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899" stroke="#9296AA" stroke-width="1.5"
          stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </header>
    <div class="items-stretch flex justify-between gap-3 mt-6 pr-7">
      <SvgoCardMaster />
      <div class="justify-center items-stretch flex grow basis-[0%] flex-col">
        <div class="items-stretch flex gap-2">
          <div class="text-zinc-800 text-base font-medium leading-5 grow">Mastercard</div>
          <div class="text-zinc-800 text-base font-medium leading-5">
            <span class="font-extrabold">••••</span> 2476
          </div>
          <svg 
          class="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
          width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.6665 9.99984L8.77874 11.9008C9.13832 12.2245 9.697 12.1749 9.994 11.7931L13.3332 7.49984M9.99984 18.3332C14.6022 18.3332 18.3332 14.6022 18.3332 9.99984C18.3332 5.39747 14.6022 1.6665 9.99984 1.6665C5.39747 1.6665 1.6665 5.39747 1.6665 9.99984C1.6665 14.6022 5.39747 18.3332 9.99984 18.3332Z" stroke="#00C088" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="items-stretch flex gap-1 text-sm text-gray-500 mt-1">
          <div class="leading-[143%] shrink basis-auto">Expiration date:</div>
          <div class="font-medium leading-[143%] grow shrink basis-auto">05/2026</div>
        </div>
      </div>
    </div>
    <div class="items-stretch flex gap-2 mt-6 self-end">
      <div class="text-gray-500 text-sm font-medium leading-5 grow">Transactions</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f0b808346ddb0a14bf1ef05ee39580b9ae31f36450613c0d1764efbe128e3e2?apiKey=20497529553648aab918fa2d322ece87&"
        class="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto"
        alt="Transactions Image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
