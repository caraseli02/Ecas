<template>
    <div class="fixed z-[60] top-0 left-0 w-screen h-screen flex flex-col bg-white md:hidden">
        <div class="flex items-center justify-between px-5 pt-[15px] pb-[15px] border-b border-gray-200 mb-[15px] md:hidden">
            <div v-if="!selectedCategory" class="text-lg font-semibold text-gray-300">Products</div>
            <template v-else>
                <button class="flex" @click="selectedSubCategory ? (selectedSubCategory = null) : (selectedCategory = null)">
                    <CaretLeft class="w-6 h-6" />
                </button>
                <div class="flex items-center text-blue">
                    <component :is="selectedCategory.icon" v-if="!selectedSubCategory" class="w-[22px] h-[22px] mr-1.5" />
                    <div class="text-sm font-semibold">
                        {{ selectedSubCategory ? selectedSubCategory.label : selectedCategory.label }}
                    </div>
                </div>
            </template>
            <button
                class="rounded w-8 h-8 bg-[#F2F2F2] flex items-center justify-center text-gray-100 transition-colors duration-300 hover:text-gray-300"
                @click="showNavModal = false"
            >
                <XIcon class="w-[15px] h-[15px]" />
            </button>
        </div>
        <div
            class="flex-1 flex flex-col gap-1.5 font-Inter overflow-y-auto scrollbar-thin pl-2.5 pr-[15px] pb-[15px] border-b border-gray-200 mb-[15px]"
        >
            <template v-if="!selectedCategory">
                <button
                    v-for="(category, index) in categories"
                    :key="index"
                    class="group flex items-center px-2.5 py-[5px] rounded-[5px] w-full text-gray-300 text-left transition-colors duration-300 hover:bg-[#F4F4F4] hover:text-blue"
                    @click="selectedCategory = category"
                >
                    <div class="flex items-center justify-center w-[34px] h-[34px] rounded bg-gray-200 mr-2">
                        <component :is="category.icon" class="w-7 h-7" />
                    </div>
                    <div>
                        <div class="text-[15px] font-semibold mb-px">
                            {{ category.label }}
                        </div>
                        <div class="text-xs font-semibold text-gray-100 transition-colors duration-300 group-hover:text-gray-300">
                            {{ category.products }} Products
                        </div>
                    </div>
                </button>
            </template>
            <template v-else-if="selectedCategory && !selectedSubCategory">
                <button
                    v-for="(subCategory, index) in selectedCategory.subCategories"
                    :key="index"
                    class="group flex items-center px-2.5 py-[5px] rounded-[5px] w-full text-gray-300 text-left transition-colors duration-300 hover:bg-[#F4F4F4] hover:text-blue"
                    @click="selectedSubCategory = subCategory"
                >
                    <div>
                        <div class="text-[15px] font-semibold mb-px">
                            {{ subCategory.label }}
                        </div>
                        <div class="text-xs font-semibold text-gray-100 transition-colors duration-300 group-hover:text-gray-300">
                            {{ subCategory.products }} Products
                        </div>
                    </div>
                </button>
            </template>
            <template v-else-if="selectedSubCategory">
                <NuxtLink
                    v-for="(subCategory, index) in selectedCategory.subCategories"
                    :key="index"
                    to="/"
                    class="group flex items-center justify-between px-2.5 py-[5px] rounded-[5px] w-full text-gray-300 text-left transition-colors duration-300 hover:bg-[#F4F4F4] hover:text-blue"
                >
                    <div>
                        <div class="text-[15px] font-semibold mb-px">Semiconductors</div>
                        <div class="text-xs font-semibold text-gray-100 transition-colors duration-300 group-hover:text-gray-300">
                            {{ subCategory.products }} Products
                        </div>
                    </div>
                    <div
                        v-if="index === 3 || index === 5"
                        class="bg-blue text-white rounded-full px-[5px] py-px font-Inter font-semibold text-xs leading-tight"
                    >
                        New
                    </div>
                </NuxtLink>
            </template>
        </div>
        <div v-if="!selectedCategory">
            <div class="grid grid-cols-1 gap-1.5 px-5 pb-[15px]">
                <NuxtLink
                    v-for="(item, index) in navItems"
                    :key="index"
                    :to="item.to"
                    class="font-semibold text-gray-300 transition-colors duration-300 hover:text-blue"
                >
                    {{ item.label }}
                </NuxtLink>
            </div>
            <div class="bg-blue px-5 pt-[17px] pb-[21px] text-xs font-semibold text-white text-center">
                Sales: +40724 360 250 (Mon-Fri 8:00AM - 4:00PM EST)
            </div>
        </div>
        <LayoutHeaderMainMenuBanners v-else />
    </div>
