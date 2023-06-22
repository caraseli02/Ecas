<template>
  <div
    class="relative flex flex-col bg-white rounded-xl p-4 pb-5 pr-2 shadow-xs md:p-6 md:pr-3 md:pb-8"
  >
    <div class="leading-normal font-semibold mb-6 md:mb-7">New Customers</div>
    <div class="grid grid-cols-1 gap-4">
      <DashboardNewCustomersItem
        v-for="(person, index) in people"
        :key="index"
        :item="person"
      />
    </div>
    <div class="items-center justify-center mt-auto hidden">
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
