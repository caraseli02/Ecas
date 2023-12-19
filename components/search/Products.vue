<template v-if="products">
    <section class="mb-10 md:mb-[60px]">
        <div v-if="totalItems" class="container">
            <div class="font-semibold font-Inter mb-[15px] md:hidden">Products Found ({{ totalItems }})</div>
            <div
                class="grid grid-cols-1 gap-5 bg-gray-100 p-2.5 pr-[42px] rounded-md mb-5 md:grid-cols-[auto,auto] md:justify-start md:gap-x-[30px] md:gap-y-[18px] md:px-[15px] md:mb-[30px] lg:flex lg:items-center"
            >
                <label class="flex items-center">
                    <span class="text-sm flex-shrink-0 mr-2.5">Show</span>
                    <div class="relative min-w-[215px]">
                        <button
                            class="flex items-center justify-between w-full border bg-white rounded px-2.5 py-[3px] transition-colors duration-300"
                            :class="[showShowOptions ? 'border-blue-500' : 'border-border']"
                            @click="showShowOptions = !showShowOptions"
                        >
                            <div class="flex items-center">
                                <span class="text-sm mr-2.5">{{ show }}</span>
                                <div
                                    class="flex items-center justify-center w-[18px] h-[18px] rounded border bg-blue-500 border-blue-500 transition-colors duration-300 mr-[13px]"
                                >
                                    <CheckIcon class="w-4 text-white" />
                                </div>
                            </div>
                            <ChevronDownIcon
                                class="w-6 h-6 text-slate-500 transition-transform duration-300"
                                :class="[showShowOptions ? 'rotate-180' : '']"
                            />
                        </button>
                        <transition name="fade-full">
                            <div
                                v-if="showShowOptions"
                                v-click-outside="() => (showShowOptions = false)"
                                class="absolute z-10 -bottom-1 left-0 translate-y-full w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card py-1.5"
                            >
                                <label
                                    v-for="option in showOptions"
                                    :key="option"
                                    class="group flex w-full items-center justify-between cursor-pointer px-[9px] py-1.5 transition-colors duration-300 hover:bg-[#F2F2F2]"
                                >
                                    <input
                                        v-model="show"
                                        name="show"
                                        :value="option"
                                        type="radio"
                                        class="sr-only"
                                        @change="showShowOptions = false"
                                    />
                                    <span class="flex w-full text-left text-sm rounded-[5px]">
                                        {{ option }}
                                    </span>
                                    <div
                                        class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                                        :class="[
                                            option === show
                                                ? 'bg-blue-500 border-blue-500 group-hover:bg-white'
                                                : 'bg-white  border-border group-hover:border-gray-300',
                                        ]"
                                    >
                                        <CheckIcon
                                            v-if="option === show"
                                            class="w-4 text-white transition-colors duration-300 group-hover:text-blue-500"
                                        />
                                    </div>
                                </label>
                            </div>
                        </transition>
                    </div>
                </label>
                <label class="flex items-center lg:mr-auto">
                    <span class="text-sm flex-shrink-0 mr-2.5">Sort by</span>
                    <div class="relative min-w-[215px] mr-2.5">
                        <button
                            class="flex items-center justify-between w-full border bg-white rounded px-2.5 py-[3px] transition-colors duration-300"
                            :class="[showSortByOptions ? 'border-blue-500' : 'border-border']"
                            @click="showSortByOptions = !showSortByOptions"
                        >
                            <span class="text-sm text-left mr-2.5">{{ sortBy.label }}</span>
                            <ChevronDownIcon
                                class="w-6 h-6 text-slate-500 transition-transform duration-300"
                                :class="[showSortByOptions ? 'rotate-180' : '']"
                            />
                        </button>
                        <transition name="fade-full">
                            <div
                                v-if="showSortByOptions"
                                v-click-outside="() => (showSortByOptions = false)"
                                class="absolute z-10 -bottom-1 left-0 translate-y-full w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card px-2.5 py-[15px]"
                            >
                                <button
                                    v-for="option in sortByOptions.filter((e) => e !== sortBy)"
                                    :key="option.name"
                                    class="flex w-full text-left text-sm rounded-[5px] transition-colors duration-300 hover:text-blue-500"
                                    @click="
                                        sortBy = option;
                                        emits('sort-by-change', option);
                                    "
                                >
                                    {{ option.label }}
                                </button>
                            </div>
                        </transition>
                    </div>
                    <button
                        class="flex"
                        @click="
                            order === 0 ? (order = 1) : (order = 0);
                            emits('sort-order-change', order);
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6">
                            <path
                                fill="#5E6278"
                                d="M6.21 11h11.58c1.076 0 1.614-1.396.855-2.208L12.857 2.38a1.165 1.165 0 0 0-.854-.38c-.309 0-.617.127-.851.38L5.355 8.792C4.596 9.604 5.134 11 6.21 11Z"
                                class="transition-all duration-300"
                                :opacity="order === 'asc' ? '1' : '0.4'"
                            />
                            <path
                                fill="#5E6278"
                                d="M17.79 13H6.21c-1.076 0-1.614 1.396-.855 2.209l5.798 6.412c.23.252.502.379.848.379.309 0 .618-.127.854-.38l5.79-6.413c.76-.81.221-2.207-.855-2.207Z"
                                class="transition-all duration-300"
                                :opacity="order === 'asc' ? '0.4' : '1'"
                            />
                        </svg>
                    </button>
                </label>
                <label class="flex items-center">
                    <span class="text-sm flex-shrink-0 mr-2.5">Products on page</span>
                    <div class="relative">
                        <button
                            class="flex items-center justify-between w-full border bg-white rounded px-2.5 py-[3px] transition-colors duration-300"
                            :class="[showPerPageOptions ? 'border-blue-500' : 'border-border']"
                            @click="showPerPageOptions = !showPerPageOptions"
                        >
                            <span class="text-sm mr-2">{{ perPage }}</span>
                            <ChevronDownIcon
                                class="w-6 h-6 text-slate-500 transition-transform duration-300"
                                :class="[showPerPageOptions ? 'rotate-180' : '']"
                            />
                        </button>
                        <transition name="fade-full">
                            <div
                                v-if="showPerPageOptions"
                                v-click-outside="() => (showPerPageOptions = false)"
                                class="absolute z-10 -bottom-1 left-0 translate-y-full w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card p-2.5"
                            >
                                <button
                                    v-for="option in [5, 10, 20, 50, 100].filter((e) => e !== perPage)"
                                    :key="option"
                                    class="flex w-full text-left text-sm rounded-[5px] text-slate-500 transition-colors duration-300 hover:text-blue-500"
                                    @click="
                                        perPage = option;
                                        showPerPageOptions = false;
                                        emits('per-page', option);
                                    "
                                >
                                    {{ option }}
                                </button>
                            </div>
                        </transition>
                    </div>
                </label>
            </div>
            <div class="flex items-center justify-center mb-10 md:justify-between xl:mb-[30px]">
                <div class="hidden font-Inter font-semibold md:block">Products Found ({{ totalItems }})</div>
                <div class="flex items-center">
                    <Transition name="fade">
                        <button
                            v-if="atPage !== 1"
                            class="flex transition-colors duration-300 text-slate-500 hover:text-blue-500"
                            @click="atPage--"
                        >
                            <ChevronRightIcon class="w-1.5 h-3 rotate-180 mr-4" />
                        </button>
                    </Transition>
                    <Pagination
                        v-model="atPage"
                        :page-count="totalPages"
                        :page-range="3"
                        :hide-prev-next="true"
                        page-link-class="searchProducts--pagination-item"
                        prev-link-class="searchProducts--pagination-item_prev cursor-pointer text-mainPurple font-medium px-2"
                        next-link-class="searchProducts--pagination-item_next cursor-pointer text-mainPurple font-medium px-2"
                        active-class="searchProducts--pagination-item-active"
                        class="flex items-center justify-center"
                    >
                        <template #breakViewContent>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 4" class="w-3 h-2 translate-y-1">
                                <path
                                    fill="#5E6278"
                                    d="M1.943 3.11c-.302 0-.56-.107-.776-.319a1.03 1.03 0 0 1-.318-.775 1.019 1.019 0 0 1 .318-.766c.215-.212.474-.318.776-.318.291 0 .545.106.76.318a1.045 1.045 0 0 1 .174 1.317c-.1.166-.232.299-.398.398a1.035 1.035 0 0 1-.536.144Zm4.06 0c-.301 0-.56-.107-.775-.319a1.03 1.03 0 0 1-.319-.775 1.019 1.019 0 0 1 .319-.766c.215-.212.474-.318.775-.318.292 0 .545.106.76.318a1.045 1.045 0 0 1 .175 1.317c-.1.166-.232.299-.398.398a1.035 1.035 0 0 1-.537.144Zm4.06 0c-.301 0-.56-.107-.775-.319a1.03 1.03 0 0 1-.318-.775 1.019 1.019 0 0 1 .318-.766c.216-.212.474-.318.776-.318.291 0 .545.106.76.318a1.045 1.045 0 0 1 .174 1.317c-.1.166-.232.299-.397.398a1.035 1.035 0 0 1-.537.144Z"
                                />
                            </svg>
                        </template>
                    </Pagination>
                    <Transition name="fade">
                        <button
                            v-if="totalPages !== atPage"
                            class="flex transition-colors duration-300 text-slate-500 hover:text-blue-500"
                            @click="atPage++"
                        >
                            <ChevronRightIcon class="w-1.5 h-3 ml-4" />
                        </button>
                    </Transition>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-10 mb-[25px] md:mb-10 lg:gap-[30px] xl:gap-[15px] xl:mb-[30px]">
                <SearchItem v-for="item in paginatedProductsList" :key="item._id" :item="item" />
            </div>
            <div class="flex flex-col items-center gap-[25px] md:flex-row md:justify-between">
                <label class="flex items-center">
                    <span class="text-sm flex-shrink-0 mr-2.5">Products on page</span>
                    <div class="relative">
                        <button
                            class="flex items-center justify-between w-full border bg-white rounded px-2.5 py-[3px] transition-colors duration-300"
                            :class="[showPerPageOptions ? 'border-blue-500' : 'border-border']"
                            @click="showPerPageOptions = !showPerPageOptions"
                        >
                            <span class="text-sm mr-2">{{ perPage }}</span>
                            <ChevronDownIcon
                                class="w-6 h-6 text-slate-500 transition-transform duration-300"
                                :class="[showPerPageOptions ? 'rotate-180' : '']"
                            />
                        </button>
                        <transition name="fade-full">
                            <div
                                v-if="showPerPageOptions"
                                v-click-outside="() => (showPerPageOptions = false)"
                                class="absolute z-10 -bottom-1 left-0 translate-y-full w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card p-2.5"
                            >
                                <button
                                    v-for="option in [5, 10, 20, 50, 100].filter((e) => e !== perPage)"
                                    :key="option"
                                    class="flex w-full text-left text-sm rounded-[5px] text-slate-500 transition-colors duration-300 hover:text-blue-500"
                                    @click="
                                        perPage = option;
                                        showPerPageOptions = false;
                                        emits('per-page', option);
                                    "
                                >
                                    {{ option }}
                                </button>
                            </div>
                        </transition>
                    </div>
                </label>
                <div class="flex items-center">
                    <Transition name="fade">
                        <button
                            v-if="atPage !== 1"
                            class="flex transition-colors duration-300 text-slate-500 hover:text-blue-500"
                            @click="atPage--"
                        >
                            <ChevronRightIcon class="w-1.5 h-3 rotate-180 mr-4" />
                        </button>
                    </Transition>
                    <Pagination
                        v-model="atPage"
                        :page-count="totalPages"
                        :page-range="3"
                        :hide-prev-next="true"
                        page-link-class="searchProducts--pagination-item"
                        prev-link-class="searchProducts--pagination-item_prev cursor-pointer text-mainPurple font-medium px-2"
                        next-link-class="searchProducts--pagination-item_next cursor-pointer text-mainPurple font-medium px-2"
                        active-class="searchProducts--pagination-item-active"
                        class="flex items-center justify-center"
                    >
                        <template #breakViewContent>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 4" class="w-3 h-2 translate-y-1">
                                <path
                                    fill="#5E6278"
                                    d="M1.943 3.11c-.302 0-.56-.107-.776-.319a1.03 1.03 0 0 1-.318-.775 1.019 1.019 0 0 1 .318-.766c.215-.212.474-.318.776-.318.291 0 .545.106.76.318a1.045 1.045 0 0 1 .174 1.317c-.1.166-.232.299-.398.398a1.035 1.035 0 0 1-.536.144Zm4.06 0c-.301 0-.56-.107-.775-.319a1.03 1.03 0 0 1-.319-.775 1.019 1.019 0 0 1 .319-.766c.215-.212.474-.318.775-.318.292 0 .545.106.76.318a1.045 1.045 0 0 1 .175 1.317c-.1.166-.232.299-.398.398a1.035 1.035 0 0 1-.537.144Zm4.06 0c-.301 0-.56-.107-.775-.319a1.03 1.03 0 0 1-.318-.775 1.019 1.019 0 0 1 .318-.766c.216-.212.474-.318.776-.318.291 0 .545.106.76.318a1.045 1.045 0 0 1 .174 1.317c-.1.166-.232.299-.397.398a1.035 1.035 0 0 1-.537.144Z"
                                />
                            </svg>
                        </template>
                    </Pagination>
                    <Transition name="fade">
                        <button
                            v-if="totalPages !== atPage"
                            class="flex transition-colors duration-300 text-slate-500 hover:text-blue-500"
                            @click="atPage++"
                        >
                            <ChevronRightIcon class="w-1.5 h-3 ml-4" />
                        </button>
                    </Transition>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="text-center font-Inter mb-[15px]">No products found</div>
        </div>
    </section>
