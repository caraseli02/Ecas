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
        <div class="relative p-4 bg-[#F2F2F2]">
          <div class="relative">
            <button class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium mr-1">
                Account
              </span>
              <ChevronDownIcon class="w-5 h-5" />
            </button>
          </div>
          <button
            class="flex relative w-full border-[1.5px] border-border rounded-lg px-3 py-[7px] bg-white"
            :class="[!account ? 'text-gray-100' : '']"
            @click="showAccountOptions = !showAccountOptions"
          >
            <span class="text-sm">
              {{ account || "Select" }}
            </span>
            <ChevronDownIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-300 transition-transform duration-300"
              :class="[showAccountOptions ? 'rotate-180' : '']"
            />
          </button>
          <Transition name="fade">
            <div
              v-if="showAccountOptions"
              v-click-outside="() => (showAccountOptions = false)"
              class="absolute z-10 bottom-2 right-4 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-3 min-w-[161px]"
              :style="{
                boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
              }"
            >
              <button
                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                :class="[
                  account === 'Personal' ? 'text-blue bg-[#F2F2F2]' : '',
                ]"
                @click="
                  account = 'Personal';
                  showAccountOptions = false;
                "
              >
                <ProfileIcon class="w-6 h-6 mr-3 text-current" />
                <span class="text-sm leading-[1.71]">Personal</span>
              </button>
              <button
                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                :class="[
                  account === 'Sole Trader' ? 'text-blue bg-[#F2F2F2]' : '',
                ]"
                @click="
                  account = 'Sole Trader';
                  showAccountOptions = false;
                "
              >
                <SoleTraderIcon class="w-6 h-6 mr-3 text-current" />
                <span class="text-sm leading-[1.71]">Sole trader</span>
              </button>
              <button
                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                :class="[account === 'Agent' ? 'text-blue bg-[#F2F2F2]' : '']"
                @click="
                  account = 'Agent';
                  showAccountOptions = false;
                "
              >
                <AgentIcon class="w-6 h-6 mr-3 text-current" />
                <span class="text-sm leading-[1.71]">Agent</span>
              </button>
              <button
                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                :class="[
                  account === 'Business' ? 'text-blue bg-[#F2F2F2]' : '',
                ]"
                @click="
                  account = 'Business';
                  showAccountOptions = false;
                "
              >
                <BusinessIcon class="w-6 h-6 mr-3 text-current" />
                <span class="text-sm leading-[1.71]">Business</span>
              </button>
            </div>
          </Transition>
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
        <div class="relative p-4 pr-0 bg-[#F2F2F2]">
          <div class="relative">
            <button class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium mr-1">
                Spent
              </span>
              <ChevronDownIcon class="w-5 h-5" />
            </button>
          </div>
          <button
            class="flex relative w-full border-[1.5px] border-border rounded-lg px-3 py-[7px] bg-white"
            :class="[!spent[0] && !spent[1] ? 'text-gray-100' : '']"
            @click="showSpentRange = !showSpentRange"
          >
            <span class="text-sm truncate pr-[18px]">
              {{ spent[0] && spent[1] ? `${spent[0]}-${spent[1]}` : "Filter" }}
            </span>
            <FilterIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-300"
            />
          </button>
          <Transition name="fade">
            <div
              v-if="showSpentRange"
              v-click-outside="() => (showSpentRange = false)"
              class="absolute z-10 bottom-2 right-4 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-6 min-w-[358px]"
              :style="{
                boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
              }"
            >
              <div class="text-sm leading-[1.71] font-semibold mb-8">
                Spent range
              </div>
              <div class="mb-16">
                <div class="flex items-end gap-3 mb-6">
                  <label>
                    <div class="text-sm leading-[1.43] text-gray-300 mb-4">
                      From
                    </div>
                    <div
                      class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]"
                    >
                      <span class="font-medium mr-1">$</span>
                      <input
                        v-model.number="spentFrom"
                        type="number"
                        class="bg-transparent py-2 w-full focus:outline-none"
                      />
                    </div>
                  </label>
                  <div class="text-sm leading-[1.43] mb-3">-</div>
                  <label>
                    <div class="text-sm leading-[1.43] text-gray-300 mb-4">
                      To
                    </div>
                    <div
                      class="flex items-center border border-border rounded-lg pl-3 text-sm leading-[1.71]"
                    >
                      <span class="font-medium mr-1">$</span>
                      <input
                        v-model.number="spentTo"
                        type="number"
                        class="bg-transparent py-2 w-full focus:outline-none"
                      />
                    </div>
                  </label>
                </div>
                <div class="flex items-center justify-between mb-3">
                  <div class="text-sm leading-[1.43] font-medium">
                    ${{ spentBuffer[0] }}
                  </div>
                  <div class="text-sm leading-[1.43] font-medium">
                    ${{ spentBuffer[1] }}
                  </div>
                </div>
                <Slider
                  v-model="spentBuffer"
                  :min="spentFrom"
                  :max="spentTo"
                  :tooltips="false"
                  class="rangeSlider"
                />
              </div>
              <div class="flex items-center gap-4">
                <button
                  class="flex px-8 py-3 rounded-lg bg-gray-200 leading-normal text-gray-300 font-medium"
                  @click="showSpentRange = false"
                >
                  Cancel
                </button>
                <button
                  class="flex justify-center px-8 py-3 w-full rounded-lg bg-blue leading-normal text-white font-medium"
                  @click="
                    spent = spentBuffer;
                    showSpentRange = false;
                  "
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </Transition>
        </div>
        <div class="relative p-4 bg-[#F2F2F2]">
          <div class="relative">
            <button class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium mr-1">
                Orders count
              </span>
              <ChevronDownIcon class="w-5 h-5" />
            </button>
          </div>
          <button
            class="flex relative w-full border-[1.5px] border-border rounded-lg px-3 py-[7px] bg-white"
            :class="[!ordersCount ? 'text-gray-100' : '']"
            @click="showOrdersRange = !showOrdersRange"
          >
            <span class="text-sm">
              {{ ordersCount || "Filter" }}
            </span>
            <FilterIcon
              class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-300"
            />
          </button>
          <Transition name="fade">
            <div
              v-if="showOrdersRange"
              v-click-outside="() => (showOrdersRange = false)"
              class="absolute z-10 bottom-2 right-4 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-6 min-w-[358px]"
              :style="{
                boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
              }"
            >
              <div class="text-sm leading-[1.71] font-semibold mb-[76px]">
                Orders range
              </div>
              <div class="mb-14">
                <Slider
                  v-model="ordersCountBuffer"
                  :min="40"
                  :format="
                    (val: number) => {
                      return `${val === 100 ? 'Any' : val + ' +'}`;
                    }
                  "
                  class="rangeSlider"
                />
                <div class="flex items-center justify-between">
                  <div class="text-sm leading-[1.43] font-medium">40</div>
                  <div class="text-sm leading-[1.43] font-medium">Any</div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <button
                  class="flex px-8 py-3 rounded-lg bg-gray-200 leading-normal text-gray-300 font-medium"
                  @click="showOrdersRange = false"
                >
                  Cancel
                </button>
                <button
                  class="flex justify-center px-8 py-3 w-full rounded-lg bg-blue leading-normal text-white font-medium"
                  @click="
                    ordersCount = ordersCountBuffer;
                    showOrdersRange = false;
                  "
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </Transition>
        </div>
        <div class="p-4 w-full rounded-r-lg bg-[#F2F2F2] self-stretch">
          <div class="relative">
            <div class="flex items-center mb-4">
              <span class="text-sm leading-[1.43] font-medium"> Actions </span>
            </div>
          </div>
        </div>
      </div>
      <DashboardCustomersListItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :is-first="index === 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import Slider from "@vueform/slider";
