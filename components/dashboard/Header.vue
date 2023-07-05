<template>
  <header
    class="fixed z-30 top-0 left-0 w-full bg-white shadow-xs md:transition-all md:duration-300 md:delay-50 md:ml-[96px] md:w-[calc(100%-96px)]"
    :class="[
      isCollapsedOnDesktop ? '' : '2xl:ml-[280px] 2xl:w-[calc(100%-280px)]',
    ]"
  >
    <div
      class="max-w-full mx-auto flex items-center justify-between px-4 py-3 transition-all duration-300 md:py-4 2xl:px-6"
    >
      <button
        class="flex md:opacity-0 md:pointer-events-none md:hidden"
        @click="$emit('show-side-nav')"
      >
        <BurgerIcon class="w-6 h-6 text-gray-300" />
      </button>
      <DashboardSearch
        v-model="searchValue"
        placeholder="Search"
        class="w-[400px] max-md:hidden"
      />
      <div class="flex items-center">
        <button
          class="flex mr-4 md:mr-8 md:hidden"
          @click="showMobileSearch = !showMobileSearch"
        >
          <SearchIcon class="w-6 h-6 text-gray-300" />
        </button>
        <button
          class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 mr-8 max-md:hidden"
        >
          <PlusIcon class="w-6 h-6 text-gray-300" />
        </button>
        <div class="relative flex items-center">
          <div class="mr-6 max-md:relative md:mr-10">
            <div class="relative">
              <button class="flex" @click="showNotifications = true">
                <BellIcon class="w-6 h-6 text-gray-300" />
              </button>
              <div
                class="flex absolute -top-1 right-0 translate-x-1/2 bg-[#FA4B4B] rounded-[100px] px-1 py-0.5 text-[10px] font-semibold tracking-[-0.03em] leading-[1.1] text-white font-Inter"
              >
                45
              </div>
            </div>
            <Transition name="fade">
              <DashboardNotifications
                v-if="showNotifications"
                :notifications="notifications"
                is-mobile
                @close="showNotifications = false"
                @remove="removeNotification($event)"
              />
            </Transition>
            <Transition name="slide-fast-from-bottom">
              <DashboardNotifications
                v-if="showNotifications"
                :notifications="notifications"
                @close="showNotifications = false"
                @remove="removeNotification($event)"
              />
            </Transition>
          </div>
          <div class="relative">
            <button
              class="flex items-center text-left"
              @click="showOptions = !showOptions"
            >
              <div class="relative mr-4">
                <img
                  src="@/assets/icons/dashboard/avatar.png"
                  alt="Avatar"
                  class="w-11 h-11 rounded-full object-cover"
                />
                <div
                  class="absolute -bottom-1 -right-1 box-content w-2.5 h-2.5 rounded-full bg-[#00D395] border-4 border-white"
                />
              </div>
              <div class="flex flex-col mr-4 max-lg:hidden">
                <div class="leading-normal font-medium">Madalina Popescu</div>
                <div class="text-xs leading-normal text-gray-300">
                  Super Admin
                </div>
              </div>
              <ChevronDownIcon class="w-6 h-6 text-gray-300" />
            </button>
            <Transition name="fade-full">
              <div
                v-if="showOptions"
                v-click-outside="() => (showOptions = false)"
                class="absolute -bottom-3.5 right-0 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-3 min-w-[250px] shadow-m md:-bottom-[18px]"
              >
                <button
                  class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                  @click="showOptions = false"
                >
                  <ProfileIcon class="w-6 h-6 mr-3 text-current" />
                  <span class="text-sm leading-[1.71] font-medium">
                    Profile
                  </span>
                </button>
                <button
                  class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                  @click="showOptions = false"
                >
                  <SettingsIcon class="w-6 h-6 mr-3 text-current" />
                  <span class="text-sm leading-[1.71] font-medium"
                    >Settings</span
                  >
                </button>
                <button
                  class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                  @click="showOptions = false"
                >
                  <SignOutIcon class="w-6 h-6 mr-3 text-current" />
                  <span class="text-sm leading-[1.71] font-medium">
                    Sign out
                  </span>
                </button>
              </div>
            </Transition>
          </div>
        </div>
        <Transition name="fade">
          <div
            v-if="showMobileSearch"
            v-click-outside="() => (showMobileSearch = false)"
            class="absolute z-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] md:hidden"
          >
            <div
              class="flex items-center border border-border bg-white rounded-lg pr-3"
            >
              <label class="relative z-10 flex-1 flex items-center">
                <form action="" @submit.prevent>
                  <input
                    v-model="searchValue"
                    type="search"
                    placeholder="Search"
                    class="bg-transparent flex-1 w-full px-3 py-2.5 text-sm leading-[1.43] placeholder:text-gray-100 focus:outline-none"
                  />
                </form>
              </label>
              <SearchIcon
                v-if="!searchValue"
                class="flex-shrink-0 w-5 h-5 text-gray-100"
              />
              <button v-else class="flex" @click.stop="searchValue = ''">
                <XIcon class="flex-shrink-0 w-5 h-5 text-gray-100" />
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import BurgerIcon from "@/assets/icons/dashboard/burger.svg";
import SearchIcon from "@/assets/icons/dashboard/search.svg";
import BellIcon from "@/assets/icons/dashboard/bell.svg";
import ChevronDownIcon from "@/assets/icons/dashboard/chevron-down.svg";
import PlusIcon from "@/assets/icons/dashboard/plus.svg";
import ProfileIcon from "@/assets/icons/dashboard/profile.svg";
import SettingsIcon from "@/assets/icons/dashboard/setting.svg";
import SignOutIcon from "@/assets/icons/dashboard/sign-out.svg";
import NotificationIcon from "@/assets/icons/dashboard/notification-ringing.svg";
import { DashboardNotification } from "@/types";
import XIcon from "@/assets/icons/dashboard/x.svg";

defineProps({
  isCollapsedOnDesktop: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["show-side-nav"]);

const showMobileSearch = ref(false);
const searchValue = ref("");

const notifications = ref<DashboardNotification[]>([
  {
    type: "others",
    message: "Notification content goes here. More content goes here.",
    date: "16 h",
    read: true,
  },
  {
    type: "new",
    message: "Notification content goes here. More content goes here.",
    date: "15 m",
    read: false,
  },
  {
    type: "removed",
    message: "Notification content goes here. More content goes here.",
    date: "2 d",
    read: true,
  },
  {
    type: "completed",
    message: "Notification content goes here. More content goes here.",
    date: "16 h",
    read: false,
  },
  {
    type: "pending",
    message: "Notification content goes here. More content goes here.",
    date: "16 h",
    read: true,
  },
  {
    type: "processing",
    message: "Notification content goes here. More content goes here.",
    date: "16 h",
    read: false,
  },
  {
    type: "removed",
    message: "Notification content goes here. More content goes here.",
    date: "2 d",
    read: false,
  },
  {
    type: "completed",
    message: "Notification content goes here. More content goes here.",
    date: "16 h",
    read: false,
  },
  {
    type: "pending",
    message: "Notification content goes here. More content goes here.",
    date: "16 h",
    read: false,
  },
  {
    type: "processing",
    message: "Notification content goes here. More content goes here.",
    date: "16 h",
    read: false,
  },
]);

const showOptions = ref(false);
const showNotifications = ref(false);

const removeNotification = (index: number) => {
  notifications.value.splice(index, 1);
};
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
