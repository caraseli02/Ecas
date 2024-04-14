<template>
  <section class="flex flex-col justify-center mb-16">
    <div class="max-w-full p-4 mx-auto transition-all duration-300 !pb-0 md:py-6 lg:px-6 xl:p-0 xl:pt-8">
      <div class="grid grid-cols-1 gap-4 md:gap-6 w-[358px] md:w-[736px] lg:w-[976px] xl:w-[1392px]">
        <section class="flex justify-between gap-6 flex-wrap xl:flex-nowrap">
          <DashboardClientActiveOrders :items="OrdersIds"/>
          <DashboardClientAnalytics/>
          <DashboardClientBanner :slides="hotSales"/>
        </section>
        <DashboardClientTabBar v-model="activeOrderFilter"/>
        <ClientTableOrder v-if="activeOrderFilter.value === 'orders'"/>
        <ClientTableTransaction v-if="activeOrderFilter.value === 'transaction_history'"/>
        <ClientOnly>
          <DashboardClientActivity :data="myActivityData"/>
        </ClientOnly>
        <!-- <DashboardClientInfoCards :id="route.params.slug" /> -->
        <div class="flex flex-wrap gap-4 xl:grid-cols-3 xl:grid-rows-[repeat(2,auto)] md:gap-6">
          <DashboardClientInfo
              :id="myAccountInformation?._id"
              :account-information="myAccountInformation"
              class="xl:col-start-1 xl:row-start-1 xl:row-span-2"
          />
          <DashboardClientRecentlyBought :data="myRecentlyBougth"/>
          <DashboardClientRecentlyBoughtSlider/>
          <section class="hidden xl:flex flex-col gap-6 min-w-[330px]">
            <DashboardClientCredit
                :available-credit="myAccountInformation.adminSettings?.customerCredit?.spent || 0"
                :balance="myAccountInformation.adminSettings?.customerCredit?.available || 0"
            />
            <DashboardClientSupport/>
          </section>
          <div class="flex gap-6 w-full flex-wrap">
            <DashboardClientCredit
                :available-credit="myAccountInformation.adminSettings?.customerCredit?.available || 0"
                :balance="myAccountInformation.adminSettings?.customerCredit?.available || 0"
                class="xl:hidden"
            />
            <DashboardClientAddressCards :addresses="myAddresses"/>
            <DashboardClientPaymentCard :card="myCard"/>
            <DashboardClientSupport class="xl:hidden"/>
          </div>
        </div>
      </div>
    </div>
    <DashboardClientViewHistory :view-history="myViewHistory"/>
  </section>
</template>

<script setup lang="ts">
import {
  CustomerDashboardActivityData,
  ProductBannerInterface
} from '~/model/dashboard/customer-information/customer-information';

import {ShippingAddressInterface, UserInterface} from '~/types/auth/user-interface';
import {useAuthStore} from '~/store/authStore';
import {ProductInterface} from '~/model/products/response/ProductResponse';
import {StripeCardInterface} from '~/types';


const {$api} = useNuxtApp();

const userDetails = useAuthStore().userDetails
const userCards = useAuthStore().userCards

// Remove after integration
const OrdersIds = ref([] as any);
const activeOrderFilter = ref({
  icon: 'dashboard',
  value: 'home',
});
const myActivityData = ref<CustomerDashboardActivityData>({} as CustomerDashboardActivityData);
const myAccountInformation = ref<UserInterface>({} as UserInterface);
const myRecentlyBougth = ref<any>([] as any)
const myAddresses = ref<ShippingAddressInterface[]>([] as ShippingAddressInterface[])
const myViewHistory = ref<ProductInterface[]>([] as ProductInterface[])
const myMonthHotSale = ref<ProductInterface[]>([] as ProductInterface[])
const hotSales = ref<ProductBannerInterface[]>([] as ProductBannerInterface[])
const myCard = ref<StripeCardInterface>({} as StripeCardInterface)


const activeOrders = async () => {
  const {data, status} = await $api.customerDashboard.fetchCustomerActiveOrders();
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
  if (userDetails) {
    myAccountInformation.value = userDetails
  }
}

const recentlyBougth = async () => {
  const {data, status} = await $api.customerDashboard.fetchRecentlyBought()
  if (status === 'success') {
    myRecentlyBougth.value = data.total
  }
}

const addresses = async () => {
  if (userDetails && userDetails.personalDetails && userDetails.personalDetails?.shippingAddress) {
    myAddresses.value.push(userDetails.personalDetails?.shippingAddress[0])
    myAddresses.value.push(userDetails.personalDetails?.shippingAddress[0])
  }
}

const viewHistory = async () => {
  const history = await $api.customerDashboard.fetchViewHistory();
  if (history.status === 'success') {
    myViewHistory.value = history.data
  }

}

const monthHotSale = async () => {
  const hotSale = await $api.customerDashboard.fetchMonthHotSale();
  if (hotSale.status === 'success') {
    myMonthHotSale.value = hotSale.data
    await hotSalesFunction()
  }
}

const hotSalesFunction = async () => {
  hotSales.value = myMonthHotSale.value.map((slide) => ({
    title: 'October hot sale',
    discount: slide.adminSettings?.discount?.value + ' %',
    productCode: slide.manufacturerCode,
    description: slide.description,
    details: slide.variant,
    originalPrice: '$ 0,15 (100+)',
    salePrice: '$ 0,095',
    quantity: '(100+)',
    addToCartText: 'Add to cart'
  })) as unknown as ProductBannerInterface[];
};

const getDefaultCard = async () => {
  myCard.value = userCards?.filter((card) => card.default)[0] as StripeCardInterface
  // return userCards?.filter((card) => card.default)[0] as StripeCardInterface
}


await Promise.all([activeOrders(), activityWidgets(), customerInformation(), recentlyBougth(), addresses(), viewHistory(), monthHotSale(), getDefaultCard()]);
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
