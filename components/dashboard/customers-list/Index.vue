<template>
  <div
    class="bg-white rounded-xl p-4 md:p-6"
    :style="{
      boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
    }"
  >
    <div
      class="flex flex-col mb-6 md:block md:mb-8 lg:flex lg:flex-row lg:items-start lg:justify-between xl:items-center"
    >
      <div class="leading-normal font-semibold max-lg:mb-8">Customers List</div>
      <div
        class="grid grid-cols-2 gap-4 md:flex md:items-center md:max-w-max md:ml-auto"
      >
        <button
          class="flex items-center justify-center col-span-2 w-full bg-blue rounded-lg px-5 py-2 text-white md:max-w-max md:order-3"
        >
          <PlusIcon class="w-6 h-6 mr-2" />
          <span class="text-sm leading-[1.71] font-medium"> Create New </span>
        </button>
        <button
          class="flex items-center justify-center w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-300 md:max-w-max md:order-1"
        >
          <span class="text-sm leading-[1.71] font-medium mr-2"> Filter </span>
          <FilterIcon class="w-6 h-6" />
        </button>
        <button
          class="flex items-center justify-center w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-300 md:max-w-max md:order-1"
          @click="clearFilters"
        >
          <span class="text-sm leading-[1.71] font-medium mr-2">
            Clear Filters
          </span>
          <XIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
    <div
      v-if="activeFilters.length > 0"
      class="mb-6 md:flex md:items-start md:mb-8"
    >
      <div class="leading-normal font-medium text-gray-300 mb-4 md:mr-4">
        Filters:
      </div>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="(filter, index) in activeFilters"
          :key="index"
          class="flex items-center pl-2 pr-1 py-1 bg-gray-200 rounded-md"
        >
          <span class="text-sm leading-normal text-gray-300 mr-2">
            {{ filter }}
          </span>
          <button class="flex" @click="activeFilters.splice(index, 1)">
            <XIcon class="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
    <DashboardCustomersListPagination
      :at-page="atPage"
      :per-page="perPage"
      :items-count="listItems.length"
      @page-change="atPage = $event"
      @per-page-change="perPage = $event"
      position="top"
      class="flex-col mb-6 md:mb-8"
    />
    <DashboardCustomersListTable :items="visibleItems" />
    <DashboardCustomersListPagination
      :at-page="atPage"
      :per-page="perPage"
      :items-count="listItems.length"
      @page-change="atPage = $event"
      @per-page-change="perPage = $event"
      position="bottom"
      class="flex-col-reverse"
    />
  </div>
</template>

<script setup lang="ts">
import PlusIcon from "@/assets/icons/dashboard/plus.svg";
import FilterIcon from "@/assets/icons/dashboard/filter.svg";
import XIcon from "@/assets/icons/dashboard/x.svg";
import Avatar from "@/assets/icons/dashboard/avatar.png";
import { DashboardTableItem } from "~~/types";

const activeFilters = ref([
  "0740333555",
  "company.com",
  "United States",
  "company.com",
]);

const clearFilters = () => {
  activeFilters.value = [];
};

const atPage = ref(1);
const perPage = ref(10);

const listItems = ref<DashboardTableItem[]>([]);

const visibleItemsFiltered = computed(() => {
  return [...listItems.value].filter((e) => {
    return true;
  });
});

const visibleItems = computed(() => {
  return visibleItemsFiltered.value.slice(
    (atPage.value - 1) * perPage.value,
    (atPage.value - 1) * perPage.value + perPage.value
  );
});

onMounted(() => {
  for (let i = 0; i < 50; i++) {
    const element = {
      avatar: i === 2 ? undefined : Avatar,
      name: "Madalina Popescu",
      email: "madalina.popescu@company.com",
      account: "Business Agent",
      company: "Nezo Global Development s.r.l.",
      registered: "21 September 2023, 18:25",
      spent: "$138.000,77",
      ordersCount: 17,
    };
    listItems.value.push(element);
  }
});
</script>
