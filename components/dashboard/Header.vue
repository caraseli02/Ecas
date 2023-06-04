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
        <div class="relative mr-6 md:mr-10">
          <button class="flex">
            <BellIcon class="w-6 h-6 text-gray-300" />
          </button>
          <div
            class="flex absolute -top-1 right-0 translate-x-1/2 bg-[#FA4B4B] rounded-[100px] px-1 py-0.5 text-[10px] font-semibold tracking-[-0.03em] leading-[1.1] text-white font-Inter"
          >
            45
          </div>
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
                <span class="text-sm leading-[1.71]">Profile</span>
              </button>
              <button
                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                @click="showOptions = false"
              >
                <SettingsIcon class="w-6 h-6 mr-3 text-current" />
                <span class="text-sm leading-[1.71]">Settings</span>
              </button>
              <button
                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                @click="showOptions = false"
              >
                <SignOutIcon class="w-6 h-6 mr-3 text-current" />
                <span class="text-sm leading-[1.71]">Sign out</span>
              </button>
            </div>
          </Transition>
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

defineProps({
  isCollapsedOnDesktop: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["show-side-nav"]);

const searchValue = ref("");

const showOptions = ref(false);
</script>
