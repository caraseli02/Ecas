<template>
  <div class="flex items-center justify-between mb-6 max-sm:hidden">
    <div>
      <div class="flex items-center mb-3">
        <NuxtLink
          to="/"
          class="flex items-center text-gray-300 transition-colors duration-300 hover:text-blue"
        >
          <HomeIcon class="w-[18px] h-[18px] mr-2" />
          <span class="text-xs leading-[1.33]">Home</span>
        </NuxtLink>
        <span class="text-xs leading-[1.33] mx-2">/</span>
        <NuxtLink to="/" class="text-xs leading-[1.33] font-medium text-blue">
          Customers
        </NuxtLink>
      </div>
      <h2 class="text-xl leading-[1.4] text-[#222222] font-semibold">
        Customers
      </h2>
    </div>
    <button class="flex items-center rounded-lg bg-gray-200 px-6 py-3">
      <span class="leading-normal text-gray-300 font-medium mr-2">
        Download
      </span>
      <DownloadIcon class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import DownloadIcon from "@/assets/icons/dashboard/download.svg";
import HomeIcon from "@/assets/icons/dashboard/home.svg";
</script>
