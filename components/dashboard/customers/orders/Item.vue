<template>
    <div class="grid grid-cols-[212px,212px,256px,256px,232px,224px] items-center">
        <div class="p-6 text-sm font-medium truncate">
            <OrderId :item="item" :loading="isLoading" />
        </div>
        <div class="px-6 py-4">
            <OrderType :item="item" :loading="isLoading" />
        </div>
        <div class="p-6 text-sm truncate">
            <TextBox :text="'21 September 2023, 18:25'" :loading="isLoading" />
        </div>
        <div class="px-6 py-4">
            <OrderStatus :status="item.status" :loading="isLoading" />
        </div>
        <div class="p-6 text-sm">
            <TextBox :text="'$ 138,000.77'" :loading="isLoading" />
        </div>
        <div class="flex items-center justify-end gap-6 pr-4">
            <ActionsMenu :loading="isLoading" :index="index" :documentButton="true" :invoiceButton="true"
                :threeDotButton="true" @showOptions="handleShowOptions" :txtDocument="'View Order'" :txtInvoice="'View Invoice'" />
        </div>
    </div>
    <Teleport to="body">
        <Transition :name="index > 5 ? 'fade-full-neg' : 'fade-bottom'">
            <ThreeDotMenu v-if="showOptions" v-click-outside="() => (showOptions = false)" :index="index"
                :dropdownTop="optionsDropdownTop" :dropdownLeft="optionsDropdownLeft" :invoiceButton="true"
                :invoiceText="'View Invoice'" :editButton="true" :editText="'Edit Order'" @invoiceClicked="showOptions = false"
                @editClicked="showOptions = false" />
        </Transition>
        <Transition name="fade">
            <DashboardDeactivateUserModal v-if="showDeactivatingModal" :user="item"
                @close="showDeactivatingModal = false" />
        </Transition>
        <div class="fixed z-50 top-0 left-0 w-full h-full bg-[#2F3241]/10 transition-all duration-300 cursor-pointer"
            :class="[showDeactivatingModal ? 'backdrop-blur-[7.5px]' : 'backdrop-blur-0 opacity-0 pointer-events-none']"
            @click="showDeactivatingModal = false" />
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardCustomerOrderItem } from '~/types';
import OrderType from '~/components/shared/tables/micro/row-items/OrderType.vue';
import OrderStatus from '~/components/shared/tables/micro/row-items/OrderStatus.vue';
import OrderId from '~/components/shared/tables/micro/row-items/OrderId.vue';
import ActionsMenu from '~/components/shared/tables/micro/row-items/ActionsMenu.vue';
import ThreeDotMenu from '~/components/shared/tables/micro/row-items/ThreeDotMenu.vue';
import TextBox from '~/components/shared/tables/micro/row-items/TextBox.vue';

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
