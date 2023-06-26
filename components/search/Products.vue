<template>
    <section class="mb-10 md:mb-[60px]">
        <div class="container" v-if="searchItems.length > 0">
            <div class="font-semibold font-Inter mb-[15px] md:hidden">
                Products Found ({{ searchItems?.length }})
            </div>
            <div
                class="grid grid-cols-1 gap-5 bg-gray-200 p-2.5 pr-[42px] rounded-md mb-5 md:grid-cols-[auto,auto] md:justify-start md:gap-x-[30px] md:gap-y-[18px] md:px-[15px] md:mb-[30px] lg:flex lg:items-center"
            >
                <label class="flex items-center">
                    <span class="text-sm flex-shrink-0 mr-2.5">Show</span>
                    <div class="relative min-w-[215px]">
                        <button
                            class="flex items-center justify-between w-full border bg-white rounded px-2.5 py-[3px] transition-colors duration-300"
                            :class="[
                                showShowOptions
                                    ? 'border-blue'
                                    : 'border-border',
                            ]"
                            @click="showShowOptions = !showShowOptions"
                        >
                            <div class="flex items-center">
                                <span class="text-sm mr-2.5">{{ show }}</span>
                                <div
                                    class="flex items-center justify-center w-[18px] h-[18px] rounded border bg-blue border-blue transition-colors duration-300 mr-[13px]"
                                >
                                    <CheckIcon class="w-4 text-white" />
                                </div>
                            </div>
                            <ChevronDownIcon
                                class="w-6 h-6 text-gray-300 transition-transform duration-300"
                                :class="[showShowOptions ? 'rotate-180' : '']"
                            />
                        </button>
                        <transition name="fade">
                            <div
                                v-if="showShowOptions"
                                class="absolute z-10 -bottom-1 left-0 translate-y-full w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card py-1.5"
                                v-click-outside="
                                    () => (showShowOptions = false)
                                "
                            >
                                <label
                                    v-for="option in showOptions"
                                    :key="option"
                                    class="group flex w-full items-center justify-between cursor-pointer px-[9px] py-1.5 transition-colors duration-300 hover:bg-[#F2F2F2]"
                                >
                                    <input
                                        name="show"
                                        v-model="show"
                                        :value="option"
                                        type="radio"
                                        class="sr-only"
                                        @change="showShowOptions = false"
                                    />
                                    <span
                                        class="flex w-full text-left text-sm rounded-[5px]"
                                    >
                                        {{ option }}
                                    </span>
                                    <div
                                        class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                                        :class="[
                                            option === show
                                                ? 'bg-blue border-blue group-hover:bg-white'
                                                : 'bg-white  border-border group-hover:border-gray-300',
                                        ]"
                                    >
                                        <CheckIcon
                                            v-if="option === show"
                                            class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
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
                            :class="[
                                showSortByOptions
                                    ? 'border-blue'
                                    : 'border-border',
                            ]"
                            @click="showSortByOptions = !showSortByOptions"
                        >
                            <span class="text-sm text-left mr-2.5">{{
                                sortBy
                            }}</span>
                            <ChevronDownIcon
                                class="w-6 h-6 text-gray-300 transition-transform duration-300"
                                :class="[showSortByOptions ? 'rotate-180' : '']"
                            />
                        </button>
                        <transition name="fade">
                            <div
                                v-if="showSortByOptions"
                                class="absolute z-10 -bottom-1 left-0 translate-y-full w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card px-2.5 py-[15px]"
                                v-click-outside="
                                    () => (showSortByOptions = false)
                                "
                            >
                                <button
                                    v-for="option in sortByOptions.filter(
                                        (e) => e !== sortBy
                                    )"
                                    :key="option"
                                    class="flex w-full text-left text-sm rounded-[5px] transition-colors duration-300 hover:text-blue"
                                    @click="sortBy = option"
                                >
                                    {{ option }}
                                </button>
                            </div>
                        </transition>
                    </div>
                    <button
                        class="flex"
                        @click="
                            order === 'asc' ? (order = 'des') : (order = 'asc')
                        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="w-6 h-6"
                        >
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
                    <span class="text-sm flex-shrink-0 mr-2.5"
                        >Products on page</span
                    >
                    <div class="relative">
                        <button
                            class="flex items-center justify-between w-full border bg-white rounded px-2.5 py-[3px] transition-colors duration-300"
                            :class="[
                                showPerPageOptions
                                    ? 'border-blue'
                                    : 'border-border',
                            ]"
                            @click="showPerPageOptions = !showPerPageOptions"
                        >
                            <span class="text-sm mr-2">{{ perPage }}</span>
                            <ChevronDownIcon
                                class="w-6 h-6 text-gray-300 transition-transform duration-300"
                                :class="[
                                    showPerPageOptions ? 'rotate-180' : '',
                                ]"
                            />
                        </button>
                        <transition name="fade">
                            <div
                                v-if="showPerPageOptions"
                                class="absolute z-10 -bottom-1 left-0 translate-y-full w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card p-2.5"
                                v-click-outside="
                                    () => (showPerPageOptions = false)
                                "
                            >
                                <button
                                    v-for="option in [5, 20, 50, 100].filter(
                                        (e) => e !== perPage
                                    )"
                                    :key="option"
                                    class="flex w-full text-left text-sm rounded-[5px] text-gray-300 transition-colors duration-300 hover:text-blue"
                                    @click="
                                        perPage = option;
                                        showPerPageOptions = false;
                                    "
                                >
                                    {{ option }}
                                </button>
                            </div>
                        </transition>
                    </div>
                </label>
            </div>
            <div
                class="flex items-center justify-center mb-10 md:justify-between xl:mb-[30px]"
            >
                <div class="hidden font-Inter font-semibold md:block">
                    Products Found ({{ searchItems?.length }})
                </div>
                <div class="flex items-center">
                    <Transition name="fade">
                        <button
                            v-if="atPage !== 1"
                            @click="atPage--"
                            class="flex transition-colors duration-300 text-gray-300 hover:text-blue"
                        >
                            <ChevronRightIcon
                                class="w-1.5 h-3 rotate-180 mr-4"
                            />
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
                        <template v-slot:breakViewContent>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 12 4"
                                class="w-3 h-2 translate-y-1"
                            >
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
                            @click="atPage++"
                            class="flex transition-colors duration-300 text-gray-300 hover:text-blue"
                        >
                            <ChevronRightIcon class="w-1.5 h-3 ml-4" />
                        </button>
                    </Transition>
                </div>
            </div>
            <div
                class="grid grid-cols-1 gap-10 mb-[25px] md:mb-10 lg:gap-[30px] xl:gap-[15px] xl:mb-[30px]"
            >
                <SearchItem
                    v-for="(item, index) in filteredSearchItems"
                    :key="index"
                    :item="item"
                />
            </div>
            <div
                class="flex flex-col items-center gap-[25px] md:flex-row md:justify-between"
            >
                <label class="flex items-center">
                    <span class="text-sm flex-shrink-0 mr-2.5"
                        >Products on page</span
                    >
                    <div class="relative">
                        <button
                            class="flex items-center justify-between w-full border bg-white rounded px-2.5 py-[3px] transition-colors duration-300"
                            :class="[
                                showPerPageOptions
                                    ? 'border-blue'
                                    : 'border-border',
                            ]"
                            @click="showPerPageOptions = !showPerPageOptions"
                        >
                            <span class="text-sm mr-2">{{ perPage }}</span>
                            <ChevronDownIcon
                                class="w-6 h-6 text-gray-300 transition-transform duration-300"
                                :class="[
                                    showPerPageOptions ? 'rotate-180' : '',
                                ]"
                            />
                        </button>
                        <transition name="fade">
                            <div
                                v-if="showPerPageOptions"
                                class="absolute z-10 -bottom-1 left-0 translate-y-full w-full flex flex-col gap-[5px] bg-white rounded-md max-h-[250px] overflow-y-auto scrollbar-thin shadow-card p-2.5"
                                v-click-outside="
                                    () => (showPerPageOptions = false)
                                "
                            >
                                <button
                                    v-for="option in [5, 20, 50, 100].filter(
                                        (e) => e !== perPage
                                    )"
                                    :key="option"
                                    class="flex w-full text-left text-sm rounded-[5px] text-gray-300 transition-colors duration-300 hover:text-blue"
                                    @click="
                                        perPage = option;
                                        showPerPageOptions = false;
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
                            @click="atPage--"
                            class="flex transition-colors duration-300 text-gray-300 hover:text-blue"
                        >
                            <ChevronRightIcon
                                class="w-1.5 h-3 rotate-180 mr-4"
                            />
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
                        <template v-slot:breakViewContent>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 12 4"
                                class="w-3 h-2 translate-y-1"
                            >
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
                            @click="atPage++"
                            class="flex transition-colors duration-300 text-gray-300 hover:text-blue"
                        >
                            <ChevronRightIcon class="w-1.5 h-3 ml-4" />
                        </button>
                    </Transition>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="text-center font-Inter mb-[15px]">
                No products found
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import CheckIcon from "@/assets/icons/check.svg";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import Pagination from "vuejs-paginate-next";
import { SearchItem as SearchItemType } from "~~/types/search";
import { SearchData } from "~/model/products/response/ProductSearchResponse";

