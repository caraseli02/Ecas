<template>
  <div class="pt-[30px] lg:pt-10">
    <div class="grid grid-cols-1">
      <div class="container">
        <div class="flex items-end justify-between mb-[15px]">
          <h1 class="text-xl font-semibold">Order Summary</h1>
          <div class="flex items-center">
            <button class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue mr-[15px]">
              <TriangleIcon class="w-[22px] h-[22px]"/>
              <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Report an error </span>
            </button>
            <button class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue">
              <PrintIcon class="w-[22px] h-[22px]"/>
              <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Print this page </span>
            </button>
          </div>
        </div>
        <div class="gap-6 lg:grid lg:grid-cols-[1fr,320px] lg:gap-5 lg:items-start lg:mb-10 xl:grid-cols-[1fr,392px]">
          <div class="flex flex-col gap-9 max-w-[976px]">
            <OrderSummaryBackOrderWarning v-if="showWarning()"/>
            <OrderSummaryTable
                :items="cartItems"
                :loading="loading"
                @checkAll="checkAll"
                @addToFavs="addToFavsAll"
                @update-subtotal="calculateSubtotal"
                @deleteSelected="deleteSelected"
            />
            <div class="hidden lg:flex flex-col">
              <OrderSummarySimilarProducts/>
              <OrderSummaryBannerImageCard class="hidden xl:flex"/>
            </div>
          </div>
          <div class="lg:grid lg:grid-cols-1">
            <OrderType :items="cartItems" :account-credit="accountCredit" :order="order"/>
            <OrderSummaryNoteSection/>
            <OrderSummary :order="order"/>
            <OrderSummaryCheckoutButtons/>
            <OrderSummaryBannerCard/>
            <!-- <OrderSummaryEcxlusiveOffer class="max-lg:hidden" /> -->
            <div class="flex flex-col">
              <div class="flex lg:hidden">
                <OrderSummarySimilarProducts/>
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
import {AccountRole, CartProductsInterface, OrderRequestInterface} from '~/types';
import {CustomerCreditInterface} from '~/types/auth/account-settings';
import {useAuthStore} from '~/store/authStore';
import {ShippingAddressInterface} from '~/types/auth/user-details';
import Emitter from 'tiny-emitter/instance.js';

const store = useAuthStore();
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


const {$api} = useNuxtApp();
useHead({
  title: 'Order Summary',
});
const cartItems = ref([] as CartProductsInterface[]);
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

const deleteSelected = async (deletedItems: boolean) => {
  const itemsToDelete = cartItems.value.filter((product: any) => product.selected).map((object) => object.id);
  cartItems.value = cartItems.value.filter((product: any) => !product.selected);
  const payload = {
    products: itemsToDelete,
  };
  const removed = await $api.cart.removeEntityFromCart(payload);
  if (removed.status === 'success') {
    const {data} = await $api.cart.fetchCartList();
    Emitter.emit('update-cart', data);
  }
};

watch(
    [cartItems],
    ([_items]) => {
      calculateSubtotal(_items);
      calculateDiscount(_items);
    },
    {deep: true}
);

const mapCartItems = (cart: CartProductsInterface[]) => {
  cartItems.value = cart.map((product: CartProductsInterface) => ({
    id: product.id,
    stock: product.stock,
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

const orderItems = computed((): CartProductsInterface[] => {
  return cartItems.value.map((item: any) => {
    const {selected, liked, ...rest} = item;
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
  if (user.value) {
    const address =
        (user.value?.personalDetails?.shippingAddress as ShippingAddressInterface[]).find((address) => address.default) ||
        user.value?.personalDetails?.shippingAddress[0];
    address.alias = address.alias || 'Address';
    return address;
  }
};

const getBilling = () => {
  if (user.value) {
    const address = user.value?.personalDetails?.shippingAddress[0];
    address.alias = address.alias || 'Address';
    return address;
  }
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
  paymentDetails: {
    type: null,
  },
  type: '',
  backorderOption: 0,
  deliveryMethod: 0,
});

const calculateSubtotal = (orderItems: CartProductsInterface[]) => {
  if (!orderItems) {
    return;
  }

  let subtotal = 0;

  orderItems.forEach((item: CartProductsInterface) => {
    subtotal += Number(item.unitPriceAfterDiscounts) * item.stock;
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

Emitter.on('payment-type', async (object: {
  type: number;
  selected: boolean
}) => {
  paymentType.value.type = object.type;
  paymentType.value.selected = object.selected;
});

Emitter.on('note', async (noteText: string) => {
  note.value = noteText;
});

Emitter.on('delete-product-item', async (object: {
  id: string
}) => {
  cartItems.value = cartItems.value.filter((product) => product.id !== object.id);
  mapCartItems(cartItems.value);
});

Emitter.on('checkout', async () => {
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
      },
      paymentDetails: {
        type: paymentType.value.type,
      },
    };
    if (note.value !== '') {
      orderRequestObject.value.note = {
        sender: user.value.firebaseId,
        message: note.value
      }
    }
  }
  if (paymentType.value.selected) {
    console.log(orderRequestObject.value);
    const response = await $api.orders.sendOrder(orderRequestObject.value)
    if (response.status === 'success') {
      if (paymentType.value.type === 0) {
        const paymentLink = response.data
        window.open(
            paymentLink,
            '_blank' // <- This is what makes it open in a new window.
        );
      }
      const {data} = await $api.cart.fetchCartList();
      console.log(data);
      Emitter.emit('update-cart', data);
    }
  }
});


await fetchList();

calculateSubtotal(cartItems.value);
calculateDiscount(cartItems.value);
</script>