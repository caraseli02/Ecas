<template>
    <div class="flex items-start justify-between mb-6">
        <div>
            <div class="flex flex-wrap gap-y-2 items-center mb-3">
                <NuxtLink
                    to="/dashboard"
                    class="flex items-center flex-shrink-0 font-medium text-slate-500 transition-colors duration-300 hover:text-blue-500"
                >
                    <HomeIcon class="w-[18px] h-[18px] mr-2" />
                    <span class="text-xs leading-[1.33]">Home</span>
                </NuxtLink>
                <span class="text-xs leading-[1.33] text-slate-500 flex-shrink-0 mx-1">/</span>
                <NuxtLink
                    to="/dashboard/orders"
                    class="text-xs leading-[1.33] flex-shrink-0 font-medium text-slate-500 transition-colors duration-300 hover:text-blue-500"
                >
                    Orders
                </NuxtLink>
                <span class="text-xs leading-[1.33] text-slate-500 flex-shrink-0 mx-1">/</span>
                <NuxtLink
                    to="/dashboard/orders"
                    class="text-xs leading-[1.33] flex-shrink-0 font-medium text-blue-500 transition-colors duration-300 hover:text-blue-500"
                >
                    All Orders
                </NuxtLink>
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
