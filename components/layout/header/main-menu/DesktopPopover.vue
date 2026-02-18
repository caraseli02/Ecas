<script setup lang="ts">
import { XIcon, MenuIcon } from 'lucide-vue-next';
import PopoverContainer from './DektopPopoverContainer.vue';
import { useCategoriesNavigation } from '@/composables/useCategoriesNavigation';

defineProps<{ isScrolled: boolean }>();

const { isOpen } = useCategoriesNavigation();

const togglePopover = () => {
    isOpen.value = !isOpen.value;
};

const closePopover = () => {
    isOpen.value = false;
};
</script>

<template>
    <div v-click-outside="closePopover" class="relative hidden lg:block font-Poppins">
        <UiButton
            :variant="isOpen || !isScrolled ? 'secondary' : 'ghost'"
            class="flex items-center mr-4 md:mr-0"
            :class="[{ 'text-white hover:text-blue-500': !isOpen }, { 'text-slate-500': !isScrolled }]"
            @click="togglePopover"
        >
            <XIcon v-if="isOpen" class="w-6 h-6" />
            <MenuIcon v-else class="w-6 h-6" />
            <span v-if="!isScrolled" class="hidden leading-normal font-medium ml-2 md:inline-block lg:ml-4">Products</span>
        </UiButton>
        <div v-if="isOpen" class="absolute left-0 top-full z-50 mt-[15px] w-screen">
            <PopoverContainer class="container" />
        </div>
    </div>
</template>