import ChevronDownIcon from "@/assets/icons/dashboard/chevron-down.svg";
import CelandarIcon from "@/assets/icons/dashboard/calendar.svg";
import FilterIcon from "@/assets/icons/dashboard/filter-2.svg";
import { DashboardTableItem } from "~~/types";
import ProfileIcon from "@/assets/icons/dashboard/profile.svg";
import SoleTraderIcon from "@/assets/icons/dashboard/sole-trader.svg";
import AgentIcon from "@/assets/icons/dashboard/agent.svg";
import BusinessIcon from "@/assets/icons/dashboard/business.svg";

defineProps({
  items: {
    type: Array as PropType<DashboardTableItem[]>,
    required: true,
  },
});

const name = ref("");
const account = ref("");
const company = ref("");
const registered = ref("");
const spentBuffer = ref([570, 850]);
const spent = ref([570, 850]);
const spentFrom = ref(570);
const spentTo = ref(850);
const ordersCountBuffer = ref(40);
const ordersCount = ref(0);

const showAccountOptions = ref(false);
const showOrdersRange = ref(false);
const showSpentRange = ref(false);
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss">
.rangeSlider {
  @apply h-2 mb-3;
  .slider-base {
    @apply bg-gray-200;
  }
  .slider-connect {
    @apply bg-blue;
  }
  .slider-handle {
    @apply w-6 h-6 -top-2;
    box-shadow: 0px 0px 6px rgba(51, 51, 51, 0.2);
    border: 1px solid #d4d4d4;
  }
  .slider-tooltip {
    @apply bg-[#1B1B28] border-none rounded px-3 py-1 text-sm leading-[1.43] tracking-[-0.02em] text-white font-normal -translate-x-5 -translate-y-3  before:hidden after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-full after:bg-no-repeat after:w-2 after:h-2;
    &::after {
      background-image: url("data:image/svg+xml,%3Csvg width='9' height='5' viewBox='0 0 9 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.5 3.49691e-07L0.5 0L2.8359 3.50385C3.62754 4.69132 5.37246 4.69132 6.1641 3.50385L8.5 3.49691e-07Z' fill='%231B1B28'/%3E%3C/svg%3E");
    }
  }
}
</style>