</template>

<script setup lang="ts">
import CheckIcon from '@/assets/icons/check.svg';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import Pagination from 'vuejs-paginate-next';
import { SearchData } from '~/model/products/response/ProductSearchResponse';

const props = defineProps<{
    products: SearchData | null;
    keyword: string | '';
}>();

const emits = defineEmits(['at-page', 'per-page', 'sort-by-change', 'sort-order-change']);

watch(
    () => props.products,
    () => {
        setProductsList();
    },
    { deep: true }
);

const show = ref('New products only');
const showShowOptions = ref(false);
const showOptions = ref(['New products only', 'Available in stock', 'Sales only', 'All products']);
const showPerPageOptions = ref(false);
const sortBy = ref({ label: 'Product Code', name: 'manufacturerCode' });
const showSortByOptions = ref(false);

const sortByOptions = ref([
    { label: 'Product Code', name: 'manufacturerCode' },
    { label: 'Manufacturer', name: 'manufacturer' },
    { label: 'Manufacturer Code', name: 'manufacturerCode' },
    { label: 'Description', name: 'description' },
    { label: 'Category', name: 'taxonomy' },
    { label: 'Stock', name: 'stock' },
    { label: 'Price', name: 'priceRon' },
]);

const atPage = ref(1);
const perPage = ref(10);
const totalItems = ref(props.products?.items.total_items);
const totalPages = ref(props.products?.items.page_count);
const paginatedProductsList = ref(props.products?.items.items);
const order = ref<1 | 0>(1);

