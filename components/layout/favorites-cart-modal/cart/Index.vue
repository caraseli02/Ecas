<template>
  <div class="flex flex-col flex-1 max-w-full h-full">
    <div
      class="relative flex items-center pl-[25px] pt-6 pb-4 pr-5 overflow-hidden"
      :style="{
        boxShadow: '0px 0px 4px rgba(51, 51, 51, 0.25)',
      }"
    >
      <div class="text-sm font-medium text-gray-300">
        Recently added products
      </div>
    </div>
    <div
      class="pt-6 px-4 pb-10 flex-1 h-full overflow-y-auto overscroll-contain scrollbar-thin max-h-vh"
    >
      <div class="grid grid-cols-1 gap-4">
        <LayoutFavoritesCartModalFavoritesProductItem
          v-for="(item, index) in items"
          :key="index"
          :product="item"
          in-cart
        />
      </div>
    </div>
    <div class="px-[25px] py-6">
      <div class="flex items-center justify-between mb-1">
        <div class="text-lg font-semibold">
          All Items Total
          <span class="text-sm font-normal text-gray-300">(excl VAT)</span>
        </div>
        <div class="text-lg text-right font-Inter font-semibold">
          $ 27.874,69
        </div>
      </div>
      <div
        class="flex items-center justify-between text-sm leading-tight mb-0.2"
      >
        <div>Number of items</div>
        <div class="text-right font-Inter">6</div>
      </div>
      <div
        class="flex items-center justify-between text-sm leading-tight mb-0.2"
      >
        <div>Delivery</div>
        <div class="text-right font-Inter">$ 0.00</div>
      </div>
      <div
        class="flex items-center justify-between text-sm leading-tight mb-0.5"
      >
        <div class="flex items-center">
          <div class="mr-2">Handling Charge</div>
          <InfoIcon class="w-[18px] h-[18px] text-gray-300" />
        </div>
        <div class="text-right font-Inter">$ 0.00</div>
      </div>
      <div class="flex items-center justify-between text-sm mb-2">
        <div class="font-semibold">
          VAT
          <span class="font-normal text-gray-300">(19%)</span>
        </div>
        <div class="text-right font-Inter font-semibold">$ 5296,19</div>
      </div>
      <div class="flex items-center justify-between font-semibold text-xl mb-6">
        <div class="">Total</div>
        <div class="text-right font-Inter">$ 33.170,88</div>
      </div>
      <button
        class="flex items-center justify-center bg-blue text-white rounded px-[15px] py-[11px] text-sm font-medium w-full"
      >
        Go to Checkout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FavoriteItem } from "@/types";
import ProductCover from "@/assets/media/home/product-2.jpg";
import InfoIcon from "@/assets/icons/info-circle.svg";

const items = ref<FavoriteItem[]>([
  {
    id: "1",
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    quantity: 16,
    image: ProductCover,
  },
  {
    id: "2",
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    quantity: 16,
    image: ProductCover,
  },
  {
    id: "3",
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    quantity: 16,
    image: ProductCover,
  },
  {
    id: "4",
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    quantity: 16,
    image: ProductCover,
  },
  {
    id: "5",
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    quantity: 16,
    image: ProductCover,
  },
  {
    id: "6",
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    quantity: 16,
    image: ProductCover,
  },
  {
    id: "7",
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    quantity: 16,
    image: ProductCover,
  },
  {
    id: "8",
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    quantity: 16,
    image: ProductCover,
  },
  {
    id: "9",
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    quantity: 16,
    image: ProductCover,
  },
]);
</script>
