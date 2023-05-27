<template>
  <div
    class="flex flex-col bg-white rounded-xl p-6 pr-4"
    :style="{
      boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
    }"
  >
    <div class="leading-normal font-semibold mb-6">New Customers</div>
    <div class="grid grid-cols-1 gap-1 mb-6">
      <div
        v-for="(person, index) in people"
        :key="index"
        class="group flex items-center justify-between py-2"
      >
        <div class="flex items-center">
          <img
            :src="person.avatar"
            :alt="person.name"
            class="w-11 h-11 rounded-full object-cover mr-3"
          />
          <div class="truncate">
            <div
              class="text-sm leading-[1.43] font-semibold truncate mb-1 transition-colors duration-300 group-hover:text-blue"
            >
              {{ person.name }}
            </div>
            <div class="text-xs leading-[1.67] text-gray-300 truncate">
              {{ person.email }}
            </div>
          </div>
        </div>
        <button
          class="flex text-[#9296AA] transition-colors duration-300 hover:text-blue"
        >
          <MoreVerticalIcon class="w-7 h-7" />
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between mt-auto">
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
import MoreVerticalIcon from "@/assets/icons/dashboard/more-vertical.svg";
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
  {
    name: "Madalina Dobrovolski",
    email: "madalina.popescu@company.com",
    avatar: Avatar,
  },
]);
</script>
