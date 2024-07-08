<template>
    <div class="pt-[30px] lg:pt-10">
        <div class="grid grid-cols-1">
            <div class="container px-4">
                <div class="flex items-end justify-between mb-[15px] px-2">
                    <h1 class="text-xl font-semibold">Order Summary</h1>
                    <div class="flex items-center">
                        <button class="flex items-center text-gray-500 transition-colors duration-300 hover:text-blue-500 mr-[15px]">
                            <TriangleIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Report an error </span>
                        </button>
                        <button class="flex items-center text-gray-500 transition-colors duration-300 hover:text-blue-500">
                            <PrintIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Print this page </span>
                        </button>
                    </div>
                </div>
                <div class="gap-6 xl:grid xl:grid-cols-[1fr,392px]">
                    <div class="flex flex-col gap-9 max-w-[992px]">
                        <OrderSummaryBackOrderWarning v-if="showWarning()" />
                        <OrderSummaryTable
                            :items="cartItems"
                            :loading="loading"
                            @check-all="checkAll"
                            @add-to-favs="addToFavsAll"
                            @update-subtotal="calculateSubtotal"
                            @delete-selected="deleteSelected"
                        />
                        <div class="hidden lg:flex flex-col">
                            <OrderSummarySimilarProducts :loading="loading" />
                            <OrderSummaryBannerImageCard class="hidden xl:flex" />
                        </div>
                    </div>
                    <div class="flex flex-col justify-start">
                        <OrderStockType
                            :items="cartItems"
                            :account-credit="accountCredit"
                            :order="order"
                            :general-settings="generalSettings"
                            :cards="cards"
                            :card="card"
                            :is-new-card-selected="isNewCardSelected"
                            @update-payment-details="order.paymentDetails = $event"
                        />
                        <OrderSummaryNoteSection />
                        <OrderSummary :order="order" :general-settings="generalSettings" />
                        <OrderSummaryCheckoutButtons />
                        <OrderSummaryBannerCard />
                        <OrderSummaryEcxlusiveOffer class="max-lg:hidden" />
                        <div class="flex flex-col">
                            <div class="flex lg:hidden">
                                <OrderSummarySimilarProducts :loading="loading" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TriangleIcon from '@/assets/icons/triangle.svg';
import PrintIcon from '@/assets/icons/print.svg';
import { AccountRole, OrderRequestInterface, PaymentDetails, PaymentTypeEnum, StripeCardInfoInterface } from '~/types';
import { CartInterface, CartProductsInterface } from '~/model/cart/response/cart.interface';
import { CustomerCreditInterface } from '~/types/auth/account-settings';
import { useAuthStore } from '~/store/authStore';
import { ShippingAddressInterface } from '~/types/auth/user-interface';
import Emitter from 'tiny-emitter/instance.js';
import OrderStockType from '~/components/order-summary/OrderStockType.vue';
import { useCartStore } from '~/store/cartStore';
import {
    BackorderShippingTypesInterface,
    DeliveryTypesInterface,
    GeneralSettingsInterface,
    SmallOrderChargeInterface,
    StockorderShippingTypesInterface,
} from '~/types/general-settings/general-settings';
import { storeToRefs } from 'pinia';
import { PlaceOrderInterface } from '~/model/order/response/PlaceOrder';
import _ from 'lodash';
import { usePaymentStore } from '~/store/paymentStore';
import { useCheckoutStore } from '~/store/checkout';

const router = useRouter();

const store = useAuthStore();
const cartStore = useCartStore();

const user = computed(() => store.getUserDetails);
const orderRequestObject = ref<OrderRequestInterface>({} as OrderRequestInterface);
const userId = user.value?.firebaseId;
const creditObject = ref({} as CustomerCreditInterface);
const orderType = ref(0);
const note = ref('');
const paymentType = ref({
    type: 0 as number,
    selected: false,
});

const { $api } = useNuxtApp();
useHead({
    title: 'Order Summary',
});
const cartItems = ref([] as CartProductsInterface[]);
const cartId = ref('' as string);

