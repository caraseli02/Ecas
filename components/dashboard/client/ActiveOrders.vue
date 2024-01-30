<template>
  <div
    class="justify-between items-stretch shadow-xs bg-white flex w-full lg:w-fit lg:max-w-[476px] xl:min-w-[358px] h-[240px] flex-col p-6 rounded-xl"
  >
    <div class="items-stretch flex justify-between gap-4">
      <div class="justify-center items-stretch flex grow basis-[0%] flex-col">
        <div class="text-neutral-800 text-base font-semibold leading-6 flex justify-between">
          Active Orders
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99984 9.99984H9.49984C9.49984 10.2151 9.63755 10.4061 9.84172 10.4742L9.99984 9.99984ZM10.4998 5.83317C10.4998 5.55703 10.276 5.33317 9.99984 5.33317C9.72369 5.33317 9.49984 5.55703 9.49984 5.83317H10.4998ZM12.3417 11.3075C12.6037 11.3948 12.8869 11.2533 12.9742 10.9913C13.0615 10.7293 12.9199 10.4462 12.658 10.3588L12.3417 11.3075ZM10.4998 9.99984V5.83317H9.49984V9.99984H10.4998ZM9.84172 10.4742L12.3417 11.3075L12.658 10.3588L10.158 9.5255L9.84172 10.4742ZM17.8332 9.99984C17.8332 14.3261 14.3261 17.8332 9.99984 17.8332V18.8332C14.8784 18.8332 18.8332 14.8784 18.8332 9.99984H17.8332ZM9.99984 17.8332C5.67361 17.8332 2.1665 14.3261 2.1665 9.99984H1.1665C1.1665 14.8784 5.12132 18.8332 9.99984 18.8332V17.8332ZM2.1665 9.99984C2.1665 5.67361 5.67361 2.1665 9.99984 2.1665V1.1665C5.12132 1.1665 1.1665 5.12132 1.1665 9.99984H2.1665ZM9.99984 2.1665C14.3261 2.1665 17.8332 5.67361 17.8332 9.99984H18.8332C18.8332 5.12132 14.8784 1.1665 9.99984 1.1665V2.1665Z" fill="#5E6278"/>
          </svg>
        </div>
        <div class="flex gap-2 mt-6 flex-wrap">
            <div
              v-for="item in items"
              :key="item"
              class="w-fit text-gray-500 hover:text-sky-500 text-[12px] leading-5 font-medium flex justify-center items-center bg-gray-200 px-[6px] rounded-3xl"
            >
              {{ item }}
            </div>
        </div>

      </div>
    </div>
    <div class="items-stretch flex justify-between gap-3 mt-10">
      <button
        class="justify-between items-stretch bg-green-600 flex gap-2 px-4 py-2 rounded-lg w-full"
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
      </button>
      <button
        class="justify-between items-stretch bg-blue-500 flex gap-2 px-5 py-2 rounded-lg w-full"
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
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ["M-100003", "S-100004", "M-100003", "S-100004", "M-100003", "S-100004", "M-100003", "S-100004", "M-100003", "S-100004"]
</script>

<style scoped>

</style>
