<template>
  <div class="items-stretch self-stretch flex flex-col overflow-y-auto scrollbar-thin max-h-[450px] pt-1 pb-4">
    <div class="items-stretch flex justify-between gap-3 pl-3 pr-20 py-3 rounded-lg">
      <SvgoMenuApps class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full" />
      <div class="text-neutral-800 text-sm font-medium leading-6 grow whitespace-nowrap">
        Dashboard
      </div>
    </div>
    <div class="items-center flex gap-3 mt-1 pl-3 pr-20 py-3 rounded-lg">
      <SvgoMenuNotification loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/29b31bb7aba14fa98ad6fe53c9469019b6e6afff17318ab73c4c275ed5ae9d49?"
        class="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden self-stretch shrink-0 max-w-full" />
      <div class="text-neutral-800 text-sm font-medium leading-6 self-stretch">
        Notifications
      </div>
      <div
        class="text-white text-center text-xs font-semibold leading-5 whitespace-nowrap justify-center items-stretch bg-red-500 aspect-[1.3333333333333333] my-auto px-1 rounded-[100px]">
        48
      </div>
    </div>
    <div class="items-stretch bg-zinc-100 flex justify-between gap-3 mt-1 pl-3 pr-20 py-3 rounded-lg">
      <SvgoMenuCartAdd class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full" />
      <div class="text-sky-500 text-sm font-medium leading-6 grow whitespace-nowrap">
        Quick Buy
      </div>
    </div>
    <div class="items-stretch flex justify-between gap-3 mt-1 pl-3 pr-20 py-3 rounded-lg">
      <SvgoMenuTag class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full" />
      <div class="text-neutral-800 text-sm font-medium leading-6 grow whitespace-nowrap">
        Price Offer
      </div>
    </div>
    <div class="items-stretch flex justify-between gap-3 mt-1 pl-3 pr-20 py-3 rounded-lg">
      <SvgoMenuFileUpload class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full" />
      <div class="text-neutral-800 text-sm font-medium leading-6 grow whitespace-nowrap">
        BOM Upload
      </div>
    </div>
    <div class="items-stretch flex justify-between gap-3 mt-1 pl-3 pr-20 py-3 rounded-lg">
      <SvgoMenuHeart class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full" />
      <div class="text-neutral-800 text-sm font-medium leading-6 grow whitespace-nowrap">
        Favorites
      </div>
    </div>
    <div class="items-stretch flex justify-between gap-3 mt-1 pl-3 pr-20 py-3 rounded-lg">
      <SvgoMenuPackagingLocation
        class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full" />
      <div class="text-neutral-800 text-sm font-medium leading-6 grow whitespace-nowrap">
        Order Tracking
      </div>
    </div>
    <div class="items-stretch flex justify-between gap-3 mt-1 pl-3 pr-20 py-3 rounded-lg">
      <SvgoMenuClock loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/065b2d164e63efa1cbc889b94ecf49d85037558d2f72ff667cebc661e98974de?"
        class="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
      <div class="text-neutral-800 text-sm font-medium leading-6 grow whitespace-nowrap">
        Order History
      </div>
    </div>
    <div class="items-stretch flex justify-between gap-3 mt-1 pl-3 pr-20 py-3 rounded-lg">
      <SvgoMenuSetting loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6f1e7fe3f47a1c5374282ada78780279ae3c1257244728811f869e64a4a20f3?"
        class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full" />
      <div class="text-neutral-800 text-sm font-medium leading-6 grow whitespace-nowrap">
        Settings
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgoMenuApps from '@/assets/icons/menu/apps.svg';
import SvgoMenuNotification from '@/assets/icons/menu/notification.svg';
import SvgoMenuCartAdd from '@/assets/icons/menu/cart-add.svg';
import SvgoMenuTag from '@/assets/icons/menu/tag.svg';
import SvgoMenuFileUpload from '@/assets/icons/menu/file-upload.svg';
import SvgoMenuHeart from '@/assets/icons/menu/heart.svg';
import SvgoMenuPackagingLocation from '@/assets/icons/menu/packaging-location.svg';
import SvgoMenuClock from '@/assets/icons/menu/clock.svg';
import SvgoMenuSetting from '@/assets/icons/menu/setting.svg';
</script>

<style scoped>
</style>
