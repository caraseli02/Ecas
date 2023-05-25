<template>
  <div
    class="bg-white rounded-xl p-4 md:p-6"
    :style="{
      boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
    }"
  >
    <div class="leading-normal font-semibold mb-4 md:mb-6 xl:mb-10">
      Customers by Country
    </div>
    <div class="grid grid-cols-1 md:grid-cols-[auto,auto] md:justify-between">
      <div class="md:col-start-1 md:row-start-1 md:mr-[60px]">
        <div class="flex items-center mb-1">
          <div class="text-2xl leading-[1.17] font-semibold mr-2">
            {{ countryWithMostCustomers?.count }}
          </div>
          <FlagIcon class="w-7 h-7" />
        </div>
        <div class="text-xs leading-[1.67] text-gray-300 mb-4 md:mb-6">
          Country with the most customers
        </div>
      </div>
      <div class="rounded-xl max-md:mb-4 md:col-span-2 md:row-start-2">MAP</div>
      <div
        class="grid grid-cols-[repeat(2,auto)] gap-4 max-md:px-4 md:gap-x-8 md:gap-y-3 md:col-start-2 md:row-start-1 md:mb-6 md:pl-6 md:border-l md:border-gray-200 xl:gap-x-6"
      >
        <div
          v-for="(country, index) in countries"
          :key="index"
          class="flex items-center gap-2"
        >
          <div
            class="w-3 h-3 rounded-full flex-shrink-0"
            :style="{ backgroundColor: country.theme }"
          />
          <div
            class="text-xs leading-normal text-gray-300"
            :class="[
              countryWithMostCustomers?.label === country.label
                ? 'font-semibold'
                : '',
            ]"
          >
            {{ country.label }}
          </div>
          <div class="text-xs leading-normal text-gray-300 font-semibold">
            {{ country.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FlagIcon from "@/assets/icons/flags/ron.svg";

const countries = [
  {
    label: "United States",
    count: 741,
    theme: "#007FFF",
  },
  {
    label: "United Kingdom",
    count: 654,
    theme: "#A460BC",
  },
  {
    label: "Italy",
    count: 63,
    theme: "#FFC542",
  },
  {
    label: "Romania",
    count: 1832,
    theme: "#00D395",
  },
];

const countryWithMostCustomers = computed(() => {
  let highestCountCountry = null;
  let highestCount = 0;

  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    if (country.count > highestCount) {
      highestCount = country.count;
      highestCountCountry = country;
    }
  }

  return highestCountCountry;
});
</script>
