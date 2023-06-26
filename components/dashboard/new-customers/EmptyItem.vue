<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex items-center w-[calc(100%-40px)]">
      <div
        class="relative flex items-center justify-center rounded-full overflow-hidden w-10 h-10 flex-shrink-0 bg-gray-200 mr-3"
      >
        <UserIcon class="w-7 h-7 text-gray-100" />
      </div>
      <div class="truncate">
        <div
          class="text-sm leading-[1.43] font-semibold truncate text-gray-100"
        >
          No data available
        </div>
        <div class="text-xs leading-[1.67] text-gray-100 truncate">
          No data available
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserIcon from "@/assets/icons/dashboard/user.svg";
</script>
