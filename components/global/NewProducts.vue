<template>
    <section ref="elDOM" class="mb-7 lg:mb-[38px] xl:mb-[58px]">
        <div class="container">
            <div class="flex items-start justify-between border-b border-gray-200 mb-4 md:mb-[26px] xl:mb-9">
                <h2 class="hidden text-xl font-semibold md:block">
                    {{ title || 'New Products' }}
                </h2>
                <div class="relative flex items-center gap-2.5 md:gap-5">
                    <button
                        v-for="(filter, index) in filters"
                        :key="index"
                        :data-tab="textUtil.slugify(filter)"
                        class="relative text-sm font-medium pb-[13px] transition-colors duration-300 hover:text-blue-500 md:text-base md:pb-4"
                        :class="[activeFilter === textUtil.slugify(filter) ? 'text-blue-500' : 'text-slate-500 after:opacity-0']"
                        @click="setActiveFilter(filter)"
                    >
                        {{ filter }}
                    </button>
                    <div
                        class="absolute bottom-0 h-[5px] bg-blue-500 rounded-t-[5px] transition-all duration-300"
                        :style="{
                            left: filterLineLeftPosition + 'px',
                            width: filterLineWidth + 'px',
                        }"
                    />
                </div>
            </div>
            <Swiper
                v-if="products?.length > 0 ?? 0"
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
                :breakpoints="{
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 3,
                        grid: {
                            rows: rowCount,
                        },
                    },
                    1024: {
                        slidesPerView: 4,
                        grid: {
                            rows: rowCount,
                        },
                    },
                    1280: {
                        slidesPerView: 5,
                        grid: {
                            rows: rowCount,
                        },
                    },
                }"
                class="homeProducts--swiper"
            >
                <SwiperSlide v-for="(product, index) in products" :key="index">
                    <ProductCard :product="product" />
                </SwiperSlide>
            </Swiper>

            <div v-else class="px-1 md:pt-1 md:pr-0">
                <div
                    class="flex items-center content-center justify-center bg-white rounded-md flex-row pl-[15px] pr-5 pt-7 pb-[34px] mb-3 md:w-full md:px-[15px] md:py-12 md:h-[calc(100%-30px)] lg:px-[21px] lg:pt-[30px] xl:w-full xl:px-2 xl:pt-[15px]"
                >
                    <h3>No items to show from this section</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { A11y, Pagination, Grid } from 'swiper';
import { ProductCard as ProductCardType } from '~~/types';
const { $api } = useNuxtApp();

defineProps({
    title: {
        type: String,
        required: false,
    },
    rowCount: {
        type: Number,
        required: false,
        default: 1,
    },
});

const elDOM = ref<HTMLElement | null>(null);

const productsMD = computed(() => {
    const chunkedArray = [];
    for (let i = 0; i < products.value?.length!; i += 3) {
        chunkedArray.push(products.value?.slice(i, i + 3));
    }
    return chunkedArray;
});

const filters = ['Featured', 'Best Sellers', 'Hot Deals', 'Top Searched'];
const activeFilter = ref('featured');
const filterLineLeftPosition = ref(0);
const filterLineWidth = ref(0);

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

const products = ref<ProductCardType[]>();

onMounted(async () => {
    setFilterLine();

    await fetchNewProducts();
});

const fetchNewProducts = async () => {
    const fetch = await $api.product.fetchNewProducts();

    products.value = [];
    fetch.data.value?.data.slice(0, 20)?.map((item) => {
        products.value?.push({
            slug: item._id,
            title: item.alias,
            category: 'Not Supported',
            price: new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 3,
            }).format(item.priceEur),
            discount: 0,
            cover: item.details.ProductImage.ProductImageLarge,
            stock: item.stock,
        });
    });
};
</script>

<style lang="scss">
.homeProducts--swiper {
    @apply px-[5px] pt-[5px] pb-[30px] #{!important};
}

.homeProducts--swiper .swiper-slide {
    @apply h-auto #{!important};
}

.homeProducts--swiper .swiper-pagination {
    @apply bottom-0 space-x-1.5 md:space-x-2 #{!important};
}

.homeProducts--swiper .swiper-pagination-bullet {
    @apply w-1.5 h-1.5 bg-[#D9D9D9] rounded-full opacity-100 m-0 transition-all duration-300 md:w-2 md:h-2 #{!important};
    margin-right: 0 !important;
}

.homeProducts--swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
    @apply w-[25px] bg-gray-500 #{!important};
}
</style>
