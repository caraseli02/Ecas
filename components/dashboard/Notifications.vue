<template>
  <div
      v-click-outside="() => $emit('close')"
      class="flex flex-col fixed z-50 top-0 left-0 w-full h-full bg-white shadow-m md:absolute md:w-[316px] md:h-[508px] md:max-h-[80vh] md:left-[unset] md:right-0 md:top-[62px] md:rounded-xl md:overflow-hidden"
      :class="[isMobile ? 'md:hidden' : 'max-md:hidden']"
  >
    <div class="relative flex items-center justify-between py-4 px-3 shadow-s">
      <button
          class="flex items-center text-gray-300 transition-colors duration-300 hover:text-blue md:hidden"
          :class="[isMobile ? 'md:hidden' : 'hidden']"
          @click="$emit('close')"
      >
        <svg
width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
             class="w-4 h-4 mr-2">
          <path
              d="M6.3826 3.95312L2.33594 7.99979L6.3826 12.0465"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
          <path
              d="M13.6653 8L2.44531 8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
        <span class="text-sm leading-[1.43] font-medium"> Back </span>
      </button>
      <div
          class="max-md:absolute max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 text-sm leading-[1.43] font-medium"
      >
        Notifications
      </div>
      <button class="flex text-gray-300 transition-colors duration-300 hover:text-blue">
        <SettingsIcon class="w-6 h-6"/>
      </button>
    </div>
    <div class="flex-1 overflow-y-auto notifications-scroll">
      <NuxtLink
          v-for="(notificaton, index) in notifications"
          :key="index"
          to="/"
          event=""
          class="flex flex-col w-full bg-white pt-2 pb-1 px-3 border-b border-border last:border-b-0 transition-colors duration-300 hover:bg-[#F5F5F5]  cursor: 'pointer'"
      >
        <div class="flex items-center justify-between w-full mb-2">
          <div class="flex items-center">
            <NotificationIcon
                class="w-5 h-5 mr-2"
                :class="[
                                notificaton.type === 'others'
                                    ? 'text-gray-300'
                                    : notificaton.type === 'new'
                                    ? 'text-blue'
                                    : notificaton.type === 'removed'
                                    ? 'text-[#FA4B4B]'
                                    : notificaton.type === 'completed'
                                    ? 'text-[#00D395]'
                                    : notificaton.type === 'pending'
                                    ? 'text-[#FFB100]'
                                    : 'text-[#A460BC]',
                            ]"
            />
            <span v-if="!notificaton.read" class="flex w-2 h-2 flex-shrink-0 bg-blue rounded-full mr-2"/>
            <span class="capitalize text-sm leading-[1.43] font-medium">
                            {{ notificaton.type }}
                        </span>
          </div>
          <div class="flex items-center">
                        <span class="text-xs leading-[1.67] text-gray-300 mr-4">
                            {{ notificaton.date }}
                        </span>
            <button
                class="flex text-gray-300 transition-colors duration-300 hover:text-blue"
                @click.prevent="$emit('remove', index)"
            >
              <XIcon class="w-4 h-4"/>
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-sm leading-[1.43] text-gray-300 mr-1">
            {{ notificaton.message }}
          </div>
          <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-[18px] h-[18px] flex-shrink-0"
          >
            <path
                d="M7.5 12.75L10.5 9L7.5 5.25"
                stroke="#5E6278"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </div>
      </NuxtLink>
    </div>
    <div class="flex justify-center py-4 shadow-s relative z-10">
      <NuxtLink to="/" class="flex items-center text-blue">
        <span class="text-sm leading-[1.43] font-medium mr-2"> View all </span>
        <svg
width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
             class="w-4 h-4 rotate-180">
          <path
              d="M6.3826 3.95312L2.33594 7.99979L6.3826 12.0465"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
          <path
              d="M13.6653 8L2.44531 8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsIcon from '@/assets/icons/dashboard/setting.svg';
import NotificationIcon from '@/assets/icons/dashboard/notification-ringing.svg';
import {DashboardNotification} from '@/types';
import XIcon from '@/assets/icons/dashboard/x.svg';

defineProps({
  notifications: {
    type: Array as PropType<DashboardNotification[]>,
    required: true,
  },
  isMobile: {
    type: Boolean,
    required: false,
    default: false,
  },
});


defineEmits(['close', 'remove']);
</script>

<style lang="scss">
.notifications-scroll {
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    @apply w-1;
  }

  &::-webkit-scrollbar-track {
    @apply bg-[#f5f5f5];
  }

  &::-webkit-scrollbar-thumb {
    background: #d4d4d4;
    @apply rounded-[100px] border-[#f5f5f5];
  }
}
</style>
