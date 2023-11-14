<template>
    <div
        class="absolute z-50 -bottom-2.5 translate-y-full left-0 w-full bg-white border border-[#F2F2F2] rounded-lg py-2 pl-2 pr-0.5 shadow-m md:rounded-xl md:-bottom-0.5"
        :style="{
            boxShadow: '0px 4px 12px rgba(51, 51, 51, 0.1)',
        }"
    >
        <div v-if="isLoading">
            <p class="p-2 rounded text-gray-300 transition-colors duration-300">Loading...</p>
        </div>
        <div v-else class="grid grid-cols-1 max-h-[340px] overflow-auto scrollbar-thin pr-1.5">
            <NuxtLink
                v-for="(product, index) in props?.products"
                v-if="props?.products?.length > 0"
                :key="index"
                :to="`/product/${product._id}`"
                class="p-2 rounded-lg text-gray-300 transition-colors duration-300 hover:bg-[#F2F2F2]"
            >
                <div
                    class="flex items-center justify-between gap-1 text-xs leading-[1.67] font-medium text-dark mb-1 lg:text-sm lg:leading-[1.43]"
                >
                    <div class="flex items-center w-[calc(100%-50px)] hover:text-blue">
                        <div class="truncate">{{ productTitle(product) }}</div>
                        <CaretIcon class="w-4 h-4 flex-shrink-0" />
                        <div class="font-Inter">{{ product.alias }}</div>
                    </div>
                    <div
                        class="rounded-3xl bg-blue px-1 text-xs leading-[1.33] font-semibold text-white flex-shrink-0 lg:translate-y-2.5"
                        :class="[product.adminSettings.featured === true ? 'invisible' : '']"
                    >
                        New
                    </div>
                </div>
                <div class="text-xs leading-[1.33] truncate text-gray-300 lg:w-[calc(100%-50px)] hover:text-blue">
                    {{ product.description }}
                </div>
            </NuxtLink>
            <div v-else>
                <p class="p-2 rounded text-gray-300 transition-colors duration-300 hover:bg-gray-200 hover:text-blue">No data found</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CaretIcon from '@/assets/icons/caret-right.svg';
import { ProductSearchItems } from '~~/model/products/response/ProductSearchResponse';

const props = defineProps<{
    products: ProductSearchItems[];
    isLoading: boolean;
}>();

const productTitle = (product: ProductSearchItems) => {
    const titleArray = product.details.SummaryData.TaxonomyPath.split('>');
    return titleArray[titleArray.length - 1];
};
</script>
