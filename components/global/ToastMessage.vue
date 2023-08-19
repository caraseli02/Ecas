<template>
    <div
        class="rounded-lg overflow-hidden border-l-[6px] bg-white max-w-full w-[360px] shadow-m py-2 md:w-[480px] md:h-14 lg:border-l-8 lg:w-[680px] lg:h-16"
        :class="[
            type === 'info' ? 'border-blue' : type === 'warning' ? 'border-yellow' : type === 'success' ? 'border-green' : 'border-red',
        ]"
    >
        <div class="flex items-center space-x-3 pl-3 pr-4 md:space-x-4 lg:px-4">
            <div
                class="flex items-center justify-center w-10 h-10 rounded-full text-white lg:w-12 lg:h-12"
                :class="[type === 'info' ? 'bg-blue' : type === 'warning' ? 'bg-yellow' : type === 'success' ? 'bg-green' : 'bg-red']"
            >
                <InfoIcon v-if="type === 'info'" class="w-6 h-6 lg:w-8 lg:h-8" />
                <WarningIcon v-else-if="type === 'warning'" class="w-6 h-6 lg:w-8 lg:h-8" />
                <SuccessIcon v-else-if="type === 'success'" class="w-6 h-6 lg:w-8 lg:h-8" />
                <ErrorIcon v-else class="w-6 h-6 lg:w-8 lg:h-8" />
            </div>
            <div class="flex-1">
                <div class="capitalize leading-[1.42857] text-sm font-semibold lg:text-base lg:leading-[1.5] lg:mb-1">
                    {{ title || type }}
                </div>
                <div class="text-xs leading-[1.5] lg:text-sm lg:leading-[1.42857]">
                    {{ content }}
                </div>
            </div>
            <button
                class="rounded w-6 h-6 bg-[#F2F2F2] flex items-center justify-center text-gray-100 transition-colors duration-300 hover:text-gray-300 lg:w-8 lg:h-8"
                @click="$emit('close')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 lg:w-6 lg:h-6">
                    <g id="vuesax/linear/add">
                        <g id="add">
                            <g id="Group 33824" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                <path id="Vector" d="m5 5 14 14" />
                                <path id="Vector_2" d="M5 19 19 5" />
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import XIcon from '@/assets/icons/x.svg';
import InfoIcon from '@/assets/icons/info-circle.svg';
import WarningIcon from '@/assets/icons/triangle.svg';
import SuccessIcon from '@/assets/icons/check-circle.svg';
import ErrorIcon from '@/assets/icons/error.svg';

defineProps({
    type: {
        type: String as PropType<'info' | 'warning' | 'success' | 'error'>,
        required: false,
        default: 'info',
    },
    title: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
});

defineEmits(['close']);
</script>
