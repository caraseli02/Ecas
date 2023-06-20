<template>
  <div class="pt-5 md:pt-0">
    <ProductBreadcrumbs :product="product"  />
    <div class="container mb-[30px] lg:mb-10">
      <div class="hidden items-center justify-end gap-5 mb-2.5 md:flex">
        <button
          class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue"
        >
          <QuestionIcon class="w-[22px] h-[22px] mr-[5px]" />
          <span class="text-xs leading-tight">Ask about the product</span>
        </button>
        <button
          class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue"
        >
          <TriangleIcon class="w-[22px] h-[22px] mr-[5px]" />
          <span class="text-xs leading-tight">Report an error</span>
        </button>
        <button
          class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue"
        >
          <PrintIcon class="w-[22px] h-[22px] mr-[5px]" />
          <span class="text-xs leading-tight">Print this page</span>
        </button>
      </div>
      <div
        class="grid grid-cols-1 gap-[30px] mb-[30px] md:grid-cols-2 md:gap-5 lg:grid-rows-[repeat(2,auto)] lg:items-start lg:mb-10 xl:grid-cols-[814px,1fr]"
      >
        <ProductGallery class="md:row-start-1 lg:row-span-2" :images="images" />
        <ProductDetails
          class="md:col-span-2 lg:col-span-1 lg:row-span-1 lg:row-start-1 lg:col-start-2"
          :product="product"
        />
        <ProductQuantity class="md:row-start-1 lg:row-span-1 lg:col-start-2" :product="product" />
      </div>
      <ProductTable :features="product.details.ParametricData.Features" />
    </div>
    <ProductBanners />
    <NewProducts />
    <Banner class="hidden lg:flex xl:hidden" />
    <div class="container mb-[30px] lg:mb-10 xl:mb-[60px]">
      <div
        class="grid grid-cols-1 gap-[15px] md:grid-cols-[40%,calc(60%-20px)] md:gap-5 xl:grid-cols-[41%,calc(59%-20px)]"
      >
        <QuickBuy />
        <EcxlusiveOffer />
      </div>
    </div>
    <NewProducts />
    <News />
    <Manufacturers />
  </div>
</template>

<script setup lang="ts">
import QuestionIcon from "@/assets/icons/question.svg";
import TriangleIcon from "@/assets/icons/triangle.svg";
import PrintIcon from "@/assets/icons/print.svg";
import { ProductDetail, ProductDetailResponse } from "~~/model/products/response/ProductDetailResponse";
import { ProductImage } from "~~/model/response/products/ProductResponse";

useHead({
  title: "Product",
});


const route = useRoute()

const { data } = await useFetchAPI<ProductDetailResponse>(`products/${route.params.slug}`)
const product: ProductDetail = data.value?.data as ProductDetail

const images: ProductImage[] = Array(3).fill(product.details.ProductImage);
</script>
