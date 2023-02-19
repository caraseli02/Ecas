<template>
  <div class="hidden mb-[30px] md:flex">
    <div class="container">
      <div class="border-b border-gray-200 pt-[15px] pb-[14px]">
        <div class="flex items-center gap-1">
          <CaretRightIcon class="w-4 h-4" />
          <NuxtLink
            to="/"
            class="text-xs leading-[1.33] text-gray-300 font-Inter"
          >
            Products
          </NuxtLink>
          <CaretRightIcon class="w-4 h-4" />
          <NuxtLink
            to="/"
            class="text-xs leading-[1.33] text-gray-300 font-Inter"
          >
            Semiconductors
          </NuxtLink>
          <CaretRightIcon class="w-4 h-4" />
          <NuxtLink
            to="/"
            class="text-xs leading-[1.33] text-gray-300 font-Inter"
          >
            Diodes
          </NuxtLink>
          <CaretRightIcon class="w-4 h-4" />
          <NuxtLink
            to="/"
            class="text-xs leading-[1.33] text-gray-300 font-Inter"
          >
            Universal Diodes
          </NuxtLink>
          <CaretRightIcon class="w-4 h-4" />
          <NuxtLink
            to="/"
            class="text-xs leading-[1.33] text-gray-300 font-Inter"
          >
            SMD Universal Diodes
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CaretRightIcon from "@/assets/icons/caret-right.svg";
</script>
