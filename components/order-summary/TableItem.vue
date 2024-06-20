<template>
    <div class="rounded-lg" :class="expanded ? 'custom-shadow' : ''">
        <div
            class="relative cursor-pointer xl:cursor-default flex flex-row justify-between p-4 bg-[#EBEBEB] w-full border-[1px] border-[#EBEBEB] header-transition"
            :class="expanded ? 'rounded-t-lg' : 'rounded-lg'"
            @click="handleExpand"
        >
            <div class="flex flex-row truncate">
                <label class="flex cursor-pointer mr-4" @click.stop>
                    <input :value="item.selected" type="checkbox" class="sr-only" @change="handleCheck" />
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                        :class="[
                            item.selected
                                ? 'bg-blue-500 border-blue-500 group-hover:bg-white'
                                : 'bg-white  border-border group-hover:border-gray-300',
                        ]"
                    >
                        <CheckIcon v-if="item.selected" class="w-4 text-white transition-colors duration-300 group-hover:text-blue-500" />
                    </div>
                </label>
                <div class="max-w-[220px] lg:max-w-[245px] flex">
                    <span
                        v-if="stockItem"
                        class="truncate text-neutral-700 text-sm leading-6 font-normal self-center justify-self-center"
                        :class="expanded && shortStock ? 'hidden sm:block' : 'block'"
                        >{{ item.productEntity?.alias }}</span
                    >
                    <span v-else class="block truncate text-rose-500 text-sm font-normal leading-6 self-center justify-self-center">{{
                        item.productEntity.alias
                    }}</span>
                </div>
                <div v-if="shortStock" class="flex flex-row">
                    <OrangeCheckCircle class="w-5 ml-2 sm:ml-4" :class="expanded ? 'ml-0' : ''" />
                    <span
                        class="text-[#FF8A00] text-sm font-medium leading-6 self-center pl-2"
                        :class="expanded ? 'flex sm:hidden' : 'hidden'"
                        >{{ item.productEntity.stock }} in stock</span
                    >
                </div>
                <GreenCheckCircle v-if="!shortStock && stockItem" class="w-5 ml-2 sm:ml-4" />
                <div v-if="!stockItem" class="flex flex-row items-center ml-4">
                    <WarningErrorHuge class="hidden lg:block" />
                    <WarningError class="block lg:hidden" />
                    <span class="hidden sm:flex text-sm font-medium leading-6 text-rose-500 ml-2"
                        >{{ item.backorder_stock }} items will be on back order.</span
                    >
                </div>
                <div
                    v-if="stockItem && item.discount.value && discounts?.productDiscount"
                    class="px-2 border-[1px] rounded-[25px] border-[#FA4B4B] bg-white ml-4 sm:flex items-center hidden"
                >
                    <span class="text-xs font-semibold leading-5 text-rose-500">{{ item.discount.value }} %</span>
                </div>
            </div>
            <div>
                <div class="hidden xl:flex flex-row gap-4 ml-4">
                    <Tooltip theme="black" position="top">
                        <button class="relative flex group" @click="addToFavs">
                            <HeartSolid v-show="item.liked" class="absolute r-0 top-[1px] text-[#007FFF]" />
                            <HeartOutline class="w-5 h-5 text-[#5E6278] group-hover:text-[#007FFF] transition duration-150" />
                        </button>
                        <template #content>
                            <span class="capitalize">Add to Favorites</span>
                        </template>
                    </Tooltip>
                    <button
                        v-if="!inModal"
                        class="flex items-center justify-center ml-auto text-gray-300 transition-colors duration-300 hover:text-rose-500"
                        @click="deleteItem = true"
                    >
                        <TrashIcon class="w-5 h-5" />
                    </button>
                </div>
                <ChevronDownIcon
                    class="w-5 h-5 flex-shrink-0 roun ded-full transition duration-300 xl:hidden flex"
                    :class="[expanded ? 'rotate-180 text-[#007FFF]' : 'text-slate-500']"
                />
            </div>
        </div>
        <Transition name="expand">
            <OrderSummaryTableItemDropdown
                v-if="expanded"
                ref="tab"
                :item="item"
                :short-stock="shortStock"
                :stock-item="stockItem"
                :liked="liked"
                class="item"
            />
        </Transition>
    </div>
    <Teleport to="body">
        <Transition name="slide-from-top">
            <LayoutFavoritesModalsDelete v-if="deleteItem" :products="[item]" :delete-from-cart="true" @close="deleteItem = false" />
        </Transition>
    </Teleport>
