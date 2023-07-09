<template>
    <div class="relative">
        <label class="relative hidden border-2 border-blue rounded-md items-center h-[44px] overflow-hidden md:flex">
            <SearchIcon v-if="!isScrolled" class="hidden w-[18px] h-[18px] flex-shrink-0 text-gray-100 self-center ml-3 md:inline-block" />
            <form action="" class="w-full flex" @submit.prevent>
                <input
                    v-model="searchVal"
                    type="search"
                    placeholder="Search parts here"
                    autocomplete="off"
                    class="flex-1 text-sm leading-[1.14] text-gray-300 rounded-md px-2 py-2.5 h-[40px] w-full placeholder:text-gray-100 focus:outline-none"
                    @input="onInput"
                    @keypress.enter="handleEnterButton"
                    @blur="showSearchResults = false"
                />
            </form>
            <div v-if="!isScrolled" class="flex items-center justify-center bg-blue cursor-pointer px-4 py-3">
                <SearchIcon class="w-5 h-5 text-white" />
            </div>
            <div v-else class="absolute top-1/2 right-3 -translate-y-1/2">
                <SearchIcon class="w-5 h-5 text-gray-300" />
            </div>
        </label>
        <Transition name="fade">
            <LayoutHeaderSearchResults
                v-if="searchVal && showResults && showSearchResults"
                :products="productList"
                :keyword="searchVal"
                :is-loading="isLoading"
            />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/icons/search.svg';
import _ from 'lodash';
import { ProductSearchItems, ProductSearchResponse, SearchData } from '~~/model/products/response/ProductSearchResponse';
import Emitter from 'tiny-emitter/instance';
import { useNuxtApp } from '#app';
const { $api } = useNuxtApp();

defineProps({
    isScrolled: {
        type: Boolean,
        required: false,
    },
    showResults: {
        type: Boolean,
        required: false,
    },
});

const searchVal = ref('');
const isLoading = ref<boolean>(false);
const productList = ref<ProductSearchItems[]>([]);
const showSearchResults = ref(true);

const onInput = _.debounce(async () => {
    productList.value = await searchProduct(searchVal.value);
    isLoading.value = false;
}, 200);

const searchProduct = async (keyword: string, page = 1, perPage = 10): Promise<ProductSearchItems[]> => {
    isLoading.value = true;

    const { data: products } = (await $api.product.fetchSearchProduct(keyword, page, perPage)) as SearchData;

    if (!products) {
        return;
    }

    const data = products as SearchData;

    if (!data) {
        return;
    }

    Emitter.emit('product-keyword-change', { keyword: keyword, products: data });

    return data.items.items;
};

function handleEnterButton() {
    const router = useRouter();
    router.push({ path: '/search', query: { keyword: searchVal.value } });
}

watch(searchVal, (val) => {
    if (val) {
        showSearchResults.value = true;
    } else {
        showSearchResults.value = false;
    }
});
</script>
