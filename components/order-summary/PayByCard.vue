<template>
  <button
    class="p-3 w-full min-w-[326px] flex flex-col gap-2.5 border rounded-lg hover:bg-[#007FFF0D] hover:border-[#007FFF] transition duration-300 group"
    :class="isSelected ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#D4D4D4] bg-[#FFF]'"
    @click="emit('selectPaymentOption', 'Card')">
    <div class="flex flex-row justify-between w-full gap-3">
      <SvgoRadioButtonChecked v-if="isSelected"
        class="w-5 h-5 my-[3px] text-[#007FFF] group-hover:text-[#007FFF] transition duration-300" />
      <SvgoRadioButton v-else
        class="w-5 h-5 my-[3px] text-[#D4D4D4] group-hover:text-[#5E6278] transition duration-300" />
      <div v-if="hasCard" class="justify-between items-center self-stretch flex gap-5 w-full">
        <span class="items-stretch flex gap-2 my-auto">
          <div class="text-zinc-800 text-sm font-medium leading-6 whitespace-nowrap">
            Visa
          </div>
          <div class="flex items-center gap-2 text-zinc-800 text-sm font-medium leading-6 grow whitespace-nowrap">
            <span class="font-extrabold">••••</span>
            <span class="">4973</span>
            <SvgoGreenCheckCircleSmall v-if="isSelected" />
          </div>
        </span>
        <img loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4362443d7f7a173cc25718b5bdfd3f9f96a73ab8860f5e9ac6ce0e6a23d17994?apiKey=20497529553648aab918fa2d322ece87&"
          class="aspect-[1.57] object-contain object-center w-11 fill-white stroke-[1px] stroke-gray-300 overflow-hidden self-stretch shrink-0 max-w-full" />
      </div>
      <SvgoCardIcon v-else />
    </div>
    <div v-if="view === 'payment'" class="flex justify-between w-full">
      <span class="text-neutral-700 text-sm font-normal leading-6">Pay by card</span>
      <div class="flex gap-2 items-center">
        <SvgoChangeCard />
        <span class="text-neutral-700 text-sm font-normal leading-6">Change card</span>
      </div>
    </div>
    <div v-if="view === 'modal'" class="flex justify-end w-full gap-6">
      <span v-if="isExpired" class="items-center flex justify-start gap-2 w-full">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="9.99984" cy="14.1666" rx="0.833333" ry="0.833333" fill="#FA4B4B" />
            <path
              d="M9.99979 7.49997V11.6666M3.60641 17.5H16.3933C17.8703 17.5 18.8039 15.9527 18.0866 14.6937L11.6932 3.4716C10.9551 2.17613 9.04454 2.17613 8.30649 3.4716L1.91306 14.6937C1.19576 15.9527 2.12939 17.5 3.60641 17.5Z"
              stroke="#FA4B4B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <div class="text-red-500 text-sm leading-6">Card expired</div>
      </span>
      <div v-if="!isSelected && !isExpired" class="flex gap-2 items-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_397_5131)">
            <path
              d="M5.3335 7.99992L7.02328 9.52073C7.31095 9.77963 7.75789 9.73998 7.9955 9.43449L10.6668 5.99992M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31827 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31827 14.6666 8.00016 14.6666Z"
              stroke="#2D2D2D" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_397_5131">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span class="text-neutral-700 text-sm font-normal leading-6">Set as default</span>
      </div>
      <div class="flex gap-2 items-center">
        <SvgoChangeCard />
        <span class="text-neutral-700 text-sm font-normal leading-6">Edit</span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  selectPaymentOption: [val: 'Card']
}>()
defineProps<{
  isSelected?: boolean
  hasCard?: boolean;
  view: 'modal' | 'payment'
  isExpired?: boolean;
}>()
</script>

<style scoped>
</style>
