<template>
    <div class="rounded-lg" :class="expanded ? 'custom-shadow' : ''">
        <div @click="handleExpand"
            class="relative cursor-pointer xl:cursor-default flex flex-row justify-between p-4 bg-[#EBEBEB] w-full border-[1px] border-[#EBEBEB] header-transition"
            :class="expanded ? 'rounded-t-lg' : 'rounded-lg'">
            <div class="flex flex-row truncate">
                <label class="flex cursor-pointer mr-4" @click.stop>
                    <input :value="item.selected" type="checkbox" class="sr-only" @change="handleCheck" />
                    <div class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                        :class="[
                            item.selected
                                ? 'bg-blue border-blue group-hover:bg-white'
                                : 'bg-white  border-border group-hover:border-gray-300',
                        ]">
                        <CheckIcon v-if="item.selected"
                            class="w-4 text-white transition-colors duration-300 group-hover:text-blue" />
                    </div>
                </label>
                <div class="max-w-[220px] lg:max-w-[245px] flex">
                    <span v-if="stockItem" class="truncate text-[#222] text-sm leading-6 font-normal self-center justify-self-center"
                        :class="expanded && shortStock ? 'hidden sm:block' : 'block'">{{ item.id }}</span>
                    <span v-else
                        class="block truncate text-[#FA4B4B] text-sm font-normal leading-6 self-center justify-self-center">{{ item.id
                        }}</span>
                </div>
                <div v-if="shortStock" class="flex flex-row">
                    <OrangeCheckCircle class="w-5 ml-2 sm:ml-4" :class="expanded ? 'ml-0' : ''" />
                    <span class="text-[#FF8A00] text-sm font-medium leading-6 self-center pl-2"
                        :class="expanded ? 'flex sm:hidden' : 'hidden'">{{ item.productEntity.stock }} in stock</span>
                </div>
                <GreenCheckCircle v-if="!shortStock && stockItem" class="w-5 ml-2 sm:ml-4" />
                <div v-if="!stockItem" class="flex flex-row items-center ml-4">
                    <WarningErrorHuge class="hidden lg:block" />
                    <WarningError class="block lg:hidden" />
                    <span class="hidden sm:flex text-sm font-medium leading-6 text-[#FA4B4B] ml-2">{{ item.stock -
                        item.productEntity?.stock }} items will be on back order.</span>
                </div>
                <div v-if="stockItem && item.discount.value"
                    class="px-2 border-[1px] rounded-[25px] border-[#FA4B4B] bg-white ml-4 sm:flex items-center hidden">
                    <span class="text-xs font-semibold leading-5 text-[#FA4B4B]">{{ item.discount.value }} %</span>
                </div>
            </div>
            <div>
                <div class="hidden xl:flex flex-row gap-4 ml-4">
                    <Tooltip theme="black" position="top">
                        <button class="relative flex group" @click="addToFavs">
                            <HeartSolid v-show="item.liked" class="absolute r-0 top-[1px] text-[#007FFF]" />
                            <HeartOutline
                                class="w-5 h-5 text-[#5E6278] group-hover:text-[#007FFF] transition duration-150" />
                        </button>
                        <template #content>
                            <span class="capitalize">Add to Favorites</span>
                        </template>
                    </Tooltip>
                    <Tooltip theme="black" position="top">
                        <button class="flex group" @click="deleteCurrent">
                            <TrashOutline class="text-[#5E6278] group-hover:text-[#FA4B4B] transition duration-150" />
                        </button>
                        <template #content>
                            <span class="capitalize">Delete</span>
                        </template>
                    </Tooltip>
                </div>
                <ChevronDownIcon class="w-5 h-5 flex-shrink-0 rounded-full transition duration-300 xl:hidden flex"
                    :class="[expanded ? 'rotate-180 text-[#007FFF]' : 'text-gray-300']" />
            </div>
        </div>
        <Transition name="expand">
            <OrderSummaryTableItemDropdown ref="tab" v-if="expanded" :item="item" :short-stock="shortStock" :stock-item="stockItem" :liked="liked"
                class="item" />
        </Transition>
    </div>
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
import TrashOutline from '@/assets/icons/trash-outline.svg';
import Tooltip from '~/components/global/Tooltip.vue';

export default defineComponent({
    name: 'TableItem',
    props: {
        item: {
            type: Object,
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
        };
    },
    components: {
        CheckIcon,
        OrangeCheckCircle,
        GreenCheckCircle,
        ChevronDownIcon,
        WarningError,
        WarningErrorHuge,
        HeartOutline,
        HeartSolid,
        TrashOutline,
        Tooltip,
    },
    methods: {
        handleCheck() {
            this.item.selected = !this.item.selected;
            this.$emit('check', this.item);
        },
        handleExpand() {
            if (window.matchMedia("(max-width: 1280px)").matches) {
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
    computed: {
        shortStock() {
            return this.item.productEntity?.stock <= this.thresholdStock && this.item.productEntity?.stock > 0 && this.stockItem;
        },
        itemQuantity() {
            return this.item.stock;
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
        const mediaQuery = window.matchMedia("(min-width: 1280px)");
        const handler = (e: MediaQueryListEvent) => {
            this.expanded = e.matches;
        };
        mediaQuery.addEventListener('change', handler);
        handler({ matches: mediaQuery.matches } as MediaQueryListEvent);
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