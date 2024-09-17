<template>
    <section class="flex flex-col justify-center mb-16">
        <div class="max-w-full p-4 mx-auto transition-all duration-300 !pb-0 md:py-6 lg:px-6 xl:p-0 xl:pt-8">
            <div class="grid grid-cols-1 gap-4 md:gap-6 w-[358px] md:w-[736px] lg:w-[976px] xl:w-[1392px]">
                <section class="flex justify-between gap-6 flex-wrap xl:flex-nowrap">
                    <DashboardClientActiveOrders :items="ordersIds" />
                    <DashboardClientOutstandingInvoices :items="ordersIds" />
                    <DashboardClientBanner :slides="hotSales" />
                </section>
                <DashboardClientTabBar v-model="activeOrderFilter" />
                <LazyClientTableOrder v-if="activeOrderFilter.value === 'orders'" @show-total-items="activeOrderFilter.total_items = $event" />
                <LazyClientTableTransaction class="shadow-xs p-2 pt-6 md:p-6 rounded-xl" v-if="activeOrderFilter.value === 'transaction_history'" @show-total-items="activeOrderFilter.total_items = $event" />
                <LazyClientTableAgents
                    v-if="activeOrderFilter.value === 'agents'"
                    @show-total-items="activeOrderFilter.total_items = $event"
                />
                <LazyClientTableLogs
                    v-if="activeOrderFilter.value === 'activity_logs'"
                    @show-total-items="activeOrderFilter.total_items = $event"
                />
                <LazyDashboardClientSettings v-if="activeOrderFilter.value === 'settings'" />
                <template v-if="activeOrderFilter.value === 'home'">
                    <ClientOnly>
                        <DashboardClientActivity :data="myActivityData" />
                    </ClientOnly>
                    <!-- <DashboardClientInfoCards :id="route.params.slug" /> -->
                    <div class="flex flex-wrap gap-4 xl:grid-cols-3 xl:grid-rows-[repeat(2,auto)] md:gap-6">
                        <DashboardClientInfo
                            :id="myAccountInformation?._id"
                            :account-information="myAccountInformation"
                            class="xl:col-start-1 xl:row-start-1 xl:row-span-2"
                        />
                        <DashboardClientRecentlyBought :data="myRecentlyBougth" />
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
                            <DashboardClientAddressCards :addresses="myAddresses" />
                            <DashboardClientPaymentCard :card="myCard" />
                            <DashboardClientSupport class="xl:hidden" />
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <DashboardClientViewHistory :view-history="myViewHistory" />
    </section>
</template>

<script setup lang="ts">
import {
    CustomerDashboardActivityData,
    ProductBannerInterface,
    ViewHistoryProductInterface,
} from '~/model/dashboard/customer-information/customer-information';

import { BillingAddressInterface, ShippingAddressInterface, UserInterface } from '~/types/auth/user-interface';
import { useAuthStore } from '~/store/authStore';
import { ProductInterface } from '~/model/products/response/ProductResponse';
import { AccountType, StripeCardInterface } from '~/types';
import { parseProductPriceConfiguration } from '~/helpers/prices.helper';
import { storeToRefs } from 'pinia';
import moment from 'moment';

const { $api } = useNuxtApp();

const userDetails = useAuthStore().userDetails;
const userCards = useAuthStore().userCards;

// Remove after integration
const ordersIds = ref([] as any);
const activeOrderFilter = ref({
    icon: 'dashboard',
    value: 'home',
    total_items: 0,
});
const myActivityData = ref<CustomerDashboardActivityData>({} as CustomerDashboardActivityData);
const myAccountInformation = ref<UserInterface>({} as UserInterface);
const myRecentlyBougth = ref<any>([] as any);
const myAddresses = ref<ShippingAddressInterface[]>([] as ShippingAddressInterface[]);
const myViewHistory = ref<ProductInterface[]>([] as ProductInterface[]);
const myMonthHotSale = ref<ProductInterface[]>([] as ProductInterface[]);
const hotSales = ref<ProductInterface[][]>([] as ProductInterface[][]);
const myCard = ref<StripeCardInterface>({} as StripeCardInterface);

