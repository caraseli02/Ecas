<template>
    <div class="pt-[30px] lg:pt-10">
        <div class="grid grid-cols-1">
            <div class="container">
                <div class="flex items-end justify-between mb-[15px]">
                    <h1 class="text-xl font-semibold">Order Summary</h1>
                    <div class="flex items-center">
                        <button class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue mr-[15px]">
                            <TriangleIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Report an error </span>
                        </button>
                        <button class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue">
                            <PrintIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Print this page </span>
                        </button>
                    </div>
                </div>
                <div class="gap-6 lg:grid lg:grid-cols-[1fr,320px] lg:gap-5 lg:items-start lg:mb-10 xl:grid-cols-[1fr,392px]">
                    <div class="flex flex-col gap-9 max-w-[976px]">
                        <OrderSummaryBackOrderWarning v-if="showWarning" />
                        <OrderSummaryTable
                            :items="cartItems"
                            :loading="loading"
                            @checkAll="checkAll"
                            @addToFavs="addToFavsAll"
                            @update-subtotal="calculateSubtotal"
                        />
                        <div class="hidden lg:flex flex-col">
                            <OrderSummarySimilarProducts />
                            <OrderSummaryBannerImageCard class="hidden xl:flex" />
                        </div>
                    </div>
                    <div class="lg:grid lg:grid-cols-1">
                        <OrderType :items="cartItems" :account-credit="accountCredit" :order="order" />
                        <OrderSummaryNoteSection />
                        <OrderSummary :order="order" />
                        <OrderSummaryCheckoutButtons />
                        <OrderSummaryBannerCard />
                        <!-- <OrderSummaryEcxlusiveOffer class="max-lg:hidden" /> -->
                        <div class="flex flex-col">
                            <div class="flex lg:hidden">
                                <OrderSummarySimilarProducts />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <Banner />
            <NewProducts title="Hot Deals" />
            <div class="container mb-10 lg:hidden">
                <OrderSummaryEcxlusiveOffer />
            </div>
            <News /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import TriangleIcon from '@/assets/icons/triangle.svg';
import PrintIcon from '@/assets/icons/print.svg';
import { AccountRole, CartProductsInterface, OrderNotesInterface, OrderRequestInterface } from '~/types';
import { CustomerCreditInterface } from '~/types/auth/account-settings';
import { useAuthStore } from '~/store/authStore';
import { ShippingAddressInterface } from '~/types/auth/user-details';
import Emitter from 'tiny-emitter/instance.js';

const store = useAuthStore();
const user = computed(() => store.getUserDetails);
const OrderRequestObject = ref<OrderRequestInterface>({} as OrderRequestInterface);
const userId = user.value?.firebaseId;
const creditObject = ref({} as CustomerCreditInterface);
const orderType = ref(0);
const note = ref('')
const paymentType = ref({
  type: 0 as number,
  selected: false
})

const { $api } = useNuxtApp();
useHead({
    title: 'Order Summary',
});
const cartItems = ref([] as any);
const cartId = ref('' as string);

const fetchList = async () => {
  const response = await $api.cart.fetchCartList();
  if (response.status === 'success') {
    let products: CartProductsInterface[] = [];
    products = response.data.products;
    cartId.value = response.data._id;
    mapCartItems(products);
    } else {
        console.log('error');
    }
};

const showWarning = ref(() => {
    return cartItems.value.some((item: any) => item.productEntity?.stock !== undefined && item.productEntity.stock < item.stock);
});

const loading = ref(true);

const checkAll = (checked: boolean) => {
    cartItems.value.forEach((item: any) => {
        item.selected = checked;
    });
};

const mapCartItems = (cart: CartProductsInterface[]) => {
    cartItems.value = cart.map((product: CartProductsInterface) => ({
        id: product.id,
        stock: product.stock,
        isFolder: false,
        initialUnitPrice: product.initialUnitPrice?.toFixed(2),
        unitPriceAfterDiscounts: product.unitPriceAfterDiscounts?.toFixed(2),
        subtotal: product.subtotal?.toFixed(3) || 0,
        total: product.total?.toFixed(2) || 0,
        discount: product.discount || {
            value: 0,
            startDate: '',
            endDate: '',
        },
        productEntity: product.productEntity,
        liked: false,
        selected: false,
    }));
};

const addToFavsAll = (liked: boolean) => {
    cartItems.value.forEach((item: any) => {
        if (item.selected) {
            item.liked = liked;
        }
    });
};

const orderItems = computed(() => {
    return cartItems.value.map((item: any) => {
        const { selected, liked, ...rest } = item;
        return rest;
    });
});

const getCustomerCredit = async () => {
    if (!userId) {
        return;
    }
    const response = await $api.controlPanel.fetchCustomerCredit(userId);

    if (response.status !== 'success') {
        setTimeout(() => {
            loading.value = false;
        }, 100);
        return;
    } else {
        setTimeout(() => {
            loading.value = false;
        }, 100);
    }

    creditObject.value = response.data;
};

await getCustomerCredit();

const accountCredit = ref({
    limit: creditObject.value?.limit,
    spent: creditObject.value?.spent,
    available: creditObject.value?.available,
    dueDate: creditObject.value?.dueDate,
    tillDue: creditObject.value?.tillDue,
    term: creditObject.value?.term,
});
const shipping = () => {
    if (user.value) {
        const address =
            (user.value?.personalDetails?.shippingAddress as ShippingAddressInterface[]).find((address) => address.default) ||
            user.value?.personalDetails?.shippingAddress[0];
        address.alias = address.alias || 'Address';
        return address;
    }
};
const billing = () => {
    if (user.value) {
        const address = user.value?.personalDetails?.shippingAddress[0];
        address.alias = address.alias || 'Address';
        return address;
    }
};

const order = ref({
    total: 0,
    subtotal: 1000,
    products: orderItems.value,
    discount: {
        value: 0.25,
    },
    shippingDetails: {
        address: shipping(),
        billingAddress: billing(),
    },
    paymentDetails: {
        type: null,
    },
    type: '',
    backorderOption: 0,
    deliveryMethod: 0,
});

const calculateSubtotal = () => {
    let subtotal = 0;
    orderItems.value.forEach((item) => {
        subtotal += item.discountPrice * item.stock;
    });
    order.value.subtotal = subtotal;
};

Emitter.on('order-type', async (type: number) => {
    orderType.value = type;
});

Emitter.on('payment-type', async (object: { type: number, selected: boolean }) => {
  paymentType.value.type = object.type
  paymentType.value.selected = object.selected
})

Emitter.on('note', async (noteText: string) => {
  note.value = noteText;
})

Emitter.on('checkout', async () => {
    if (user.value.role === AccountRole.Client) {
        OrderRequestObject.value.cartId = cartId.value;
        OrderRequestObject.value.currency = 'usd';
        OrderRequestObject.value.type = orderType.value;
        OrderRequestObject.value.shippingDetails = {
            firstName: user.value.personalDetails.firstName,
            lastName: user.value.personalDetails.lastName,
            phone: user.value.personalDetails.phone,
            city: user.value.personalDetails.address.city,
            country: user.value.personalDetails.address.country,
            address: shipping(),
            billingAddress: billing(),
        };
        OrderRequestObject.value.note = {} as OrderNotesInterface
        OrderRequestObject.value.paymentDetails = {
            type: paymentType.value.type
        }
        OrderRequestObject.value.note = {
            sender: user.value.firebaseId,
            message: note.value
        }
    }
    if (paymentType.value.selected) {
        console.log(OrderRequestObject.value)
    }
});

await fetchList();

calculateSubtotal();
</script>