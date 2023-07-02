<template>
    <div>
        <SearchBreadcrumbs />
        <SearchFilters v-if="filters" :filters="filters" :keyword="keyword" :at-page="atPage" :per-page="perPage" />
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
import { fetchSearchProduct } from '~/services/product.service';
import Emitter from 'tiny-emitter/instance.js';
import { SortInterface } from '~/model/dashboard/table/filters';

useHead({
    title: 'Search',
});

const route = useRoute();
const router = useRouter();

if (!route.query.keyword) {
    router.push('/');
}

const keyword = ref<string>(route.query.keyword as string);

const products = ref<SearchData | null>(null);
const filters = ref<ProductFilters | null>(null);
const atPage = ref(1);
const perPage = ref(10);
const sortBy = ref({ label: 'Product Code', name: 'manufacturerCode' });
const activeSort = ref({} as SortInterface);
const order = ref<1 | 0>(1);

async function getProduct(keyword: string, atPage: number, perPage: number, sort = {}, filter = []) {
    const { data } = await fetchSearchProduct(keyword, atPage, perPage, sort, filter);

    products.value = data.value?.data as SearchData;
    filters.value = data.value?.data.filters as ProductFilters;
}

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

Emitter.on('register-filter-option', async (filter: ProductFilters[]) => {
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

getProduct(keyword.value, 1, 10, {}, []);

Emitter.on('product-keyword-change', async (value: { keyword: string; products: SearchData }) => {
    keyword.value = value.keyword;

    await getProduct(value.keyword, atPage.value, perPage.value, {});
});
</script>