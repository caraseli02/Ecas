<template>
  <div>
    <NuxtLink
v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.to"
      class=" hover:bg-zinc-100 text-neutral-800 hover:text-sky-500 items-stretch flex justify-start gap-3 pl-3 pr-20 py-3 rounded-lg">
      <component :is="menuItem.icon" class="w-6 h-6" />
      <div class="transition-all text-sm font-medium leading-6 whitespace-nowrap">
        {{ menuItem.text }}
      </div>
      <div
v-if="menuItem.text === 'Notifications'"
        class="text-white text-center text-xs font-medium leading-5 whitespace-nowrap justify-start items-stretch bg-rose-500 aspect-[1.3333333333333333] my-auto px-1 rounded-[100px]">
        48
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import IconApps from '@/assets/icons/menu/apps.svg?component';
import SvgoMenuNotification from '@/assets/icons/menu/Notification.svg?component';
import SvgoMenuCartAdd from '@/assets/icons/menu/cart-add.svg?component';
import SvgoMenuTag from '@/assets/icons/menu/tag.svg?component';
import SvgoMenuFileUpload from '@/assets/icons/menu/file-upload.svg?component';
import SvgoMenuHeart from '@/assets/icons/menu/heart.svg?component';
import SvgoMenuPackagingLocation from '@/assets/icons/menu/packaging-location.svg?component';
import SvgoMenuClock from '@/assets/icons/menu/Clock.svg?component';
import SvgoMenuSetting from '@/assets/icons/menu/Setting.svg?component';


const menuItems = [
  {
    icon: IconApps,
    text: 'Dashboard',
    to: '/dashboard',
  },
  {
    icon: SvgoMenuNotification,
    text: 'Notifications',
    to: '/',
  },
  {
    icon: SvgoMenuCartAdd,
    text: 'Quick Buy',
    to: '/',
  },
  {
    icon: SvgoMenuTag,
    text: 'Price Offer',
    to: '/',
  },
  {
    icon: SvgoMenuFileUpload,
    text: 'BOM Upload',
    to: '/',
  },
  {
    icon: SvgoMenuHeart,
    text: 'Favorites',
    to: '/',
  },
  {
    icon: SvgoMenuPackagingLocation,
    text: 'Order Tracking',
    to: '/',
  },
  {
    icon: SvgoMenuClock,
    text: 'Order History',
    to: '/',
  },
  {
    icon: SvgoMenuSetting,
    text: 'Settings',
    to: '/',
  },
  // Add more menu items as needed
]
</script>
