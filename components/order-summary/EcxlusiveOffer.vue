<template>
  <div
    class="relative rounded-md overflow-x-hidden aspect-[1.24] md:aspect-auto"
  >
    <Swiper
      :modules="[A11y, Pagination, Autoplay]"
      :autoplay="{
        delay: 5000,
      }"
      :slides-per-view="1"
      :space-between="15"
      :grab-cursor="true"
      :pagination="{
        bulletElement: 'button',
        clickable: true,
      }"
      class="orderSummaryExclusiveOffer--swiper w-full h-full"
    >
      <SwiperSlide v-for="(item, index) in slides" :key="index">
        <div
          class="relative z-20 px-[15px] pt-[25px] pb-[15px] text-white h-full md:pt-[15px] md:pr-10 md:pb-12 lg:pt-[160px] lg:pr-[15px] lg:pb-11 xl:px-[30px]"
        >
          <h3
            class="font-semibold mb-[5px] md:text-2xl md:mb-2.5 lg:text-lg lg:text-center"
          >
            {{ item.title }}
          </h3>
          <p
            class="text-xs mb-[26px] md:text-sm md:max-w-[420px] md:mb-[15px] lg:max-w-[434px] lg:mb-5 lg:text-center"
          >
            {{ item.description }}
          </p>
          <button
            class="flex bg-blue rounded px-3 py-1.5 text-[13px] font-medium md:px-6 md:py-2 md:text-sm lg:mb-0 lg:mx-auto"
          >
            Buy Now
          </button>
          <img
            :src="item.item"
            alt="Img"
            class="absolute bottom-7 left-1/2 -translate-x-1/2 w-[205px] object-contain md:w-[200px] md:left-[unset] md:translate-x-0 md:right-10 lg:w-[165px] lg:right-1/2 lg:translate-x-1/2 lg:top-[15px]"
          />
        </div>
        <img
          :src="item.bg"
          alt="Background"
          class="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
        <div
          class="absolute z-10 top-0 left-0 w-full h-full opacity-75 rounded-md pointer-events-none"
          :style="{
            background:
              'linear-gradient(358.21deg, #001238 -7.93%, rgba(0, 127, 255, 0.85) 92.6%)',
          }"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import SlideBg from "@/assets/media/home/exclusive-offer-bg.jpg";
import ItemImage from "@/assets/media/home/exclusive-offer-item.png";
import { A11y, Autoplay, Pagination } from "swiper";

const slides = ref([
  {
    title: "Exclusive Black Friday Offer",
    description:
      "Introducing Ersa and the i-CON TRACE soldering station. Ersa and the i-CON TRACE soldering station.",
    bg: SlideBg,
    item: ItemImage,
  },
  {
    title: "Exclusive Black Friday Offer",
    description:
      "Introducing Ersa and the i-CON TRACE soldering station. Ersa and the i-CON TRACE soldering station.",
    bg: SlideBg,
    item: ItemImage,
  },
  {
    title: "Exclusive Black Friday Offer",
    description:
      "Introducing Ersa and the i-CON TRACE soldering station. Ersa and the i-CON TRACE soldering station.",
    bg: SlideBg,
    item: ItemImage,
  },
  {
    title: "Exclusive Black Friday Offer",
    description:
      "Introducing Ersa and the i-CON TRACE soldering station. Ersa and the i-CON TRACE soldering station.",
    bg: SlideBg,
    item: ItemImage,
  },
]);
</script>

<style>
.orderSummaryExclusiveOffer--swiper .swiper-pagination {
  @apply bottom-[15px] space-x-1.5 md:space-x-2 lg:left-1/2 lg:-translate-x-1/2;
}
.orderSummaryExclusiveOffer--swiper .swiper-pagination-bullet {
  @apply w-1.5 h-1.5 bg-gray-100 rounded-full opacity-100 m-0 transition-all duration-300 md:w-2 md:h-2;
  margin-right: 0 !important;
}
.orderSummaryExclusiveOffer--swiper
  .swiper-pagination-bullet.swiper-pagination-bullet-active {
  @apply w-[25px] bg-white;
}
</style>
