<template>
  <NuxtLink
    :to="`/product/${product.slug}`"
    class="flex flex-col relative font-Inter bg-white rounded-md shadow-card overflow-hidden h-full px-2.5 pt-[34px] pb-2 md:px-[15px] md:pt-10 md:pb-3 xl:pt-[34px]"
  >
    <div
      class="absolute top-0 left-0 px-2.5 py-1 flex items-center rounded-tl-md rounded-br-md"
      :class="[product.stock ? 'bg-green' : 'bg-orange']"
    >
      <CheckIcon v-if="product.stock" class="w-4 h-4 mr-1 text-white" />
      <InfoIcon v-else class="w-4 h-4 mr-1 text-white" />
      <span class="text-[11px] leading-tight font-semibold text-white">
        {{ product.stock ? `${product.stock} in stock` : "On request" }}
      </span>
    </div>
    <img
      :src="product.cover"
      :alt="product.title"
      class="w-[84px] h-[84px] object-contain mx-auto mb-2.5 md:w-[110px] md:h-[110px] md:mb-[15px] xl:w-[120px] xl:h-[120px]"
    />
    <div class="flex items-center mb-[5px]">
      <h3 class="text-[13px] font-semibold mr-1 md:text-base">
        {{ product.title }}
      </h3>
      <button class="flex">
        <InfoIcon
          class="w-[14px] h-[14px] text-white md:w-4 md:h-4 xl:w-[18px] xl:h-[18px]"
        />
      </button>
    </div>
    <div
      class="text-xs leading-tight font-semibold text-gray-300 mb-[9px] md:mb-[5px]"
    >
      {{ product.category }}
    </div>
    <div class="hidden text-xs text-gray-300 truncate mb-4 md:block">
      PHY 1-CH 1.1V/1.8V/2.5V/3.3V 48 5W 1.1V/1.8V/2.5V/3.3V 48 5W
    </div>
    <div class="mt-auto">
      <div
        v-if="product.discount"
        class="text-[11px] leading-tight line-through mb-px md:text-xs"
      >
        $ 1879,75 (5+)
      </div>
      <div
        class="text-[13px] leading-tight md:text-base"
        :class="[product.discount ? 'text-red' : '']"
      >
        <strong>$ {{ product.price }}</strong> (25+)
      </div>
    </div>
    <div class="absolute top-3 right-0 flex flex-col gap-2.5 md:top-[15px]">
      <div class="pr-3 flex flex-col gap-2.5 md:pr-[15px]">
        <button
          class="flex justify-end text-gray-100 transition-colors duration-300 hover:text-blue"
        >
          <HeartIcon class="w-6 h-6" />
        </button>
        <button
          class="flex justify-end text-gray-100 transition-colors duration-300 hover:text-blue"
        >
          <ShareIcon class="w-6 h-6" />
        </button>
        <button
          class="hidden justify-end text-gray-100 transition-colors duration-300 hover:text-blue md:flex"
        >
          <D3Icon class="w-6 h-6" />
        </button>
      </div>
      <div
        v-if="product.discount"
        class="bg-red rounded-l-[25px] p-[5px] text-[11px] font-semibold text-white md:px-2.5 md:text-sm xl:translate-y-12"
      >
        {{ product.discount }}%
      </div>
    </div>
    <div
      v-if="product.stock"
      class="absolute bottom-0 right-0 bg-blue px-[13px] py-1 rounded-br-md rounded-tl-md md:px-[18px] md:py-[9px]"
      @click.prevent="$router.push('/order-summary')"
    >
      <CartIcon class="w-6 h-6 text-white" />
    </div>
    <button
      v-else
      class="absolute bottom-0 right-0 bg-blue px-[13px] py-1 rounded-br-md rounded-tl-md md:px-[18px] md:py-[9px]"
    >
      <ArrowsIcon class="w-6 h-6" />
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { ProductCard } from "~~/types";
import InfoIcon from "@/assets/icons/info-circle.svg";
import CartIcon from "@/assets/icons/cart.svg";
import ArrowsIcon from "@/assets/icons/double-arrows.svg";
import CheckIcon from "@/assets/icons/check-circle.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import ShareIcon from "@/assets/icons/share.svg";
import D3Icon from "@/assets/icons/3d.svg";

defineProps({
  product: {
    type: Object as PropType<ProductCard>,
    required: true,
  },
});
</script>
