<template>
    <div class="fixed z-[60] top-0 left-0 w-screen max-h-screen overflow-hidden pointer-events-none">
        <div
            class="relative z-10 flex flex-col ml-auto w-full bg-white h-full pointer-events-auto md:w-[450px] p-4 md:p-6 scrollbar-thin">
            <div class="flex flex-col items-center justify-start pb-6 gap-6">
                <button
                    class="rounded w-8 h-8 bg-[#F2F2F2] flex items-center justify-center text-gray-100 transition-colors duration-300 hover:text-gray-300 self-end"
                    @click="$emit('close')">
                    <XIcon class="w-[24px] h-[24px] text-[#5E6278]" />
                </button>
                <LayoutAccountModalDetails v-if="getUserDetails" />
            </div>
            <div v-if="!getUserDetails" class="flex-1 pt-[60px]">
                <KeyholeIcon class="w-[100px] h-[100px] text-gray-200 mx-auto mb-[25px]" />
                <div class="text-gray-300 text-center font-medium mb-[50px]">Sign in to your account</div>
                <LayoutAccountModalForm />
            </div>
            <div v-else class="flex-1 pt-6 flex flex-col gap-6">
                <LayoutAccountModalMessage />
                <!-- <LayoutAccountModalBanner /> -->
                <LayoutAccountModalCredits />
                <LayoutAccountModalLinks />
                <!-- <button
                    class="flex items-center justify-center w-full border border-blue py-2 max-w-[320px] rounded text-blue mx-auto mb-5"
                    @click="handleSignOut"
                >
                    <span class="text-sm font-medium">Sign out</span>
                </button> -->


            </div>
            <div class="text-xs text-gray-300 text-center mt-auto pb-2.5 pt-6 flex flex-col gap-6">
                <button
                    class="sticky bottom-0 w-full justify-center items-center self-stretch flex flex-col px-16 py-2 rounded-lg border-[1.5px] border-solid border-sky-500">
                    <button class="flex items-center gap-2" @click="handleSignOut">
                        <SignOutIcon class="w-6 h-6" />
                        <div class="text-sky-500 text-base font-medium leading-7 self-stretch grow whitespace-nowrap">
                            Sign Out
                        </div>
                    </button>
                </button>
                <p class="flex justify-center items-center gap-2">
                    <SvgoMenuHelp />
                    For assistance please contact
                    <a href="mailto:support@ecas.ro" class="text-blue hover:underline"> support@ecas.ro </a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import XIcon from '@/assets/icons/x.svg';
import KeyholeIcon from '@/assets/icons/keyhole.svg';
import DashboardIcon from '@/assets/icons/dashboard.svg';
import NotificationsIcon from '@/assets/icons/notifications.svg';
import QuickBuyIcon from '@/assets/icons/quick-buy-2.svg';
import PriceOfferIcon from '@/assets/icons/price-offer.svg';
import BOMUploadIcon from '@/assets/icons/bom-upload.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import OrderTrackingIcon from '@/assets/icons/order-tracking.svg';
import OrderHistoryIcon from '@/assets/icons/history.svg';
import SignOutIcon from '@/assets/icons/menu/sign-out.svg';
import SvgoMenuHelp from '@/assets/icons/menu/help.svg';
import { useAuthStore } from '~~/store/authStore';
import { storeToRefs } from 'pinia';

const emit = defineEmits<{
  (e: 'close'): void;
}>();
const authStore = useAuthStore();
const {getUserDetails, getToken, getCurrentUser} = storeToRefs(authStore);

const navItems = ref([
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'Notifications',
    to: '/',
    icon: NotificationsIcon,
  },
  {
    label: 'Quick Buy',
    to: '/',
    icon: QuickBuyIcon,
  },
  {
    label: 'Price Offer',
    to: '/',
    icon: PriceOfferIcon,
  },
  {
    label: 'BOM Upload',
    to: '/',
    icon: BOMUploadIcon,
  },
  {
    label: 'Favorites',
    to: '/',
    icon: HeartIcon,
  },
  {
    label: 'Order Tracking',
    to: '/',
    icon: OrderTrackingIcon,
  },
  {
    label: 'Order History',
    to: '/',
    icon: OrderHistoryIcon,
  },
]);

const handleSignOut = async () => {
  authStore.signOut();
  await authStore.firebaseSignOut();

  setTimeout(() => {
    emit('close');
  }, 200);
};

onMounted(() => {
  documentUtil.toggleBodyScroll();
});

onBeforeUnmount(() => {
  documentUtil.toggleBodyScroll();
});
</script>
