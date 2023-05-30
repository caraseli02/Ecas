<template>
  <div class="mb-6 md:mb-8">
    <div
      ref="scroll1"
      class="mb-1 rounded-t-lg overflow-x-auto scrollbar-none"
      @scroll="syncScroll(1)"
    >
      <div
        class="grid grid-cols-[359px,154px,254px,244px,129px,148px,104px] items-center rounded-t-lg"
      >
        <div class="p-4 bg-[#F2F2F2] rounded-l-lg">
          <div class="relative">
            <button class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium mr-1">
                Name
              </span>
              <ChevronDownIcon class="w-5 h-5" />
            </button>
          </div>
          <DashboardSearch
            v-model="name"
            placeholder="Search name, email, country, discount"
            size="sm"
            class="w-full"
          />
        </div>
        <div class="p-4 bg-[#F2F2F2]">
          <div class="relative">
            <button class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium mr-1">
                Account
              </span>
              <ChevronDownIcon class="w-5 h-5" />
            </button>
          </div>
          <label class="flex relative w-full">
            <input
              v-model="account"
              type="search"
              placeholder="Select"
              class="w-full border-[1.5px] border-border rounded-lg px-3 py-1.5 pr-10 text-sm placeholder:text-gray-100 transition-colors duration-300 focus:outline-none focus:border-blue"
            />
            <SearchIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-100"
            />
          </label>
        </div>
        <div class="p-4 bg-[#F2F2F2]">
          <div class="relative">
            <button class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium mr-1">
                Company
              </span>
              <ChevronDownIcon class="w-5 h-5" />
            </button>
          </div>
          <DashboardSearch
            v-model="company"
            placeholder="Search company"
            size="sm"
            class="w-full"
          />
        </div>
        <div class="p-4 bg-[#F2F2F2]">
          <div class="relative">
            <button class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium mr-1">
                Registered
              </span>
              <ChevronDownIcon class="w-5 h-5" />
            </button>
          </div>
          <label class="flex relative w-full">
            <input
              v-model="registered"
              type="search"
              placeholder="23/9/2023 - 23/9/2023"
              class="w-full border-[1.5px] border-border rounded-lg px-3 py-1.5 pr-10 text-sm placeholder:text-gray-100 transition-colors duration-300 focus:outline-none focus:border-blue"
            />
            <SearchIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-100"
            />
          </label>
        </div>
        <div class="p-4 bg-[#F2F2F2]">
          <div class="relative">
            <button class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium mr-1">
                Spent
              </span>
              <ChevronDownIcon class="w-5 h-5" />
            </button>
          </div>
          <label class="flex relative w-full">
            <input
              v-model="spent"
              type="search"
              placeholder="Filter"
              class="w-full border-[1.5px] border-border rounded-lg px-3 py-1.5 pr-10 text-sm placeholder:text-gray-100 transition-colors duration-300 focus:outline-none focus:border-blue"
            />
            <SearchIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-100"
            />
          </label>
        </div>
        <div class="p-4 bg-[#F2F2F2]">
          <div class="relative">
            <button class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium mr-1">
                Orders count
              </span>
              <ChevronDownIcon class="w-5 h-5" />
            </button>
          </div>
          <label class="flex relative w-full">
            <input
              v-model="ordersCount"
              type="search"
              placeholder="Filter"
              class="w-full border-[1.5px] border-border rounded-lg px-3 py-1.5 pr-10 text-sm placeholder:text-gray-100 transition-colors duration-300 focus:outline-none focus:border-blue"
            />
            <SearchIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-100"
            />
          </label>
        </div>
        <div class="p-4 w-full rounded-r-lg bg-[#F2F2F2] self-stretch">
          <div class="relative">
            <div class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium"> Actions </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="scroll2"
      class="grid grid-cols-1 gap-1 overflow-x-auto scrollbar-thin"
      @scroll="syncScroll(2)"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="grid grid-cols-[359px,154px,254px,244px,129px,148px,104px] items-center"
      >
        <div class="flex items-center px-4 py-3">
          <img
            :src="item.avatar"
            :alt="item.name"
            class="w-11 h-11 rounded-full object-cover mr-4"
          />
          <div>
            <div class="flex items-center gap-3 mb-1">
              <div class="text-sm leading-[1.43] font-semibold truncate">
                {{ item.name }}
              </div>
              <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
                <FlagIcon class="w-5 h-5" />
                <template #content>
                  <span>Romania</span>
                </template>
              </Tooltip>
              <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
                <div
                  class="bg-blue px-2 rounded-[25px] text-xs leading-[1.67] font-semibold text-white"
                >
                  10%
                </div>
                <template #content>
                  <span
                    >Customer Discount:
                    <strong class="font-semibold">10%</strong></span
                  >
                </template>
              </Tooltip>
            </div>
            <div class="text-xs leading-[1.33] text-gray-300 truncate">
              {{ item.email }}
            </div>
          </div>
        </div>
        <div class="text-sm leading-[1.43] truncate px-4">
          {{ item.account }}
        </div>
        <div class="text-sm leading-[1.43] truncate px-4">
          {{ item.company }}
        </div>
        <div class="text-sm leading-[1.43] truncate px-4">
          {{ item.registered }}
        </div>
        <div class="text-sm leading-[1.43] font-medium truncate px-4">
          {{ item.spent }}
        </div>
        <div class="flex px-4">
          <div
            class="text-sm leading-[1.43] font-medium text-[#006D4D] bg-[#00D39540] px-3 py-1 rounded-md"
          >
            {{ item.ordersCount }}
          </div>
        </div>
        <div class="flex items-center justify-end gap-4 px-4">
          <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
            <button
              class="flex text-gray-300 transition-colors duration-300 hover:text-blue"
            >
              <DocumentIcon class="w-7 h-7" />
            </button>
            <template #content>
              <span>View order</span>
            </template>
          </Tooltip>
          <button
            class="flex text-gray-300 transition-colors duration-300 hover:text-blue"
          >
            <MoreVerticalIcon class="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import FlagIcon from "@/assets/icons/dashboard/ro.svg";
import DocumentIcon from "@/assets/icons/dashboard/document.svg";
import MoreVerticalIcon from "@/assets/icons/dashboard/more-vertical.svg";
import SearchIcon from "@/assets/icons/dashboard/search.svg";
import ChevronDownIcon from "@/assets/icons/dashboard/chevron-down.svg";
import { DashboardItem } from "~~/types";

defineProps({
  items: {
    type: Array as PropType<DashboardItem[]>,
    required: true,
  },
});

const scroll1 = ref<HTMLElement>();
const scroll2 = ref<HTMLElement>();

const syncScroll = (scroll: 1 | 2) => {
  if (scroll === 1 && scroll1.value && scroll2.value) {
    scroll2.value.scrollLeft = scroll1.value.scrollLeft;
  } else if (scroll === 2 && scroll1.value && scroll2.value) {
    scroll1.value.scrollLeft = scroll2.value.scrollLeft;
  }
};

const name = ref("");
const account = ref("");
const company = ref("");
const registered = ref("");
const spent = ref("");
const ordersCount = ref("");
</script>
