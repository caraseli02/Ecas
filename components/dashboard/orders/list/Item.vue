<template>
    <div class="grid grid-cols-[158px,149px,228px,275px,141px,220px,136px,85px] items-center">
        <div class="flex items-center gap-4 text-sm leading-[1.43]" :class="[loading ? 'px-4 py-[22px]' : 'p-6']">
            <OrderId :item="item" :loading="loading" />
        </div>
        <div class="p-5" :class="[loading ? 'px-2' : '']">
            <OrderType :item="item" :loading="loading" />
        </div>
        <div class="text-sm leading-[1.43] truncate" :class="[loading ? 'px-3.5 py-[22px]' : 'px-5 py-6']">
            <TextBox :text="'21 September 2023, 18:25'" :loading="loading" />
        </div>
        <NameAndProfile
            :item="item.name"
            :index="index"
            :loading="loading"
            :show-avatar="false"
            :show-flag="true"
            :show-lock="true"
            class="py-3"
            :class="[loading ? 'px-[17px]' : 'px-4']"
            :custom-class="'w-full'"
        />
        <div class="py-5" :class="[loading ? 'px-4' : 'px-6']">
            <PaymentStatus :status="item.payment" :loading="loading" />
        </div>
        <div class="p-5" :class="[loading ? 'px-3' : '']">
            <OrderStatus :status="item.status" :loading="loading" />
        </div>
        <div class="text-sm font-medium" :class="[loading ? 'px-4 py-[22px]' : 'p-6 pr-4']">
            <TextBox :text="'$ 138,000.77'" :loading="loading" />
        </div>
        <div class="flex items-center justify-end gap-6 pr-4" :class="[loading ? 'px-4' : '']">
            <ActionsMenu :loading="loading" :index="index" :three-dot-button="true" @showOptions="handleShowOptions" />
        </div>
    </div>
    <Teleport to="body">
        <Transition :name="index > 8 ? 'fade-full-neg' : 'fade-bottom'">
            <ThreeDotMenu
                v-if="showOptions"
                v-click-outside="() => (showOptions = false)"
                :index="index"
                :dropdown-top="optionsDropdownTop"
                :dropdown-left="optionsDropdownLeft"
                :document-button="true"
                :document-text="'View Order'"
                :invoice-button="true"
                :invoice-text="'View Invoice'"
                @documentClicked="showOptions = false"
                @invoiceClicked="showOptions = false"
            />
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
import NameAndProfile from '~/components/shared/tables/micro/row-items/NameAndProfile.vue';
import OrderType from '~/components/shared/tables/micro/row-items/OrderType.vue';
import OrderStatus from '~/components/shared/tables/micro/row-items/OrderStatus.vue';
import PaymentStatus from '~/components/shared/tables/micro/row-items/PaymentStatus.vue';
import OrderId from '~/components/shared/tables/micro/row-items/OrderId.vue';
import ActionsMenu from '~/components/shared/tables/micro/row-items/ActionsMenu.vue';
import ThreeDotMenu from '~/components/shared/tables/micro/row-items/ThreeDotMenu.vue';
import TextBox from '~/components/shared/tables/micro/row-items/TextBox.vue';

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