<template>
    <div class="max-w-full p-4 mx-auto transition-all duration-300 mb-10 md:py-6 md:px-6 xl:p-0 xl:pt-8">
        <div class="grid grid-cols-1 gap-4 md:gap-6 md:w-[736px] lg:w-[976px] xl:w-[1392px]">
            <section class="flex justify-between gap-6 flex-wrap xl:flex-nowrap">
                <DashboardClientActiveOrders />
                <DashboardClientAnalytics />
                <DashboardClientBanner />
            </section>
            <DashboardClientTabBar />
            <DashboardClientActivity />
            <!-- <DashboardClientInfoCards :id="route.params.slug" /> -->
            <div class="flex flex-wrap gap-4 xl:grid-cols-3 xl:grid-rows-[repeat(2,auto)] md:gap-6">
                <DashboardClientInfo 
                    id="4vJCGY6q0jZT3JLWZL9eP0DEIyx1"
                    class="xl:col-start-1 xl:row-start-1 xl:row-span-2" 
                />
                <DashboardClientRecentlyBought />
                <DashboardClientRecentlyBoughtSlider />
                <section class="hidden xl:flex flex-col gap-6 min-w-[330px]">
                    <DashboardClientCredit />
                    <DashboardClientSupport />
                </section>
                <div class="flex gap-6 w-full flex-wrap">
                    <DashboardClientCredit class="xl:hidden" />
                    <DashboardClientAddressCards />
                    <DashboardClientPaymentCard  />
                    <DashboardClientSupport class="xl:hidden" />
                </div>
            </div>
            <DashboardClientViewHistory />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