const setProductsList = () => {
    const paginatedProductsData = props.products;
    const paginatedProducts = paginatedProductsData?.items.items;

    if (!paginatedProducts) {
        return;
    }

    totalItems.value = paginatedProductsData?.items.total_items;
    totalPages.value = paginatedProductsData?.items.page_count;

    if (paginatedProducts) {
        paginatedProductsList.value = paginatedProducts.map((item) => ({
            slug: item._id,
            title: item.alias,
            cover: item.details.ProductImage.ProductImageSmall,
            manufacturer: item.manufacturer,
            manufacturerCode: item.manufacturerCode,
            stock: item.stock,
            description: item.description,
        }));
    }
};

setProductsList();

watch(
    [atPage],
    async ([_atPage]) => {
        emits('at-page', _atPage);
    },
    { deep: true }
);
</script>

<style lang="scss">
.searchProducts--pagination-item {
    @apply cursor-pointer flex items-center justify-center w-8 h-8 mx-1 text-sm font-Inter font-semibold rounded-md bg-gray-100 text-slate-500 transition-colors duration-300 hover:bg-blue-500 hover:text-white focus-visible:bg-blue-500 focus-visible:text-white #{!important};
}

.searchProducts--pagination-item-active .searchProducts--pagination-item {
    @apply bg-blue-500 text-white #{!important};
}

.searchProducts--pagination-item_prev,
.searchProducts--pagination-item_next {
    @apply hidden #{!important};
}
</style>
