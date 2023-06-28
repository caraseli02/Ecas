<template>
    <div>
        <SearchBreadcrumbs />
        <SearchFilters :filters="filters" />
        <SearchProducts :products="products" />
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

async function getProduct(keyword: string) {
    const { data } = await fetchSearchProduct(keyword);

    products.value = data.value?.data as SearchData;
    filters.value = data.value?.data.filters as ProductFilters;
}

getProduct(keyword.value);

watch(route, (value) => {
    const newKeyword = value.query.keyword as string;
    getProduct(newKeyword);
});
</script>