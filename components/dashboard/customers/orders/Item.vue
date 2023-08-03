<template>
    <div class="grid grid-cols-[212px,212px,256px,256px,232px,224px] items-center">
        <div class="p-6 text-sm font-medium text-blue uppercase truncate">
            <SkeletonLoader v-if="isLoading" class="w-[140px] h-7" />
            <template v-else> #{{ item.id }} </template>
        </div>
        <div class="px-6 py-4">
            <SkeletonLoader v-if="isLoading" class="w-[140px] h-7" />
            <div
                v-else
                class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]"
                :class="[
                    item.type === 'stock-order'
                        ? 'text-[#006D4D] bg-[#00D395]'
                        : item.type === 'backorder'
                        ? 'text-[#FF8A00] bg-[#FF8A00]'
                        : 'text-[#023F7E] bg-blue',
                ]"
            >
                {{ item.type.replace(/-/g, ' ') }}
            </div>
        </div>
        <div class="p-6 text-sm truncate">
            <SkeletonLoader v-if="isLoading" class="w-[170px] h-7" />
            <template v-else> 21 September 2023, 18:25 </template>
        </div>
        <div class="px-6 py-4">
            <SkeletonLoader v-if="isLoading" class="w-[180px] h-7" />
            <div
                v-else
                class="capitalize rounded-md px-3 py-1 text-sm font-medium max-w-max bg-opacity-[0.15]"
                :class="[
                    item.status === 'abandoned-checkout'
                        ? 'text-gray-300 bg-gray-300'
                        : item.status === 'awaiting-payment' || item.status === 'awaiting-fulfillment'
                        ? 'text-[#FF8A00] bg-[#FF8A00]'
                        : item.status === 'completed' || item.status === 'payment-received'
                        ? 'text-[#00D395] bg-[#00D395]'
                        : item.status === 'partially-shipped'
                        ? 'text-blue bg-blue'
                        : item.status === 'partially-refunded' || item.status === 'processing'
                        ? 'text-[#A460BC] bg-[#A460BC]'
                        : 'text-[#FA4B4B] bg-[#FA4B4B]',
                ]"
            >
                {{ item.status.replace(/-/g, ' ') }}
            </div>
        </div>
        <div class="p-6 text-sm">
            <SkeletonLoader v-if="isLoading" class="w-[120px] mx-auto h-7" />
            <template v-else> $ 138,000.77 </template>
        </div>
        <div class="flex items-center justify-end gap-6 pr-4">
            <SkeletonLoader v-if="isLoading" class="w-[96px] h-7" />
            <template v-else>
                <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
                    <button class="flex text-gray-300 transition-colors duration-300 hover:text-blue">
                        <DocumentIcon class="w-6 h-6" />
                    </button>
                    <template #content>
                        <span>View Order</span>
                    </template>
                </Tooltip>
                <Tooltip :position="index === 0 ? 'bottom' : 'top'" theme="black">
                    <button class="flex text-gray-300 transition-colors duration-300 hover:text-blue">
                        <InvoiceIcon class="w-6 h-6" />
                    </button>
                    <template #content>
                        <span>View Invoice</span>
                    </template>
                </Tooltip>
                <div class="relative">
                    <button class="flex text-[#9296AA] transition-colors duration-300 hover:text-blue" @click="handleShowOptions">
                        <MoreVerticalIcon class="w-6 h-6" />
                    </button>
                </div>
            </template>
        </div>
    </div>
    <Teleport to="body">
        <Transition :name="index > 5 ? 'fade-full-neg' : 'fade-bottom'">
            <div
                v-if="showOptions"
                v-click-outside="() => (showOptions = false)"
                class="absolute z-10 grid grid-cols-1 gap-1 rounded-lg bg-white p-3 w-[180px] shadow-m -translate-x-full"
                :class="[index > 5 ? '-translate-y-[calc(100%+42px)]' : '']"
                :style="{
                    top: optionsDropdownTop + 'px',
                    left: optionsDropdownLeft + 'px',
                }"
            >
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    @click="showOptions = false"
                >
                    <InvoiceIcon class="w-6 h-6 mr-3 text-current" />
                    <span class="text-sm leading-[1.71] font-medium">View Invoice</span>
                </button>
                <button
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    @click="showOptions = false"
                >
                    <EditIcon class="w-6 h-6 mr-3 text-current" />
                    <span class="text-sm leading-[1.71] font-medium">Edit Order</span>
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
import { DashboardCustomerOrderItem } from '~/types';
import DocumentIcon from '@/assets/icons/dashboard/document.svg';
import InvoiceIcon from '@/assets/icons/dashboard/invoice.svg';
import MoreVerticalIcon from '@/assets/icons/dashboard/more-vertical.svg';
import EditIcon from '@/assets/icons/dashboard/edit.svg';

const props = defineProps({
    item: {
        type: Object as PropType<DashboardCustomerOrderItem>,
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
