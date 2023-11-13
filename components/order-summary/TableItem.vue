<template>
    <div :class="expanded ? 'shadow-xs rounded-t-lg' : 'rounded-lg'" class="border-[1px] border-[#EBEBEB]">
        <div @click="handleExpand" class="flex flex-row justify-between p-4 bg-[#EBEBEB] w-full"
            :class="expanded ? 'rounded-t-md' : 'rounded-md'">
            <div class="flex flex-row truncate">
                <label class="flex cursor-pointer mr-4">
                    <input :value="checked" type="checkbox" class="sr-only" @change="handleCheck" />
                    <div class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
                        :class="[
                            checked
                                ? 'bg-blue border-blue group-hover:bg-white'
                                : 'bg-white  border-border group-hover:border-gray-300',
                        ]">
                        <CheckIcon v-if="checked"
                            class="w-4 text-white transition-colors duration-300 group-hover:text-blue" />
                    </div>
                </label>
                <div class="max-w-[220px] lg:max-w-[245px] flex">
                    <span v-if="stockItem" class="truncate text-[#222] text-sm font-normal self-center justify-self-center"
                        :class="expanded && shortStock ? 'hidden sm:block' : 'block'">{{ item.id }}</span>
                    <span v-else class="block truncate text-[#FA4B4B] text-sm font-normal self-center justify-self-center">{{ item.id }}</span>
                </div>
                <div v-if="shortStock"
                    class="flex flex-row">
                    <OrangeCheckCircle class="w-5 h-5 ml-2 sm:ml-4" :class="expanded ? 'ml-0' : ''" />
                    <span class="text-[#FF8A00] text-sm font-medium leading-4 self-center pl-2"
                        :class="expanded ? 'flex sm:hidden' : 'hidden'">{{ item.productEntity.stock }} in stock</span>
                </div>
                <GreenCheckCircle
                    v-if="!shortStock && stockItem"
                    class="w-5 h-5 ml-2 sm:ml-4" />
                <div v-if="!stockItem" class="flex flex-row items-center ml-4">
                    <WarningErrorHuge class="hidden lg:block" />
                    <WarningError class="block lg:hidden" />
                    <span class="hidden sm:flex text-sm font-medium leading-6 text-[#FA4B4B] ml-2">{{ item.stock - item.productEntity?.stock }} items will be on back order.</span>
                </div>
                <div v-if="stockItem" class="px-2 border-[1px] rounded-[25px] border-[#FA4B4B] bg-white ml-4 sm:flex items-center hidden">
                    <span class="text-xs font-semibold leading-5 text-[#FA4B4B]">{{ item.discount.value }} %</span>
                </div>
            </div>
            <div class="">
                <ChevronDownIcon class="w-5 h-5 flex-shrink-0 rounded-full transition duration-300 lg:hidden flex"
                    :class="[expanded ? 'rotate-180 text-[#007FFF]' : 'text-gray-300']" />
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import CheckIcon from '@/assets/icons/check.svg';
import OrangeCheckCircle from '@/assets/icons/orange-check-circle.svg';
import GreenCheckCircle from '@/assets/icons/green-check-circle.svg';
import ChevronDownIcon from '@/assets/icons/dashboard/chevron-down.svg';
import WarningError from '@/assets/icons/warning-error.svg';
import WarningErrorHuge from '@/assets/icons/warning-error-huge.svg';

export default defineComponent({
    name: 'TableItem',
    props: ['item', 'stockItem'],
    data() {
        return {
            checked: false,
            expanded: false,
            thresholdPrice: 10,
        };
    },
    components: {
        CheckIcon,
        OrangeCheckCircle,
        GreenCheckCircle,
        ChevronDownIcon,
        WarningError,
        WarningErrorHuge,
    },
    methods: {
        handleCheck() {
            this.checked = !this.checked;
            this.$emit('check', this.checked);
        },
        handleExpand() {
            if (window.matchMedia("(max-width: 1024px)").matches) {
                this.expanded = !this.expanded;
            }
        },
    },
    computed: {
        shortStock() {
            return this.item.productEntity?.stock <= this.thresholdPrice && this.item.productEntity?.stock > 0 && this.stockItem;
        },
    },
    mounted() {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        const handler = (e: MediaQueryListEvent) => {
            this.expanded = e.matches;
        };
        mediaQuery.addEventListener('change', handler);
        handler({ matches: mediaQuery.matches } as MediaQueryListEvent);
    },
});
</script>