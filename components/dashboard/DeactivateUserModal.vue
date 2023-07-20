<template>
    <div class="fixed z-[60] top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div class="relative z-10 w-[358px] max-w-[calc(100vw-32px)] p-4 bg-white rounded-xl pointer-events-auto shadow-xs md:p-6">
            <button
                class="w-8 h-8 bg-gray-200 flex items-center justify-center text-gray-300 rounded-lg ml-auto mb-4 transition-colors duration-300 hover:text-blue"
                @click="$emit('close')"
            >
                <XIcon class="w-6 h-6" />
            </button>
            <div class="text-sm leading-[2.29] text-center mb-9">Deactivate account:</div>
            <div class="flex items-center mb-[78px]">
                <div
                    class="relative flex items-center justify-center rounded-full overflow-hidden w-11 h-11 flex-shrink-0 mr-4"
                    :class="[!user.avatar ? 'bg-gray-200' : '']"
                >
                    <img v-if="user.avatar" :src="user.avatar" :alt="user.name" class="w-full h-full rounded-full object-cover" />
                    <UserIcon v-else class="w-7 h-7 text-gray-100" />
                </div>
                <div>
                    <div class="flex items-center gap-3 mb-1">
                        <div
                            class="text-sm leading-[1.43] font-semibold truncate transition-colors duration-300 group-hover/link:text-blue"
                        >
                            {{ user.name }}
                        </div>
                        <div class="flex items-center gap-3 cursor-default">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <rect y="2.85742" width="20" height="14.2857" rx="4" fill="white" />
                                <mask
                                    id="mask0_801_26126"
                                    style="mask-type: luminance"
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="2"
                                    width="20"
                                    height="16"
                                >
                                    <path
                                        d="M0 4.85742C0 3.75285 0.895431 2.85742 2 2.85742H18C19.1046 2.85742 20 3.75285 20 4.85742V15.1431C20 16.2477 19.1046 17.1431 18 17.1431H2C0.895431 17.1431 0 16.2477 0 15.1431V4.85742Z"
                                        fill="white"
                                    />
                                </mask>
                                <g mask="url(#mask0_801_26126)">
                                    <rect x="9.52344" y="2.85742" width="10.4762" height="14.2857" fill="#E5253D" />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0 17.1431H6.66667V2.85742H0V17.1431Z"
                                        fill="#0A3D9C"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6.66797 17.1431H13.3346V2.85742H6.66797V17.1431Z"
                                        fill="#FFD955"
                                    />
                                </g>
                            </svg>
                            <div class="bg-blue px-2 rounded-[25px] text-xs leading-[1.67] font-semibold text-white">10%</div>
                        </div>
                    </div>
                    <div class="text-xs leading-[1.33] text-gray-300 truncate">
                        {{ user.email }}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-[auto,1fr] gap-4">
                <button
                    class="flex px-8 py-2 rounded-lg bg-gray-200 text-sm leading-[1.71] text-gray-300 font-medium"
                    @click="$emit('close')"
                >
                    Cancel
                </button>
                <button
                    class="flex px-5 py-2 rounded-lg bg-[#FA4B4B] text-sm leading-[1.71] text-white font-medium"
                    @click="$emit('close')"
                >
                    Deactivate Account
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DashboardCustomerTableItem } from '~/types';
import XIcon from '@/assets/icons/dashboard/x.svg';
import UserIcon from '@/assets/icons/dashboard/user.svg';

defineProps({
    user: {
        type: Object as PropType<DashboardCustomerTableItem>,
        required: true,
    },
});

defineEmits(['close']);
</script>
