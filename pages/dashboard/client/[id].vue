<template>
    <div class="w-[1392px] max-w-full p-4 mx-auto transition-all duration-300 md:py-6 2xl:px-6">
        <div class="grid grid-cols-1 gap-4 md:gap-6">
            <section class="flex justify-between gap-6 flew-wrap">
                <DashboardClientActiveOrders />
                <DashboardClientAnalytics />
                <DashboardClientBanner />
            </section>
            <DashboardClientTabBar />
            <DashboardClientActivity />
            <!-- <DashboardClientInfoCards :id="route.params.slug" /> -->
            <div class="flex gap-4 xl:grid-cols-3 xl:grid-rows-[repeat(2,auto)] md:gap-6">
                <DashboardClientInfo id="4vJCGY6q0jZT3JLWZL9eP0DEIyx1"
                    class="xl:col-start-1 xl:row-start-1 xl:row-span-2" />
                <DashboardClientRecentlyBought />
                <section class="flex flex-col gap-6">
                    <DashboardClientCredit />
                    <DashboardClientSupport />
                </section>
                <!-- <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:col-start-2 xl:row-start-1">
                  <DashboardClientNetMargin />
                  <DashboardClientRecentTransactions :id="route.params.slug" />
              </div>
              <DashboardClientDefaultShippingAddress :id="route.params.slug" class="xl:col-start-2 xl:row-start-2" /> -->
            </div>
            <div class="flex gap-6 w-full">
                <DashboardClientAddressCards />
                <DashboardClientPaymentCard />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
