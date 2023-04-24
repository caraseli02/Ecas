<template>
  <div class="mb-10 lg:mb-[50px]">
    <div
      class="grid grid-cols-[75px,1fr,100px,64px,145px,120px,120px] border border-border bg-gray-200 px-[15px] py-[22px] rounded-md text-sm font-medium mb-5 max-xl:hidden 2xl:grid-cols-[32px,75px,1fr,100px,64px,145px,130px,120px]"
    >
      <div class="max-2xl:hidden">No.</div>
      <div />
      <div>Description</div>
      <div>Unit Price</div>
      <div>VAT</div>
      <div>Quantity</div>
      <div>Line Total</div>
      <div class="flex items-center justify-between">
        <span class="mr-[26px]">Actions</span>
        <div class="flex items-center">
          <button
            class="flex mr-2 text-gray-300 transition-colors duration-300 hover:text-blue disabled:hover:text-gray-300"
            :disabled="atPage === 1"
            @click="atPage--"
          >
            <ChevronRightIcon class="w-4 h-4 rotate-180" />
          </button>
          <button
            class="flex text-gray-300 transition-colors duration-300 hover:text-blue disabled:hover:text-gray-300"
            :disabled="atPage === totalPages"
            @click="atPage++"
          >
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-5 mb-[30px] md:gap-[15px]">
      <OrderSummaryTableItem
        v-for="(item, index) in filteredItems"
        :key="index"
        :item="item"
        class="xl:hidden"
      />
      <OrderSummaryTableItemLG
        v-for="(item, index) in filteredItems"
        :key="index"
        :item="item"
        :index="(atPage - 1) * perPage + index + 1"
        class="max-xl:hidden"
      />
    </div>
    <div
      class="flex flex-col items-center w-full md:flex-row md:justify-between"
    >
      <label class="flex items-center mb-[30px] md:mb-0">
        <span class="text-sm font-medium flex-shrink-0 mr-2.5">
          Products on page
        </span>
        <div class="relative">
          <button
            class="flex items-center justify-between w-full border bg-white rounded px-2.5 py-[3px] transition-colors duration-300"
            :class="[showPerPageOptions ? 'border-blue' : 'border-border']"
            @click="showPerPageOptions = !showPerPageOptions"
          >
            <span class="text-sm mr-2">{{ perPage }}</span>
            <ChevronDownIcon
              class="w-6 h-6 text-gray-300 transition-transform duration-300"
              :class="[showPerPageOptions ? 'rotate-180' : '']"
            />
          </button>
          <transition name="fade">
            <div
              v-if="showPerPageOptions"
              class="absolute z-10 -bottom-1 left-0 translate-y-full w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card p-2.5"
              v-click-outside="() => (showPerPageOptions = false)"
            >
              <button
                v-for="option in [5, 20, 50, 100].filter((e) => e !== perPage)"
                :key="option"
                class="flex w-full text-left text-sm rounded-[5px] text-gray-300 transition-colors duration-300 hover:text-blue"
                @click="
                  perPage = option;
                  showPerPageOptions = false;
                "
              >
                {{ option }}
              </button>
            </div>
          </transition>
        </div>
      </label>
      <div class="flex items-center">
        <Transition name="fade">
          <button
            v-if="atPage !== 1"
            @click="atPage--"
            class="flex transition-colors duration-300 text-gray-300 hover:text-blue"
          >
            <ChevronRightIcon class="w-1.5 h-3 rotate-180 mr-4" />
          </button>
        </Transition>
        <Pagination
          v-model="atPage"
          :page-count="totalPages"
          :page-range="3"
          :hide-prev-next="true"
          page-link-class="searchProducts--pagination-item"
          prev-link-class="searchProducts--pagination-item_prev cursor-pointer text-mainPurple font-medium px-2"
          next-link-class="searchProducts--pagination-item_next cursor-pointer text-mainPurple font-medium px-2"
          active-class="searchProducts--pagination-item-active"
          class="flex items-center justify-center"
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
          v-if="totalPages !== atPage"
          @click="atPage++"
          class="flex transition-colors duration-300 text-gray-300 hover:text-blue"
        >
          <ChevronRightIcon class="w-1.5 h-3 ml-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from "vuejs-paginate-next";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import SearchItemCover from "@/assets/media/product/gallery-1.png";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import { OrderSummaryItem } from "~~/types";

const items = ref<OrderSummaryItem[]>([
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    discount: 20,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    discount: 20,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    discount: 20,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    discount: 20,
    price: 120,
    quantity: 1,
    vat: 19,
  },
  {
    title: "ADIN2111BCPZ",
    cover: SearchItemCover,
    price: 120,
    quantity: 1,
    vat: 19,
  },
]);

const perPage = ref(100);
const atPage = ref(1);

const showPerPageOptions = ref(false);

const filteredItems = computed(() => {
  return items.value.slice(
    (atPage.value - 1) * perPage.value,
    (atPage.value - 1) * perPage.value + perPage.value
  );
});

const totalPages = computed(() => {
  return Math.ceil(items.value.length / perPage.value);
});
</script>

<style lang="scss">
.searchProducts--pagination-item {
  @apply cursor-pointer flex items-center justify-center w-8 h-8 mx-1 text-sm font-Inter font-semibold rounded-md bg-gray-200 text-gray-300 transition-colors duration-300 hover:bg-blue hover:text-white focus-visible:bg-blue focus-visible:text-white #{!important};
}
.searchProducts--pagination-item-active .searchProducts--pagination-item {
  @apply bg-blue text-white #{!important};
}
.searchProducts--pagination-item_prev,
.searchProducts--pagination-item_next {
  @apply hidden #{!important};
}
</style>
