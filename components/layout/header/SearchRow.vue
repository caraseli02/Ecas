<template>
    <div class="hidden relative z-20 bg-white py-3" :class="[isScrolled ? '' : 'md:block']">
        <div class="container">
            <div class="relative flex items-center justify-between gap-6 lg:gap-[52px] xl:gap-[162px]">
                <NuxtLink to="/" class="flex flex-shrink-0">
                    <Logo class="w-[142px] xl:w-[141px]" />
                </NuxtLink>
                <LayoutHeaderSearch :show-results="!isScrolled" class="flex-1" />
                <button class="hidden items-center text-gray-300 flex-shrink-0 md:flex" @click="showAccountModal = true">
                    <UserIcon class="w-6 h-6 mr-2" />
                    <span class="leading-normal font-medium"> My Account </span>
                </button>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <Transition name="slide-from-right">
            <LayoutAccountModal v-if="showAccountModal" @close="showAccountModal = false" />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import Logo from '@/assets/media/logo.svg';
import UserIcon from '@/assets/icons/user.svg';

defineProps({
    isScrolled: {
        type: Boolean,
        required: true,
    },
});

const showAccountModal = ref(false);
</script>