const fetchList = async () => {
    const cart = (await cartStore.updateAndReturnCart()) as CartInterface;
    const products = cart.products;
    cartId.value = cart._id || '';
    mapCartItems(products);
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

const deleteSelected = async (deletedItems: string) => {
    const itemsToDelete = cartItems.value.filter((product: any) => product.selected)?.map((object) => object.id);
    cartItems.value = cartItems.value.filter((product: any) => !product.selected);

    const payload = {
        products: itemsToDelete,
    };

    const removed = await $api.cart.removeEntityFromCart(payload);

    if (removed.status === 'success') {
        await cartStore.updateAndReturnCart();
    }
};

watch(
    [cartItems],
    ([_items]) => {
        calculateSubtotal(_items);
        calculateDiscount(_items);
    },
    { deep: true }
);
const generalSettings = ref<GeneralSettingsInterface | null>({} as GeneralSettingsInterface);
const authStore = useAuthStore();
const { getGeneralSettings } = storeToRefs(authStore);

const getGeneralSettingsFunction = () => {
    generalSettings.value = getGeneralSettings.value;
};

const card = ref<any | null>({});
const cards = ref<StripeCardInfoInterface[]>([]);
const paymentStore = usePaymentStore();
const isNewCardSelected = ref<boolean>(false);

const fetchCards = async () => {
    const response = (await $api.user.userCards()) as unknown as {
        status: string;
        data: StripeCardInfoInterface[];
    };

    if (response.status === 'success') {
        if (response.data.length) {
            cards.value = response.data;
            card.value = _.cloneDeep(cards.value.find((card: any) => card.default));
        } else {
            isNewCardSelected.value = true;
        }
    }
};

await fetchCards();

getGeneralSettingsFunction();

const mapCartItems = (cart: CartProductsInterface[] = []) => {
    cartItems.value = cart?.map((product: CartProductsInterface) => ({
        id: product.id,
        stock: product.stock,
        backorder_stock: product.backorder_stock || 0,
        isFolder: false,
        initialUnitPrice: product.initialUnitPrice,
        unitPriceAfterDiscounts: product.unitPriceAfterDiscounts,
        subtotal: product.subtotal || 0,
        total: product.total || 0,
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

const shippingFee = (shippingType: number) => {
    console.log(shippingType);
};

const orderItems = computed((): CartProductsInterface[] => {
    return cartItems.value?.map((item: any) => {
        const { selected, liked, ...rest } = item;
        return rest as CartProductsInterface;
    });
});

const getCustomerCredit = async () => {
    if (!userId) {
        return;
    }
    const response = await $api.user.fetchCustomerCredit(userId);

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

const getShipping = () => {
    const fallbackAddress: ShippingAddressInterface = {
        alias: 'N/A',
        name1: 'N/A',
        name2: 'N/A',
        default: false,
        country: 'N/A',
        region: 'N/A',
        city: 'N/A',
        postcode: 'N/A',
        phone: 'N/A',
    };

    if (!user.value) {
        return fallbackAddress;
    }

    const address =
        (user.value.personalDetails?.shippingAddress as ShippingAddressInterface[])?.find((address) => address.default) ||
        (user.value?.personalDetails?.shippingAddress && user.value?.personalDetails?.shippingAddress[0]);

    if (!address) {
        return fallbackAddress;
    }

    address.alias = address.alias || 'Address';

    return address;
};

const getBilling = () => {
    const fallbackAddress: ShippingAddressInterface = {
        alias: 'N/A',
        name1: 'N/A',
        name2: 'N/A',
        default: false,
        country: 'N/A',
        region: 'N/A',
        city: 'N/A',
        postcode: 'N/A',
        phone: 'N/A',
    };

    if (!user.value) {
        return fallbackAddress;
    }
    const address =
        (user.value?.personalDetails?.shippingAddress as ShippingAddressInterface[])?.find((address) => address.default) ||
        user.value?.companyDetails?.shippingAddress[0];

    if (!address) {
        return fallbackAddress;
    }

    address.alias = address.alias || 'Address';

    return address;
};

const order = ref({
    total: 0,
    subtotal: 0,
    products: orderItems.value,
    discount: {
        value: 0,
        total: 0,
    },
    shippingDetails: {
        address: getShipping(),
        billingAddress: getBilling(),
    },
    paymentDetails: {} as PaymentDetails,
    type: '',
    backorderOption: null,
    deliveryMethod: null,
    smallOrder: null,
});

const deliveryMethod = ref<DeliveryTypesInterface | null>(null);
const backOrderOption = ref<BackorderShippingTypesInterface | null>(null);
const stockOrderOption = ref<StockorderShippingTypesInterface | null>(null);
const smallOrder = ref<SmallOrderChargeInterface | null>(null);
const paymentDetails = ref<PaymentDetails | null>(null);

watch(
    [order],
    ([_order]) => {
        deliveryMethod.value = _order.deliveryMethod;
        backOrderOption.value = _order.backorderOption;
        stockOrderOption.value = _order.stockorderOption;
        smallOrder.value = _order.smallOrder;
        paymentDetails.value = _order.paymentDetails;
    },
    { deep: true }
);

watch(
    [card],
    ([_card]) => {
        card.value = _card;
    },
    { deep: true }
);

const calculateSubtotal = (orderItems: CartProductsInterface[]) => {
    if (!orderItems) {
        return;
    }

    let subtotal = 0;

    orderItems.forEach((item: CartProductsInterface) => {
        const stockTotal = Number(item.unitPriceAfterDiscounts) * item.stock;
        const backorderTotal = Number(item.unitPriceAfterDiscounts) * (item.backorder_stock || 0);
        const allItemsTotal = stockTotal + backorderTotal;
        subtotal += allItemsTotal;
    });

    order.value.subtotal = subtotal.toFixed(2) as unknown as number;
};

const calculateDiscount = (orderItems: CartProductsInterface[]) => {
    if (!orderItems) {
        return;
    }

    let discount = 0;

    orderItems.forEach((item: CartProductsInterface) => {
        discount += Number(item.initialUnitPrice) * item.stock - Number(item.unitPriceAfterDiscounts) * item.stock;
    });
    order.value.discount.total = discount;
};

Emitter.on('order-type', async (type: number) => {
    orderType.value = type;
});

Emitter.on('payment-type', async (object: { type: number; selected: boolean }) => {
    paymentType.value.type = object.type;
    paymentType.value.selected = object.selected;
});

Emitter.on('note', async (noteText: string) => {
    note.value = noteText;
});

Emitter.on('delete-product-item', async (object: { id: string }) => {
    setTimeout(() => {
        cartItems.value = cartItems.value.filter((product) => product.id !== object.id);
        mapCartItems(cartItems.value);
    }, 1000);
});

const checkoutStore = useCheckoutStore();
const { checkout } = storeToRefs(checkoutStore);

async function makeCheckout() {
    if (!user.value || !user.value?.personalDetails || !user.value?.contactDetails || !deliveryMethod.value || !paymentDetails.value) {
        checkout.value = false; // Reset processing state on error
        return;
    }

    if (user.value.role === AccountRole.Client) {
        orderRequestObject.value = {
            isDraft: false,
            cartId: cartId.value,
            currency: 'usd',
            type: orderType.value,
            shippingDetails: {
                firstName: user.value.personalDetails.firstName,
                lastName: user.value.personalDetails.lastName,
                phone: user.value.contactDetails.phone,
                city: user.value.personalDetails.address.city,
                country: user.value.personalDetails.address.country,
                address: getShipping(),
                billingAddress: getBilling(),
                deliveryTypeId: deliveryMethod.value._id,
                backorderShippingTypeId: backOrderOption?.value?._id || undefined,
            },
            smallOrderChargeId: smallOrder.value?._id,
            paymentDetails: {
                type: paymentDetails.value.type,
            },
        };

        if (paymentDetails.value && paymentDetails.value.type === 0) {
            orderRequestObject.value.stripeCardId = paymentDetails.value.card?.id || null;
        }

        if (note.value !== '') {
            orderRequestObject.value.note = {
                sender: user.value.firebaseId,
                message: note.value,
            };
        }
    }

    if (typeof paymentDetails.value.type === 'undefined') {
        return;
    }

    try {
        const response = (await $api.orders.sendOrder(orderRequestObject.value)) as PlaceOrderInterface;

        if (response.status !== 'success') {
            await router.push({ path: '/checkout/fail' });
        } else {
            const orderId = response.data.orderId;
            if (paymentDetails.value.type === PaymentTypeEnum.Card) {
                const result = response.data.result;

                if (result) {
                    await router.push({ path: '/order-summary/' + orderId });
                    if (result.status === 'succeeded') {
                        console.log('order paid with a default card');
                        await router.push({ path: '/checkout/success' });
                    } else if (result.status === 'canceled') {
                        console.log('order canceled reason: ', result.cancellation_reason);
                        await router.push({ path: '/checkout/fail' });
                    } else if (result.status === 'requires_payment_method') {
                        console.log('order requires payment method');
                        await router.push({ path: '/checkout/session' });
                    } else {
                        console.log('order pending', result.status);
                        await router.push({ path: '/checkout/pending' });
                    }
                } else {
                    console.log('pay with a new card', response.data);
                    if (response.data.clientSecret) {
                        cartStore.setOrderClientSecret(response.data.clientSecret);
                    }
                    await router.push({ path: '/checkout/session' });
                }
            } else if (paymentDetails.value.type === PaymentTypeEnum.Credit) {
                await router.push({ path: '/order-summary/' + orderId });

                console.log('paid with credit');
                // await router.push({ path: '/checkout/success' });
            }
        }
    } catch (error) {
        console.error('Error sending order:', error);
        await router.push({ path: '/checkout/fail' });
    } finally {
        await cartStore.updateAndReturnCart();
        checkout.value = false; // Reset processing state when everything is done
    }
}

watch(
    () => checkout,
    (newVal) => {
        if (newVal) {
            makeCheckout();
        }
    },
    { deep: true }
);

await fetchList();

calculateSubtotal(cartItems.value);
calculateDiscount(cartItems.value);
</script>