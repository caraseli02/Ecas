<template>
    <div class="flex items-center justify-between mb-6">
        <div>
            <div class="flex flex-wrap gap-y-2 items-center mb-3">
                <NuxtLink
                    to="/dashboard"
                    class="flex items-center flex-shrink-0 text-gray-300 transition-colors duration-300 hover:text-blue"
                >
                    <HomeIcon class="w-[18px] h-[18px] mr-2" />
                    <span class="text-xs leading-[1.33]">Home</span>
                </NuxtLink>
                <span class="text-xs leading-[1.33] flex-shrink-0 mx-1">/</span>
                <NuxtLink
                    to="/dashboard/customers"
                    class="text-xs leading-[1.33] flex-shrink-0 font-medium transition-colors duration-300 hover:text-blue"
                    :class="[customer ? 'text-gray-300' : 'text-blue']"
                >
                    Customers
                </NuxtLink>
                <template v-if="customer">
                    <span class="text-xs leading-[1.33] flex-shrink-0 mx-1">/</span>
                    <NuxtLink
                        :to="`/dashboard/customers/${customer.toLowerCase().replace(/ /g, '-')}`"
                        class="text-xs leading-[1.33] font-medium flex-shrink-0 text-blue transition-colors duration-300 hover:text-blue"
                        :class="[panelView ? 'text-gray-300' : 'text-blue']"
                    >
                        {{ customer }}
                    </NuxtLink>
                </template>
                <template v-if="panelView && customer">
                    <span class="text-xs leading-[1.33] flex-shrink-0 mx-1">/</span>
                    <NuxtLink
                        :to="`/dashboard/customers/${customer.toLowerCase().replace(/ /g, '-')}/control-panel/organization`"
                        class="text-xs leading-[1.33] font-medium text-gray-300 flex-shrink-0 transition-colors duration-300 hover:text-blue"
                    >
                        Control Panel
                    </NuxtLink>
                    <span class="text-xs leading-[1.33] flex-shrink-0 mx-1">/</span>
                    <div class="text-xs leading-[1.33] font-medium flex-shrink-0 text-blue capitalize">
                        {{ panelView.replace(/-/g, ' ') }}
                    </div>
                </template>
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
    customer: {
        type: String,
        required: false,
    },
    panelView: {
        type: String,
        required: false,
    },
});
</script>
