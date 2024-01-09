<template>
    <section class="mb-7 lg:mb-[38px] xl:mb-[58px]">
        <div class="container px-2 md:px-3 xl:pl-6 overflow-hidden">
            <ProductTabs :filters="filters" @new-products="productList = $event"/>
            <div class="md:flex flex-col xl:grid xl:grid-cols-[auto,1fr]">
                <div class="md:pt-3 md:pr-0 h-[calc(100%-30px)] mx-2 md:mx-3 xl:mx-0 xl:mr-3 xl:min-w-[330px] xl:min-h-[592px]">
                    <div class="flex h-full gap-4 md:gap-[40px] bg-white rounded-xl shadow-xs p-6 md:m-0 xl:flex-col xl:w-[330px]">
                        <img
                            :src="BlackFridayItem"
                            alt="Black Friday Product"
                            class="h-[100px] w-[120px] md:h-auto md:w-[290px] md:max-h-[240px] xl:w-full"
                        />
                        <div class="flex-1 flex gap-4 flex-col justify-center xl:justify-start xl:items-start">
                            <div class="font-semibold text-sm xl:text-xl">Exclusive Black Friday</div>
                            <p class="text-xs text-slate-500 md:text-[13px] xl:text-base">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin accumsan nisi a porttitor.
                            </p>
                            <button
                                class="flex w-fit bg-blue-500 text-[13px] font-medium px-3 py-1.5 rounded-lg text-white md:text-sm md:px-6 md:py-[11px] xl:mx-auto xl:mt-6"
                            >
                                View More
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="productList.length === 0" class="px-1 md:pt-3 md:pr-0">
                    <div
                        class="flex items-center content-center justify-center bg-white rounded-md flex-row pl-[15px] pr-5 pt-7 pb-[34px] mb-3 md:w-full md:px-[15px] md:py-12 md:h-[calc(100%-30px)] lg:px-[21px] lg:pt-[30px] xl:w-full xl:px-2 xl:pt-[15px]"
                    >
                        <h3>No items to show from this tab</h3>
                    </div>
                </div>
                <ProductGrid 
                    masonry-view
                    has-banner
                    card-class="xl:first:max-w-full" 
                    :products-list="productList" 
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import BlackFridayItem from '@/assets/media/home/black-friday-item.png';
import type { ProductInterface } from '~/model/products/response/ProductResponse';
const { $api } = useNuxtApp();

const productList = ref<ProductInterface[]>([]);

const filters = ['Featured', 'Best Sellers', 'Hot Deals', 'Top Searched'];

async function getProductTab() {
    const { data } = await $api.product.fetchProductTab('featured');

    if (data) {
        productList.value = data as unknown as ProductInterface[];
    }
}

onMounted(() => {
    getProductTab();
});

</script>