</template>

<script setup lang="ts">
import XIcon from '@/assets/icons/x.svg';
import SemiconductorsIcon from '@/assets/icons/header/semiconductors.svg';
import PassiveIcon from '@/assets/icons/header/passive.svg';
import ElectromechanicsIcon from '@/assets/icons/header/electromechanics.svg';
import CablesAndConnectorsIcon from '@/assets/icons/header/cables-and-connectors.svg';
import PowerSupplyIcon from '@/assets/icons/header/power-supply.svg';
import CasesIcon from '@/assets/icons/header/cases.svg';
import ToolsIcon from '@/assets/icons/header/tools.svg';
import IndustrialFurnitureIcon from '@/assets/icons/header/industrial-furniture.svg';
import CaretLeft from '@/assets/icons/caret-left.svg';
import { showNavModal } from '~~/config/modal/nav';

const categories = ref([
    {
        label: 'Semiconductors',
        products: 17000,
        icon: SemiconductorsIcon,
        subCategories: [
            {
                label: 'Capacitors',
                products: 170000,
            },
            {
                label: 'High power electrolytic capacitors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Power Supply',
                products: 170000,
            },
            {
                label: 'Semiconductors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Electrolytic capacitors',
                products: 170000,
            },
        ],
    },
    {
        label: 'Pasive',
        products: 17000,
        icon: PassiveIcon,
        subCategories: [
            {
                label: 'Capacitors',
                products: 170000,
            },
            {
                label: 'High power electrolytic capacitors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Power Supply',
                products: 170000,
            },
            {
                label: 'Semiconductors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Electrolytic capacitors',
                products: 170000,
            },
        ],
    },
    {
        label: 'Electromechanics',
        products: 17000,
        icon: ElectromechanicsIcon,
        subCategories: [
            {
                label: 'Capacitors',
                products: 170000,
            },
            {
                label: 'High power electrolytic capacitors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Power Supply',
                products: 170000,
            },
            {
                label: 'Semiconductors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Electrolytic capacitors',
                products: 170000,
            },
        ],
    },
    {
        label: 'Cables & Connectors',
        products: 17000,
        icon: CablesAndConnectorsIcon,
        subCategories: [
            {
                label: 'Capacitors',
                products: 170000,
            },
            {
                label: 'High power electrolytic capacitors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Power Supply',
                products: 170000,
            },
            {
                label: 'Semiconductors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Electrolytic capacitors',
                products: 170000,
            },
        ],
    },
    {
        label: 'Power Supply',
        products: 17000,
        icon: PowerSupplyIcon,
        subCategories: [
            {
                label: 'Capacitors',
                products: 170000,
            },
            {
                label: 'High power electrolytic capacitors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Power Supply',
                products: 170000,
            },
            {
                label: 'Semiconductors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Electrolytic capacitors',
                products: 170000,
            },
        ],
    },
    {
        label: 'Cases',
        products: 17000,
        icon: CasesIcon,
        subCategories: [
            {
                label: 'Capacitors',
                products: 170000,
            },
            {
                label: 'High power electrolytic capacitors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Power Supply',
                products: 170000,
            },
            {
                label: 'Semiconductors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Electrolytic capacitors',
                products: 170000,
            },
        ],
    },
    {
        label: 'Tools',
        products: 17000,
        icon: ToolsIcon,
        subCategories: [
            {
                label: 'Capacitors',
                products: 170000,
            },
            {
                label: 'High power electrolytic capacitors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Power Supply',
                products: 170000,
            },
            {
                label: 'Semiconductors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Electrolytic capacitors',
                products: 170000,
            },
        ],
    },
    {
        label: 'Industrial Furniture',
        products: 17000,
        icon: IndustrialFurnitureIcon,
        subCategories: [
            {
                label: 'Capacitors',
                products: 170000,
            },
            {
                label: 'High power electrolytic capacitors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Power Supply',
                products: 170000,
            },
            {
                label: 'Semiconductors',
                products: 170000,
            },
            {
                label: 'Electromechanics',
                products: 170000,
            },
            {
                label: 'Optolelectronics',
                products: 170000,
            },
            {
                label: 'Electrolytic capacitors',
                products: 170000,
            },
        ],
    },
]);
const selectedCategory = ref<(typeof categories.value)[0] | null>(null);
const selectedSubCategory = ref();

const navItems = [
    {
        label: 'News',
        to: '/',
    },
    {
        label: 'About',
        to: '/',
    },
    {
        label: 'How to Buy',
        to: '/',
    },
    {
        label: 'Quick Links',
        to: '/',
    },
    {
        label: 'Contact',
        to: '/',
    },
];
</script>
