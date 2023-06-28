<template>
  <div class="relative flex flex-col bg-white rounded-xl p-4 shadow-xs md:p-6">
    <div class="flex items-start justify-between">
      <div class="leading-normal font-semibold">Customers Total</div>
      <div v-if="error" class="flex justify-end w-10 h-10">
        <WarningIcon class="w-6 h-6" />
      </div>
      <div
        v-else
        class="flex items-center justify-center bg-[#00D395] rounded-full w-10 h-10"
      >
        <PeopleIcon class="w-6 h-6" />
      </div>
    </div>
    <template v-if="series.length > 0">
      <div class="flex items-center justify-between -my-1.5">
        <div class="text-4xl leading-normal font-semibold">1832</div>
        <div>
          <ClientOnly>
            <apexchart
              width="170"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </ClientOnly>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <ArrowUpIcon class="w-4 h-4 mr-1" />
          <div class="text-sm leading-[1.43] font-medium text-[#00D395] mr-1">
            3,78%
          </div>
          <button class="flex items-center" @click="showOptions = !showOptions">
            <span class="text-sm left-[1.43] text-gray-300 font-medium mr-1">
              {{ selectedOption }}
            </span>
            <ChevronIcon
              class="w-5 h-5 text-gray-300 transition-transform duration-300"
              :class="[showOptions ? 'rotate-180' : '']"
            />
          </button>
        </div>
        <button class="flex items-center">
          <span class="text-sm font-medium left-[1.43] text-gray-300 mr-1">
            <span class="md:hidden lg:inline-block"> View </span> more
          </span>
          <ArrowRightIcon class="w-4 h-4" />
        </button>
      </div>
    </template>
    <div v-else class="flex flex-col items-center justify-center flex-1">
      <EmojiSadIcon class="w-[52px] h-[52px] mb-4" />
      <div class="text-sm font-medium leading-normal text-gray-100">
        No data available
      </div>
    </div>
    <Transition name="fade-full">
      <div
        v-if="showOptions"
        v-click-outside="() => (showOptions = false)"
        class="absolute z-10 -bottom-0.5 left-0 translate-y-full grid grid-cols-1 gap-1 rounded-lg bg-white p-3 w-[200px] shadow-m"
      >
        <button
          v-for="(option, index) in options"
          :key="index"
          class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
          :class="selectedOption === option ? 'bg-[#F2F2F2] text-blue' : ''"
          @click="
            showOptions = false;
            selectedOption = option;
          "
        >
          <span class="text-sm leading-[1.71] font-medium">{{ option }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import PeopleIcon from "@/assets/icons/dashboard/people.svg";
import ArrowUpIcon from "@/assets/icons/dashboard/arrow-up.svg";
import ChevronIcon from "@/assets/icons/dashboard/chevron-down.svg";
import ArrowRightIcon from "@/assets/icons/dashboard/arrow-right.svg";
import EmojiSadIcon from "@/assets/icons/dashboard/emoji-sad.svg";
import WarningIcon from "@/assets/icons/dashboard/warning.svg";
import type { ApexOptions } from "apexcharts";

const chartOptions: ApexOptions = {
  chart: {
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
    },
    type: "area",
    width: "145px",
    height: "48px",
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
    colors: ["#00D395"],
  },
  fill: {
    type: "solid",
    colors: ["white"],
    opacity: 0,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
};
const series = [
  {
    data: ["-3", "0", "2", "-1", "4", "3", "0", "4", "5"],
  },
];

const showOptions = ref(false);
const selectedOption = ref("This Week");
const options = [
  "Last 24h",
  "This Week",
  "Last 7 Days",
  "Last 30 Days",
  "All Time",
];

const error = ref(false);
</script>
