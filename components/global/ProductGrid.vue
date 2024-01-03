<template>
  <Swiper 
    :modules="[A11y, Pagination]" 
    :slides-per-view="1" 
    :space-between="15" 
    :grab-cursor="true" 
    :pagination="{
      bulletElement: 'button',
      clickable: true,
    }" 
     class="homeFeaturedProducts--swiper w-[100%] block"
  >
  <SwiperSlide v-for="(item, index) in productsList" :key="index">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 mt-6 xl:mt-3">
        <template v-if="Array.isArray(item)">
          <ProductCard
            v-for="(product, productIndex) in item"
            :key="productIndex"
            :product="product"
            class="md:first:col-span-2 xl:first:max-w-full" 
          />
        </template>
        <template v-else>
          <ProductCard :product="item" />
        </template>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { A11y, Pagination } from 'swiper';
import type { ProductCard as ProductCardType } from '~~/types';

defineProps<{
  productsList: ProductCardType[][] | ProductCardType[]
}>()
</script>

<style scoped>
</style>
