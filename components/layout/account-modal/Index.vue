<template>
  <div class="fixed z-50 top-0 left-0 w-screen h-screen">
    <div
      class="relative z-10 flex flex-col ml-auto w-full h-full bg-white max-h-vh md:w-[450px]"
    >
      <div
        class="flex items-center justify-between p-5 border-b border-gray-200"
      >
        <button
          class="relative flex items-center text-gray-300"
          @click="isLoggedIn = !isLoggedIn"
        >
          <UserIcon class="w-7 h-7 mr-2" />
          <span class="text-lg font-semibold">
            {{ isLoggedIn ? "Jason Statham" : "My Account" }}
          </span>
        </button>
        <button
          class="rounded w-8 h-8 bg-[#F2F2F2] flex items-center justify-center text-gray-100 transition-colors duration-300 hover:text-gray-300"
          @click="showAccountModal = false"
        >
          <XIcon class="w-[15px] h-[15px]" />
        </button>
      </div>
      <div
        v-if="!isLoggedIn"
        class="flex-1 pt-[60px] overflow-y-auto scrollbar-thin"
      >
        <KeyholeIcon
          class="w-[100px] h-[100px] text-gray-200 mx-auto mb-[25px]"
        />
        <div class="text-gray-300 text-center font-medium mb-[50px]">
          Sign in to your account
        </div>
        <LayoutAccountModalForm />
      </div>
      <div v-else class="flex-1 pt-3 overflow-y-auto scrollbar-thin px-5">
        <div class="flex items-center justify-between mb-[30px]">
          <div class="flex items-center text-sm text-gray-300">
            <span class="mr-2">Customer ID:</span>
            <span class="font-Inter">4BV77XSX</span>
          </div>
          <BuildingIcon class="w-7 h-7" />
        </div>
        <div class="grid grid-cols-2 gap-5 max-w-[320px] mx-auto mb-[60px]">
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.to"
            class="flex flex-col items-center justify-center text-center w-[150px] h-[150px] rounded-md bg-[#F2F2F2] text-gray-300 transition-colors duration-300 hover:text-blue hover:bg-[#ebebeb]"
          >
            <component :is="item.icon" class="w-9 h-9 mb-3" />
            <div class="text-sm font-medium text-current">
              {{ item.label }}
            </div>
          </NuxtLink>
        </div>
        <button
          class="flex items-center justify-center w-full border border-blue py-2 max-w-[320px] rounded text-blue mx-auto mb-5"
        >
          <SignOutIcon class="w-6 h-6 mr-2" />
          <span class="text-sm font-medium">Sign out</span>
        </button>
      </div>
      <div class="text-xs text-gray-300 text-center mt-auto pb-2.5">
        For assistance please contact
        <a href="mailto:support@ecas.ro" class="text-blue hover:underline">
          support@ecas.ro
        </a>
      </div>
    </div>
    <div
      class="hidden absolute top-0 left-0 w-full h-full bg-[#333333]/70 backdrop-blur-[2px] cursor-pointer md:block"
      @click="showAccountModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import XIcon from "@/assets/icons/x.svg";
import UserIcon from "@/assets/icons/user.svg";
import KeyholeIcon from "@/assets/icons/keyhole.svg";
import BuildingIcon from "@/assets/icons/building.svg";
import DashboardIcon from "@/assets/icons/dashboard.svg";
import NotificationsIcon from "@/assets/icons/notifications.svg";
import QuickBuyIcon from "@/assets/icons/quick-buy-2.svg";
import PriceOfferIcon from "@/assets/icons/price-offer.svg";
import BOMUploadIcon from "@/assets/icons/bom-upload.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import OrderTrackingIcon from "@/assets/icons/order-tracking.svg";
import OrderHistoryIcon from "@/assets/icons/history.svg";
import SignOutIcon from "@/assets/icons/sign-out.svg";
import { showAccountModal } from "~~/system/modal/account";

const navItems = ref([
  {
    label: "Dashboard",
    to: "/",
    icon: DashboardIcon,
  },
  {
    label: "Notifications",
    to: "/",
    icon: NotificationsIcon,
  },
  {
    label: "Quick Buy",
    to: "/",
    icon: QuickBuyIcon,
  },
  {
    label: "Price Offer",
    to: "/",
    icon: PriceOfferIcon,
  },
  {
    label: "BOM Upload",
    to: "/",
    icon: BOMUploadIcon,
  },
  {
    label: "Favorites",
    to: "/",
    icon: HeartIcon,
  },
  {
    label: "Order Tracking",
    to: "/",
    icon: OrderTrackingIcon,
  },
  {
    label: "Order History",
    to: "/",
    icon: OrderHistoryIcon,
  },
]);

const isLoggedIn = ref(false);

onMounted(() => {
  documentUtil.toggleBodyScroll();
});

onBeforeUnmount(() => {
  documentUtil.toggleBodyScroll();
});
</script>
