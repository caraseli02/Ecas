<template>
  <div
    class="bg-white rounded-xl p-4 md:p-6"
    :style="{
      boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
    }"
  >
    <div class="flex items-start justify-between mb-7">
      <div class="leading-normal font-semibold">Customers Total</div>
      <div
        class="flex items-center justify-center bg-[#00D395] rounded-full w-10 h-10"
      >
        <PeopleIcon class="w-6 h-6" />
      </div>
    </div>
    <div class="flex items-center justify-between mb-7">
      <div class="text-4xl leading-normal font-semibold">1832</div>
      <div>CHART</div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <ArrowUpIcon class="w-4 h-4 mr-1" />
        <div class="text-sm leading-[1.43] font-medium text-[#00D395] mr-1">
          3,78%
        </div>
        <button class="flex items-center">
          <span class="text-sm left-[1.43] text-gray-300 mr-1">This week</span>
          <ChevronIcon class="w-5 h-5 text-gray-300" />
        </button>
      </div>
      <button class="flex items-center">
        <span class="text-sm font-medium left-[1.43] text-gray-300 mr-1">
          <span class="md:hidden lg:inline-block"> View </span> more
        </span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PeopleIcon from "@/assets/icons/dashboard/people.svg";
import ArrowUpIcon from "@/assets/icons/dashboard/arrow-up.svg";
import ChevronIcon from "@/assets/icons/dashboard/chevron-down.svg";
import ArrowRightIcon from "@/assets/icons/dashboard/arrow-right.svg";
</script>
