import { ref } from 'vue';
import { useAuthStore } from '~/store/authStore';
import {
    CustomerDashboardActivityData,
    ProductBannerInterface,
    ViewHistoryProductInterface,
} from '~/model/dashboard/customer-information/customer-information';
import { BillingAddressInterface, ShippingAddressInterface, UserInterface } from '~/types/auth/user-interface';
import { ProductInterface } from '~/model/products/response/ProductResponse';
import { AccountType, StripeCardInterface } from '~/types';
import { parseProductPriceConfiguration } from '~/helpers/prices.helper';
import { storeToRefs } from 'pinia';
import moment from 'moment';

const ordersIds = ref<any[]>([]);
const activeOrderFilter = ref({
    value: 'home',
});
const myActivityData = ref<CustomerDashboardActivityData>({} as CustomerDashboardActivityData);
const myAccountInformation = ref<UserInterface>({} as UserInterface);
const myRecentlyBougth = ref<any[]>([]);
const myAddresses = ref<ShippingAddressInterface[]>([]);
const myViewHistory = ref<ProductInterface[]>([]);
const myMonthHotSale = ref<ProductInterface[]>([]);
const hotSales = ref<ProductInterface[][]>([]);
const myCard = ref<StripeCardInterface>({} as StripeCardInterface);

export const useCustomerDashboard = () => {
    const { $api } = useNuxtApp();
    const userDetails = useAuthStore().userDetails;
    const userCards = useAuthStore().userCards;
    const authStore = useAuthStore();
    const { getUserDetails } = storeToRefs(authStore);

    const activeOrders = async () => {
        const { data, status } = await $api.customerDashboard.fetchCustomerActiveOrders();
        if (status && data && data.total) {
            ordersIds.value = data.total.map((object) => {
                return {shortId: object.shortId, id: object._id };
            });
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
        });
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
        });

        const details = userDetails?.accountType === AccountType.Personal ? userDetails?.personalDetails : userDetails?.companyDetails;
        if (details?.shippingAddress && details?.shippingAddress[0]) {
            shipping.value = details?.shippingAddress[0];
        }
        if (details?.billingAddress && details?.billingAddress[0]) {
            billing.value = details?.billingAddress[0];
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
                name: item.productInfo.name,
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
        }
    };

    const monthHotSale = async () => {
        const hotSale = await $api.customerDashboard.fetchMonthHotSale();
        if (hotSale.status === 'success') {
            myMonthHotSale.value = hotSale.data;
            await hotSalesFunction();
        }
    };

    const hotSalesFunction = async () => {
        const currMonthName = moment().format('MMMM');

        hotSales.value = myMonthHotSale.value.map((slide) => {
            const discountPrice = parseProductPriceConfiguration(slide, getUserDetails.value, slide.stock);
            return {
                title: currMonthName + ' hot sale',
                discount: slide.adminSettings?.discount?.value + ' %',
                productCode: slide.manufacturerCode,
                description: slide.description,
                details: slide.variant,
                originalPrice: `$ ${discountPrice?.priceConfiguration.price.toFixed(2)} (${
                    discountPrice?.minimumOrderQuantityConfiguration.quantity
                }+)`,
                salePrice: `$ ${discountPrice?.currentConfigurationDiscountPrice.toFixed(2)}`,
                _id: slide._id,
                quantity: discountPrice?.minimumOrderQuantityConfiguration.quantity,
                addToCartText: 'Add to cart',
            };
        }) as unknown as ProductBannerInterface[];
    };

    const getDefaultCard = async () => {
        myCard.value = userCards?.filter((card) => card.default)[0] as StripeCardInterface;
    };

    return {
        ordersIds,
        activeOrderFilter,
        myActivityData,
        myAccountInformation,
        myRecentlyBougth,
        myAddresses,
        myViewHistory,
        myMonthHotSale,
        hotSales,
        myCard,
        activeOrders,
        activityWidgets,
        customerInformation,
        recentlyBougth,
        addresses,
        viewHistory,
        monthHotSale,
        getDefaultCard,
    };
};
