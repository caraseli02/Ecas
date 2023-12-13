<template>
  <div>
    <div v-for="(menuItem, index) in menuItems" :key="index" class=" hover:bg-zinc-100 text-neutral-800 hover:text-sky-500 items-stretch flex justify-between gap-3 pl-3 pr-20 py-3 rounded-lg">
      <component :is="menuItem.icon" class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full" />
      <div class="transition-all text-sm font-medium leading-6 grow whitespace-nowrap">
        {{ menuItem.text }}
      </div>
      <!-- Additional elements for the menu item can be added here -->
    </div>
  </div>
</template>

<script>
import SvgoMenuApps from '@/assets/icons/menu/apps.svg';
import SvgoMenuNotification from '@/assets/icons/menu/notification.svg';
import SvgoMenuCartAdd from '@/assets/icons/menu/cart-add.svg';
import SvgoMenuTag from '@/assets/icons/menu/tag.svg';
import SvgoMenuFileUpload from '@/assets/icons/menu/file-upload.svg';
import SvgoMenuHeart from '@/assets/icons/menu/heart.svg';
import SvgoMenuPackagingLocation from '@/assets/icons/menu/packaging-location.svg';
import SvgoMenuClock from '@/assets/icons/menu/clock.svg';
import SvgoMenuSetting from '@/assets/icons/menu/Setting.svg';

export default {
  data() {
    return {
      menuItems: [
        {
          icon: SvgoMenuApps,
          text: 'Dashboard',
        },
        {
          icon: SvgoMenuNotification,
          text: 'Notifications',
        },
        {
          icon: SvgoMenuCartAdd,
          text: 'Quick Buy',
        },
        {
          icon: SvgoMenuTag,
          text: 'Price Offer',
        },
        {
          icon: SvgoMenuFileUpload,
          text: 'BOM Upload',
        },
        {
          icon: SvgoMenuHeart,
          text: 'Favorites',
        },
        {
          icon: SvgoMenuPackagingLocation,
          text: 'Order Tracking',
        },
        {
          icon: SvgoMenuClock,
          text: 'Order History',
        },
        {
          icon: SvgoMenuSetting,
          text: 'Settings',
        },
        // Add more menu items as needed
      ],
    };
  },
};
</script>
