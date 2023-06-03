<template>
  <div class="mb-6 md:mb-8">
    <div
      class="grid grid-cols-1 gap-1 rounded-t-lg overflow-x-auto scrollbar-thin"
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
            <ChevronDownIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-300"
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
            <CelandarIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-300"
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
            <FilterIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-300"
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
            <FilterIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-300"
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
      <div
        v-for="(item, index) in items"
        :key="index"
        class="grid grid-cols-[359px,154px,254px,244px,129px,148px,104px] items-center"
      >
        <div class="px-4 py-3">
          <NuxtLink to="/" class="group/link flex items-center">
            <div
              class="relative flex items-center justify-center rounded-full overflow-hidden w-11 h-11 flex-shrink-0 mr-4 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:border-2 after:border-blue after:opacity-0 after:transition-opacity after:duration-300 group-hover/link:after:opacity-100"
              :class="[index === 3 ? 'bg-gray-200' : '']"
            >
              <img
                v-if="index !== 3"
                :src="item.avatar"
                :alt="item.name"
                class="w-full h-full rounded-full object-cover"
              />
              <UserIcon v-else class="w-7 h-7 text-gray-100" />
            </div>
            <div class="w-[calc(100%-60px)]">
              <div class="flex items-center gap-3 mb-1">
                <div
                  class="text-sm leading-[1.43] font-semibold truncate transition-colors duration-300 group-hover/link:text-blue"
                >
                  {{ item.name }}
                </div>
                <div class="flex items-center gap-3 cursor-default">
                  <Tooltip
                    :position="index === 0 ? 'bottom' : 'top'"
                    theme="black"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5"
                    >
                      <rect
                        y="2.85742"
                        width="20"
                        height="14.2857"
                        rx="4"
                        fill="white"
                      />
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
                    <template #content>
                      <span>Romania</span>
                    </template>
                  </Tooltip>
                  <Tooltip
                    :position="index === 0 ? 'bottom' : 'top'"
                    theme="black"
                  >
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
              </div>
              <div class="text-xs leading-[1.33] text-gray-300 truncate">
                {{ item.email }}
              </div>
            </div>
          </NuxtLink>
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
import DocumentIcon from "@/assets/icons/dashboard/document.svg";
import MoreVerticalIcon from "@/assets/icons/dashboard/more-vertical.svg";
import SearchIcon from "@/assets/icons/dashboard/search.svg";
import ChevronDownIcon from "@/assets/icons/dashboard/chevron-down.svg";
import UserIcon from "@/assets/icons/dashboard/user.svg";
import CelandarIcon from "@/assets/icons/dashboard/calendar.svg";
import FilterIcon from "@/assets/icons/dashboard/filter-2.svg";
import { DashboardItem } from "~~/types";

defineProps({
  items: {
    type: Array as PropType<DashboardItem[]>,
    required: true,
  },
});

const name = ref("");
const account = ref("");
const company = ref("");
const registered = ref("");
const spent = ref("");
const ordersCount = ref("");
</script>
