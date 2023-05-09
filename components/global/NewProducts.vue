<template>
  <section ref="elDOM" class="mb-7 lg:mb-[38px] xl:mb-[58px]">
    <div class="container">
      <div
        class="flex items-start justify-between border-b border-gray-200 mb-4 md:mb-[26px] xl:mb-9"
      >
        <h2 class="hidden text-xl font-semibold md:block">
          {{ title || "New Products" }}
        </h2>
        <div class="relative flex items-center gap-2.5 md:gap-5">
          <button
            v-for="(filter, index) in filters"
            :key="index"
            :data-tab="textUtil.slugify(filter)"
            class="relative text-sm font-medium pb-[13px] transition-colors duration-300 hover:text-blue md:text-base md:pb-4"
            :class="[
              activeFilter === textUtil.slugify(filter)
                ? 'text-blue'
                : 'text-gray-300 after:opacity-0',
            ]"
            @click="setActiveFilter(filter)"
          >
            {{ filter }}
          </button>
          <div
            class="absolute bottom-0 h-[5px] bg-blue rounded-t-[5px] transition-all duration-300"
            :style="{
              left: filterLineLeftPosition + 'px',
              width: filterLineWidth + 'px',
            }"
          />
        </div>
      </div>
      <Swiper
        :modules="[A11y, Pagination, Grid]"
        :slides-per-view="2"
        :grid="{
          rows: 2,
          fill: 'row',
        }"
        :space-between="15"
        :grab-cursor="true"
        :pagination="{
          bulletElement: 'button',
          clickable: true,
        }"
        :breakpoints="{
          768: {
            spaceBetween: 20,
            slidesPerView: 3,
            grid: {
              rows: 1,
            },
          },
          1024: {
            slidesPerView: 4,
            grid: {
              rows: 1,
            },
          },
          1280: {
            slidesPerView: 5,
            grid: {
              rows: 1,
            },
          },
        }"
        class="homeProducts--swiper"
      >
        <SwiperSlide v-for="(product, index) in products" :key="index">
          <ProductCard :product="product" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCover1 from "@/assets/media/home/product-1.jpg";
import ProductCover2 from "@/assets/media/home/product-2.jpg";
import ProductCover3 from "@/assets/media/home/product-3.jpg";
import { A11y, Pagination, Grid } from "swiper";
import { ProductCard as ProductCardType } from "~~/types";

defineProps({
  title: {
    type: String,
    required: false,
  },
});

const elDOM = ref<HTMLElement | null>(null);

const products = ref<ProductCardType[]>([
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    discount: 20,
    cover: ProductCover1,
    stock: 731,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    cover: ProductCover2,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    discount: 20,
    cover: ProductCover3,
    stock: 87,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    discount: 20,
    cover: ProductCover1,
    stock: 731,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    cover: ProductCover2,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    discount: 20,
    cover: ProductCover3,
    stock: 87,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    discount: 20,
    cover: ProductCover1,
    stock: 731,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    cover: ProductCover2,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    discount: 20,
    cover: ProductCover3,
    stock: 87,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    discount: 20,
    cover: ProductCover1,
    stock: 731,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    cover: ProductCover2,
  },
  {
    slug: "slug",
    title: "ADGN2999BCPZ",
    category: "Analog Devices",
    price: 1679.75,
    discount: 20,
    cover: ProductCover3,
    stock: 87,
  },
]);

const filters = ["Featured", "Best Sellers", "Hot Deals", "Top Searched"];
const activeFilter = ref("featured");
const filterLineLeftPosition = ref(0);
const filterLineWidth = ref(0);

const setFilterLine = () => {
  if (elDOM.value) {
    const activeFilterEl = elDOM.value.querySelector(
      `[data-tab=${activeFilter.value}]`
    ) as HTMLButtonElement;

    if (activeFilterEl) {
      const rect = activeFilterEl.getBoundingClientRect();
      filterLineLeftPosition.value = activeFilterEl.offsetLeft;
      filterLineWidth.value = rect.width;
    }
  }
};

const setActiveFilter = (filter: string) => {
  activeFilter.value = textUtil.slugify(filter);
  setFilterLine();
};

onMounted(() => {
  setFilterLine();
});
</script>

<style>
.homeProducts--swiper {
  @apply px-1 pt-1 pb-[30px];
}

.homeProducts--swiper .swiper-slide {
  @apply h-auto;
}

.homeProducts--swiper .swiper-pagination {
  @apply bottom-0 space-x-1.5 md:space-x-2;
}

.homeProducts--swiper .swiper-pagination-bullet {
  @apply w-1.5 h-1.5 bg-[#D9D9D9] rounded-full opacity-100 m-0 transition-all duration-300 md:w-2 md:h-2;
  margin-right: 0 !important;
}

.homeProducts--swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
  @apply w-[25px] bg-gray-100;
}
</style>
