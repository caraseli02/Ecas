<template>
  <ProductBlocks class="mt-0 px-0 md:px-0 lg:px-0" :fetched-products="productList">
    <template #header>
      <h5 class="font-semibold leading-6">
        View History
      </h5>
    </template>
  </ProductBlocks>
</template>
 
<script setup lang="ts">
import type { ProductInterface } from '~/model/products/response/ProductResponse';
const { $api } = useNuxtApp();

const productList = ref<ProductInterface[]>([]);

async function getProductTab() {
  const { data } = await $api.product.fetchProductTab('best-sellers');

  if (data) {
    productList.value = data as unknown as ProductInterface[];
  }
}

onMounted(() => {
  getProductTab();
});

</script>
 