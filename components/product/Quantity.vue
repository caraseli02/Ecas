<template>
  <div class="relative bg-white rounded-md px-2.5 pt-2 pb-5 shadow-m md:px-[15px] lg:pt-[15px] lg:self-start">
    <div class="absolute top-0 left-0 px-2.5 py-2 flex items-center rounded-tl-md rounded-br-md bg-green">
      <CheckIcon class="w-4 h-4 mr-1 text-white"/>
      <span class="text-[11px] font-Inter leading-tight font-semibold text-white"> {{
          props.product.stock
        }} in stock </span>
    </div>
    <div class="flex justify-end text-xs mb-[18px] lg:hidden">
      For larger quantities ask
      <NuxtLink
          to="/"
          class="relative text-blue font-medium ml-1 after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-blue after:origin-right after:scale-x-0 after:rounded-full after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
      >
        here.
      </NuxtLink>
    </div>
    <div class="lg:grid lg:grid-cols-2">
      <div class="lg:order-2">
        <div class="flex items-center justify-between gap-3 text-xs leading-tight text-gray-300 pl-[5px] mb-[5px]">
          <div class="flex-shrink-0">Quantity</div>
          <div>Price ( Ex VAT )</div>
        </div>
        <div class="font-Inter mb-4 lg:mb-[9px]">
          <div
              v-for="(quantity, index) in bulkQuantities"
              :key="index"
              class="flex items-center justify-between gap-3 px-2.5 py-1 text-[13px] leading-tight bg-[#F2F2F2] rounded"
          >
            <div>{{ quantity[0] }}+</div>
            <div>${{ quantity[1].toFixed(3) }}</div>
          </div>
        </div>
        <div class="hidden justify-end text-gray-300 text-xs mb-[9px] lg:flex">
          For larger quantities ask
          <NuxtLink
              to="/"
              class="relative text-blue font-medium ml-1 after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-blue after:origin-right after:scale-x-0 after:rounded-full after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
          >
            here.
          </NuxtLink>
        </div>
      </div>
      <div class="lg:order-1 lg:pt-[29px]">
        <div
            class="flex items-center justify-between bg-[#F2F2F2] rounded px-[13px] py-1 text-xs leading-snug mb-[22px] lg:flex-col lg:items-start lg:justify-start lg:bg-transparent lg:gap-[5px] lg:p-0"
        >
          <div class="flex items-center">
            <span class="text-gray-300 mr-[5px]">Price for:</span>
            <span class="lg:text-gray-300">Each</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-300 mr-[5px]">Multiple:</span>
            <span class="font-Inter lg:text-gray-300">1</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-300 mr-[5px]">Minimum Order:</span>
            <span class="font-Inter lg:text-gray-300">1</span>
          </div>
        </div>
        <div class="flex items-center justify-between font-Inter mb-[22px] lg:justify-start lg:items-end">
          <div class="lg:mr-[15px]">
            <div class="text-sm leading-tight line-through">$ {{ (props.product.priceEur * 100).toFixed(3) }} (100+)
            </div>
            <div class="text-lg leading-tight text-red">
              <strong>$ {{ ((props.product.priceEur * 100 * 20) / 100).toFixed(3) }}</strong> (100+)
            </div>
          </div>
          <div class="bg-red rounded-[25px] px-2.5 py-1 font-Inter text-sm leading-tight font-semibold text-white">20%
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-2.5">
      <QuantityButtons v-model="quantity" size="lg" :object="{action : 'add', id: product._id} as ProductActionObject"/>
      <button
          :disabled="quantity===0"
          class="flex items-center flex-1 justify-center bg-blue rounded text-white px-5 py-[9px]"
          @click="addToCart(props.product)">
        <CartIcon class="w-6 h-6 mr-2"/>
        <span class="text-sm font-medium">Add to cart</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckIcon from '@/assets/icons/check-circle.svg';
import CartIcon from '@/assets/icons/cart.svg';
import {ProductDetail} from '~~/model/products/response/ProductDetailResponse';
import {AddToCartRequestInterface} from '~/model/cart/request/cart.interface';
import {useNuxtApp} from '#app';
import {ProductActionObject} from '~/model/cart/response/cart.interface';
import Emitter from 'tiny-emitter/instance.js';

const {$api} = useNuxtApp();

const props = defineProps<{
  product: ProductDetail;
}>();
const quantity = ref(1);
const bulkQuantities = new Map<number, number>();

for (let i = 1; i < 26; i += 5) {
  bulkQuantities.set(i, props.product.priceRon * i);
}

const addToCart = async (product: ProductDetail) => {
  const payload: AddToCartRequestInterface = {
    userId: '',
    products: [{id: product._id, stock: quantity.value, isFolder: false}],
  };
  const object = await $api.cart.addEntityToCart(payload);
  if (object.status === 'success') {
    const {data} = await $api.cart.fetchCartList();
    Emitter.emit('cart-and-notifications', data)
  }
};
</script>
