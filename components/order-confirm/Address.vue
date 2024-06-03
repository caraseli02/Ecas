<template>
    <div class="flex gap-9 max-md:flex-col max-md:gap-0">
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col grow max-md:mt-9 max-md:max-w-full">
          <h2 class="text-base font-semibold leading-7 text-neutral-700 max-md:max-w-full">
            Shipping Address
          </h2>
          <div class="flex gap-5 justify-between mt-9 w-full max-md:flex-wrap max-md:max-w-full">
            <h3 class="text-sm font-semibold leading-6 text-neutral-700">Address Alias 1</h3>
            <div
              class="flex gap-1 justify-center px-2 py-1 text-xs font-medium leading-4 text-emerald-500 whitespace-nowrap bg-white border border-emerald-500 border-solid rounded-[100px]">
              <img
loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f56331855d63b16575002768f1107fd33b48669e6ae764671dbd605ad6de81dc?apiKey=20497529553648aab918fa2d322ece87&"
                alt="" class="shrink-0 w-4 aspect-square" />
              <span>Default</span>
            </div>
          </div>
          <p class="mt-2 text-sm font-medium leading-5 text-gray-500 max-md:max-w-full">
            5073 Mark Brown Rd
          </p>
          <p class="mt-2 text-sm font-medium leading-5 text-gray-500 max-md:max-w-full">
            NE Dalton, Georgia (GA)
          </p>
          <p class="mt-2 text-sm font-medium leading-5 text-gray-500 max-md:max-w-full">
            30721, United States
          </p>
        </div>
      </div>
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col px- text-sm font-medium leading-5 text-gray-500 max-md:mt-9 max-md:max-w-full">
          <h2 class="text-base font-semibold leading-7 text-neutral-700 max-md:max-w-full">
            Billing Address
          </h2>
          <p class="mt-9 max-md:max-w-full">5073 Mark Brown Rd</p>
          <p class="mt-2 max-md:max-w-full">NE Dalton, Georgia (GA)</p>
          <p class="mt-2 max-md:max-w-full">30721, United States</p>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