const activeOrders = async () => {
    const { data, status } = await $api.customerDashboard.fetchCustomerActiveOrders();
    if (status && data && data.total) {
        ordersIds.value = data.total.map((object) => object.shortId);
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
        myAccountInformation.value = userDetails;
    }
};

const recentlyBougth = async () => {
    const { data, status } = await $api.customerDashboard.fetchRecentlyBought();
    if (status === 'success') {
        myRecentlyBougth.value = data.total;
    }
};

const addresses = async () => {
    const shipping = ref<ShippingAddressInterface>({
        alias: '-',
        name1: '-',
        name2: '-',
        default: false,
        country: '-',
        region: '-',
        city: '-',
        postcode: '-',
        phone: '-',
    } as ShippingAddressInterface);
    const billing = ref<BillingAddressInterface>({
        alias: '-',
        name1: '-',
        name2: '-',
        default: false,
        country: '-',
        region: '-',
        city: '-',
        postcode: '-',
        phone: '-',
    } as BillingAddressInterface);

    const details = userDetails?.accountType === AccountType.Personal ? userDetails?.personalDetails : userDetails?.companyDetails;
    if (details?.shippingAddress && details?.shippingAddress[0]) {
        shipping.value = details?.shippingAddress[0];
    }
    if (details?.billingAddress && details?.billingAddress[0]) {
        shipping.value = details?.billingAddress[0];
    }
    myAddresses.value.push(shipping.value);
    myAddresses.value.push(billing.value);
};

const viewHistory = async () => {
    const history = await $api.customerDashboard.fetchViewHistory();
    if (history.status === 'success') {
        myViewHistory.value = history.data.map((item: ViewHistoryProductInterface) => ({
            _id: item.productInfo._id,
            class: item.productInfo.class,
            alias: item.productInfo.alias,
            description: item.productInfo.description,
            variant: item.productInfo.variant,
            manufacturer: item.productInfo.manufacturer,
            manufacturerCode: item.productInfo.manufacturerCode,
            stock: item.productInfo.stock,
            priceHistory: item.productInfo.priceHistory,
            priceConfiguration: item.productInfo.priceConfiguration,
            measure: item.productInfo.measure,
            details: '',
            sold: item.productInfo.sold,
        })) as unknown as ProductInterface[];
        console.log(myViewHistory);
    }
};

const monthHotSale = async () => {
    const hotSale = await $api.customerDashboard.fetchMonthHotSale();
    if (hotSale.status === 'success') {
        myMonthHotSale.value = hotSale.data;
        await hotSalesFunction();
    }
};
const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

const hotSalesFunction = async () => {
    const currMonthName = moment().format('MMMM');

    hotSales.value = myMonthHotSale.value.map((slide) => {
        const discoutPrice = parseProductPriceConfiguration(slide, getUserDetails.value, slide.stock);
        return {
            title: currMonthName + ' hot sale',
            discount: slide.adminSettings?.discount?.value + ' %',
            productCode: slide.manufacturerCode,
            description: slide.description,
            details: slide.variant,
            originalPrice: `$ ${discoutPrice?.priceConfiguration.price.toFixed(2)} (${
                discoutPrice?.minimumOrderQuantityConfiguration.quantity
            }+)`,
            salePrice: `$ ${discoutPrice?.currentConfigurationDiscountPrice.toFixed(2)}`,
            _id: slide._id,
            quantity: discoutPrice?.minimumOrderQuantityConfiguration.quantity,
            addToCartText: 'Add to cart',
        };
    }) as unknown as ProductBannerInterface[];
};

const getDefaultCard = async () => {
    myCard.value = userCards?.filter((card) => card.default)[0] as StripeCardInterface;
};

activeOrders();
activityWidgets();
customerInformation();
recentlyBougth();
addresses();
viewHistory();
monthHotSale();
getDefaultCard();
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
