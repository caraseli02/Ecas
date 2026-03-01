<template>
  <ProductBlocks
    :rows-number="2"
    :fetched-products="productList"
    class="mb-7 lg:mb-[38px] xl:mb-[58px]"
  >
    <template #header>
      <section class="flex justify-between items-center">
        <div class="text-xl font-medium ml-2">
          <slot> New Products </slot>
        </div>
      </section>
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
