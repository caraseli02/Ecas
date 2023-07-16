<template>
    <div class="bg-white rounded-xl p-4 shadow-xs md:p-6">
        <div class="flex items-center justify-between mb-6">
            <div class="text-sm font-semibold">Default Shipping Address</div>
            <div class="relative">
                <button class="flex" @click="showOptions = !showOptions">
                    <DotsVerticalIcon class="w-6 h-6 text-[#9296AA] transition-colors duration-300 hover:text-blue" />
                </button>
                <Transition name="fade-full">
                    <div
                        v-if="showOptions"
                        v-click-outside="() => (showOptions = false)"
                        class="absolute -bottom-3.5 right-0 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-3 min-w-[154px] shadow-m"
                    >
                        <button
                            class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                            @click="showOptions = false"
                        >
                            <EyeIcon class="w-6 h-6 mr-3 text-current" />
                            <span class="text-sm leading-[1.71] font-medium"> View All </span>
                        </button>
                        <button
                            class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                            @click="showOptions = false"
                        >
                            <EditIcon class="w-6 h-6 mr-3 text-current" />
                            <span class="text-sm leading-[1.71] font-medium"> Edit </span>
                        </button>
                    </div>
                </Transition>
            </div>
        </div>
        <div class="flex items-start">
            <BusinessIcon class="w-11 h-11 text-[#00D395] flex-shrink-0 mr-4" />
            <SkeletonLoader v-if="isLoading" class="w-full h-16 md:h-11" />
            <div v-else>
                <div class="text-sm font-semibold mb-1">Address Alias 1</div>
                <div class="text-sm">5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg';
import BusinessIcon from '@/assets/icons/dashboard/business.svg';
import EyeIcon from '@/assets/icons/dashboard/eye.svg';
import EditIcon from '@/assets/icons/dashboard/edit.svg';

const showOptions = ref(false);

const isLoading = ref(false);
</script>
