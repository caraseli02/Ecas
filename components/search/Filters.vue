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
              :class="[showFilters ? 'bg-blue ' : 'bg-border']"
              @click="showFilters = !showFilters"
            >
              <div
                class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-all duration-300"
                :class="[showFilters ? ' right-1' : 'right-5']"
              />
            </button>
          </div>
          <button
            class="group flex bg-blue text-white rounded px-3 py-[9px] text-sm font-medium"
          >
            <ResetIcon
              class="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-[360deg]"
            />
            <span> Reset Filters </span>
          </button>
        </div>
      </div>
      <Transition name="slide-from-bottom">
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
              class="flex items-center justify-center w-14 h-14 bg-blue rounded-full transition-transform duration-300 hover:rotate-[360deg]"
              @click="showAddRemoveFilterModal = true"
            >
              <PlusIcon class="w-[30px] h-[30px] text-white" />
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="slide-from-bottom">
      <LayoutSearchFiltersModal
        v-if="showSearchFiltersModal"
        @close="showSearchFiltersModal = false"
        @show-add-filters-modal="showAddRemoveFilterModal = true"
      />
    </Transition>
    <Transition name="slide-from-bottom">
      <LayoutAddRemoveSearchFilter
        v-if="showAddRemoveFilterModal"
        @close="showAddRemoveFilterModal = false"
      />
    </Transition>
    <Transition name="fade">
      <div
        v-if="showSearchFiltersModal"
        class="absolute z-50 top-0 left-0 w-full h-full bg-[#333333]/70 backdrop-blur-[2px] cursor-pointer md:hidden"
        @click="showSearchFiltersModal = false"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import FiltersIcon from "@/assets/icons/filters.svg";
import EyeIcon from "@/assets/icons/eye.svg";
import EyeClosedIcon from "@/assets/icons/eye-closed.svg";
import ResetIcon from "@/assets/icons/reset.svg";
import PlusIcon from "@/assets/icons/plus.svg";

const showSearchFiltersModal = ref(false);
const showAddRemoveFilterModal = ref(false);

const showFilters = ref(true);

const filters = ref(new Array(20));

const removeItem = (index: number) => {
  filters.value.splice(index, 1);
};
</script>
