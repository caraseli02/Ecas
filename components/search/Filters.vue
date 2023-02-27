<template>
  <div class="mb-[30px] md:mb-[60px]">
    <div class="container">
      <button
        class="flex items-center justify-center bg-blue text-white rounded px-[15px] py-[9px] text-sm font-medium w-full md:hidden"
        @click="showSearchFiltersModal = true"
      >
        <FiltersIcon class="w-6 h-6 mr-2" />
        <span>Filters</span>
      </button>
      <div class="hidden items-center justify-between md:flex">
        <div class="font-medium">Filters</div>
        <div class="flex items-center">
          <div class="flex items-center text-gray-300 select-none mr-[30px]">
            <EyeClosedIcon v-if="!showFilters" class="w-5 h-5 mr-2" />
            <EyeIcon v-else class="w-5 h-5 mr-2" />
            <span
              class="text-sm leading-tight font-Inter font-medium mr-[15px]"
            >
              Filters
            </span>
            <button
              class="relative w-10 h-[22px] rounded-[25px] transition-colors duration-300"
              :class="[showFilters ? 'bg-blue ' : 'bg-[#D4D4D4]']"
              @click="showFilters = !showFilters"
            >
              <div
                class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-all duration-300"
                :class="[showFilters ? ' right-1' : 'right-5']"
              />
            </button>
          </div>
          <button
            class="flex bg-blue text-white rounded px-3 py-[9px] text-sm font-medium"
          >
            <ResetIcon class="w-5 h-5 mr-2" />
            <span> Reset Filters </span>
          </button>
        </div>
      </div>
      <Transition name="slide-from-right">
        <div
          v-if="showFilters"
          class="hidden grid-cols-3 gap-5 mt-5 md:grid lg:grid-cols-4 xl:grid-cols-6"
        >
          <SearchFilter
            v-for="(filter, index) in filters"
            :key="index"
            @close="removeItem(index)"
          />
          <div class="flex flex-col items-center pt-[60px] pb-10">
            <div class="text-sm font-medium text-gray-300 mb-5">
              Add/Remove Filter
            </div>
            <button
              class="flex items-center justify-center w-14 h-14 bg-blue rounded-full"
              @click="filters.push('')"
            >
              <PlusIcon class="w-[30px] h-[30px] text-white" />
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import FiltersIcon from "@/assets/icons/filters.svg";
import EyeIcon from "@/assets/icons/eye.svg";
import EyeClosedIcon from "@/assets/icons/eye-closed.svg";
import ResetIcon from "@/assets/icons/reset.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import { showSearchFiltersModal } from "@/system/modal/search-filters";

const showFilters = ref(true);

const filters = ref(new Array(20));

const removeItem = (index: number) => {
  filters.value.splice(index, 1);
};
</script>
