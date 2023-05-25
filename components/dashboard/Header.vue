<template>
  <header
    class="fixed z-30 top-0 left-0 w-full bg-white md:transition-all md:duration-300 md:delay-50"
    :class="[
      isCollapsedOnDesktop
        ? 'md:ml-[96px] md:w-[calc(100%-96px)]'
        : 'md:ml-[280px] md:w-[calc(100%-280px)]',
    ]"
    :style="{
      boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
    }"
  >
    <div
      class="w-[1640px] max-w-full mx-auto flex items-center justify-between px-4 py-3 md:py-4 2xl:px-[100px]"
    >
      <button
        class="flex md:opacity-0 md:pointer-events-none xl:hidden"
        @click="$emit('show-side-nav')"
      >
        <BurgerIcon class="w-6 h-6 text-gray-300" />
      </button>
      <label class="flex relative w-[400px] max-xl:hidden">
        <input
          v-model="searchValue"
          type="search"
          placeholder="Search"
          class="w-full border-[1.5px] border-border rounded-lg px-3 py-2.5 pr-10 text-sm placeholder:text-gray-100 transition-colors duration-300 focus:outline-none focus:border-blue"
        />
        <SearchIcon
          class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-100"
        />
      </label>
      <div class="flex items-center">
        <button class="flex mr-4 md:mr-8 xl:hidden">
          <SearchIcon class="w-6 h-6 text-gray-300" />
        </button>
        <button
          class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 mr-8 max-md:hidden"
        >
          <PlusIcon class="w-6 h-6 text-gray-300" />
        </button>
        <div class="relative mr-6 md:mr-10">
          <button class="flex">
            <BellIcon class="w-6 h-6 text-gray-300" />
          </button>
          <div
            class="flex absolute -top-1 right-0 translate-x-1/2 bg-[#FA4B4B] rounded-[100px] px-1 py-0.5 text-[10px] font-semibold tracking-[-0.03em] leading-[1.1] text-white font-Inter"
          >
            45
          </div>
        </div>
        <div class="relative">
          <button class="flex items-center text-left">
            <div class="relative mr-4">
              <img
                src="@/assets/icons/dashboard/avatar.png"
                alt="Avatar"
                class="w-11 h-11 rounded-full object-cover"
              />
              <div
                class="absolute -bottom-1 -right-1 box-content w-2.5 h-2.5 rounded-full bg-[#00D395] border-4 border-white"
              />
            </div>
            <div class="flex flex-col mr-4 max-lg:hidden">
              <div class="leading-normal text-[#222222] font-medium">
                Madalina Popescu
              </div>
              <div class="text-xs leading-normal text-gray-300">
                Super Admin
              </div>
            </div>
            <ChevronDownIcon class="w-6 h-6 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import BurgerIcon from "@/assets/icons/dashboard/burger.svg";
import SearchIcon from "@/assets/icons/dashboard/search.svg";
import BellIcon from "@/assets/icons/dashboard/bell.svg";
import ChevronDownIcon from "@/assets/icons/dashboard/chevron-down.svg";
import PlusIcon from "@/assets/icons/dashboard/plus.svg";

defineProps({
  isCollapsedOnDesktop: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["show-side-nav"]);

const searchValue = ref("");
</script>
