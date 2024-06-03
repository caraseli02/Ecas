<template>
    <div class="flex gap-9 max-md:flex-col max-md:gap-0">
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col grow text-sm font-semibold leading-5 text-neutral-700 max-md:mt-9 max-md:max-w-full">
          <h2 class="text-base leading-7 max-md:max-w-full">Customer Details</h2>
          <p class="mt-9 leading-6 max-md:max-w-full">Madalina Popescu</p>
          <p class="mt-2 font-medium text-gray-500 max-md:max-w-full">
            madalina.popescu@company.com
          </p>
          <p class="mt-2 font-medium text-gray-500 max-md:max-w-full">
            +40 (742) 624 425
          </p>
        </div>
      </div>
      <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div class="flex flex-col max-md:mt-9 max-md:max-w-full">
          <h2 class="text-base font-semibold leading-7 text-neutral-700 max-md:max-w-full">
            Payment Method
          </h2>
          <div v-if="false" class="flex gap-2 self-start pr-8 mt-9 max-md:pr-5">
            <p class="text-sm font-medium leading-6 text-gray-500">Visa</p>
            <p class="text-sm font-medium leading-6 text-gray-500">**73</p>
            <div
              class="flex justify-center items-center px-1 py-2 bg-violet-100 rounded border border-gray-300 border-solid shadow-xl">
              <img
loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e53ea3231ba188441a6034265f4f0ada066f8bb4f5df5f996b3b263a866e52a9?apiKey=20497529553648aab918fa2d322ece87&"
                alt="Visa logo" class="w-6 aspect-[3.03] fill-blue-700" />
            </div>
          </div>
          <UiDropdownMenu v-if="true">
            <UiDropdownMenuTrigger class="w-fit flex items-center gap-2 mt-9">Credit
              <InfoIcon class="w-4 h-4 stroke-1" />
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="p-4">
              <article class="flex flex-col w-full max-w-[261px]">
                <header class="flex gap-4 justify-between w-full text-sm font-medium leading-6 text-neutral-800">
                  <h2>Credit Info</h2>
                  <SettingsIcon class="shrink-0 self-start w-5 aspect-square stroke-1.5" />
                </header>
                <section class="flex gap-5 justify-between mt-4 text-xs leading-5 text-gray-500 rounded-lg">
                  <div class="flex flex-col justify-center">
                    <h3>Credit Limit</h3>
                    <p class="mt-1 font-medium text-neutral-800">€ 10,000.00</p>
                    <h3 class="mt-4">Till Due</h3>
                    <p class="mt-1 font-medium text-neutral-800">42 Days</p>
                  </div>
                  <div class="flex flex-col justify-center">
                    <h3>Credit Term</h3>
                    <p class="mt-1 font-medium text-neutral-800">60 Days</p>
                    <h3 class="mt-4">Total Spent</h3>
                    <p class="mt-1 font-medium text-neutral-800">€ 7,561.23</p>
                  </div>
                  <div class="flex flex-col justify-center">
                    <h3>Due Date</h3>
                    <p class="mt-1 font-medium text-neutral-800">26 Sep 2023</p>
                    <h3 class="mt-4">Available</h3>
                    <p class="mt-1 font-medium text-red-500">€ 2,438.77</p>
                  </div>
                </section>
              </article>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { InfoIcon, SettingsIcon } from 'lucide-vue-next';

</script>

<style scoped>

</style>
