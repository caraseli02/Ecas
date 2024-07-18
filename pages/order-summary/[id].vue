<script setup lang="ts">
import { BoxIcon, FileText, MapPin, PackageOpenIcon, TruckIcon, Undo2Icon } from 'lucide-vue-next';
import {
    OrderNotesInterface,
    OrderRequestInterface,
    OrderRequestInterfaceResponse,
    OrderType,
    PaymentInfo,
    PaymentSummaryInterface,
} from '~/types';
import moment from 'moment';
import { paymentInfoHelper } from '~/helpers/payment-info.helper';

import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { CartProductsInterface } from '~/model/cart/response/cart.interface';

const authStore = useAuthStore();
const { getUserDetails, userCards } = storeToRefs(authStore);
const generalSettings = useAuthStore().generalSettings;
const { $api } = useNuxtApp();

const route = useRoute();

const orderType = ref<OrderType | null>(null);
const customerDetails = ref({
    title: 'Customer Details',
    name: '',
    email: '',
    phone: '',
});
const date = ref<string>('' as string);
const orderPaySum = ref<PaymentSummaryInterface>({} as PaymentSummaryInterface);
const paymentMethod = ref<PaymentInfo>();

const shippingMethod = computed(() =>
    generalSettings?.orderSettings?.deliveryTypes.find((type) => type._id === data.value.data?.order?.shippingDetails.deliveryTypeId)
);

const addresses = ref<{
    shippingAddress: {
        name1: string;
        name2: string;
        postcode: string;
        country: string;
        default: boolean;
    };
    billingAddress: {
        name1: string;
        name2: string;
        postcode: string;
        country: string;
    };
}>();

const notes = ref<OrderNotesInterface[] | []>([] as OrderNotesInterface[] | []);
const data = ref<OrderRequestInterfaceResponse>({} as OrderRequestInterfaceResponse);

const hasMixedItems = computed(() => {
    const key1Values = new Set(stockOrderItems.value.map((item) => item._id));

    return backorderItems.value.some((item) => key1Values.has(item.key1));
});

const paymentSummary = computed(() => {
    const shippingType = generalSettings?.orderSettings?.deliveryTypes.find(
        (type) => type._id === data.value.data?.order.shippingDetails._id
    );
    const orderInfo = data.value.data?.order;

    if (orderInfo) {
        orderPaySum.value.orderTotal = orderInfo.total;
        orderPaySum.value.subtotal = Number(orderInfo.subtotal);
        orderPaySum.value.taxPercentage = 19;
        orderPaySum.value.taxAmount = 0.19 * (orderPaySum.value.subtotal || 0);
        orderPaySum.value.discountPercentage = orderInfo.discount?.value || 0;
        orderPaySum.value.discountAmount = orderPaySum.value.discountPercentage * (orderPaySum.value.subtotal || 0);
        orderPaySum.value.handlingCharge = 0;
        orderPaySum.value.shippingCost = orderInfo.shippingCost || 0;
        orderPaySum.value.shippingText = shippingType?.title || '';
        orderPaySum.value.orderType = orderInfo.type;
        orderPaySum.value.smallOrderCharge = orderInfo.smallOrderCost || 0;

        if (data.value.data?.children?.length > 0) {
            orderPaySum.value.stockItemsTotal = data.value.data.children.find((child: any) => child.type === OrderType.Stock).total;
            orderPaySum.value.backorderItemsTotal = data.value.data.children.find((child: any) => child.type === OrderType.Back).total;
            orderPaySum.value.payableNow = orderPaySum.value.stockItemsTotal;
        }

        return true;
    }
});

const stockOrderItems = ref<CartProductsInterface[]>([] as CartProductsInterface[]);
const backorderItems = ref<CartProductsInterface[]>([] as CartProductsInterface[]);

const stockOrder = ref<OrderRequestInterface>({} as OrderRequestInterface);
const backOrder = ref<OrderRequestInterface>({} as OrderRequestInterface);

const getOrderInformation = async () => {
    // Fetch order information
    const orderId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const response = (await $api.orders.getOrderById(orderId)) as OrderRequestInterfaceResponse;

    if (response.status === 'success' && response.data.order) {
        data.value = response;
        orderType.value = response.data.order.type;
        stockOrder.value =
            response.data.order.type === OrderType.Mixed
                ? response.data.children.find((child: any) => child.type === OrderType.Stock)
                : response.data.order;

        stockOrderItems.value = stockOrder.value.products || [];
        backOrder.value =
            response.data.order.type === OrderType.Mixed
                ? response.data.children.find((child: any) => child.type === OrderType.Back)
                : response.data.order;
        backorderItems.value = backOrder.value.products || [];

        if (response.data.order.notes) {
            notes.value = response.data.order.notes || [];
        }

        if (orderType.value === OrderType.Mixed) {
            paymentMethod.value = paymentInfoHelper(stockOrder.value, getUserDetails.value, userCards.value || []);
        } else {
            paymentMethod.value = paymentInfoHelper(response.data.order, getUserDetails.value, userCards.value || []);
        }

        addresses.value = {
            shippingAddress: {
                name1: response.data.order.shippingDetails.address.name1,
                name2: response.data.order.shippingDetails.address.name2 ? response.data.order.shippingDetails.address.name2 : '',
                postcode: response.data.order.shippingDetails.address.postcode,
                country: response.data.order.shippingDetails.address.country,
                default: response.data.order.shippingDetails.address.default || false,
            },
            billingAddress: {
                name1: response.data.order.shippingDetails.billingAddress.name1,
                name2: response.data.order.shippingDetails.billingAddress.name2
                    ? response.data.order.shippingDetails.billingAddress.name2
                    : '',
                postcode: response.data.order.shippingDetails.billingAddress.postcode,
                country: response.data.order.shippingDetails.billingAddress.country,
            },
        };
        customerDetails.value = {
            title: 'Customer Details',
            name: response?.data?.order.userName,
            email: response?.data?.order.userEmail,
            phone: response?.data?.order.shippingDetails.phone,
        };
        date.value = moment(response.data.order.updatedAt).format('DD MMMM YYYY, HH:mm');
    }
};

