<template>
    <header class="fixed z-50 top-0 left-0 w-full bg-white transition-transform duration-300">
        <div class="relative z-10 bg-[#F5F5F5] py-2">
            <div class="container">
                <div class="flex items-center justify-between text-gray-300">
                    <div class="hidden items-center gap-2 md:flex">
                        <HeadphonesIcon class="w-5 h-5" />
                        <div class="text-xs leading-[1.67] lg:text-sm lg:leading-tight">
                            Sales: +40724 360 250 (Mon-Fri 8:00AM - 4:00PM EST)
                        </div>
                    </div>
                    <div class="text-xs leading-[1.67] font-semibold text-[#FA4B4B] lg:text-sm lg:leading-[1.43]">
                        <span class="uppercase">Free</span> shipping on orders over $150
                    </div>
                    <button class="flex items-center" @click="showRegionalPreferencesModal = true">
                        <RonFlag class="w-6 h-5 mr-2.5" />
                        <span class="text-sm text-gray-300 leading-[1.14] md:leading-[1.43]">| RON</span>
                    </button>
                </div>
            </div>
        </div>
        <LayoutHeaderSearchRow :isScrolled="isScrolled" />
        <LayoutHeaderMainRow :is-scrolled="isScrolled" />
    </header>
    <Teleport to="body">
        <Transition name="slide-from-right">
            <LayoutRegionalPreferencesModal v-if="showRegionalPreferencesModal" @close="showRegionalPreferencesModal = false" />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import RonFlag from '@/assets/icons/flags/ron.svg';
import HeadphonesIcon from '@/assets/icons/headphones.svg';
import { showNavModal } from '~~/config/modal/nav';

defineProps({
    isScrolled: {
        type: Boolean,
        required: true,
    },
});

const showRegionalPreferencesModal = ref(false);
</script>
