<template>
    <div
        class="relative flex flex-col bg-white rounded-xl p-4 pr-2 shadow-xs md:p-6 md:pr-3"
        :class="[type === 'default' ? 'pb-5 md:pb-8' : 'md:pb-6']"
    >
        <div class="flex items-start justify-between">
            <div class="leading-normal font-semibold md:mb-7" :class="[type === 'default' ? 'mb-6' : 'mb-9']">New Customers</div>
            <WarningIcon v-if="error" class="w-6 h-6" />
        </div>
        <div v-if="people.length > 0" class="grid grid-cols-1 gap-4" :class="[type === 'default' ? 'md:gap-3' : 'mb-7 md:mb-5']">
            <DashboardNewCustomersItem
                v-for="(person, index) in people.slice(0, type === 'default' ? 7 : 6)"
                :key="index"
                :item="person"
                :type="type"
                :loading="loading"
            />
            <DashboardNewCustomersEmptyItem
                v-for="(_, index) in type === 'default' ? 7 - people.length : 6 - people.length"
                :key="index"
                :loading="loading"
            />
        </div>
        <div v-else class="flex flex-col items-center justify-center flex-1">
            <EmojiSadIcon class="w-[52px] h-[52px] mb-4" />
            <div class="text-sm font-medium leading-normal text-gray-100">No data available</div>
        </div>
        <div
            v-if="type !== 'default' && people.length > 0"
            class="flex items-center mt-auto"
            :class="[type === 'detailed' ? 'justify-between' : 'justify-center']"
        >
            <div v-if="type !== 'landing'" class="flex items-center">
                <ArrowUpIcon class="w-4 h-4 mr-1" />
                <div class="text-sm leading-[1.43] font-medium text-[#00D395] mr-1">3,78%</div>
                <button class="flex items-center" @click="showOptions = !showOptions">
                    <span class="text-sm left-[1.43] text-gray-300 font-medium mr-1">
                        {{ selectedOption }}
                    </span>
                    <ChevronIcon
                        class="w-5 h-5 text-gray-300 transition-transform duration-300"
                        :class="[showOptions ? 'rotate-180' : '']"
                    />
                </button>
            </div>
            <button class="flex items-center">
                <span class="text-sm font-medium left-[1.43] text-gray-300 mr-1"> View All </span>
                <ArrowRightIcon class="w-5 h-5" />
            </button>
        </div>
        <Transition name="fade-full">
            <div
                v-if="showOptions"
                v-click-outside="() => (showOptions = false)"
                class="absolute z-10 -bottom-0.5 left-0 translate-y-full grid grid-cols-1 gap-1 rounded-lg bg-white p-3 w-[200px]"
                :style="{
                    boxShadow: '0px 0px 6px rgba(51, 51, 51, 0.2)',
                }"
            >
                <button
                    v-for="(option, index) in options"
                    :key="index"
                    class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue"
                    :class="selectedOption === option ? 'bg-[#F2F2F2] text-blue' : ''"
                    @click="
                        showOptions = false;
                        selectedOption = option;
                    "
                >
                    <span class="text-sm leading-[1.71] font-medium">{{ option }}</span>
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import ArrowUpIcon from '@/assets/icons/dashboard/arrow-up.svg';
import ChevronIcon from '@/assets/icons/dashboard/chevron-down.svg';
import ArrowRightIcon from '@/assets/icons/dashboard/arrow-right.svg';
import { NewCustomersInterface } from '~/model/dashboard/response/CustomerInterfaceResponse';
import { UserDetails } from '~/types/auth/user-details';
import { useNuxtApp } from '#app';
import EmojiSadIcon from '@/assets/icons/dashboard/emoji-sad.svg';
import WarningIcon from '@/assets/icons/dashboard/warning.svg';

const { $api } = useNuxtApp();

const showOptions = ref(false);
const selectedOption = ref('This Week');
const options = ['Last 24h', 'This Week', 'Last 7 Days', 'Last 30 Days', 'All Time'];
const loading = ref(true);
const error = ref(false);
const people = ref([] as UserDetails[]);

defineProps({
    type: {
        type: String as PropType<'default' | 'detailed' | 'landing'>,
        required: false,
        default: 'default',
    },
});

const fetchAndSetNewCustomers = async (time = 7) => {
    loading.value = true;
    error.value = false;

    const data = await $api.userDashboard.fetchNewCustomersWidget();

    if (!data || data.status !== 'success') {
        loading.value = false;
        error.value = true;
        return;
    }

    loading.value = false;

    people.value = data.data as NewCustomersInterface;
};

await fetchAndSetNewCustomers();
</script>
