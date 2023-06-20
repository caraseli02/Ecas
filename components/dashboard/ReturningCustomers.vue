<template>
  <div class="relative bg-white rounded-xl p-4 shadow-xs md:p-6">
    <div class="flex items-start justify-between">
      <div class="leading-normal font-semibold">Returning Customers</div>
      <div
        class="flex items-center justify-center bg-[#FA4B4B] rounded-full w-10 h-10"
      >
        <PeopleIcon class="w-6 h-6" />
      </div>
    </div>
    <div class="flex items-center justify-between -my-1.5">
      <div class="text-4xl leading-normal font-semibold">{{ total }}</div>
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
        <ArrowUpIcon v-if="delta >= 0" class="w-4 h-4 mr-1" />
        <ArrowDownIcon v-if="delta < 0" class="w-4 h-4 mr-1" />
        <div class="text-sm leading-[1.43] font-medium mr-1"
             :class="{'text-[#FA4B4B]': delta < 0, 'text-[#00D395]': delta > 0}">
          {{ delta + '%' }}
        </div>
        <button class="flex items-center" @click="showOptions = !showOptions">
          <span class="text-sm left-[1.43] text-gray-300 font-medium mr-1">
            {{ selectedOption.label }}
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
    <Transition name="fade">
      <div
        v-if="showOptions"
        v-click-outside="() => (showOptions = false)"
        class="absolute z-10 -bottom-0.5 left-0 translate-y-full grid grid-cols-1 gap-1 rounded-lg bg-white p-3 w-[200px] shadow-m"
      >
        <button
          v-for="(option, index) in options"
          :key="index"
          class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
          :class="selectedOption.label === option.label ? 'bg-[#F2F2F2] text-blue' : ''"
          @click="
            showOptions = false;
            selectedOption = option;
          "
        >
          <span class="text-sm leading-[1.71] font-medium">{{ option.label }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import PeopleIcon from "@/assets/icons/dashboard/people.svg";
import ArrowDownIcon from "@/assets/icons/dashboard/arrow-down.svg";
import ArrowUpIcon from "@/assets/icons/dashboard/arrow-up.svg";
import ChevronIcon from "@/assets/icons/dashboard/chevron-down.svg";
import ArrowRightIcon from "@/assets/icons/dashboard/arrow-right.svg";

import type { ApexOptions } from "apexcharts";
import {
  ReturningCustomersInterface,
} from "~/model/dashboard/response/CustomerInterfaceResponse";
import {fetchReturningCustomersWidget} from "~/services/dashboard/user.service";
import {differenceInDays, startOfISOWeek} from "date-fns";

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
    colors: ["#FA4B4B"],
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

const showOptions = ref(false);
const selectedOption = ref({label: "Last 7 Days", time: 7});

const start = startOfISOWeek(Date.now());
const thisWeekDifference = differenceInDays(Date.now(), start);

const options = [
  {label: "Last 24h", time: 1},
  {label: "This Week", time: thisWeekDifference},
  {label: "Last 7 Days", time: 7},
  {label: "Last 30 Days", time: 30},
  {label: "All Time", time: -1},
];

let series = ref([]);
let total = ref(0);
let delta = ref(0);

const fetchAndSetReturningCustomers = async (time = 7) => {
  const data = await fetchReturningCustomersWidget(time);

  if (!data || !data.data) {
    return;
  }

  const widgetData = data?.data?.value as ReturningCustomersInterface;

  series.value = widgetData?.data.series;
  total.value = widgetData?.data.total;
  delta.value = widgetData?.data.delta;
}

await fetchAndSetReturningCustomers(selectedOption.time);

watch([selectedOption], async ([newSelectedOption]) => {
  await fetchAndSetReturningCustomers(newSelectedOption.time);
});
</script>
