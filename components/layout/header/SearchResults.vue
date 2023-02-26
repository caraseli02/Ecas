<template>
  <div
    class="absolute z-50 -bottom-3 translate-y-full left-0 w-full bg-white border border-gray-100 rounded py-3 shadow-card md:-bottom-1"
  >
    <div class="grid grid-cols-1 max-h-[356px] overflow-auto scrollbar-thin">
      <NuxtLink
        v-for="(item, index) in 20"
        :key="index"
        to="/product/slug"
        class="flex items-center px-2.5 pt-2 pb-[7px] text-gray-300 font-Inter transition-colors duration-300 hover:bg-gray-200 hover:text-blue lg:pr-[38px]"
      >
        <div class="text-xs leading-tight font-semibold mr-[15px]">
          ADIN2111BCPZ
        </div>
        <div class="text-xs leading-tight truncate mr-2.5">
          Cable - PHY 1-CH 1.1V/1.8V/2.5V/3.3V 48-Pin LFCSP EP Tray 1-CH
          1.1V/1.8V/2.5V/3.3V 48-Pin LFCSP EP Tray
        </div>
        <div
          class="rounded-3xl bg-blue px-[5px] py-px text-xs leading-tight font-bold text-white"
          :class="[index % 2 === 0 ? 'invisible' : '']"
        >
          New
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
