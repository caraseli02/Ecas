<template>
    <div class="flex items-center justify-between mb-6">
        <div>
            <div class="flex items-center mb-3">
                <NuxtLink to="/" class="flex items-center text-gray-300 transition-colors duration-300 hover:text-blue">
                    <HomeIcon class="w-[18px] h-[18px] mr-2" />
                    <span class="text-xs leading-[1.33]">Home</span>
                </NuxtLink>
                <span class="text-xs leading-[1.33] mx-2">/</span>
                <NuxtLink to="/" class="text-xs leading-[1.33] font-medium text-blue"> Customers </NuxtLink>
            </div>
            <h2 class="text-xl leading-[1.4] text-[#222222] font-semibold">{{ title }}</h2>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import HomeIcon from '@/assets/icons/dashboard/home.svg';

defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
