<template>
    <section>
        <div class="container px-2 md:px-3 xl:pl-6 overflow-hidden">

            <ProductTabs :filters="filters" @new-products="productList = $event"/>
            <div class="md:flex flex-col xl:grid xl:grid-cols-[auto,1fr]">
                <slot name="banner" />
                <div v-if="productList.length === 0" class="px-1 md:pt-3 md:pr-0">
                    <div
                        class="flex items-center content-center justify-center bg-white rounded-md flex-row pl-[15px] pr-5 pt-7 pb-[34px] mb-3 md:w-full md:px-[15px] md:py-12 md:h-[calc(100%-30px)] lg:px-[21px] lg:pt-[30px] xl:w-full xl:px-2 xl:pt-[15px]">
                        <h3>No items to show from this tab</h3>
                    </div>
                </div>
                <ProductGrid :products-list="productList" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ProductInterface } from '~/model/products/response/ProductResponse';
const { $api } = useNuxtApp();

defineProps<{
    filters: string[]
}>()

const productList = ref<ProductInterface[]>([]);

async function getProductTab() {
    const { data } = await $api.product.fetchProductTab('featured');

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
