<template>
    <div class="grid grid-cols-[359px,154px,254px,244px,129px,148px,104px] items-center">
        <div class="pl-4 pr-1.5 py-3">
            <NameAndProfile :item="item" :loading="loading" :index="index" :showAvatar="true" :showFlag="true"
                :showDiscount="true" :showLock="true" @showInformation="showCustomerInformation" />
        </div>
        <div class="text-sm leading-[1.43] truncate pl-4 pr-1.5">
            <SkeletonLoader v-if="loading" class="w-full h-6" />
            <template v-else> {{ item.account }}</template>
        </div>
        <div class="text-sm leading-[1.43] truncate pl-4 pr-1.5">
            <SkeletonLoader v-if="loading" class="w-full h-6" />
            <template v-else>
                {{ item.company }}
            </template>
        </div>
        <div class="text-sm leading-[1.43] truncate pl-4 pr-1.5">
            <SkeletonLoader v-if="loading" class="w-full h-6" />
            <template v-else>
                {{ item.registered }}
            </template>
        </div>
        <div class="text-sm leading-[1.43] font-medium truncate pl-4 pr-1.5">
            <SkeletonLoader v-if="loading" class="w-full h-6" />
            <template v-else>
                {{ item.spent }}
            </template>
        </div>
        <div class="flex justify-center pl-4 pr-1.5">
            <SkeletonLoader v-if="loading" class="w-full h-6" />
            <div v-else class="text-sm leading-[1.43] font-medium text-[#006D4D] bg-[#00D39540] px-3 py-1 rounded-md">
                {{ item.ordersCount }}
            </div>
        </div>
        <div class="flex items-center justify-end gap-4 pl-4 pr-1.5">
            <ActionsMenu :loading="loading" :index="index" :documentButton="true" :threeDotButton="true"
                @showOptions="handleShowOptions" :txtDocument="'View Orders'" />
        </div>
    </div>
    <Teleport to="body">
        <Transition :name="index > 5 ? 'fade-full-neg' : 'fade-bottom'">
            <ThreeDotMenu v-if="showOptions" v-click-outside="() => (showOptions = false)" :index="index"
                :dropdownTop="optionsDropdownTop" :dropdownLeft="optionsDropdownLeft" :profileButton="true" :profile="item"
                :profileText="'Profile'" :documentButton="true" :documentText="'Orders'" :settingsButton="true"
                :settingsText="'Settings'" :deactivateButton="true" :deactivateText="'Deactivate Account'"
                :trashButton="true" :trashText="'Delete Account'" @profileClicked="showOptions = false"
                @documentClicked="showOptions = false" @settingsClicked="showOptions = false" @deactivateClicked="showDeactivatingModal = true;
                showOptions = false;" @trashClicked="showOptions = false" />
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
import { DashboardCustomerTableItem } from '~/types';
import NameAndProfile from '~/components/shared/tables/micro/row-items/NameAndProfile.vue';
import ActionsMenu from '~/components/shared/tables/micro/row-items/ActionsMenu.vue';
import ThreeDotMenu from '~/components/shared/tables/micro/row-items/ThreeDotMenu.vue';

const props = defineProps({
    item: {
        type: Object as PropType<DashboardCustomerTableItem>,
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
const showCustomerInformation = (item: any) => {
}
const scrolling = computed(() => {
    return props.isScrolling;
});

watch(scrolling, (val) => {
    if (val) {
        showOptions.value = false;
    }
});
</script>
