<template>
    <div class="hidden relative z-20 bg-white py-3 md:py-4 xl:py-3" :class="[isScrolled ? '' : 'md:block']">
        <div class="container">
            <div class="relative flex items-center justify-between gap-6 md:gap-[25px] lg:gap-[52px] xl:gap-[162px]">
                <NuxtLink to="/" class="flex flex-shrink-0">
                    <Logo class="w-[142px] xl:w-[141px]" />
                </NuxtLink>
                <LayoutHeaderSearch :show-results="!isScrolled" class="flex-1 xl:translate-x-14 xl:max-w-[680px]" />
                <div class="flex items-center xl:gap-[46px]">
                    <div class="relative max-xl:hidden">
                        <button class="flex items-center" @click="showNotifications = true">
                            <div class="flex relative">
                                <BellIcon class="w-6 h-6 text-gray-300" />
                                <span
                                    class="absolute font-Inter z-10 -top-1 -right-[9px] bg-[#FA4B4B] text-white px-1 py-0.5 rounded-[100px] text-[10px] font-semibold leading-[1.1]"
                                >
                                    {{ unreadNotifications }}
                                </span>
                            </div>
                        </button>
                        <Transition name="slide-fast-from-bottom">
                            <Notifications
                                v-if="showNotifications"
                                :notifications="notifications"
                                @delete="deleteNotification"
                                @mark-as-read="markNotificationAsRead"
                                @close="showNotifications = false"
                            />
                        </Transition>
                    </div>
                    <button
                        class="flex items-center text-left max-md:hidden"
                        @click="
                            favoritesCartModal = {
                                show: true,
                                tab: 'shopping-cart',
                            }
                        "
                    >
                        <div class="relative mr-6">
                            <CartIcon class="w-6 h-6 text-gray-300 lg:mr-0" />
                            <span
                                class="absolute font-Inter z-10 -top-1 -right-2.5 bg-[#FA4B4B] text-white px-1 py-0.5 rounded-[100px] text-[10px] font-semibold leading-[1.1]"
                            >
                                47
                            </span>
                        </div>
                        <div class="flex-col text-gray-300 flex-shrink-0">
                            <div class="leading-[1.25] font-medium mb-0.5">37.000,00 RON</div>
                            <div class="text-[10px] leading-[1.6]">(ex VAT)</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <Transition name="slide-from-right">
            <LayoutAccountModal v-if="showAccountModal" @close="showAccountModal = false" />
        </Transition>
        <div
            v-if="showAccountModal || favoritesCartModal.show"
            class="hidden fixed z-[60] top-0 left-0 w-full h-full bg-[#333333]/70 backdrop-blur-[2px] cursor-pointer md:block"
            @click="
                showAccountModal = false;
                favoritesCartModal.show = false;
            "
        />
        <Transition name="slide-from-right">
            <LayoutFavoritesCartModal
                v-if="favoritesCartModal.show"
                :tab="favoritesCartModal.tab"
                @close="favoritesCartModal.show = false"
            />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import Logo from '@/assets/media/logo.svg';
import CartIcon from '@/assets/icons/cart.svg';
import BellIcon from '@/assets/icons/header/bell.svg';
import Notifications from '@/components/global/Notifications.vue';
import { Notification } from '~/types';

defineProps({
    isScrolled: {
        type: Boolean,
        required: true,
    },
});

const error = ref(false);
const isLoading = ref(false);

const notifications = ref<Notification[]>([] as Notification[]);

const unreadNotifications = ref(0);
const { $api } = useNuxtApp();
const showNotifications = ref(false);
const fetchNofications = async () => {
    error.value = false;
    isLoading.value = true;

    const response = await $api.notifications.fetchGetNotifications();
    if (response.status !== 'success') {
        isLoading.value = false;
        error.value = true;

        return;
    } else {
        isLoading.value = false;
    }
    notifications.value = response.description;
    Object.keys(notifications.value).forEach((notification) => {
        if (notifications.value[notification].seen === false) {
            unreadNotifications.value++;
        }
    });
};

const markNotificationAsRead = async (notification: Notification, index: number) => {
    if (notifications.value[index].seen !== true) {
        unreadNotifications.value--;
    }
    const response = await $api.notifications.fetchMarkNotificationAsRead(notification.id);
    if (response.status !== 'success') {
        return;
    }
    notifications.value[index].seen = true;
};
const deleteNotification = async (notification: Notification, index: number) => {
    const response = await $api.notifications.deleteNotificationById(notification.id);
    if (response.status !== 'success') {
        return;
    }
    notifications.value.splice(index, 1);
};

const showAccountModal = ref(false);

const favoritesCartModal = ref({
    show: false,
    tab: 'favorites' as 'favorites' | 'shopping-cart',
});

Promise.all([fetchNofications()]);
</script>
