<template>
  <div
    class="absolute z-50 -bottom-2 translate-y-full left-0 w-full bg-white border border-gray-100 rounded-md py-2 pl-2 shadow-card md:-bottom-1"
  >
    <div
      class="grid grid-cols-1 max-h-[340px] overflow-auto scrollbar-thin pr-2"
    >
      <NuxtLink
        v-for="(_, index) in 20"
        :key="index"
        to="/product/slug"
        class="p-2 rounded text-gray-300 transition-colors duration-300 hover:bg-gray-200 hover:text-blue"
      >
        <div
          class="flex items-center justify-between gap-1 text-xs leading-tight font-semibold mb-1 md:text-sm md:leading-[1.29]"
        >
          <div class="flex items-center w-[calc(100%-50px)]">
            <div class="truncate">Three phase diode bridge rectifiers</div>
            <CaretIcon class="w-4 h-4 flex-shrink-0" />
            <div class="font-Inter">ADIN2111BCPZ</div>
          </div>
          <div
            class="rounded-3xl bg-blue px-1 text-xs leading-[1.33] font-semibold text-white flex-shrink-0 lg:translate-y-2.5"
            :class="[index % 2 === 0 ? 'invisible' : '']"
          >
            New
          </div>
        </div>
        <div class="text-xs leading-[1.33] truncate lg:w-[calc(100%-50px)]">
          Cable - PHY 1-CH 1.1V/1.8V/2.5V/3.3V 48-Pin LFCSP EP Tray 1-CH
          1.1V/1.8V/2.5V/3.3V 48-Pin LFCSP EP Tray
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import CaretIcon from "@/assets/icons/caret-right.svg";
</script>
