<template>
  <div class="w-[1488px] max-w-full p-4 mx-auto transition-all duration-300 md:py-6 2xl:px-6">
    <DashboardBreadcrumbs title="Customer Profile" :customer="route.params.slug" :customer-name="customerName">
      <div class="max-lg:hidden max-w-max">
        <div class="grid grid-cols-[repeat(2,auto)] gap-5 text-right">
          <div class="flex flex-col">
            <div class="text-sm leading-relaxed font-medium text-gray-300 mb-3">Credit Limit</div>
            <div v-if="!isLoading" class="font-semibold leading-tight">
              <div v-if="emptyData || error" class="text-sm font-medium leading-tight text-gray-100">No data available
              </div>
              <div v-else>€ 100,000.00</div>
            </div>
            <SkeletonLoader v-else class="w-[104px] h-5"/>
          </div>
          <div
              class="relative pl-5 before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:w-px before:h-[85%] before:bg-border before:rounded-[50px]"
          >
            <div class="text-sm leading-relaxed font-medium text-gray-300 mb-3">Available Credit</div>
            <div v-if="!isLoading" class="font-semibold leading-tight text-blue">
              <div v-if="emptyData || error" class="text-sm font-medium leading-tight text-gray-100">No data available
              </div>
              <div v-else>€ 45,328.63</div>
            </div>
            <SkeletonLoader v-else class="w-[104px] h-5"/>
          </div>
        </div>
      </div>
    </DashboardBreadcrumbs>
    <div class="grid grid-cols-1 gap-4 md:gap-6">
      <div class="bg-white rounded-xl px-4 py-3 shadow-xs grid grid-cols-2 md:py-2 lg:hidden">
        <div class="pr-4 md:flex md:items-center md:py-2">
          <SkeletonLoader v-if="isLoading" class="w-full h-[45px] md:h-5"/>
          <template v-else>
            <div
                class="flex items-center justify-between text-xs leading-relaxed font-medium text-gray-300 mb-2 md:m-0 md:text-sm md:mr-2"
            >
              <div>Credit Limit</div>
              <WarningIcon v-if="error" class="w-5 h-5 md:hidden"/>
            </div>
            <div v-if="emptyData || error" class="text-sm font-medium leading-tight text-gray-100">No data available
            </div>
            <div v-else class="text-sm font-semibold leading-tight">€ 100,000.00</div>
            <WarningIcon v-if="error" class="w-5 h-5 ml-auto max-md:hidden"/>
          </template>
        </div>
        <div
            class="relative pl-4 before:absolute before:top-0 before:left-0 before:w-px before:h-full before:bg-gray-200 before:rounded-[50px] md:flex md:items-center"
        >
          <SkeletonLoader v-if="isLoading" class="w-full h-[45px] md:h-5"/>
          <template v-else>
            <div
                class="flex items-center justify-between text-xs leading-relaxed font-medium text-gray-300 mb-2 md:m-0 md:text-sm md:mr-2"
            >
              <div>Available Credit</div>
              <WarningIcon v-if="error" class="w-5 h-5 md:hidden"/>
            </div>
            <div v-if="emptyData || error" v class="text-sm font-medium leading-tight text-gray-100">No data available
            </div>
            <div v-else class="text-sm font-semibold leading-tight text-blue">€ 45,328.63</div>
            <WarningIcon v-if="error" class="w-5 h-5 ml-auto max-md:hidden"/>
          </template>
        </div>
      </div>
      <DashboardCustomersInfoCards :id="route.params.slug"/>
      <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:grid-rows-[repeat(2,auto)] md:gap-6">
        <DashboardCustomersCustomerInformation
            :id="route.params.slug"
            class="xl:col-start-1 xl:row-start-1 xl:row-span-2"/>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:col-start-2 xl:row-start-1">
          <DashboardCustomersNetMargin/>
          <DashboardCustomersRecentTransactions :id="route.params.slug"/>
        </div>
        <DashboardCustomersDefaultShippingAddress :id="route.params.slug" class="xl:col-start-2 xl:row-start-2"/>
      </div>
      <DashboardCustomersOrders/>
    </div>
  </div>
</template>

<script setup lang="ts">
import WarningIcon from '@/assets/icons/dashboard/warning.svg';
import Emitter from 'tiny-emitter/instance.js';

const customerName = ref('')

useHead({
  title: 'Dashboard Profile',
});

Emitter.on('customer-info', async (object: { name: string }) => {

  customerName.value = object.name;

});

definePageMeta({
  layout: 'dashboard',
});


const error = ref(false);
const emptyData = ref(false);
const isLoading = ref(false);

const route = useRoute();
onMounted(async () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 5000);
});
</script>
