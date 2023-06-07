<template>
  <div
    class="flex flex-col gap-6 md:grid md:grid-cols-2 md:items-center md:gap-8 lg:relative lg:flex lg:flex-row lg:items-center lg:justify-between"
  >
    <label
      class="flex items-center justify-center md:order-2 md:justify-end lg:order-3"
    >
      <span
        class="text-sm leading-normal text-gray-300 tracking-[-0.03em] mr-4"
      >
        Entries on page
      </span>
      <div class="relative">
        <button
          class="flex items-center justify-between w-full border bg-white rounded-md px-3 py-1 transition-colors duration-300"
          :class="[showPerPageOptions ? 'border-blue' : 'border-border']"
          @click="showPerPageOptions = !showPerPageOptions"
        >
          <span class="text-sm leading-[1.71] mr-2">
            {{ perPage }}
          </span>
          <ChevronDownIcon
            class="w-6 h-6 text-gray-300 transition-transform duration-300"
            :class="[showPerPageOptions ? 'rotate-180' : '']"
          />
        </button>
        <transition name="fade">
          <div
            v-if="showPerPageOptions"
            class="absolute z-10 left-0 w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card p-2.5"
            :class="[
              position === 'top'
                ? '-bottom-1 translate-y-full'
                : '-top-1 -translate-y-full',
            ]"
            v-click-outside="() => (showPerPageOptions = false)"
          >
            <button
              v-for="option in [5, 10, 20, 50, 100].filter(
                (e) => e !== perPage
              )"
              :key="option"
              class="flex w-full text-left text-sm rounded-[5px] text-gray-300 transition-colors duration-300 hover:text-blue"
              @click="
                $emit('per-page-change', option);
                showPerPageOptions = false;
              "
            >
              {{ option }}
            </button>
          </div>
        </transition>
      </div>
    </label>
    <div
      class="text-sm leading-normal tracking-[-0.03em] text-gray-300 text-center md:order-1 md:text-left"
    >
      {{ paginationLabel }}
    </div>
    <div
      class="flex items-center justify-center overflow-x-auto scrollbar-thin md:col-span-2 md:order-3 lg:order-2 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2"
    >
      <button
        :disabled="atPage === 1"
        @click="$emit('page-change', atPage - 1)"
        class="cursor-pointer flex items-center justify-center flex-shrink-0 w-8 h-8 mx-1 text-sm font-Inter font-semibold rounded-md text-gray-300 mr-1 border border-border transition-colors duration-300 hover:bg-blue hover:text-white focus-visible:bg-blue focus-visible:text-white hover:border-blue focus-visible:border-blue"
      >
        <ChevronLeftIcon class="w-4 h-4" />
      </button>
      <Pagination
        :modelValue="atPage"
        :page-count="totalPages"
        :page-range="3"
        :hide-prev-next="true"
        page-link-class="dashboardList--pagination-item"
        prev-link-class="dashboardList--pagination-item_prev cursor-pointer text-mainPurple font-medium px-2"
        next-link-class="dashboardList--pagination-item_next cursor-pointer text-mainPurple font-medium px-2"
        active-class="dashboardList--pagination-item-active"
        class="flex items-center justify-center"
        @update:modelValue="handlePageChange"
      >
        <template v-slot:breakViewContent>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 4"
            class="w-3 h-2 translate-y-1"
          >
            <path
              fill="#5E6278"
              d="M1.943 3.11c-.302 0-.56-.107-.776-.319a1.03 1.03 0 0 1-.318-.775 1.019 1.019 0 0 1 .318-.766c.215-.212.474-.318.776-.318.291 0 .545.106.76.318a1.045 1.045 0 0 1 .174 1.317c-.1.166-.232.299-.398.398a1.035 1.035 0 0 1-.536.144Zm4.06 0c-.301 0-.56-.107-.775-.319a1.03 1.03 0 0 1-.319-.775 1.019 1.019 0 0 1 .319-.766c.215-.212.474-.318.775-.318.292 0 .545.106.76.318a1.045 1.045 0 0 1 .175 1.317c-.1.166-.232.299-.398.398a1.035 1.035 0 0 1-.537.144Zm4.06 0c-.301 0-.56-.107-.775-.319a1.03 1.03 0 0 1-.318-.775 1.019 1.019 0 0 1 .318-.766c.216-.212.474-.318.776-.318.291 0 .545.106.76.318a1.045 1.045 0 0 1 .174 1.317c-.1.166-.232.299-.397.398a1.035 1.035 0 0 1-.537.144Z"
            />
          </svg>
        </template>
      </Pagination>
      <button
        :disabled="totalPages === atPage"
        @click="$emit('page-change', atPage + 1)"
        class="cursor-pointer flex items-center justify-center flex-shrink-0 w-8 h-8 mx-1 text-sm font-Inter font-semibold rounded-md text-gray-300 ml-1 border border-border transition-colors duration-300 hover:bg-blue hover:text-white focus-visible:bg-blue focus-visible:text-white hover:border-blue focus-visible:border-blue"
      >
        <ChevronRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from "vuejs-paginate-next";
import ChevronDownIcon from "@/assets/icons/dashboard/chevron-down.svg";
import ChevronLeftIcon from "@/assets/icons/dashboard/chevron-left.svg";
import ChevronRightIcon from "@/assets/icons/dashboard/chevron-right.svg";

const props = defineProps({
  atPage: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  itemsCount: {
    type: Number,
    required: true,
  },
  position: {
    type: String as PropType<"top" | "bottom">,
    required: true,
  },
});

const emits = defineEmits(["page-change", "per-page-change"]);

const showPerPageOptions = ref(false);

const totalPages = computed(() => {
  return Math.ceil(props.itemsCount / props.perPage);
});

const paginationLabel = computed(() => {
  return `Showing ${props.atPage * props.perPage - props.perPage + 1} to ${
    props.atPage * props.perPage > props.itemsCount
      ? props.atPage * props.perPage - props.perPage + 1
      : props.atPage * props.perPage
  } from ${props.itemsCount} entries`;
});

const handlePageChange = (e: number) => {
  emits("page-change", e);
};
</script>

<style lang="scss">
.dashboardList--pagination-item {
  @apply cursor-pointer flex items-center justify-center w-8 h-8 mx-1 text-sm font-Inter font-semibold rounded-md  text-gray-300 transition-colors duration-300 hover:bg-blue hover:text-white focus-visible:bg-blue focus-visible:text-white #{!important};
}
.dashboardList--pagination-item-active .dashboardList--pagination-item {
  @apply bg-blue text-white #{!important};
}
.dashboardList--pagination-item_prev,
.dashboardList--pagination-item_next {
  @apply hidden #{!important};
}
</style>
