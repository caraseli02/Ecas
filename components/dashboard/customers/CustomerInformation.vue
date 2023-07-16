<template>
    <div class="bg-white rounded-xl p-4 shadow-xs md:p-6">
        <div class="flex items-center justify-between mb-8">
            <div class="text-sm font-semibold md:text-xl md:leading-[1.2]">Customer Information</div>
            <div class="relative">
                <button class="flex" @click="showOptions = !showOptions">
                    <DotsVerticalIcon class="w-6 h-6 text-[#9296AA] transition-colors duration-300 hover:text-blue" />
                </button>
                <Transition name="fade-full">
                    <div
                        v-if="showOptions"
                        v-click-outside="() => (showOptions = false)"
                        class="absolute -bottom-3.5 right-0 translate-y-full grid grid-cols-1 gap-1 w-full rounded-lg bg-white p-3 min-w-[224px] shadow-m"
                    >
                        <button
                            class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                            @click="showOptions = false"
                        >
                            <SettingsIcon class="w-6 h-6 mr-3 text-current" />
                            <span class="text-sm leading-[1.71] font-medium"> Control Panel </span>
                        </button>
                        <button
                            class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                            @click="showOptions = false"
                        >
                            <DeactivateIcon class="w-6 h-6 mr-3 text-current" />
                            <span class="text-sm leading-[1.71] font-medium"> Deactivate Account </span>
                        </button>
                        <button
                            class="flex items-center w-full text-left px-3 py-2 rounded-lg text-[#FA4B4B] transition-colors duration-300 hover:bg-[#F2F2F2]"
                            @click="showOptions = false"
                        >
                            <TrashIcon class="w-6 h-6 mr-3 text-current" />
                            <span class="text-sm leading-[1.71] font-medium"> Delete Account </span>
                        </button>
                    </div>
                </Transition>
            </div>
        </div>
        <div class="flex items-start mb-5 md:items-center">
            <img :src="Avatar" alt="Name" class="w-16 h-16 flex-shrink-0 rounded-full object-cover mr-4" />
            <div class="md:grid md:grid-cols-[repeat(2,auto)] md:justify-between md:flex-1">
                <div class="font-semibold mb-2 md:order-1">Madalina Popescu</div>
                <div class="flex items-center text-sm mb-2 md:order-3 md:mb-0">
                    <span class="text-gray-300 mr-2">Account Type:</span>
                    <span class="font-medium">Business</span>
                </div>
                <div class="text-sm font-medium text-blue mb-2 md:order-4 md:mb-0">Nezo Global Development s.r.l.</div>
                <div class="flex items-center text-sm md:order-2 md:mb-2">
                    <span class="text-gray-300 mr-2">Last Active:</span>
                    <span class="font-medium">21 Sep 2023, 18:25</span>
                </div>
            </div>
        </div>
        <div>
            <div class="text-sm font-semibold mb-4">Account Details</div>
            <div class="grid grid-cols-1 gap-2 pb-5 border-b border-gray-200 mb-5">
                <div class="grid grid-cols-[140px,1fr] gap-3">
                    <div class="text-sm text-gray-300 leading-[1.75]">User Name</div>
                    <div class="text-sm font-medium leading-[1.75] break-all">madalina.popescu@company.com</div>
                </div>
                <div class="grid grid-cols-[140px,1fr] gap-3">
                    <div class="text-sm text-gray-300 leading-[1.75]">Name</div>
                    <div class="text-sm font-medium leading-[1.75] break-all">Madalina</div>
                </div>
                <div class="grid grid-cols-[140px,1fr] gap-3">
                    <div class="text-sm text-gray-300 leading-[1.75]">Surname</div>
                    <div class="text-sm font-medium leading-[1.75] break-all">Popescu</div>
                </div>
                <div class="grid grid-cols-[140px,1fr] gap-3">
                    <div class="text-sm text-gray-300 leading-[1.75]">Country</div>
                    <div class="flex items-center text-sm font-medium leading-[1.75] break-all">
                        <USAFlag class="w-6 h-6 mr-2" />
                        <span> United States </span>
                    </div>
                </div>
                <div class="grid grid-cols-[140px,1fr] gap-3">
                    <div class="text-sm text-gray-300 leading-[1.75]">Mobile Number</div>
                    <div class="text-sm font-medium leading-[1.75] break-all">+1 (706) 275-0767</div>
                </div>
                <div class="grid grid-cols-[140px,1fr] gap-3">
                    <div class="text-sm text-gray-300 leading-[1.75]">Address</div>
                    <div class="text-sm font-medium leading-[1.75] break-all">5073 Mark Brown Rd NE Dalton, Georgia(GA), 30721</div>
                </div>
            </div>
            <div class="flex items-start justify-between gap-5">
                <div class="md:flex md:items-center">
                    <div class="flex items-center mb-1 md:mb-0">
                        <div class="w-2 h-2 rounded-full bg-[#00D395] mr-2" />
                        <span class="text-sm font-medium leading-tight text-gray-300">Registered</span>
                    </div>
                    <div class="text-sm font-medium leading-tight pl-4">21 Sep 2023, 18:25</div>
                </div>
                <div class="md:flex md:items-center">
                    <div class="flex items-center mb-1 md:mb-0">
                        <div class="w-2 h-2 rounded-full bg-blue mr-2" />
                        <span class="text-sm font-medium leading-tight text-gray-300">Email Marketing</span>
                    </div>
                    <div class="text-sm font-medium leading-tight pl-4">Subscribed</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Avatar from '@/assets/icons/dashboard/avatar.png';
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg';
import USAFlag from '@/assets/icons/flags/usa.svg';
import SettingsIcon from '@/assets/icons/dashboard/setting.svg';
import DeactivateIcon from '@/assets/icons/dashboard/deactivate.svg';
import TrashIcon from '@/assets/icons/dashboard/trash.svg';

const showOptions = ref(false);
</script>
