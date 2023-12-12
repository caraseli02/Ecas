<template>
  <div class="flex flex-col flex-1 max-w-full h-full">
    <div class="py-4 px-4 flex-1 h-full overflow-y-auto overscroll-contain scrollbar-thin max-h-vh md:py-6">
      <div class="grid grid-cols-1 gap-4">
        <LayoutFavoritesCartModalFavoritesProductItem
            v-for="(item, index) in items" :key="index" :product="item"
            in-cart/>
      </div>
    </div>
    <div
        class="px-4 pt-4 pb-6 md:p-6"
        :style="{
                boxShadow: '0px 0px 8px 0px rgba(133, 133, 133, 0.25)',
            }"
    >
      <div
          class="flex items-center justify-between leading-[1.25] font-semibold mb-4 md:text-xl md:leading-[1.2] md:mb-6">
        <div>Total</div>
        <div class="text-right">$ 457.92</div>
      </div>
      <button
          class="flex items-center justify-center gap-2 bg-blue text-white rounded-lg px-[15px] py-2 leading-[1.75] font-medium w-full"
      >
        <CartIcon class="w-6 h-6"/>
        <span> Go to Checkout </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartIcon from '@/assets/icons/cart.svg';
import {useNuxtApp} from '#app';
import {CartInterface, CartProductsInterface} from '~/model/cart/response/cart.interface';
import Emitter from 'tiny-emitter/instance.js';

const {$api} = useNuxtApp();

const items = ref<CartInterface>({} as CartInterface);
const cart = ref<CartProductsInterface[]>([] as CartProductsInterface[])

const fetchList = async () => {
  const {data} = await $api.cart.fetchCartList();
  const cartData = data as CartInterface;
  cart.value = cartData.products
  await mapCartItems(cart.value)
};

Emitter.on('delete-product-item', async (object: { id: string }) => {
  cart.value = cart.value.filter(product => product.id !== object.id);
  await mapCartItems(cart.value)
})


const mapCartItems = async (cart: CartProductsInterface[]) => {
  items.value = cart.map((item: CartProductsInterface) => ({
    id: item.id,
    type: item.isFolder ? 'folder' : 'product',
    quantity: Number(item.stock),
    title: item.productEntity?.alias,
    description: item.productEntity?.description,
    image: item.productEntity?.details.ProductImage.ProductImageSmall,
  }));
}


await fetchList();
</script>
