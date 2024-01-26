<template>
  <div
    class="justify-between items-stretch shadow-sm bg-white flex max-w-[342px] flex-col p-6 rounded-xl"
  >
    <div class="items-stretch flex justify-between gap-4">
      <div
        class="justify-center items-center bg-sky-500 bg-opacity-30 flex aspect-square flex-col w-14 h-14 px-2 rounded-[100px] self-start"
      >
        <div
          class="justify-center items-center bg-sky-500 flex aspect-square flex-col w-full h-10 px-2 rounded-[100px]"
        >
        <svg
          class="aspect-square object-contain object-center w-full justify-center items-center overflow-hidden"
          width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 13H12" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 17H16" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
      </div>
      <div class="justify-center items-stretch flex grow basis-[0%] flex-col">
        <div class="text-neutral-800 text-base font-semibold leading-6">
          Active Orders
        </div>
        <div class="grid grid-cols-3 gap-2 mt-2 flex-wrap">
          <div class="text-gray-500 text-sm leading-5 grow whitespace-nowrap">
            Order ID:
          </div>
            <div
              v-for="item in items"
              :key="item"
              class="text-gray-500 hover:text-sky-500 text-[11px] font-medium flex justify-center items-center bg-gray-200 px-1.5 rounded-3xl"
            >
              {{ item }}
            </div>
        </div>

      </div>
    </div>
    <div class="items-stretch flex justify-between gap-3 mt-10">
      <div
        class="justify-between items-stretch bg-emerald-500 flex gap-2 px-4 py-2 rounded-lg"
      >
      <svg 
        class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
        <path d="M20 7L12 11L4 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.6246 4.66762L13.6246 2.35827C12.5903 1.88058 11.4097 1.88058 10.3754 2.35827L5.37545 4.66762C3.93093 5.33479 3 6.82344 3 8.46617V15.5338C3 17.1766 3.93094 18.6652 5.37545 19.3324L10.3754 21.6417C11.4097 22.1194 12.5903 22.1194 13.6246 21.6417L18.6246 19.3324C20.0691 18.6652 21 17.1766 21 15.5338V8.46617C21 6.82344 20.0691 5.33479 18.6246 4.66762Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 11V22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div
          class="text-white text-sm font-medium leading-6 grow whitespace-nowrap"
        >
          All Active
        </div>
      </div>
      <div
        class="justify-between items-stretch bg-sky-500 flex gap-2 px-5 py-2 rounded-lg"
      >
      <svg 
        class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="9" r="3" stroke="white" stroke-width="1.5"/>
        <path d="M16.0016 14C16.6045 12.6793 17 11.3127 17 10C17 4.47715 13.866 2 10 2C6.13401 2 3 4.47715 3 10C3 13.2811 5.47059 16.8989 7.47627 19.2954C8.81698 20.8973 11.183 20.8973 12.5237 19.2954C12.6801 19.1085 12.8393 18.9142 13 18.7133M16.0016 14H15C13.8954 14 13 14.8954 13 16V18.7133M16.0016 14H19C20.1046 14 21 14.8954 21 16V20C21 21.1046 20.1046 22 19 22H15C13.8954 22 13 21.1046 13 20V18.7133" stroke="white" stroke-width="1.5"/>
        <path d="M18 17L16 17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
        <div
          class="text-white text-sm font-medium leading-6 grow whitespace-nowrap"
        >
          Track Order
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ["M-100003", "S-100004", "M-100003", "S-100004", "M-100003", "S-100004", "M-100003", "S-100004"]
</script>

<style scoped>

</style>
