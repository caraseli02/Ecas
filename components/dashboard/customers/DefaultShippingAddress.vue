<template>
    <div class="bg-white rounded-xl p-4 shadow-xs md:p-6">
        <div class="flex items-center justify-between mb-6">
            <div class="text-sm font-semibold">Default Shipping Address</div>
            <button class="flex">
                <DotsVerticalIcon class="w-6 h-6 text-[#9296AA] transition-colors duration-300 hover:text-blue" />
            </button>
        </div>
        <div class="flex items-start">
            <BusinessIcon class="w-11 h-11 text-[#00D395] flex-shrink-0 mr-4" />
            <div>
                <div class="text-sm font-semibold mb-1">Address Alias 1</div>
                <div class="text-sm">5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg';
import BusinessIcon from '@/assets/icons/dashboard/business.svg';
</script>
