<template>
  <header
    class="fixed z-50 top-0 left-0 w-full bg-white transition-transform duration-300"
    :class="[
      isScrolled && !showNavModal
        ? '-translate-y-[35px] md:-translate-y-[105px]'
        : isScrolled && showNavModal
        ? 'md:-translate-y-[105px]'
        : '',
    ]"
  >
    <div class="relative z-10 bg-[#F5F5F5] pt-[7px] pb-2 md:py-2.5">
      <div class="container">
        <div
          class="flex items-center justify-between text-gray-300 lg:justify-start"
        >
          <div class="hidden text-xs md:block lg:mr-auto xl:text-sm">
            Sales: +40724 360 250 (Mon-Fri 8:00AM - 4:00PM EST)
          </div>
          <div
            class="text-xs leading-[1.33] font-medium md:font-semibold lg:mr-[70px] xl:hidden"
          >
            <span class="uppercase">Free</span> shipping on orders over $150
          </div>
          <button
            class="flex items-center"
            @click="showRegionalPreferencesModal = true"
          >
            <RonFlag class="w-6 h-5 mr-[5px] md:mr-2.5" />
            <span class="text-sm leading-[1.14]">| RON</span>
          </button>
        </div>
      </div>
    </div>
    <LayoutHeaderSearchRow />
    <LayoutHeaderMainRow :isScrolled="isScrolled" />
  </header>
</template>

<script setup lang="ts">
import RonFlag from "@/assets/icons/flags/ron.svg";
import { showNavModal } from "~~/system/modal/nav";
import { showRegionalPreferencesModal } from "~~/system/modal/regional-preferences";

defineProps({
  isScrolled: {
    type: Boolean,
    required: true,
  },
});
</script>
