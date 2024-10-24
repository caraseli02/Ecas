<template>
    <UiSheet>
        <UiSheetTrigger>
            <button class="flex items-center -mr-2.5 xl:-mr-4">
                <div class="flex items-center">
                    <div class="flex items-center flex-col">
                        <BellIcon class="w-6 h-6 text-white xl:mb-1" />
                        <span class="hidden font-medium text-xs leading-[1.33] text-white xl:inline-block">
                            Notifications
                        </span>
                    </div>
                    <span v-if="unreadNotifications > 0"
                        class="flex items-center justify-center -translate-y-2 -translate-x-2.5 h-[18px] font-Inter z-10 -top-1 -right-[9px] bg-rose-500 text-white rounded-[100px] text-xs font-medium leading-[1.5] xl:-translate-x-[38px] xl:-translate-y-[18px]"
                        :class="[unreadNotifications < 10 ? 'w-[18px]' : unreadNotifications < 100 ? 'w-6' : 'w-[31px]']">
                        <span>
                            {{ unreadNotifications }}
                        </span>
                    </span>
                </div>
            </button>
        </UiSheetTrigger>
        <UiSheetContent class="max-h-[calc(100vh-48px)] p-0 m-6 overflow-hidden rounded-xl">
            <div class="relative flex items-center justify-between py-4 px-3 shadow-s">
                <p class="text-2xl font-medium">
                    Notifications
                </p>
                <UiButton class="z-10" size="icon" variant="secondary">
                    <XIcon />
                </UiButton>
            </div>
            <div class="flex-1 overflow-y-auto h-full max-h-[calc(100vh-168px)] notifications-scroll">
                <NuxtLink v-for="(notification, index) in notifications" :key="index" :to="`${route.path}`" event=""
                    class="flex flex-col w-full bg-white pt-2 pb-1 px-3 border-b border-border last:border-b-0 transition-colors duration-300 hover:bg-[#F5F5F5]"
                    @click.prevent="markNotificationAsRead(notification, index)">
                    <div class="flex items-center justify-between w-full mb-2">
                        <div class="flex items-center">
                            <NotificationIcon class="w-5 h-5 mr-2" :class="[
                                notification.title === 'Others'
                                    ? 'text-slate-500'
                                    : notification.title === 'Password change' || notification.title === 'Reset password'
                                        ? 'text-blue-500'
                                        : notification.title === 'Removed'
                                            ? 'text-rose-500'
                                            : notification.title === 'Completed'
                                                ? 'text-[#00D395]'
                                                : notification.title === 'Pending'
                                                    ? 'text-[#FFB100]'
                                                    : 'text-[#A460BC]',
                            ]" />
                            <span v-if="!notification.seen"
                                class="flex w-2 h-2 flex-shrink-0 bg-blue-500 rounded-full mr-2" />
                            <span class="capitalize text-sm leading-[1.43] font-medium">
                                {{ notification.title }}
                            </span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-xs leading-[1.67] text-slate-500 mr-4">
                                {{ getCurrentDate(notification.date) }}
                            </span>
                            <button class="flex text-slate-500 transition-colors duration-300 hover:text-blue-500"
                                @click.stop.prevent="deleteNotification(notification, index)">
                                <XIcon class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="text-sm leading-[1.43] text-slate-500 mr-1">
                            {{ notification.description }}
                        </div>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="w-[18px] h-[18px] flex-shrink-0">
                            <path d="M7.5 12.75L10.5 9L7.5 5.25" stroke="#5E6278" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </NuxtLink>
            </div>
            <div class="flex justify-between py-4 shadow-s z-10 sticky bottom-0 px-4">
                <NuxtLink to="/" class="flex items-center text-blue-500">
                    <span class="text-sm leading-[1.43] font-medium mr-2"> View all </span>
                    <ArrowRight class="w-5 h-5 text-blue-500"/>
                </NuxtLink>
                <Settings class="w-5 h-5 text-blue-500"/>
            </div>
        </UiSheetContent>
    </UiSheet>
</template>

<script setup lang="ts">
import BellIcon from '@/assets/icons/header/bell.svg';
import NotificationIcon from '@/assets/icons/dashboard/notification-ringing.svg';
import type { Notification } from '~/types';
import moment from 'moment';
import { XIcon, ArrowRight, Settings } from 'lucide-vue-next';

const route = useRoute();

const emits = defineEmits(['close', 'markAsRead', 'delete']);

defineProps<{
    unreadNotifications: number,
    notifications: Notification[],
}>();

const getCurrentDate = (date: string) => {
    const currentDate = moment();
    const receivedDate = moment(date);
    return currentDate.diff(receivedDate, 'hours') < 24
        ? currentDate.diff(receivedDate, 'hours') + 'h'
        : currentDate.diff(receivedDate, 'days') + 'd';
};

const markNotificationAsRead = async (notification: Notification, index: number) => {
    emits('markAsRead', notification, index);
};
const deleteNotification = async (notification: Notification, index: number) => {
    emits('delete', notification, index);
};
</script>
