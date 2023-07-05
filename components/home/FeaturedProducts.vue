<template>
    <section ref="elDOM" class="mb-7 lg:mb-[38px] xl:mb-[58px]">
        <div class="container">
            <div class="flex items-start justify-between border-b border-gray-200 mb-5 px-1 md:mb-[26px] xl:mb-9">
                <h2 class="hidden text-xl font-semibold md:block">
                    {{ activeFilter.charAt(0).toUpperCase() + activeFilter.substr(1).toLowerCase().replace('-', ' ') }}
                    products
                </h2>
                <div class="relative flex items-center gap-2.5 md:gap-5">
                    <button
                        v-for="(filter, index) in filters"
                        :key="index"
                        :data-tab="textUtil.slugify(filter)"
                        class="relative text-sm font-medium pb-[13px] transition-colors duration-300 hover:text-blue md:text-base md:pb-4"
                        :class="[activeFilter === textUtil.slugify(filter) ? 'text-blue' : 'text-gray-300 after:opacity-0']"
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
            <div class="md:grid md:grid-cols-[auto,1fr] md:gap-5">
                <div class="px-1 md:pt-1 md:pr-0">
                    <div
                        class="flex items-center bg-white rounded-md shadow-m pl-[15px] pr-5 pt-7 pb-[34px] mb-3 md:w-[230px] md:px-[15px] md:py-12 md:flex-col md:h-[calc(100%-30px)] lg:px-[21px] lg:pt-[30px] xl:w-[310px] xl:px-2 xl:pt-[15px]"
                    >
                        <img
                            :src="BlackFridayItem"
                            alt="Black Friday Product"
                            class="w-[120px] mr-1.5 md:w-full md:mr-0 md:mb-[50px] lg:mb-[87px] xl:mb-2.5"
                        />
                        <div class="flex-1 flex flex-col items-center justify-center text-center xl:items-start">
                            <div class="font-semibold mb-2.5 md:mb-[30px] lg:mb-[35px] xl:text-2xl xl:px-[7px] xl:mb-2.5">
                                Exclusive Black Friday
                            </div>
                            <p
                                class="text-[11px] text-gray-300 mb-[15px] md:text-[13px] md:mb-[50px] lg:mb-[45px] xl:text-base xl:px-[7px] xl:mb-12"
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin accumsan nisi a porttitor.
                            </p>
                            <button
                                class="flex bg-blue text-[13px] font-medium px-3 py-1.5 rounded text-white md:text-sm md:px-6 md:py-[11px] xl:mx-auto"
                            >
                                View More
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="productList.length === 0" class="px-1 md:pt-1 md:pr-0">
                    <div
                        class="flex items-center content-center justify-center bg-white rounded-md flex-row pl-[15px] pr-5 pt-7 pb-[34px] mb-3 md:w-full md:px-[15px] md:py-12 md:h-[calc(100%-30px)] lg:px-[21px] lg:pt-[30px] xl:w-full xl:px-2 xl:pt-[15px]"
                    >
                        <h3>No items to show from this tab</h3>
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
                    class="homeFeaturedProducts--swiper md:hidden"
                >
                    <SwiperSlide v-for="(product, index) in productList" :key="index">
                        <ProductCard :product="product" />
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
                        <div class="grid grid-cols-2 gap-x-5 gap-y-[30px]">
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
                        <div class="grid grid-cols-3 gap-x-5 gap-y-[30px]">
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
                        <div class="grid grid-cols-4 gap-x-5 gap-y-[30px]">
                            <ProductCard
                                v-for="(product, productIndex) in productGroup"
                                :key="productIndex"
                                :product="product"
                                class="first:col-span-2"
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
import { A11y, Pagination, Grid } from 'swiper';
import { PaginatedUserRequest } from '~/model/user/request/PaginatedUserRequest';
import { ProductCard as ProductCardType } from '~~/types';
const { $api } = useNuxtApp();

const elDOM = ref<HTMLElement | null>(null);

const productList = ref<ProductCardType[]>([]);

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
    for (let i = 0; i < productList.value.length; i += 7) {
        chunkedArray.push(productList.value.slice(i, i + 7));
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
        productList.value = data?.map((item) => ({
            slug: item._id,
            title: item.alias,
            category: 'Not supported',
            price: new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 3,
            }).format(item.priceEur),
            cover: item.details.ProductImage.ProductImageLarge,
            stock: item.stock,
        }));
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

    // fetchUser()
});

async function fetchUser() {
    const payload: PaginatedUserRequest = {
        page: 1,
        perPage: 10,
    };
    const user = await $api.user.fetchPaginatedUser(payload);
}

async function getProductTab() {
    const { data } = await $api.product.fetchProductTab('featured');
    if (data) {
        productList.value = data?.map((item) => ({
            slug: item._id,
            title: item.alias,
            category: 'Not supported',
            price: new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 3,
            }).format(item.priceEur),
            cover: item.details.ProductImage.ProductImageLarge,
            stock: item.stock,
        }));
    }
}

onMounted(() => {
    getProductTab();
});
</script>

<style lang="scss">
.homeFeaturedProducts--swiper {
    @apply px-1 pt-1 pb-[30px] #{!important};
}

.homeFeaturedProducts--swiper .swiper-slide {
    @apply h-auto #{!important};
}

.homeFeaturedProducts--swiper .swiper-pagination {
    @apply bottom-0 space-x-1.5 md:space-x-2 #{!important};
}

.homeFeaturedProducts--swiper .swiper-pagination-bullet {
    @apply w-1.5 h-1.5 bg-[#D9D9D9] rounded-full opacity-100 m-0 transition-all duration-300 md:w-2 md:h-2 #{!important};
    margin-right: 0 !important;
}

.homeFeaturedProducts--swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
    @apply w-[25px] bg-gray-100 #{!important};
}
</style>
