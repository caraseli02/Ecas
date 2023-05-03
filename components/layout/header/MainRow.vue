<template>
  <div class="bg-blue py-3 shadow-card md:py-2">
    <div class="container">
      <div class="relative">
        <div
          class="flex items-center justify-between gap-4 lg:gap-10 xl:gap-16"
        >
          <div class="flex items-center">
            <div class="flex items-center md:mr-4 lg:mr-[30px]">
              <button
                class="flex items-center mr-6 md:mr-0"
                @click="toggleNavModal"
              >
                <BurgerIcon class="w-[26px] h-[26px] md:w-7 md:h-7" />
                <span
                  v-if="!isScrolled"
                  class="hidden leading-normal font-medium text-white ml-6 md:inline-block"
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
                  class="w-[102px] grayscale brightness-0 invert lg:w-[121px]"
                />
              </NuxtLink>
            </div>
            <ul
              v-if="!isScrolled"
              class="hidden items-center gap-4 md:flex lg:gap-6"
            >
              <li v-for="(navItem, index) in navItems" :key="index" class="">
                <NuxtLink
                  :to="navItem.to"
                  class="flex leading-normal font-medium text-white"
                >
                  {{ navItem.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <LayoutHeaderSearch
            v-if="isScrolled"
            :is-scrolled="isScrolled"
            class="flex-1"
          />
          <div class="flex items-center gap-4 md:gap-6 xl:gap-[25px]">
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
              class="flex items-center"
              @click="
                favoritesCartModal = {
                  show: true,
                  tab: 'favorites',
                }
              "
            >
              <HeartIcon
                class="w-[26px] h-[26px] text-white md:w-7 md:h-7 md:mr-2"
              />
              <span
                class="hidden leading-normal font-medium text-white md:inline-block"
              >
                Favorites
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
              <div class="hidden flex-col text-white flex-shrink-0 md:flex">
                <div class="text-xs font-Inter leading-[1.17] mb-0.5">
                  0 items
                </div>
                <div class="leading-none font-Inter font-medium mb-0.5">
                  0,00 RON
                </div>
                <div class="text-[10px] leading-[1.6]">(ex VAT)</div>
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
              class="flex items-center border border-gray-100 bg-white rounded px-4"
            >
              <label class="relative z-10 flex-1 flex items-center">
                <SearchIcon
                  class="flex-shrink-0 w-[18px] h-[18px] text-gray-100"
                />
                <form action="" @submit.prevent="showMobileSearch = false">
                  <input
                    v-model="searchVal"
                    ref="searchDOM"
                    type="search"
                    placeholder="Search products"
                    class="bg-transparent flex-1 w-full px-2 py-2.5 text-sm leading-tight placeholder:text-gray-100 focus:outline-none"
                    @keypress.enter="
                      $router.push('/search');
                      searchVal = '';
                    "
                  />
                </form>
              </label>
              <button class="flex" @click="showMobileSearch = false">
                <XIcon class="flex-shrink-0 w-[18px] h-[18px] text-gray-100" />
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
            class="hidden absolute z-[60] -bottom-[8px] left-0 translate-y-full w-full max-w-max md:grid"
          />
        </Transition>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="slide-from-right">
      <LayoutHeaderMainMenu v-if="showNavModal" />
    </Transition>
    <Transition name="fade">
      <div
        v-if="showAccountModal || favoritesCartModal.show"
        class="hidden fixed z-[60] top-0 left-0 w-full h-full bg-[#333333]/70 backdrop-blur-[2px] cursor-pointer md:block"
        @click="
          showAccountModal = false;
          favoritesCartModal.show = false;
        "
      />
    </Transition>
    <Transition name="slide-from-right">
      <LayoutAccountModal
        v-if="showAccountModal"
        @close="showAccountModal = false"
      />
    </Transition>
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
import Logo from "@/assets/media/logo.svg";
import BurgerIcon from "@/assets/icons/header/burger.svg";
import SearchIcon from "@/assets/icons/search.svg";
import UserIcon from "@/assets/icons/user.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import CartIcon from "@/assets/icons/cart.svg";
import XIcon from "@/assets/icons/x.svg";
import { showNavModal } from "~~/config/modal/nav";
import { useAuthStore } from "~~/store/authStore";

defineProps({
  isScrolled: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();

const signinQuery = computed(() => route.query.signin);

const showAccountModal = ref(false);
const favoritesCartModal = ref({
  show: false,
  tab: "favorites" as "favorites" | "shopping-cart",
});

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

watch(signinQuery, (newVal) => {
  if (newVal === "true") {
    showAccountModal.value = true;
  }
});

onMounted(() => {
  if (signinQuery.value === "true") {
    showAccountModal.value = true;
  }
});
</script>
