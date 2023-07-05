<template>
    <div class="hidden relative z-20 bg-white py-3 md:block">
        <div class="container">
            <div class="relative flex items-center justify-between gap-6 lg:gap-[52px] xl:gap-[162px]">
                <NuxtLink to="/" class="flex flex-shrink-0">
                    <Logo class="w-[142px] xl:w-[141px]" />
                </NuxtLink>
                <LayoutHeaderSearch :show-results="!isScrolled" class="flex-1" />
                <button class="hidden items-center text-gray-300 flex-shrink-0 md:flex xl:hidden" @click="showAccountModal = true">
                    <UserIcon class="w-7 h-7 mr-2" />
                    <span class="leading-normal font-medium">My Account</span>
                </button>
                <div class="hidden text-sm leading-[1.14] font-medium text-gray-300 font-Inter xl:block">
                    <span class="uppercase">Free</span> shipping on orders over $150
                </div>
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
