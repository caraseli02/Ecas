<template>
  <NuxtLink
      :to="`/product/${product.slug}`"
      class="flex flex-col relative font-Inter bg-white rounded-xl shadow-xs overflow-hidden h-full px-2.5 pt-[34px] pb-2 md:px-[15px] md:pt-10 md:pb-3 xl:pt-[34px] min-h-[280px]"
  >
    <ProductCardStock :stock="product.stock" />
    <div class="relative">
      <img
        :src="product.cover"
        :alt="product.title"
        class="object-contain mx-auto xl:w-[120px] xl:h-[120px]"
    />
    <div
          v-if="product.discount"
          class="ring-1 ring-rose-500 rounded-full p-[5px] text-sm font-semibold text-rose-500 md:px-2.5 md:text-sm absolute top-2 left-2"
      >
        {{ product.discount ?? 20 }}%
      </div>
    </div>
    
    <section class="flex flex-col gap-1">
      <div class="flex gap-2 items-center mb-[5px]">
        <h3 class="text-[13px] font-semibold md:text-lg text-neutral-700">
          {{ product.title }}
        </h3>
        <button class="flex">
          <InfoIcon class="w-4 h-4 text-slate-500"/>
        </button>
      </div>
      <div class="flex flex-col gap-1 text-xs max-w-[220px] mb-3">
        <h4 class="text-xs leading-tight font-semibold text-slate-500">
          {{ product.category }}
        </h4>
        <p class="hidden text-xs text-slate-500 truncate md:block">PHY 1-CH 1.1V/1.8V/2.5V/3.3V 48 5W
          1.1V/1.8V/2.5V/3.3V 48 5W
        </p>
      </div>
    </section>
    <div class="mt-auto h-full">
      <div class="text-xs min-h-[16px] leading-tight line-through mb-px md:text-xs"><template v-if="product.discount">$ 1879,75 (5+)</template></div>
      <div class="flex gap-1 items-center" :class="[product.discount ? 'text-rose-500' : '']">
        <strong>$ {{ product.price }}</strong> <span class="text-xs">(25+)</span>
      </div>
    </div>
    <div class="absolute right-0 flex flex-col gap-3 md:top-[32px]">
      <div class="pr-3 flex flex-col gap-2.5 md:pr-[15px]">
        <button
            class="flex justify-end text-gray-500 transition-colors duration-300 hover:text-blue-500"
            @click="addToFavourite(product)"
        >
          <SvgoCardHeartIcon class="w-6 h-6 text-gray-500"/>
        </button>
        <button class="flex justify-end text-gray-500 transition-colors duration-300 hover:text-blue-500">
          <SvgoCardShareIcon class="w-6 h-6 text-gray-500"/>
        </button>
        <button class="justify-end text-gray-500 transition-colors duration-300 hover:text-blue-500">
          <SvgoCardD3Icon class="w-6 h-6 text-gray-500"/>
        </button>
      </div>
    </div>
    <div
        v-if="product.stock"
        class="absolute bottom-0 right-0 bg-blue-500 rounded-br-xl rounded-tl-xl px-6 py-3"
        @click.prevent="addToCart(product)"
    >
      <CartIcon class="w-6 h-6 text-white"/>
    </div>
    <button
v-else
            class="absolute bottom-0 right-0 bg-blue-500 px-[13px] py-1 rounded-br-md rounded-tl-md md:px-[18px] md:py-[9px]">
      <ArrowsIcon class="w-6 h-6"/>
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
import type {ProductCard} from '~~/types';
import InfoIcon from '@/assets/icons/info-circle.svg';
import CartIcon from '@/assets/icons/cart.svg';
import ArrowsIcon from '@/assets/icons/double-arrows.svg';
import {useNuxtApp} from '#app';
import type {FavouriteFolderRequestInterface} from '~/model/favourite-folder/request/favourite-folder.interface';
import type {AddToCartRequestInterface} from '~/model/cart/request/cart.interface';
import Emitter from 'tiny-emitter/instance.js';

const { $api } = useNuxtApp();

defineProps<{
  product: ProductCard
}>();

const addToFavourite = async (product: ProductCard) => {
  const payload: FavouriteFolderRequestInterface = {
    name: product.title,
    isFolder: false,
    products: {id: product.slug, stock: product.stock || 1},
  };
  await $api.favouriteFolder.addEntityToFavouriteList(payload);
};

const addToCart = async (product: ProductCard) => {
  const payload: AddToCartRequestInterface = {
    userId: '',
    products: [{id: product.slug, stock: 1, isFolder: false}],
  };
  const object = await $api.cart.addEntityToCart(payload);
  if (object.status === 'success') {
    const {data} = await $api.cart.fetchCartList();
    Emitter.emit('update-cart', data)
  }
};
</script>
