<template>
  <div
    class="bg-blue py-[15px] shadow-card md:pt-2 md:pb-[9px] lg:pt-1.5 lg:pb-[7px]"
  >
    <div class="container">
      <div class="relative">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex items-center md:mr-5 lg:mr-[30px]">
              <button
                class="flex items-center mr-5 md:mr-0"
                @click="toggleNavModal"
              >
                <BurgerIcon class="w-[26px] h-[26px] md:w-7 md:h-w-7" />
                <span
                  v-if="!isScrolled"
                  class="hidden text-sm font-medium text-white ml-2 md:inline-block lg:text-base"
                >
                  Products
                </span>
              </button>
              <NuxtLink
                to="/"
                class="flex"
                :class="[isScrolled ? 'md:ml-5 lg:ml-[30px]' : 'md:hidden']"
              >
                <Logo
                  class="w-[101px] grayscale brightness-0 invert lg:w-[121px]"
                />
              </NuxtLink>
            </div>
            <ul
              v-if="!isScrolled"
              class="hidden items-center gap-5 md:flex lg:gap-[30px]"
            >
              <li v-for="(navItem, index) in navItems" :key="index" class="">
                <NuxtLink
                  :to="navItem.to"
                  class="flex text-sm font-medium text-white lg:text-base"
                >
                  {{ navItem.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <LayoutHeaderSearch v-if="isScrolled" :is-scrolled="isScrolled" />
          <div class="flex items-center gap-[15px] md:gap-5 xl:gap-[25px]">
            <button class="flex md:hidden" @click="showMobileSearch = true">
              <SearchIcon
                class="w-[26px] h-[26px] text-white md:w-[30px] md:h-[30px]"
              />
            </button>
            <button class="flex md:hidden" @click="showAccountModal = true">
              <UserIcon
                class="w-[26px] h-[26px] text-white md:w-[30px] md:h-[30px]"
              />
            </button>

            <button
              class="flex items-center"
              @click="
                favoritesCartModal = {
                  show: true,
                  tab: 'favorites',
                }
              "
            >
              <HeartIcon
                class="w-[26px] h-[26px] text-white md:w-7 md:h-7 xl:mr-2"
              />
              <span
                class="hidden text-sm font-medium text-white lg:text-base xl:inline-block"
              >
                Favorites
              </span>
            </button>
            <button
              class="hidden items-center xl:flex"
              @click="showAccountModal = true"
            >
              <UserIcon
                class="w-[26px] h-[26px] text-white md:w-7 md:h-7 xl:mr-2"
              />
              <span
                class="hidden text-sm font-medium text-white lg:text-base xl:inline-block"
              >
                My Account
              </span>
            </button>
            <button
              class="flex items-center text-left"
              @click="
                favoritesCartModal = {
                  show: true,
                  tab: 'shopping-cart',
                }
              "
            >
              <CartIcon
                class="w-[26px] h-[26px] text-white md:w-7 md:h-7 md:mr-2"
              />
              <div class="hidden flex-col text-white md:flex">
                <div class="text-xs leading-[1.17] mb-0">0 items</div>
                <div class="text-sm font-medium mb-0 lg:text-base">
                  0,00 RON
                </div>
                <div class="text-xs leading-[1.17]">(ex VAT)</div>
              </div>
            </button>
          </div>
        </div>
        <Transition name="fade">
          <div
            v-if="showMobileSearch"
            v-click-outside="() => (showMobileSearch = false)"
            class="absolute z-50 top-1/2 -translate-y-1/2 left-0 w-full md:hidden"
          >
            <div
              class="flex items-center border border-gray-100 bg-white rounded px-2.5"
            >
              <label class="relative z-10 flex-1 flex items-center">
                <SearchIcon
                  class="flex-shrink-0 w-[18px] h-[18px] text-gray-100"
                />
                <input
                  v-model="searchVal"
                  ref="searchDOM"
                  type="text"
                  placeholder="Search products"
                  class="bg-transparent flex-1 w-full px-[5px] py-2.5 text-sm leading-tight placeholder:text-gray-100 focus:outline-none"
                />
              </label>
              <button class="flex" @click="showMobileSearch = false">
                <XIcon class="flex-shrink-0 w-6 h-6 text-gray-100" />
              </button>
            </div>
          </div>
        </Transition>
        <Transition name="fade">
          <LayoutHeaderSearchResults v-if="searchVal" />
        </Transition>
        <Transition name="fade">
          <LayoutHeaderMainMenuLarge
            v-if="showNavModal"
            class="hidden absolute z-[60] -bottom-[7px] left-0 translate-y-full w-full max-w-max md:grid"
          />
        </Transition>
      </div>
    </div>
  </div>
  <Transition name="fade">
    <LayoutHeaderMainMenu v-if="showNavModal" />
  </Transition>
</template>

<script setup lang="ts">
import Logo from "@/assets/media/logo.svg";
import BurgerIcon from "@/assets/icons/header/burger.svg";
import SearchIcon from "@/assets/icons/search.svg";
import UserIcon from "@/assets/icons/user.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import CartIcon from "@/assets/icons/cart.svg";
import XIcon from "@/assets/icons/x.svg";
import { showAccountModal } from "~~/system/modal/account";
import { favoritesCartModal } from "~~/system/modal/favorites-cart";
import { showNavModal } from "~~/system/modal/nav";

defineProps({
  isScrolled: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();

const navItems = [
  {
    label: "News",
    to: "/",
  },
  {
    label: "How to Buy",
    to: "/",
  },
  {
    label: "About",
    to: "/",
  },
  {
    label: "Contact",
    to: "/",
  },
];

const searchVal = ref("");
const showMobileSearch = ref(false);
const searchDOM = ref<HTMLInputElement>();

const toggleNavModal = () => {
  if (window.innerWidth < 768 || route.name !== "index") {
    showNavModal.value = !showNavModal.value;
    return;
  }
  if (window.scrollY > 20) {
    showNavModal.value = !showNavModal.value;
  }
};

watch(showMobileSearch, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchDOM.value?.focus();
    });
  } else {
    searchVal.value = "";
  }
});
</script>
