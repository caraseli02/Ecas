<template>
  <header
    class="fixed z-30 top-0 left-0 w-full bg-white md:transition-all md:duration-300 md:delay-50"
    :class="[
      isCollapsedOnDesktop
        ? 'md:ml-[96px] md:w-[calc(100%-96px)]'
        : '2xl:ml-[280px] 2xl:w-[calc(100%-280px)]',
    ]"
    :style="{
      boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
    }"
  >
    <div
      class="w-[1440px] max-w-full mx-auto flex items-center justify-between px-4 py-3 transition-all duration-300 md:py-4 2xl:box-content"
      :class="[isCollapsedOnDesktop ? '2xl:px-[100px]' : '2xl:px-6']"
    >
      <button
        class="flex md:opacity-0 md:pointer-events-none xl:hidden"
        @click="$emit('show-side-nav')"
      >
        <BurgerIcon class="w-6 h-6 text-gray-300" />
      </button>
      <DashboardSearch
        v-model="searchValue"
        placeholder="Search"
        class="w-[400px] max-xl:hidden"
      />
      <div class="flex items-center">
        <button class="flex mr-4 md:mr-8 xl:hidden">
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
              <div
                v-if="showNotifications"
                v-click-outside="() => (showNotifications = false)"
                class="flex flex-col fixed z-50 top-0 left-0 w-full h-full bg-white shadow-card md:absolute md:w-[316px] md:h-[508px] md:max-h-[80vh] md:left-[unset] md:right-0 md:top-[62px] md:rounded-xl md:shadow-card md:overflow-hidden"
              >
                <div
                  class="relative flex items-center justify-between py-4 px-3 shadow-card"
                >
                  <button
                    class="flex items-center text-gray-300 transition-colors duration-300 hover:text-blue md:hidden"
                    @click="showNotifications = false"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 mr-2"
                    >
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
                    <span class="text-sm leading-[1.43] font-medium">
                      Back
                    </span>
                  </button>
                  <div
                    class="max-md:absolute max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 text-sm leading-[1.43] font-medium"
                  >
                    Notifications
                  </div>
                  <button
                    class="flex text-gray-300 transition-colors duration-300 hover:text-blue"
                  >
                    <SettingsIcon class="w-6 h-6" />
                  </button>
                </div>
                <div class="flex-1 overflow-y-auto notifications-scroll">
                  <NuxtLink
                    v-for="(notificaton, index) in notifications"
                    :key="index"
                    to="/"
                    class="flex flex-col w-full bg-[#F5F5F5] pt-2 pb-1 px-3 border-b border-border last:border-b-0 transition-colors duration-300 hover:bg-white"
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
                        <span
                          v-if="!notificaton.read"
                          class="flex w-2 h-2 flex-shrink-0 bg-blue rounded-full mr-2"
                        />
                        <span
                          class="capitalize text-sm leading-[1.43] font-medium"
                        >
                          {{ notificaton.type }}
                        </span>
                      </div>
                      <div class="flex items-center">
                        <span class="text-xs leading-[1.67] text-gray-300 mr-4">
                          {{ notificaton.date }}
                        </span>
                        <button
                          class="flex text-gray-300 transition-colors duration-300 hover:text-blue"
                          @click.prevent="removeNotification(index)"
                        >
                          <XIcon class="w-4 h-4" />
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
                <div class="flex justify-center py-4 shadow-card relative z-10">
                  <NuxtLink to="/" class="flex items-center text-blue">
                    <span class="text-sm leading-[1.43] font-medium mr-2">
                      View all
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 rotate-180"
                    >
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
            <Transition name="fade">
              <div
                v-if="showOptions"
                v-click-outside="() => (showOptions = false)"
                class="absolute -bottom-3.5 right-0 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-3 min-w-[250px] md:-bottom-[18px]"
                :style="{
                  boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
                }"
              >
                <button
                  class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                  @click="showOptions = false"
                >
                  <ProfileIcon class="w-6 h-6 mr-3 text-current" />
                  <span class="text-sm leading-[1.71] font-medium"
                    >Profile</span
                  >
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
                  <span class="text-sm leading-[1.71] font-medium"
                    >Sign out</span
                  >
                </button>
              </div>
            </Transition>
          </div>
        </div>
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
