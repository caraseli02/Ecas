<template>
  <div class="relative flex flex-col bg-white rounded-xl p-6 pr-4 shadow-xs">
    <div class="leading-normal font-semibold mb-6">New Customers</div>
    <div class="grid grid-cols-1 gap-1 mb-6">
      <DashboardNewCustomersItem
        v-for="(person, index) in people"
        :key="index"
        :item="person"
      />
    </div>
    <div class="flex items-center justify-center mt-auto">
      <div />
      <button class="flex items-center">
        <span class="text-sm font-medium left-[1.43] text-gray-300 mr-1">
          View more
        </span>
        <ArrowRightIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowUpIcon from "@/assets/icons/dashboard/arrow-up.svg";
import ChevronIcon from "@/assets/icons/dashboard/chevron-down.svg";
import ArrowRightIcon from "@/assets/icons/dashboard/arrow-right.svg";
import Avatar from "@/assets/icons/dashboard/avatar.png";

const people = ref([
  {
    name: "Madalina Dobrovolski",
    email: "madalina.popescu@company.com",
    avatar: Avatar,
  },
  {
    name: "Madalina Dobrovolski",
    email: "madalina.popescu@company.com",
  },
  {
    name: "Madalina Dobrovolski",
    email: "madalina.popescu@company.com",
    avatar: Avatar,
  },
  {
    name: "Madalina Dobrovolski",
    email: "madalina.popescu@company.com",
    avatar: Avatar,
  },
  {
    name: "Madalina Dobrovolski",
    email: "madalina.popescu@company.com",
    avatar: Avatar,
  },
]);
</script>