const props = defineProps<{
    products: SearchData | null;
}>();

const perPage = ref(5);
const show = ref("New products only");
const showShowOptions = ref(false);
const showOptions = ref([
    "New products only",
    "Available in stock",
    "Sales only",
    "All products",
]);
const showPerPageOptions = ref(false);
const sortBy = ref("Product Code");
const showSortByOptions = ref(false);
const sortByOptions = ref([
    "Product Code",
    "Max. forward impulse",
    "Manufacturer part number",
    "Stock availability",
    "Max. forward impulse",
    "Manufacturer part number",
    "Product code",
    "Product Code",
    "Max. forward impulse",
    "Manufacturer part number",
    "Stock availability",
    "Max. forward impulse",
    "Manufacturer part number",
    "Product code",
]);
const atPage = ref(1);

const productData = computed<SearchData | null>(() => {
    return props.products;
});

const searchItems = computed<SearchItemType[]>(() => {
    let data: SearchItemType[] = [];

productData.value?.items.items?.map((item) => {
        data.push({
            slug: item._id,
            title: item.alias,
            cover: item.details.ProductImage.ProductImageSmall,
            manufacturer: item.manufacturer,
            manufacturerCode: item.manufacturerCode,
            stock: item.stock,
            description: item.description,
        });
    });

    return data;
});

const order = ref<"asc" | "des">("asc");

const filteredSearchItems = computed(() => {
    return searchItems.value?.slice(
        (atPage.value - 1) * perPage.value,
        (atPage.value - 1) * perPage.value + perPage.value
    );
});

const totalPages = computed<number>(() => {
    return Math.ceil(searchItems.value?.length / perPage.value);
});
</script>

<style lang="scss">
.searchProducts--pagination-item {
    @apply cursor-pointer flex items-center justify-center w-8 h-8 mx-1 text-sm font-Inter font-semibold rounded-md bg-gray-200 text-gray-300 transition-colors duration-300 hover:bg-blue hover:text-white focus-visible:bg-blue focus-visible:text-white #{!important};
}
.searchProducts--pagination-item-active .searchProducts--pagination-item {
    @apply bg-blue text-white #{!important};
}
.searchProducts--pagination-item_prev,
.searchProducts--pagination-item_next {
    @apply hidden #{!important};
}
</style>
