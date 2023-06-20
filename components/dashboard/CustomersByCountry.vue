<template>
  <div class="flex flex-col bg-white rounded-xl p-4 shadow-xs md:p-6">
    <div class="leading-normal font-semibold mb-4 md:mb-6 xl:mb-10">
      Customers by Country
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-[auto,auto] md:justify-between xl:flex-1"
    >
      <div class="md:col-start-1 md:row-start-1 md:mr-[60px] xl:mr-10">
        <div class="flex items-center mb-1">
          <div class="text-2xl leading-[1.17] font-semibold mr-2">
            {{ countryWithMostCustomers?.count }}
          </div>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7"
          >
            <rect y="2.85742" width="20" height="14.2857" rx="4" fill="white" />
            <mask
              id="mask0_801_26126"
              style="mask-type: luminance"
              maskUnits="userSpaceOnUse"
              x="0"
              y="2"
              width="20"
              height="16"
            >
              <path
                d="M0 4.85742C0 3.75285 0.895431 2.85742 2 2.85742H18C19.1046 2.85742 20 3.75285 20 4.85742V15.1431C20 16.2477 19.1046 17.1431 18 17.1431H2C0.895431 17.1431 0 16.2477 0 15.1431V4.85742Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_801_26126)">
              <rect
                x="9.52344"
                y="2.85742"
                width="10.4762"
                height="14.2857"
                fill="#E5253D"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 17.1431H6.66667V2.85742H0V17.1431Z"
                fill="#0A3D9C"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.66797 17.1431H13.3346V2.85742H6.66797V17.1431Z"
                fill="#FFD955"
              />
            </g>
          </svg>
        </div>
        <div class="text-xs leading-[1.67] text-gray-300 mb-4 md:mb-6">
          Country with the most customers
        </div>
      </div>
      <div class="rounded-xl max-md:mb-4 md:col-span-2 md:row-start-2">
        <ClientOnly>
          <DashboardWorld :countries="countries" />
        </ClientOnly>
      </div>
      <div
        class="grid grid-cols-[repeat(2,auto)] gap-4 max-md:px-4 md:gap-x-8 md:gap-y-3 md:col-start-2 md:row-start-1 md:mb-6 md:pl-6 md:border-l md:border-gray-200 xl:gap-x-6 xl:self-start"
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

import {CustomersByCountryInterface} from "~/model/dashboard/response/CustomerInterfaceResponse";
import {fetchCustomersByCountryWidget} from "~/services/dashboard/user.service";

const countries = ref([] as CustomersByCountryInterface[]);
const countryWithMostCustomers = ref({} as CustomersByCountryInterface);

const fetchAndSetCustomersByCountry = async () => {
  const data = await fetchCustomersByCountryWidget();

  if (!data || !data.data) {
    return;
  }

  const widgetData = data?.data?.value as CustomersByCountryInterface;

  countries.value = widgetData?.data;
  countryWithMostCustomers.value = countries?.value[0];
}

await fetchAndSetCustomersByCountry();

</script>
