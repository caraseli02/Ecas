<template>
    <div
        class="relative rounded-lg overflow-hidden bg-white max-w-full w-[360px] shadow-m py-2 before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full md:w-[480px] md:h-14 lg:w-[680px] lg:h-16 lg:before:w-2"
        :class="[
            type === 'info'
                ? 'before:bg-blue-500'
                : type === 'warning'
                ? 'before:bg-yellow'
                : type === 'success'
                ? 'before:bg-green'
                : 'before:bg-red',
        ]"
    >
        <div class="flex items-center space-x-3 pl-[18px] pr-4 md:space-x-4 lg:pl-6">
            <div
                class="flex items-center justify-center w-10 h-10 rounded-full text-white lg:w-12 lg:h-12"
                :class="[type === 'info' ? 'bg-blue-500' : type === 'warning' ? 'bg-yellow' : type === 'success' ? 'bg-green' : 'bg-red']"
            >
                <svg
                    v-if="type === 'info'"
                    class="w-6 h-6 lg:w-8 lg:h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 32 32"
                >
                    <g id="Huge-icon/interface/outline/information">
                        <circle id="Ellipse 1111" cx="15.997" cy="9.333" r="1.333" fill="#fff" />
                        <path
                            id="Vector"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.664 13.335h1.333v9.333m13.334-6.667c0 7.364-5.97 13.334-13.334 13.334-7.363 0-13.333-5.97-13.333-13.334 0-7.363 5.97-13.333 13.333-13.333 7.364 0 13.334 5.97 13.334 13.333Z"
                        />
                    </g>
                </svg>
                <svg
                    v-else-if="type === 'warning'"
                    class="w-6 h-6 lg:w-8 lg:h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 32 32"
                >
                    <g id="Huge-icon/interface/outline/warning-error">
                        <circle id="Ellipse 1110" cx="15.997" cy="22.665" r="1.333" fill="#fff" />
                        <path
                            id="Vector"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15.997 12v6.667M5.767 28h20.46c2.363 0 3.857-2.476 2.71-4.49L18.706 5.555c-1.181-2.073-4.238-2.073-5.419 0L3.058 23.51C1.912 25.524 3.406 28 5.769 28Z"
                        />
                    </g>
                </svg>
                <svg
                    v-else-if="type === 'success'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 32 32"
                    class="w-6 h-6 lg:w-8 lg:h-8"
                >
                    <g id="Huge-icon/interface/outline/check-circle">
                        <path
                            id="Vector"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m10.664 16.001 3.38 3.042c.575.518 1.469.438 1.944-.173l5.343-6.869m-5.334 17.334c7.364 0 13.334-5.97 13.334-13.334 0-7.363-5.97-13.333-13.334-13.333-7.363 0-13.333 5.97-13.333 13.333 0 7.364 5.97 13.334 13.333 13.334Z"
                        />
                    </g>
                </svg>
                <svg v-else class="w-6 h-6 lg:w-8 lg:h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
                    <g id="Huge-icon/interface/outline/remove-circle">
                        <path
                            id="Vector"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19.769 19.773-7.543-7.543m0 7.543 7.543-7.543m-3.772 17.105c7.364 0 13.334-5.97 13.334-13.334 0-7.363-5.97-13.333-13.334-13.333-7.363 0-13.333 5.97-13.333 13.333 0 7.364 5.97 13.334 13.333 13.334Z"
                        />
                    </g>
                </svg>
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
                class="rounded-md w-6 h-6 bg-[#F2F2F2] flex items-center justify-center text-gray-500 transition-colors duration-300 hover:text-slate-500 lg:w-8 lg:h-8 lg:rounded-lg"
                @click="$emit('close')"
            >
                <XIcon class="w-4 h-4 lg:w-6 lg:h-6" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import XIcon from '@/assets/icons/dashboard/x.svg';

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
