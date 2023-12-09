<template>
  <div class="flex gap-3 w-full">
    <img loading="lazy" src="https://picsum.photos/56/56"
      class="aspect-square object-contain object-center w-14 overflow-hidden shrink-0 max-w-full my-auto rounded-[50%]" />
    <div class="justify-center items-stretch self-stretch flex grow basis-[0%] flex-col">
      <div class="items-stretch flex justify-start gap-3 pr-5">
        <div class="text-neutral-800 text-sm font-medium leading-5 whitespace-nowrap">
          Madalina Popescu
        </div>
        <BuildingIcon
          class="aspect-square object-contain object-center w-5 justify-center items-center overflow-hidden shrink-0 max-w-full" />
      </div>
      <div class="text-gray-500 text-xs leading-4 whitespace-nowrap mt-1">
        madalina.popescu@businessname.com
      </div>
      <div class="items-center flex gap-2 mt-1 pr-20">
        <div class="text-neutral-400 text-xs font-medium leading-5 self-stretch whitespace-nowrap">
          ID:
        </div>
        <div class="text-neutral-400 text-xs font-medium leading-5">
          64bd773be79e838c73d68c8f
        </div>
        <CopyIcon
          class="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full my-auto text-[#9A9A9A]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BuildingIcon from '@/assets/icons/menu/busines-buildings.svg';
import CopyIcon from '@/assets/icons/copy.svg';
</script>

<style scoped>
</style>
