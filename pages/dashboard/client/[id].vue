<template>
    <section class="flex flex-col justify-center mb-16">
        <div class="max-w-full p-4 mx-auto transition-all duration-300 !pb-0 md:py-6 lg:px-6 xl:p-0 xl:pt-8">
            <div class="grid grid-cols-1 gap-4 md:gap-6 w-[358px] md:w-[736px] lg:w-[976px] xl:w-[1392px]">
                <section class="flex justify-between gap-6 flex-wrap xl:flex-nowrap">
                    <DashboardClientActiveOrders :items="OrdersIds" />
                    <DashboardClientAnalytics />
                    <DashboardClientBanner />
                </section>
                <DashboardClientTabBar v-model="activeOrderFilter" />
                <ClientTableOrder v-if="activeOrderFilter.value === 'orders'" />
                <ClientTableTransaction v-if="activeOrderFilter.value === 'transaction_history'" />
                <ClientOnly>
                    <DashboardClientActivity :data="myActivityData" />
                </ClientOnly>
                <!-- <DashboardClientInfoCards :id="route.params.slug" /> -->
                <div class="flex flex-wrap gap-4 xl:grid-cols-3 xl:grid-rows-[repeat(2,auto)] md:gap-6">
                    <DashboardClientInfo
                        :id="myAccountInformation._id"
                        :account-information="myAccountInformation"
                        class="xl:col-start-1 xl:row-start-1 xl:row-span-2"
                    />
                    <DashboardClientRecentlyBought />
                    <DashboardClientRecentlyBoughtSlider />
                    <section class="hidden xl:flex flex-col gap-6 min-w-[330px]">
                        <DashboardClientCredit
                            :available-credit="myAccountInformation.adminSettings?.customerCredit?.spent || 0"
                            :balance="myAccountInformation.adminSettings?.customerCredit?.available || 0"
                        />
                        <DashboardClientSupport />
                    </section>
                    <div class="flex gap-6 w-full flex-wrap">
                        <DashboardClientCredit
                            :available-credit="myAccountInformation.adminSettings?.customerCredit?.available || 0"
                            :balance="myAccountInformation.adminSettings?.customerCredit?.available || 0"
                            class="xl:hidden"
                        />
                        <DashboardClientAddressCards />
                        <DashboardClientPaymentCard />
                        <DashboardClientSupport class="xl:hidden" />
                    </div>
                </div>
            </div>
        </div>
        <DashboardClientViewHistory />
    </section>
</template>

<script setup lang="ts">
import { CustomerDashboardActivityData } from '~/model/dashboard/customer-information/customer-information';
import { UserDetails } from '~/types/auth/user-details';

const { $api } = useNuxtApp();

// Remove after integration
const OrdersIds = ref([] as any);
const activeOrderFilter = ref({
    icon: 'dashboard',
    value: 'home',
});
const myActivityData = ref<CustomerDashboardActivityData>({} as CustomerDashboardActivityData);
const myAccountInformation = ref<UserDetails>({} as UserDetails);

const activeOrders = async () => {
    const { data, status } = await $api.customerDashboard.fetchCustomerActiveOrders();
    if (status && data && data.total) {
        OrdersIds.value = data.total.map((object) => object.shortId);
    }
};

const activityWidgets = async () => {
    const favorites = await $api.customerDashboard.fetchFavorites();
    const totalOrders = await $api.customerDashboard.fetchTotalOrders();
    const returns = await $api.customerDashboard.fetchReturns();

    if (favorites.status === 'success') {
        myActivityData.value.favorites = {
            products: favorites.data.products_number || 0,
            folders: favorites.data.folders_number || 0,
        };
    }
    if (totalOrders.status === 'success') {
        myActivityData.value.totalOrders = totalOrders.data.total_orders || 0;
        myActivityData.value.monthOrder = totalOrders.data.total_orders_current_month || 0;
    }

    if (returns.status === 'success') {
        myActivityData.value.returns = returns.data.total || 0;
    }
};

const customerInformation = async () => {
    const accountInformation = await $api.customerDashboard.fetchCustomerAccountInformation();
    
    if (accountInformation.status === 'success') {
        myAccountInformation.value = accountInformation.data;
    }
};

await Promise.all([activeOrders(), activityWidgets(), customerInformation()]);
</script>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
