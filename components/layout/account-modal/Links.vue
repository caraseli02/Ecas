<template>
  <div>
    <NuxtLink v-show="!route.path.includes('dashboard')" :to="isAdmin ? '/dashboard' : 'dashboard/client'"
      class=" hover:bg-zinc-100 text-neutral-800 hover:text-blue-500 items-stretch flex justify-start gap-3 pl-3 pr-20 py-3 rounded-lg"
      @click="emit('close')">
      <component :is="IconApps" class="w-6 h-6" />
      <div class="transition-all text-sm font-medium leading-6 whitespace-nowrap">
        Dashboard
      </div>
    </NuxtLink>
    <NuxtLink v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.to"
      class="items-stretch flex justify-start gap-3 pl-3 pr-20 py-3 rounded-lg"
      :class="menuItem.disabled ? 'text-neutral-200 cursor-not-allowed' : 'hover:bg-zinc-100 text-neutral-800 hover:text-blue-500'"
      @click="emit('close')"
      >
      <component :is="menuItem.icon" class="w-6 h-6" />
      <div v-if="menuItem.disabled" class="transition-all text-sm font-medium leading-6 whitespace-nowrap">
        {{ menuItem.text }}
      </div>
      <div v-else class="transition-all text-sm font-medium leading-6 whitespace-nowrap">
        {{ menuItem.text }}
      </div>
      <div v-if="menuItem.text === 'Notifications'"
        class="text-white text-center text-xs font-medium leading-5 whitespace-nowrap justify-start items-stretch bg-rose-500 aspect-[1.3333333333333333] my-auto px-1 rounded-[100px]">
        48
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import IconApps from '@/assets/icons/menu/apps.svg';
import SvgoMenuNotification from '@/assets/icons/menu/Notification.svg';
import SvgoMenuCartAdd from '@/assets/icons/menu/cart-add.svg';
import SvgoMenuTag from '@/assets/icons/menu/tag.svg';
import SvgoMenuFileUpload from '@/assets/icons/menu/file-upload.svg';
import SvgoMenuHeart from '@/assets/icons/menu/heart.svg';
import SvgoMenuPackagingLocation from '@/assets/icons/menu/packaging-location.svg';
import SvgoMenuClock from '@/assets/icons/menu/Clock.svg';
import SvgoMenuSetting from '@/assets/icons/menu/Setting.svg';
import { useAuthStore } from '~/store/authStore';
import { AccountRole } from '~/types/signup/form';

const authStore = useAuthStore()

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const route = useRoute()

const isAdmin = computed(() => {
  const role = AccountRole[authStore.userDetails?.role as number]
  return role === 'SuperAdmin' || role === 'Admin'
})

const menuItems = ref([
  // {
  //   icon: IconApps,
  //   text: 'Dashboard',
  //   to: '/dashboard',
  // },
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
    disabled: true,
  },
  {
    icon: SvgoMenuFileUpload,
    text: 'BOM Upload',
    to: '/',
    disabled: true,
  },
  {
    icon: SvgoMenuHeart,
    text: 'Favorites',
    to: '/',
  },
  {
    icon: SvgoMenuPackagingLocation,
    text: 'Order Tracking',
    to: isAdmin.value ? '/dashboard' : '/dashboard/client?tab=home'
  },
  {
    icon: SvgoMenuClock,
    text: 'Order History',
    to:  isAdmin.value ? '/dashboard/orders' : '/dashboard/client?tab=orders',
  },
  {
    icon: SvgoMenuSetting,
    text: 'Settings',
    to: isAdmin.value ? '/dashboard' : '/dashboard/client?tab=settings'
  },
  // Add more menu items as needed
])
</script>
