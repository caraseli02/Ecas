<template>
  <div>
    <ProductBlocks :fetched-products="productList" class="mb-7 lg:mb-[38px] xl:mb-[58px]">
      <template #header>
        <section class="flex justify-between items-center">
          <div class="text-xl">Browsing History</div>
        </section>
      </template>
      <!-- <template #banner>
        test banner
    </template> -->
    </ProductBlocks>
    <ProductBlocks :fetched-products="productList" class="mb-7 lg:mb-[38px] xl:mb-[58px]">
      <template #header>
        <section class="flex justify-between items-center">
          <div class="text-xl">Browsing History</div>
          <NuxtLink class="text-blue-500" to="#">
            View All
            <SvgoArrowRight />
          </NuxtLink>
        </section>
      </template>
      <!-- <template #banner>
        test banner
    </template> -->
    </ProductBlocks>
    <ProductBlocks class="mb-7 lg:mb-[38px] xl:mb-[58px]" :filters="['Best Sellers', 'Top Searched']" />
    <ProductBlocks :rowsNumber="2" class="mb-7 lg:mb-[38px] xl:mb-[58px]" :filters="['Best Sellers', 'Top Searched']" />
    <ProductBlocks masonry-view :rowsNumber="2" class="mb-7 lg:mb-[38px] xl:mb-[58px]" :filters="['Best Sellers', 'Top Searched']" />
  </div>
</template>

<script setup lang="ts">
import BlackFridayItem from '@/assets/media/home/black-friday-item.png';
import type { ProductInterface } from '~/model/products/response/ProductResponse';
const { $api } = useNuxtApp();

const productList = ref<ProductInterface[]>([]);

const filters = ['Featured', 'Best Sellers', 'Hot Deals', 'Top Searched'];

async function getProductTab() {
  const { data } = await $api.product.fetchProductTab('top-searched');

  if (data) {
    productList.value = data as unknown as ProductInterface[];
    // productList.value = data?.map((item) => ({
    //     slug: item._id,
    //     title: item.alias,
    //     category: 'Not supported',
    //     price: new Intl.NumberFormat('en-US', {
    //         minimumFractionDigits: 3,
    //     }).format(item.priceEur),
    //     cover: item.details.ProductImage.ProductImageLarge,
    //     stock: item.stock,
    // }));
  }
}

onMounted(() => {
  getProductTab();
});

</script>
