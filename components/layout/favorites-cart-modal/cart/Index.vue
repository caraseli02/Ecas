<template>
  <div class="flex flex-col flex-1 max-w-full h-full">
    <div class="py-4 px-4 flex-1 h-full overflow-y-auto overscroll-contain scrollbar-thin max-h-vh md:py-6">
      <div class="grid grid-cols-1 gap-4">
        <LayoutFavoritesCartModalFavoritesProductItem
          v-for="(item) in items"
          :key="item.id"
          :product="item"
          in-cart
          @delete-product="deleteProduct"
        />
      </div>
    </div>
    <div
      class="px-4 pt-4 pb-6 md:p-6"
      :style="{
        boxShadow: '0px 0px 8px 0px rgba(133, 133, 133, 0.25)',
      }"
    >
      <div class="flex items-center justify-between leading-[1.25] font-semibold mb-4 md:text-xl md:leading-[1.2] md:mb-6">
        <div>Subtotal</div>
        <div class="text-right">
          {{ cartSubtotal.toFixed(2) }} Lei
        </div>
      </div>
      <NuxtLink
        class="flex items-center justify-center gap-2 bg-blue-500 text-white rounded-lg px-[15px] py-2 leading-[1.75] font-medium w-full"
        :to="'/order-summary'"
        @click="$emit('close')"
      >
        <CartIcon class="w-6 h-6" />
        <span> Go to Checkout </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import CartIcon from '@/assets/icons/cart.svg';
import type { CartProductsInterface } from '~/model/cart/response/cart.interface';
import { useAuthStore } from '~/store/authStore';
import { useCartStore } from '~/store/cartStore';

const authStore = useAuthStore();
const cartStore = useCartStore();
const { _getCartSubtotal, cartSubtotal, cart } = storeToRefs(cartStore);
const { _getUserDetails } = storeToRefs(authStore);

const items = ref<CartProductsInterface[]>([] as CartProductsInterface[]);
// const cart = ref<CartProductsInterface[]>([] as CartProductsInterface[]);

defineEmits(['close']);

// watch(
//     [items],
//     ([_items]) => {
//         // calculateTotalCartPrice(_items);
//         items.value = getCartSubtotal.value;
//     },
//     { deep: true }
// );

// const calculateTotalCartPrice = (items: CartProductsInterface[]) => {
//     totalCartPrice.value = 0;
//
//     items.forEach((cartProduct: CartProductsInterface) => {
//         if (!cartProduct.productEntity) {
//             return;
//         }
//
//         const discountsHelper = parseProductPriceConfiguration(
//             cartProduct.productEntity,
//             getUserDetails.value,
//             (cartProduct as unknown as FavoriteItem).quantity
//         );
//         const discountPrice = discountsHelper?.currentConfigurationDiscountPrice || 0;
//
//         totalCartPrice.value += Number(discountPrice) * Number((cartProduct as unknown as FavoriteItem).quantity);
//     });
// };

// const fetchList = async () => {
//     cart.value = props.data.products;
//     mapCartItems(cart.value);
// };

watch(
  cart,
  () => {
    items.value = cart.value;
    mapCartItems();
  },
  { deep: true },
);

const deleteProduct = (object: { id: string }) => {
  items.value = items.value.filter(product => product.id !== object.id);
  mapCartItems();
};

const mapCartItems = () => {
  items.value = (cart.value?.products || []).map((item: CartProductsInterface) => ({
    id: item.id,
    type: item.isFolder ? 'folder' : 'product',
    quantity: Number(item.stock) + Number(item.backorder_stock || 0),
    title: item.productEntity?.name,
    description: item.productEntity?.description,
    image: item.productEntity?.details?.ProductImage?.ProductImageSmall,
    productEntity: item.productEntity,
  }));
};

onMounted(async () => {
  items.value = cart.value;
  mapCartItems(cart.value);
});
</script>
