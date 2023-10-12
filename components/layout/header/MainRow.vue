<template>
    <div class="bg-blue py-3 shadow-m md:py-2">
        <div class="container">
            <div class="relative">
                <div class="flex items-center justify-between gap-4 lg:gap-[35px] xl:gap-[78px]" :class="[isScrolled ? 'md:gap-0' : '']">
                    <div class="flex items-center">
                        <div class="flex items-center" :class="[isScrolled ? 'md:mr-[29px] lg:mr-0' : 'md:mr-4 lg:mr-6']">
                            <button class="flex items-center mr-6 md:mr-0" @click="toggleNavModal">
                                <BurgerIcon class="w-6 h-6" />
                                <span v-if="!isScrolled" class="hidden leading-normal font-medium text-white ml-6 md:inline-block">
                                    Products
                                </span>
                            </button>
                            <NuxtLink to="/" class="flex" :class="[isScrolled ? 'md:ml-6 lg:ml-6' : 'md:hidden']">
                                <Logo class="w-[102px] grayscale brightness-0 invert md:w-[122px]" />
                            </NuxtLink>
                        </div>
                        <ul v-if="!isScrolled" class="hidden items-center gap-4 md:flex lg:gap-6">
                            <li v-for="(navItem, index) in navItems" :key="index" class="">
                                <NuxtLink :to="navItem.to" class="flex leading-normal font-medium text-white">
                                    {{ navItem.label }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <LayoutHeaderSearch
                        v-if="isScrolled"
                        :show-results="true"
                        :isVisible="showMobileSearch"
                        :is-scrolled="isScrolled"
                        class="flex-1 max-md:hidden lg:block"
                        :class="[showMobileSearch ? '' : 'md:hidden']"
                        @blur="showMobileSearch = false"
                    />
                    <div class="flex items-center gap-4 lg:ml-0 lg:gap-6 xl:gap-[25px]" :class="[isScrolled ? 'md:ml-4' : 'md:gap-6']">
                        <button
                            class="items-center"
                            :class="[isScrolled ? (showMobileSearch ? 'md:hidden lg:hidden' : 'md:flex lg:hidden') : 'md:hidden']"
                            @click="showMobileSearch = true"
                        >
                            <SearchIcon class="w-6 h-6 text-white md:w-6 md:h-6 md:mr-2" />
                            <span class="hidden leading-normal font-medium text-white md:inline-block"> Search </span>
                        </button>
                        <button
                            class="flex items-center"
                            :class="[isScrolled ? (showMobileSearch ? 'md:hidden lg:hidden xl:flex' : 'lg:hidden xl:flex') : '']"
                            @click="
                                favoritesCartModal = {
                                    show: true,
                                    tab: 'favorites',
                                }
                            "
                        >
                            <HeartIcon class="w-6 h-6 text-white md:mr-2" />
                            <span class="hidden leading-normal font-medium text-white md:inline-block"> Favorites </span>
                        </button>
                        <button class="flex items-center md:hidden" @click="showAccountModal = true">
                            <UserIcon class="w-6 h-6 text-white md:w-6 md:h-6" />
                        </button>
                        <button
                            class="hidden items-center xl:flex"
                            :class="[isScrolled ? (showMobileSearch ? 'md:hidden' : 'md:flex') : '']"
                            @click="showAccountModal = true"
                        >
                            <UserIcon class="w-6 h-6 text-white mr-2 md:w-6 md:h-6" />
                            <span class="hidden font-medium text-white md:inline-block lg:text-base"> My Account </span>
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
                            <CartIcon class="w-6 h-6 text-white md:mr-2" />
                            <div class="hidden flex-col text-white flex-shrink-0 md:flex">
                                <div class="text-xs leading-[1.17] mb-px">15 items</div>
                                <div class="leading-[1.25] font-medium mb-px">0,00 RON</div>
                                <div class="text-[10px] leading-[1.6]">(ex VAT)</div>
                            </div>
                        </button>
                    </div>
                </div>
                <Transition name="fade">
                    <div v-if="showMobileSearch && isMobile" class="absolute z-50 top-1/2 -translate-y-1/2 left-0 w-full md:hidden">
                        <div class="flex items-center border border-border bg-white rounded-lg px-3">
                            <label class="relative z-10 flex-1 flex items-center justify-between">
                                <form action="" @submit.prevent="showMobileSearch = false">
                                    <input
                                        ref="searchDOM"
                                        v-model="searchVal"
                                        type="search"
                                        placeholder="Search products"
                                        class="bg-transparent flex-1 w-full py-[7px] text-sm leading-[1.71] placeholder:text-gray-100 focus:outline-none"
                                        @keypress.enter="
                                            $router.push('/search');
                                            searchVal = '';
                                        "
                                        @blur="showMobileSearch = false"
                                    />
                                </form>
                                <SearchIcon class="flex-shrink-0 w-5 h-5 text-gray-100" />
                            </label>
                        </div>
                    </div>
                </Transition>
                <Transition name="fade">
                    <LayoutHeaderSearchResults v-if="searchVal" :is-scrolled="isScrolled" />
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
        <Transition name="slide-from-left">
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
            <LayoutAccountModal v-if="showAccountModal" @close="showAccountModal = false" />
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
import Logo from '@/assets/media/logo.svg';
import BurgerIcon from '@/assets/icons/header/burger.svg';
import SearchIcon from '@/assets/icons/search.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import UserIcon from '@/assets/icons/user.svg';
import CartIcon from '@/assets/icons/cart.svg';
import XIcon from '@/assets/icons/x.svg';
import { showNavModal } from '~~/config/modal/nav';
import { useAuthStore } from '~~/store/authStore';

defineProps({
    isScrolled: {
        type: Boolean,
        required: true,
    },
});

const route = useRoute();

const isMobile = ref(false);

const signinQuery = computed(() => route.query.signin);

const showAccountModal = ref(false);
const favoritesCartModal = ref({
    show: false,
    tab: 'favorites' as 'favorites' | 'shopping-cart',
});

const navItems = [
    {
        label: 'News',
        to: '/',
    },
    {
        label: 'How to Buy',
        to: '/',
    },
    {
        label: 'About',
        to: '/',
    },
    {
        label: 'Contact',
        to: '/',
    },
];

const searchVal = ref('');
const showMobileSearch = ref(false);
const searchDOM = ref<HTMLInputElement>();

const toggleNavModal = () => {
    if (window.innerWidth < 768 || route.name !== 'index') {
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
        searchVal.value = '';
    }
});

watch(signinQuery, (newVal) => {
    if (newVal === 'true') {
        showAccountModal.value = true;
    }
});

onMounted(() => {
    isMobile.value = window.innerWidth <= 767;
    if (signinQuery.value === 'true') {
        showAccountModal.value = true;
    }
});
</script>
