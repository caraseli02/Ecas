<template>
    <div>
        <SearchBreadcrumbs />
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
        />
        <NewProducts :row-count="2" />
        <Banner />
        <div class="container mb-[30px] lg:mb-10 xl:mb-[60px]">
            <div class="grid grid-cols-1 gap-[15px] md:grid-cols-[40%,calc(60%-20px)] md:gap-5 xl:grid-cols-[41%,calc(59%-20px)]">
                <QuickBuy />
                <EcxlusiveOffer />
            </div>
        </div>
        <News />
        <Manufacturers />
    </div>
</template>

<script setup lang="ts">
import { ProductFilters, SearchData } from '~/model/products/response/ProductSearchResponse';
import Emitter from 'tiny-emitter/instance.js';
import { SortInterface } from '~/model/dashboard/table/filters';
import _ from 'lodash-es';
import { onMounted, onUpdated, watch } from 'vue';
import { useNuxtApp } from '#app';
import { ProductParametricDataFeaturesInterface } from '~/model/products/response/ProductResponse';
const { $api } = useNuxtApp();

useHead({
    title: 'Search',
});

const route = useRoute();
const router = useRouter();

const keyword = ref<string>(route.query.keyword as string | undefined);

const products = ref<SearchData | null>(null);
const filters = ref<ProductFilters | null>(null);
const atPage = ref(1);
const perPage = ref(10);
const sortBy = ref({ label: 'Product Code', name: 'manufacturerCode' });
const order = ref<1 | 0>(1);
const resetProductsFilters = ref(false);

async function getProduct(keyword: string, atPage: number, perPage: number, sort = {}, filter = []) {
    const { data } = (await $api.product.fetchSearchProduct(keyword, atPage, perPage, sort, filter)) as SearchData;

    products.value = data;
    filters.value = data.filters;
}

await getProduct(keyword.value, 1, 10, {}, []);

const handleSortOrderChange = async () => {
    await getProduct(keyword.value, atPage.value, perPage.value, {
        sortBy: sortBy.value.name,
        sortOrder: order.value === 0 ? 'desc' : 'asc',
    });
};

const handleSortChange = async () => {
    await getProduct(keyword.value, atPage.value, perPage.value, {
        sortBy: sortBy.value.name,
        sortOrder: order.value === 0 ? 'desc' : 'asc',
    });
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
        await getProduct(keyword.value, _atPage, _perPage, {
            sortBy: sortBy.value.name,
            sortOrder: order.value === 0 ? 'desc' : 'asc',
        });
    },
    { deep: true }
);

watch(route, (value) => {
    const newKeyword = value.query.keyword as string;
    getProduct(newKeyword, 1, 10, {}, []);
});

Emitter.on('register-filter-option', async (filter: ProductParametricDataFeaturesInterface[]) => {
    await getProduct(
        keyword.value,
        1,
        perPage.value,
        {
            sortBy: sortBy.value.name,
            sortOrder: order.value === 0 ? 'desc' : 'asc',
        },
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

    await getProduct(value.keyword, atPage.value, perPage.value, {});
});

Emitter.on(
    'show-similar-products',
    async (data: { features: ProductParametricDataFeaturesInterface[]; products: SearchData; filters: ProductFilters }) => {
        // products.value = data.products;
        // filters.value = data.filters;
        await getProduct('', 1, perPage.value, {}, data.features);
    }
);
</script>