onMounted(() => {
    getOrderInformation();
});
</script>

<template>
    <section class="container px-4 py-6 md:p-6 flex flex-col gap-10">
        <div class="flex flex-col self-stretch">
            <div class="flex flex-wrap lg:gap-4 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <div class="flex gap-5 justify-between my-auto">
                    <h1 class="text-2xl font-semibold leading-8 text-neutral-700">
                        Order ID: <span class="text-blue-500">#{{ route.params.id }}</span>
                    </h1>
                    <UiBadge
                        v-if="orderType === OrderType.Mixed"
                        class="justify-center px-2 py-1 my-auto text-sm font-medium leading-5 text-white bg-blue-500 rounded"
                    >
                        Mixed Order
                    </UiBadge>
                </div>
                <div
                    class="md:w-full lg:w-fit flex gap-2 md:gap-4 order-2 lg:order-1 mt-5 lg:mt-0 text-sm font-medium leading-6 text-white max-md:flex-wrap"
                >
                    <UiButton
                        variant="secondary"
                        class="w-[114px] md:w-full lg:w-fit flex gap-2 justify-center px-6 py-2 text-slate-500 rounded-lg bg-zinc-100 max-md:px-5"
                    >
                        <FileText class="shrink-0 w-6 aspect-square stroke-[1.5]" />
                        <span class="hidden lg:inline">View</span> Invoices
                    </UiButton>
                    <UiButton
                        variant="secondary"
                        class="w-[114px] md:w-full lg:w-fit flex gap-2 justify-center px-6 py-2 text-slate-500 rounded-lg bg-zinc-100 max-md:px-5"
                    >
                        <MapPin class="shrink-0 w-6 aspect-square stroke-[1.5]" />
                        Track <span class="hidden lg:inline">Order</span>
                    </UiButton>
                    <UiButton
                        variant="secondary"
                        class="w-[114px] md:w-full lg:w-fit flex gap-2 justify-center px-6 py-2 text-slate-500 rounded-lg bg-zinc-100 max-md:px-5"
                    >
                        <BoxIcon class="shrink-0 w-6 aspect-square stroke-[1.5]" />
                        View All <span class="hidden lg:inline">Orders</span>
                    </UiButton>
                </div>
                <div
                    class="flex items-center flex-wrap gap-3 order-1 lg:order-2 pr-20 mt-3 lg:mt-0 text-sm font-medium leading-6 max-md:flex-wrap max-md:pr-5"
                >
                    <div class="flex gap-2">
                        <div class="text-slate-500">Order Date:</div>
                        <div class="text-neutral-700">{{ date }}</div>
                    </div>
                    <UiSeparator class="hidden lg:block h-4" orientation="vertical" />
                    <div class="flex gap-2">
                        <div class="text-slate-500">Shipping Method:</div>
                        <div class="text-neutral-700">{{ shippingMethod?.title }}</div>
                    </div>
                </div>
            </div>
        </div>
        <OrderConfirmDetails
            v-if="paymentMethod"
            :customer-details="customerDetails"
            :payment-method="paymentMethod"
            :has-mixed-items="hasMixedItems"
        />
        <UiSeparator />
        <OrderConfirmAddress v-if="addresses" :shipping-address="addresses.shippingAddress" :billing-address="addresses.billingAddress" />
        <OrderConfirmStackItems
            v-if="stockOrder && (orderType === OrderType.Stock || orderType === OrderType.Mixed)"
            :data="stockOrder"
            :order-type="orderType"
        />
        <OrderConfirmBackItems
            v-if="backOrder && (orderType === OrderType.Back || orderType === OrderType.Mixed)"
            :data="backOrder"
            :order-type="orderType"
        />
        <section class="flex flex-col lg:flex-row gap-9">
            <div v-if="notes[0]" class="flex flex-col order-3 lg:order-1 w-full self-stretch text-sm leading-6 text-neutral-700">
                <h2 class="w-full font-semibold max-md:max-w-full">Customer Notes</h2>
                <textarea
                    :placeholder="notes[0] && notes[0].message ? notes[0].message : 'No message provided'"
                    class="min-h-[336px] justify-center px-3 pt-3 pb-16 mt-4 rounded-lg border border-solid bg-light-100 border-grey-300 max-md:pb-10 max-md:max-w-full"
                />
            </div>
            <OrderConfirmPaySummary v-if="paymentSummary" :order-pay-sum="orderPaySum" />
        </section>

        <div v-if="paymentSummary" class="flex flex-col gap-6">
            <h4 class="font-semibold text-sm">Need Help?</h4>
            <section class="flex gap-6 flex-wrap">
                <UiButton size="xs" class="gap-2 px-0" variant="ghost">
                    <TruckIcon class="w-5 h-5 stroke-1.5" />
                    Delivery Info
                </UiButton>
                <UiButton size="xs" class="gap-2 px-0" variant="ghost">
                    <Undo2Icon class="w-5 h-5 stroke-1.5" />
                    Returns
                </UiButton>
                <UiButton size="xs" class="gap-2 px-0" variant="ghost">
                    <PackageOpenIcon class="w-5 h-5 stroke-1.5" />
                    Order Issues
                </UiButton>
            </section>
        </div>
    </section>
</template>

<style scoped></style>
