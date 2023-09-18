<template>
    <div class="grid grid-cols-[158px,149px,228px,275px,141px,220px,136px,85px] items-center">
        <div class="flex items-center gap-4 p-6 text-sm leading-[1.43]">
            <span class="uppercase"> #{{ item.id }} </span>
            <Tooltip theme="black" :position="index === 0 ? 'bottom' : 'top'">
                <MessageIcon v-if="item.note" class="w-4 h-4 text-gray-300 transition-colors duration-300 hover:text-blue" />
                <template #content>
                    <span>This order has a note</span>
                </template>
            </Tooltip>
        </div>
        <div class="p-5">
            <div
                class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]"
                :class="[
                    item.type === 'stock-order'
                        ? 'text-[#006D4D] bg-[#00D395]'
                        : item.type === 'back-order'
                        ? 'text-[#FF8A00] bg-[#FF8A00]'
                        : 'text-[#023F7E] bg-blue',
                ]"
            >
                {{ item.type.replace(/-/g, ' ') }}
            </div>
        </div>
        <div class="px-5 py-6 text-sm leading-[1.43] truncate">21 September 2023, 18:25</div>
        <div class="px-4 py-3">
            <div class="flex items-center gap-3 mb-2">
                <!-- <component :is="item.customer.flag"  /> -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" class="w-5 h-5">
                    <rect width="20" height="14.286" y="2.857" fill="#fff" rx="4" />
                    <mask id="mask0_1302_65779" width="20" height="16" x="0" y="2" maskUnits="userSpaceOnUse" style="mask-type: luminance">
                        <path fill="#fff" d="M0 4.857a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10.286a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4.857Z" />
                    </mask>
                    <g mask="url(#mask0_1302_65779)">
                        <path fill="#E5253D" d="M9.523 2.857h10.476v14.286H9.523z" />
                        <path fill="#0A3D9C" fill-rule="evenodd" d="M0 17.143h6.667V2.857H0v14.286Z" clip-rule="evenodd" />
                        <path fill="#FFD955" fill-rule="evenodd" d="M6.664 17.143h6.667V2.857H6.664v14.286Z" clip-rule="evenodd" />
                    </g>
                </svg>
                <span class="text-sm font-semibold leading-[1.43]">
                    {{ item.customer.name }}
                </span>
                <Tooltip theme="black" :position="index === 0 ? 'bottom' : 'top'">
                    <LockIcon v-if="item.customer.locked" class="w-4 h-4 text-gray-300 transition-colors duration-300 hover:text-blue" />
                    <template #content>
                        <span class="capitalize">Account Locked</span>
                    </template>
                </Tooltip>
            </div>
            <div class="text-xs text-gray-300 leading-[1.33]">
                {{ item.customer.email }}
            </div>
        </div>
        <div class="px-6 py-5">
            <div
                class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]"
                :class="[
                    item.payment === 'paid'
                        ? 'text-[#00D395] bg-[#00D395]'
                        : item.payment === 'pending'
                        ? 'text-[#FF8A00] bg-[#FF8A00]'
                        : item.payment === 'canceled' || item.payment === 'declined'
                        ? 'text-[#FA4B4B] bg-[#FA4B4B]'
                        : 'text-blue bg-blue',
                ]"
            >
                {{ item.payment.replace(/-/g, ' ') }}
            </div>
        </div>
        <div class="p-5">
            <div
                class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]"
                :class="[
                    item.fulfillment === 'abandoned-checkout'
                        ? 'text-gray-300 bg-gray-300'
                        : item.fulfillment === 'awaiting-payment' || item.fulfillment === 'awaiting-fulfillment'
                        ? 'text-[#FF8A00] bg-[#FF8A00]'
                        : item.fulfillment === 'completed' || item.fulfillment === 'payment-received'
                        ? 'text-[#00D395] bg-[#00D395]'
                        : item.fulfillment === 'partially-shipped'
                        ? 'text-blue bg-blue'
                        : item.fulfillment === 'partially-refunded' || item.fulfillment === 'processing'
                        ? 'text-[#A460BC] bg-[#A460BC]'
                        : 'text-[#FA4B4B] bg-[#FA4B4B]',
                ]"
            >
                {{ item.fulfillment.replace(/-/g, ' ') }}
            </div>
        </div>
        <div class="p-6 pr-4 text-sm font-medium">$ 138,000.77</div>
        <div class="flex items-center justify-end gap-6 pr-4">
            <div class="relative">
                <button class="flex text-[#9296AA] transition-colors duration-300 hover:text-blue" @click="handleShowOptions">
                    <MoreVerticalIcon class="w-6 h-6" />
                </button>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <Transition :name="index > 8 ? 'fade-full-neg' : 'fade-bottom'">
            <div
                v-if="showOptions"
                v-click-outside="() => (showOptions = false)"
                class="absolute z-10 grid grid-cols-1 gap-1 rounded-lg bg-white p-3 w-[172px] shadow-m -translate-x-full"
                :class="[index > 8 ? '-translate-y-[calc(100%+42px)]' : '']"
                :style="{
                    top: optionsDropdownTop + 'px',
                    left: optionsDropdownLeft + 'px',
                }"
            >
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    @click="showOptions = false"
                >
                    <DocumentIcon class="w-6 h-6 mr-3 text-current" />
                    <span class="text-sm leading-[1.71] font-medium">View Order</span>
                </button>
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    @click="showOptions = false"
                >
                    <InvoiceIcon class="w-6 h-6 mr-3 text-current" />
                    <span class="text-sm leading-[1.71] font-medium">View Invoice</span>
                </button>
            </div>
        </Transition>
        <Transition name="fade">
            <DashboardDeactivateUserModal v-if="showDeactivatingModal" :user="item" @close="showDeactivatingModal = false" />
        </Transition>
        <div
            class="fixed z-50 top-0 left-0 w-full h-full bg-[#2F3241]/10 transition-all duration-300 cursor-pointer"
            :class="[showDeactivatingModal ? 'backdrop-blur-[7.5px]' : 'backdrop-blur-0 opacity-0 pointer-events-none']"
            @click="showDeactivatingModal = false"
        />
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardOrderItem } from '~/types';
import MessageIcon from '@/assets/icons/dashboard/orders/message.svg';
import DocumentIcon from '@/assets/icons/dashboard/document.svg';
import InvoiceIcon from '@/assets/icons/dashboard/invoice.svg';
import MoreVerticalIcon from '@/assets/icons/dashboard/more-vertical.svg';
import LockIcon from '@/assets/icons/dashboard/orders/lock.svg';

const props = defineProps({
    item: {
        type: Object as PropType<DashboardOrderItem>,
        required: true,
    },
    index: {
        type: Number,
        default: false,
    },
    isScrolling: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

const showOptions = ref(false);
const showDeactivatingModal = ref(false);
const optionsDropdownLeft = ref(0);
const optionsDropdownTop = ref(0);

const handleShowOptions = (event: MouseEvent) => {
    showOptions.value = !showOptions.value;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    optionsDropdownLeft.value = rect.left + 28;
    optionsDropdownTop.value = rect.top + window.scrollY + 36;
};

const scrolling = computed(() => {
    return props.isScrolling;
});

watch(scrolling, (val) => {
    if (val) {
        showOptions.value = false;
    }
});

const isLoading = ref(false);
</script>
