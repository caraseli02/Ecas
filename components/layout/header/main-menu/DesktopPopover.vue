<script setup lang="ts">
import { XIcon, MenuIcon } from 'lucide-vue-next';
import PopoverContainer from './DektopPopoverContainer.vue';
import { useCategoriesNavigation } from '@/composables/useCategoriesNavigation';

defineProps<{ isScrolled: boolean }>();

const { isOpen } = useCategoriesNavigation();
</script>

<template>
    <UiPopover v-model:open="isOpen">
        <UiPopoverTrigger as-child>
            <UiButton
                :disabled="!isScrolled"
                :variant="isOpen || !isScrolled ? 'secondary' : 'ghost'"
                class="flex items-center mr-4 md:mr-0"
                :class="[{ 'text-white hover:text-blue-500': !isOpen }, { 'text-slate-500': !isScrolled }]"
            >
                <XIcon v-if="isOpen" class="w-6 h-6" />
                <MenuIcon v-else class="w-6 h-6" />
                <span v-if="!isScrolled" class="hidden leading-normal font-medium ml-2 md:inline-block lg:ml-4">Products</span>
            </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent
            align="start"
            :side-offset="15"
            class="p-0 w-screen bg-transparent shadow-none border-none hidden lg:block font-Poppins"
        >
            <PopoverContainer class="container" />
        </UiPopoverContent>
    </UiPopover>
</template>
