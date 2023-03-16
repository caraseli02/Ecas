<template>
  <div
    class="fixed z-[60] bottom-0 left-0 w-screen flex items-end justify-end md:hidden"
  >
    <div
      class="relative z-10 w-full py-5 bg-white rounded-t-[15px] shadow-card md:px-5"
    >
      <div
        class="flex items-center justify-between px-5 mb-[30px]"
        v-touch:drag="onDrag"
      >
        <div class="text-lg font-semibold text-gray-300 tracking-[0.6px]">
          Filters
        </div>
        <button
          class="rounded w-8 h-8 bg-[#F2F2F2] flex items-center justify-center text-gray-100 transition-colors duration-300 hover:text-gray-300"
          @click="showSearchFiltersModal = false"
        >
          <XIcon class="w-[15px] h-[15px]" />
        </button>
      </div>
      <div
        class="flex items-center gap-[15px] px-[15px] mb-[25px]"
        v-touch:drag="onDrag"
      >
        <button
          class="flex items-center justify-center bg-blue text-white rounded px-3 py-1.5 text-sm font-medium font-Inter"
        >
          <FiltersIcon class="w-5 h-5 mr-2" />
          <span>Add Filters</span>
        </button>
        <button
          class="flex items-center justify-center bg-blue text-white rounded px-3 py-1.5 text-sm font-medium font-Inter"
        >
          <ResetIcon class="w-5 h-5 mr-2" />
          <span>Reset Filters</span>
        </button>
      </div>
      <div
        class="grid grid-cols-1 gap-1.5 overflow-auto max-h-[340px] scrollbar-thin px-[15px]"
      >
        <SearchFilter2 v-for="filter in 20" :key="filter" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import XIcon from "@/assets/icons/x.svg";
import FiltersIcon from "@/assets/icons/filters.svg";
import ResetIcon from "@/assets/icons/reset.svg";
import { showSearchFiltersModal } from "~~/system/modal/search-filters";

const onDrag = (event: any) => {
  if (event.direction === "bottom") {
    showSearchFiltersModal.value = false;
  }
};

onMounted(() => {
  documentUtil.toggleBodyScroll();
});

onBeforeUnmount(() => {
  documentUtil.toggleBodyScroll();
});
</script>
