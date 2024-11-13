<template>
    <div>
        <SearchBreadcrumbs @change-path="changePath" />
        <SearchFilters
            v-if="filters"
            :filters="filters"
            :keyword="keyword"
            :at-page="atPage"
            :per-page="perPage"
            @reset-products-filters="resetProductsFilters = $event"
        />
        <SearchProducts
            v-if="products"
            :products="products"
            :keyword="keyword"
            @at-page="atPage = $event"
            @per-page="perPage = $event"
            @sort-by-change="sortBy = $event"
            @sort-order-change="order = $event"
            @show-filter="additionalFilters = $event"
        />
        <ProductBlocks
            :rows-number="2"
            class="mb-7 lg:mb-[38px] xl:mb-[58px]"
            :filters="['Featured', 'Best Sellers', 'Hot Deals', 'Top Searched']"
        />
        <Banner />
        <div class="container mb-[30px] lg:mb-10 xl:mb-[60px]">
            <div class="grid grid-cols-1 gap-[15px] md:grid-cols-[40%,calc(60%-20px)] md:gap-5 xl:grid-cols-[41%,calc(59%-20px)]">
                <QuickBuy />
                <EcxlusiveOffer />
            </div>
        </div>
        <NewProducts :row-count="2" />
        <News />
        <Manufacturers />
    </div>
</template>

<script setup lang="ts">
import { ProductFilters, SearchData } from '~/model/products/response/ProductSearchResponse';
import Emitter from 'tiny-emitter/instance.js';
import _ from 'lodash-es';
import { watch } from 'vue';
import { useNuxtApp } from '#app';
import { ProductParametricDataFeaturesInterface } from '~/model/products/response/ProductResponse';
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/productStore';

const { $api } = useNuxtApp();

useHead({
    title: 'Search',
});

const productStore = useProductStore();
const { similarProducts, similarProductFeatures, showSimilarOnly } = storeToRefs(productStore);
const route = useRoute();
const keyword = ref<string | undefined>(route.query.keyword as string | undefined);

const products = ref<SearchData | null>(null);
const filters = ref<ProductFilters | null>(null);
const additionalFilters = ref({});
const atPage = ref(1);
const perPage = ref(10);
const sortBy = ref({ label: 'Product Code', name: 'manufacturerCode' });
const order = ref<1 | 0>(1);
const resetProductsFilters = ref(false);
const category = ref<string | null>(route.query?.category?.toString() || null);

onMounted(async () => {
    watch(
        [similarProducts, similarProductFeatures],
        async (newValues) => {
            if (newValues[0] && newValues[1]) {
                await getProduct(
                    keyword.value,
                    atPage.value,
                    perPage.value,
                    {
                        sortBy: sortBy.value.name,
                        sortOrder: order.value === 0 ? 'desc' : 'asc',
                    },
                    additionalFilters.value,
                    newValues[1]
                );
                showSimilarOnly.value = false;
            }
        },
        { deep: true }
    );

    if (!products.value && !showSimilarOnly.value) {
        await getProduct(
            keyword.value,
            atPage.value,
            perPage.value,
            {
                sortBy: sortBy.value.name,
                sortOrder: order.value === 0 ? 'desc' : 'asc',
            },
            additionalFilters.value,
            []
        );
    }
});

async function getProduct(
    keyword: string,
    atPage: number,
    perPage: number,
    sort = {},
    additionalFilters = {},
    filter: ProductParametricDataFeaturesInterface[] = [],
    ignoreCategory = false
) {
    const { data } = await $api.product.fetchSearchProduct(
        keyword,
        ignoreCategory ? null : category.value,
        atPage,
        perPage,
        sort,
        additionalFilters,
        filter
    );

    products.value = data;
    filters.value = data.filters;
}

async function changePath() {
    const { data } = await $api.product.fetchSearchProduct(
        keyword.value,
        route.query.category,
        atPage.value,
        perPage.value,
        {
            sortBy: sortBy.value.name,
            sortOrder: order.value === 0 ? 'desc' : 'asc',
        },
        additionalFilters.value
    );

    products.value = data;
    filters.value = data.filters;
}

const handleSortOrderChange = async () => {
    await getProduct(
        keyword.value,
        atPage.value,
        perPage.value,
        {
            sortBy: sortBy.value.name,
            sortOrder: order.value === 0 ? 'desc' : 'asc',
        },
        additionalFilters.value
    );
};

const handleSortChange = async () => {
    await getProduct(
        keyword.value,
        atPage.value,
        perPage.value,
        {
            sortBy: sortBy.value.name,
            sortOrder: order.value === 0 ? 'desc' : 'asc',
        },
        additionalFilters.value
    );
};

watch([sortBy], async ([_sortBy]) => {
    await handleSortChange();
});

watch([order], async ([_sortOrder]) => {
    await handleSortOrderChange();
});

watch(
    [atPage, perPage],
    async ([_atPage, _perPage]) => {
        await getProduct(
            keyword.value,
            _atPage,
            _perPage,
            {
                sortBy: sortBy.value.name,
                sortOrder: order.value === 0 ? 'desc' : 'asc',
            },
            additionalFilters.value
        );
    },
    { deep: true }
);

watch(additionalFilters, async (filter) => {
    console.log(filter);
    await getProduct(
        keyword.value,
        atPage.value,
        perPage.value,
        {
            sortBy: sortBy.value.name,
            sortOrder: order.value === 0 ? 'desc' : 'asc',
        },
        filter
    );
});

watch(route, (value) => {
    const newKeyword = value.query.keyword as string;
    getProduct(newKeyword, 1, 10, {}, additionalFilters.value);
});

Emitter.on('register-filter-option', async (filter: ProductParametricDataFeaturesInterface[]) => {
    additionalFilters.value = {};
    await getProduct(
        keyword.value,
        1,
        perPage.value,
        {
            sortBy: sortBy.value.name,
            sortOrder: order.value === 0 ? 'desc' : 'asc',
        },
        {},
        filter
    );
});

Emitter.on('reset-products-filters', async (value: boolean) => {
    if (!value) {
        return;
    }

    const obj = _.cloneDeep(filters.value);
    const keys = Object.keys(obj);

    for (const key of keys) {
        for (const filter of obj[key]) {
            filter.checked = false;
        }
    }

    filters.value = obj;

    await getProduct(keyword.value, atPage.value, perPage.value, {
        sortBy: sortBy.value.name,
        sortOrder: order.value === 0 ? 'desc' : 'asc',
    });
});

Emitter.on('product-keyword-change', async (value: { keyword: string; products: SearchData }) => {
    keyword.value = value.keyword;
    await getProduct(value.keyword, atPage.value, perPage.value, {}, additionalFilters.value, [], true);
});
</script>
