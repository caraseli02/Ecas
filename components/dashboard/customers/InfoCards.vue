<template>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <div class="flex items-center bg-white rounded-xl p-4 shadow-xs md:p-6">
            <div class="mr-4">
                <div class="flex items-center justify-center w-14 h-14 bg-blue/25 rounded-full">
                    <div class="flex items-center justify-center w-10 h-10 bg-blue rounded-full">
                        <LastOrderIcon class="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <div>
                <div class="text-sm font-semibold text-gray-300 mb-3">Last Order</div>
                <SkeletonLoader v-if="isLoading" class="w-[160px] h-6 -mt-1" />
                <div v-else class="text-xl font-semibold text-blue leading-[1.2]">{{ lastOrder && lastOrder.title ? lastOrder?.title : 0 }}</div>
            </div>
        </div>
        <div class="flex items-center bg-white rounded-xl p-4 shadow-xs md:p-6">
            <div class="mr-4">
                <div class="flex items-center justify-center w-14 h-14 bg-[#00D395]/25 rounded-full">
                    <div class="flex items-center justify-center w-10 h-10 bg-[#00D395] rounded-full">
                        <MoneyBagIcon class="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <div>
                <div class="text-sm font-semibold text-gray-300 mb-3">Total Spent</div>
                <SkeletonLoader v-if="isLoading" class="w-[160px] h-6 -mt-1" />
                <div v-else class="text-xl font-semibold leading-[1.2]">${{ (totalSpent && totalSpent?.spent ) ? totalSpent.spent : 0 }}</div>
            </div>
        </div>
        <div class="flex items-center bg-white rounded-xl p-4 shadow-xs md:p-6">
            <div class="mr-4">
                <div class="flex items-center justify-center w-14 h-14 bg-[#FFB100]/25 rounded-full">
                    <div class="flex items-center justify-center w-10 h-10 bg-[#FFB100] rounded-full">
                        <CardIcon class="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <div>
                <div class="text-sm font-semibold text-gray-300 mb-3">Average Order Value</div>
                <SkeletonLoader v-if="isLoading" class="w-[160px] h-6 -mt-1" />
                <div v-else class="text-xl font-semibold leading-[1.2]">{{ (avgOrderValue && avgOrderValue?.spent && avgOrderValue?.ordersCount) ? `$${Number(avgOrderValue?.spent)/Number(avgOrderValue?.ordersCount)}`  : "$0" }}</div>
            </div>
        </div>
        <div class="flex items-center bg-white rounded-xl p-4 shadow-xs md:p-6">
            <div class="mr-4">
                <div class="flex items-center justify-center w-14 h-14 bg-[#FA4B4B]/25 rounded-full">
                    <div class="flex items-center justify-center w-10 h-10 bg-[#FA4B4B] rounded-full">
                        <AbandonedCheckoutIcon class="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <div>
                <div class="text-sm font-semibold text-gray-300 mb-3">Abandoned Checkout</div>
                <SkeletonLoader v-if="isLoading" class="w-[160px] h-6 -mt-1" />
                <div v-else class="text-xl font-semibold leading-[1.2]">N/A</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LastOrderIcon from '@/assets/icons/dashboard/orders.svg';
import MoneyBagIcon from '@/assets/icons/dashboard/money-bag.svg';
import CardIcon from '@/assets/icons/dashboard/card.svg';
import AbandonedCheckoutIcon from '@/assets/icons/dashboard/abandoned-checkout.svg';
import { OrderSummaryItem, DashboardCustomerTableItem } from '~/types';


const showOptions = ref(false);

const isLoading = ref(true);


const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

let lastOrder = ref<OrderSummaryItem>({} as OrderSummaryItem);
let totalSpent = ref<DashboardCustomerTableItem>({} as DashboardCustomerTableItem);
let avgOrderValue = ref<DashboardCustomerTableItem>({} as DashboardCustomerTableItem);
// let abandonedCheckout = ref<OrderSummaryItem>({} as OrderSummaryItem);
const { $api } = useNuxtApp();

const fetchLastOrder = async () => {

    const { data } = (await $api.customerProfile.fetchCustomerLastOrder(props.id));
    lastOrder.value = data as OrderSummaryItem;
    console.log(lastOrder.value);
}

const fetchTotalSpent = async () => {

    const { data } = (await $api.customerProfile.fetchCustomerTotalSpent(props.id));
    totalSpent.value = data as DashboardCustomerTableItem;
    console.log(totalSpent.value);
}

const fetchAvgOrderValue = async () => {

    const { data } = (await $api.customerProfile.fetchCustomerAvgOrderValue(props.id));
    avgOrderValue.value = data as DashboardCustomerTableItem;
    console.log(avgOrderValue.value);
}

// const fetchAbandonedCheckout = async () => {

//     const { data } = (await $api.customerProfile.fetchAbandonedCheckout(props.id));
//     abandonedCheckout.value = data as OrderSummaryItem;
//     console.log(abandonedCheckout.value);
// }

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 5000);
});

// await fetchLastOrder()
// await fetchTotalSpent()
// await fetchAvgOrderValue()
// await fetchAbandonedCheckout()
await Promise.all([fetchLastOrder(),fetchTotalSpent(),fetchAvgOrderValue()])
</script>