</template>
<script lang="ts">
import CheckIcon from '@/assets/icons/check.svg';
import OrangeCheckCircle from '@/assets/icons/orange-check-circle.svg';
import GreenCheckCircle from '@/assets/icons/green-check-circle.svg';
import ChevronDownIcon from '@/assets/icons/dashboard/chevron-down.svg';
import WarningError from '@/assets/icons/warning-error.svg';
import WarningErrorHuge from '@/assets/icons/warning-error-huge.svg';
import HeartOutline from '@/assets/icons/heart-outline.svg';
import HeartSolid from '@/assets/icons/heart-solid.svg';
import Tooltip from '~/components/global/Tooltip.vue';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { parseProductPriceConfiguration } from '~/helpers/prices.helper';
import TrashIcon from 'assets/icons/trash-can.svg';
import { PropType } from 'vue';
import { CartProductsInterface } from '~/model/cart/response/cart.interface';

export default defineComponent({
    name: 'TableItem',
    components: {
        TrashIcon,
        CheckIcon,
        OrangeCheckCircle,
        GreenCheckCircle,
        ChevronDownIcon,
        WarningError,
        WarningErrorHuge,
        HeartOutline,
        HeartSolid,
        Tooltip,
    },
    props: {
        item: {
            type: Object as PropType<CartProductsInterface>,
            required: true,
        },
        stockItem: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    data() {
        return {
            checked: false,
            expanded: false,
            thresholdStock: 10,
            liked: false,
            deleteItem: false,
        };
    },
    computed: {
        ProductType() {
            return ProductType;
        },
        shortStock() {
            return Number(this.item.productEntity?.stock) <= this.thresholdStock && this.item.productEntity?.stock > 0 && this.stockItem;
        },
        itemQuantity() {
            return this.stockItem ? Number(this.item.backorder_stock) : Number(this.item.stock);
        },
        discounts() {
            if (!this.item.productEntity) {
                return;
            }

            const authStore = useAuthStore();
            const { getUserDetails } = storeToRefs(authStore);

            const discountsHelper = parseProductPriceConfiguration(this.item.productEntity, getUserDetails.value, this.itemQuantity);

            return {
                userDiscount: discountsHelper?.userDiscount || 0,
                productDiscount: discountsHelper?.productDiscount || 0,
            };
        },
    },
    watch: {
        itemQuantity() {
            if (this.item.stock) {
                this.$emit('updateQuantity');
            }
        },
    },
    mounted() {
        const mediaQuery = window.matchMedia('(min-width: 1280px)');
        const handler = (e: MediaQueryListEvent) => {
            this.expanded = e.matches;
        };
        mediaQuery.addEventListener('change', handler);
        handler({ matches: mediaQuery.matches } as MediaQueryListEvent);
    },
    methods: {
        handleCheck() {
            this.item.selected = !this.item.selected;
            this.$emit('check', this.item);
        },
        handleExpand() {
            if (window.matchMedia('(max-width: 1280px)').matches) {
                this.expanded = !this.expanded;
            }
        },
        addToFavs() {
            this.item.liked = !this.item.liked;
        },
        deleteCurrent() {
            this.$emit('deleteCurrent', this.item.id);
        },
    },
});
</script>
<style scoped>
.expand-enter-from,
.expand-leave-to {
    opacity: 0.5;
    max-height: 0;
    overflow: hidden;
}

.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    max-height: 1000px; /* Adjust this value as needed */
}

.expand-enter-active,
.expand-leave-active {
    transition: max-height 0.5s cubic-bezier(0, 0.3, 0.6, 1), opacity 0.5s ease;
}

.item {
    transform-origin: top;
}

.header-transition {
    transition-property: box-shadow, border-radius, opacity;
    transition-timing-function: cubic-bezier(0, 0.3, 0.6, 1);
    transition-duration: 150ms;
}

.custom-shadow {
    box-shadow: 0px 3px 8px 0px rgba(133, 133, 133, 0.25);
}
</style>
