<template>
    <section class="flex flex-col justify-center mb-16">
        <div class="max-w-full p-4 mx-auto transition-all duration-300 !pb-0 md:py-6 lg:px-6 xl:p-0 xl:pt-8">
            <div class="grid grid-cols-1 gap-4 md:gap-6 w-[358px] md:w-[736px] lg:w-[976px] xl:w-[1392px]">
                <section class="flex justify-between gap-6 flex-wrap xl:flex-nowrap">
                    <DashboardClientActiveOrders :items="testOrders" />
                    <DashboardClientAnalytics />
                    <DashboardClientBanner />
                </section>
                <DashboardClientTabBar v-model="activeOrderFilter" />
                    <ClientOrders v-if="activeOrderFilter.value === 'orders'" />
                    <ClientTransactions v-if="activeOrderFilter.value === 'transaction_history'" />
                <ClientOnly>
                    <DashboardClientActivity />
                </ClientOnly>
                <!-- <DashboardClientInfoCards :id="route.params.slug" /> -->
                <div class="flex flex-wrap gap-4 xl:grid-cols-3 xl:grid-rows-[repeat(2,auto)] md:gap-6">
                    <DashboardClientInfo id="4vJCGY6q0jZT3JLWZL9eP0DEIyx1"
                        class="xl:col-start-1 xl:row-start-1 xl:row-span-2" />
                    <DashboardClientRecentlyBought />
                    <DashboardClientRecentlyBoughtSlider />
                    <section class="hidden xl:flex flex-col gap-6 min-w-[330px]">
                        <DashboardClientCredit />
                        <DashboardClientSupport />
                    </section>
                    <div class="flex gap-6 w-full flex-wrap">
                        <DashboardClientCredit class="xl:hidden" />
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
// Remove after integration
const testOrders = ['M-100003', 'S-100004', 'M-100003', 'S-100004', 'M-100003', 'S-100004', 'M-100003', 'S-100004', 'M-100003', 'S-100004']
const activeOrderFilter = ref({
    icon: 'dashboard',
    value: 'home',
})
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
