<template>
    <section class="mt-10">
        <div class="container px-2 md:px-3 xl:pl-6 overflow-hidden">
            <slot name="header" />
            <ProductTabs v-if="!fetchedProducts" :filters="filters ?? []" @new-products="productList = $event"/>
            <div class="md:flex flex-col xl:grid xl:grid-cols-[auto,1fr]">
                <slot name="banner" />
                <div v-if="productList.length === 0" class="px-1 md:pt-3 md:pr-0">
                    <div
                        class="flex items-center content-center justify-center bg-white rounded-md flex-row pl-[15px] pr-5 pt-7 pb-[34px] mb-3 md:w-full md:px-[15px] md:py-12 md:h-[calc(100%-30px)] lg:px-[21px] lg:pt-[30px] xl:w-full xl:px-2 xl:pt-[15px]">
                        <h3>No items to show from this tab</h3>
                    </div>
                </div>
                <ProductGrid 
                :masonry-view="masonryView"
                :has-banner="!!slots.banner"
                :products-list="productList" 
                :rowsNumber="rowsNumber"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ProductInterface } from '~/model/products/response/ProductResponse';

const props = defineProps<{
    filters?: string[]
    masonryView?: boolean
    fetchedProducts?: ProductInterface[]
    rowsNumber?: number
}>()

const slots = defineSlots<{
    header?: () => any
    banner?: () => any
}>()

const productList = ref<ProductInterface[]>([]);

onMounted(() => {
    if(props.fetchedProducts) {
        productList.value = props.fetchedProducts;
    }
})

watch(() => props.fetchedProducts, (newVal) => {
    if(newVal && newVal?.length > 0) {
        productList.value = props.fetchedProducts as ProductInterface[];
    }
})

</script>
