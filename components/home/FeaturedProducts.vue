<template>
    <section ref="elDOM" class="mb-7 lg:mb-[38px] xl:mb-[58px]">
        <div class="container px-2 md:px-3 xl:pl-6 overflow-hidden">
            <div class="flex items-start justify-between mb-3 mx-2 md:mx-3 xl:ml-0 md:mb-[20px] xl:mb-3">
                <h2 class="hidden text-xl font-semibold md:block">
                    {{ activeFilter.charAt(0).toUpperCase() + activeFilter.substr(1).toLowerCase().replace('-', ' ') }}
                    products
                </h2>
                <div class="relative flex items-center gap-4 xl:gap-6">
                    <button
                        v-for="(filter, index) in filters"
                        :key="index"
                        :data-tab="textUtil.slugify(filter)"
                        class="relative text-sm font-medium pb-[13px] transition-colors duration-300 hover:text-blue-500 md:text-base md:pb-3"
                        :class="[activeFilter === textUtil.slugify(filter) ? 'text-blue-500' : 'text-slate-500 after:opacity-0']"
                        @click="setActiveFilter(filter)"
                    >
                        {{ filter }}
                    </button>
                    <div
                        class="absolute bottom-0 h-[4px] bg-blue-500 rounded-[100px] transition-all duration-300"
                        :style="{
                            left: filterLineLeftPosition + 'px',
                            width: filterLineWidth + 'px',
                        }"
                    />
                </div>
            </div>
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
                <Swiper
                    :modules="[A11y, Pagination]"
                    :slides-per-view="1"
                    :space-between="15"
                    :grab-cursor="true"
                    :pagination="{
                        bulletElement: 'button',
                        clickable: true,
                    }"
                    class="homeFeaturedProducts--swiper md:hidden"
                >
                    <SwiperSlide v-for="(product, index) in productList" :key="index">
                        <div class="grid grid-cols-1 gap-6 px-2 mt-6">
                            <ProductCard :product="product" />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <Swiper
                    :modules="[A11y, Pagination]"
                    :slides-per-view="1"
                    :space-between="15"
                    :grab-cursor="true"
                    :pagination="{
                        bulletElement: 'button',
                        clickable: true,
                    }"
                    class="hidden homeFeaturedProducts--swiper w-[100%] md:block lg:hidden"
                >
                    <SwiperSlide v-for="(productGroup, index) in productsMD" :key="index">
                        <div class="grid grid-cols-2 gap-6 px-3 mt-6">
                            <ProductCard
                                v-for="(product, productIndex) in productGroup"
                                :key="productIndex"
                                :product="product"
                                class="first:col-span-2"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <Swiper
                    :modules="[A11y, Pagination]"
                    :slides-per-view="1"
                    :space-between="15"
                    :grab-cursor="true"
                    :pagination="{
                        bulletElement: 'button',
                        clickable: true,
                    }"
                    class="hidden homeFeaturedProducts--swiper w-[100%] lg:block xl:hidden"
                >
                    <SwiperSlide v-for="(productGroup, index) in productsLG" :key="index">
                        <div class="grid grid-cols-3 gap-6 mx-3 mt-6">
                            <ProductCard
                                v-for="(product, productIndex) in productGroup"
                                :key="productIndex"
                                :product="product"
                                class="first:col-span-2"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <Swiper
                    :modules="[A11y, Pagination]"
                    :slides-per-view="1"
                    :space-between="15"
                    :grab-cursor="true"
                    :pagination="{
                        bulletElement: 'button',
                        clickable: true,
                    }"
                    class="hidden homeFeaturedProducts--swiper w-[100%] xl:block"
                >
                    <SwiperSlide v-for="(productGroup, index) in productsXL" :key="index">
                        <div class="grid grid-cols-3 gap-6 mx-3 mt-3">
                            <ProductCard
                                v-for="(product, productIndex) in productGroup"
                                :key="productIndex"
                                :product="product"
                                class="first:col-span-2 first:max-w-full"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import BlackFridayItem from '@/assets/media/home/black-friday-item.png';
import { A11y, Pagination } from 'swiper';
import { ProductInterface } from '~/model/products/response/ProductResponse';

const { $api } = useNuxtApp();

const elDOM = ref<HTMLElement | null>(null);

const productList = ref<ProductInterface[]>([]);

const productsMD = computed(() => {
    const chunkedArray = [];
    for (let i = 0; i < productList.value.length; i += 3) {
        chunkedArray.push(productList.value.slice(i, i + 3));
    }
    return chunkedArray;
});

const productsLG = computed(() => {
    const chunkedArray = [];
    for (let i = 0; i < productList.value.length; i += 5) {
        chunkedArray.push(productList.value.slice(i, i + 5));
    }
    return chunkedArray;
});

const productsXL = computed(() => {
    const chunkedArray = [];
    for (let i = 0; i < productList.value.length; i += 5) {
        chunkedArray.push(productList.value.slice(i, i + 5));
    }
    return chunkedArray;
});

const filters = ['Featured', 'Best Sellers', 'Hot Deals', 'Top Searched'];
const activeFilter = ref('featured');
const filterLineLeftPosition = ref(0);
const filterLineWidth = ref(0);

watch(activeFilter, async (value) => {
    const { data } = await $api.product.fetchProductTab(value);

    if (data) {
        productList.value = data as unknown as ProductInterface[];
    }
});

const setFilterLine = () => {
    if (elDOM.value) {
        const activeFilterEl = elDOM.value.querySelector(`[data-tab=${activeFilter.value}]`) as HTMLButtonElement;

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

onMounted(async () => {
    setFilterLine();
});

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

<style lang="scss">
.homeFeaturedProducts--swiper {
    @apply px-0 pt-0 pb-[30px] #{!important};
}

.homeFeaturedProducts--swiper .swiper-slide {
    @apply h-auto #{!important};
}

.homeFeaturedProducts--swiper .swiper-pagination {
    @apply bottom-0 space-x-1.5 md:space-x-2 #{!important};
}

.homeFeaturedProducts--swiper .swiper-pagination-bullet {
    @apply w-1.5 h-1.5 bg-light-500 rounded-full opacity-100 m-0 transition-all duration-300 md:w-2 md:h-2 #{!important};
    margin-right: 0 !important;
}

.homeFeaturedProducts--swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
    @apply w-[25px] bg-gray-300 #{!important};
}
</style>