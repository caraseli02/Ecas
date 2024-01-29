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
      <svg width="58" height="38" viewBox="0 0 58 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="57" height="37" rx="4.5" fill="white"/>
        <rect x="0.5" y="0.5" width="57" height="37" rx="4.5" stroke="#D3D3D3"/>
        <path d="M33.0563 11.138H24.9441V26.862H33.0563V11.138Z" fill="#FF5B5B"/>
        <path d="M25.4593 19C25.458 17.4857 25.7761 15.9909 26.3896 14.6288C27.0031 13.2667 27.8958 12.0729 29.0002 11.138C27.6326 9.97846 25.99 9.25736 24.2604 9.05711C22.5307 8.85687 20.7837 9.18556 19.2191 10.0056C17.6545 10.8257 16.3353 12.1041 15.4123 13.6946C14.4894 15.2851 14 17.1236 14 19C14 20.8764 14.4894 22.7149 15.4123 24.3054C16.3353 25.8959 17.6545 27.1743 19.2191 27.9944C20.7837 28.8144 22.5307 29.1431 24.2604 28.9429C25.99 28.7426 27.6326 28.0215 29.0002 26.862C27.8958 25.927 27.0031 24.7333 26.3896 23.3712C25.7761 22.0091 25.458 20.5143 25.4593 19Z" fill="#E82E2E"/>
        <path d="M44 19C44.0001 20.8763 43.5107 22.7149 42.5878 24.3054C41.6649 25.8959 40.3458 27.1743 38.7812 27.9943C37.2166 28.8144 35.4696 29.1431 33.74 28.9429C32.0104 28.7426 30.3679 28.0215 29.0002 26.862C30.1037 25.9261 30.9957 24.7322 31.6091 23.3703C32.2225 22.0084 32.5412 20.5141 32.5412 19C32.5412 17.4859 32.2225 15.9916 31.6091 14.6297C30.9957 13.2678 30.1037 12.0739 29.0002 11.138C30.3679 9.97846 32.0104 9.25735 33.74 9.05711C35.4696 8.85687 37.2166 9.18558 38.7812 10.0057C40.3458 10.8257 41.6649 12.1041 42.5878 13.6946C43.5107 15.2851 44.0001 17.1237 44 19Z" fill="#FFA133"/>
        <path d="M43.1155 25.1966V24.8747H43.2358V24.8091H42.9294V24.8747H43.0497V25.1966H43.1155ZM43.7105 25.1966V24.8084H43.6166L43.5085 25.0754L43.4004 24.8084H43.3064V25.1966H43.3728V24.9038L43.4741 25.1562H43.5429L43.6442 24.9032V25.1966H43.7105Z" fill="#FFA133"/>
      </svg>
      <div class="justify-center items-stretch flex grow basis-[0%] flex-col">
        <div class="items-stretch flex gap-2">
          <div class="text-zinc-800 text-base font-medium leading-5">Mastercard</div>
          <div class="text-zinc-800 text-base font-medium leading-5">
            <span class="font-extrabold">••••</span> 2476
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
          <div class="font-medium leading-5 grow shrink basis-auto">05/2026</div>
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

</script>

<style scoped>
</style>
