<template>
    <div
        class="relative flex items-center px-5 h-[95px] flex-shrink-0 overflow-hidden"
        :style="{
            boxShadow: '0px 0px 4px rgba(51, 51, 51, 0.25)',
        }"
    >
        <template v-if="!editing">
            <button class="flex text-slate-500 mr-[15px] transition-colors duration-300 hover:text-blue-500" @click="$emit('back')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6">
                    <path
                        fill="currentColor"
                        d="M6.373 12c.001-.298.12-.584.328-.797l7.5-7.5a1.127 1.127 0 1 1 1.594 1.594L9.092 12l6.703 6.703a1.127 1.127 0 1 1-1.594 1.594l-7.5-7.5A1.144 1.144 0 0 1 6.373 12Z"
                    />
                </svg>
            </button>
            <div v-if="!showMenu" class="flex items-center">
                <FolderOpenIcon class="w-7 h-7 text-slate-500 mr-[15px]" />
                <span class="text-sm leading-tight font-semibold font-Inter truncate">
                    {{ folder.title }}
                </span>
            </div>
            <button
                class="flex text-slate-500 transition-colors duration-300 hover:text-blue-500"
                :class="[showMenu ? 'mr-[15px]' : 'ml-auto']"
                @click="showMenu = !showMenu"
            >
                <DotsVerticalIcon class="w-6 h-6" />
            </button>
            <Swiper
                v-if="showMenu"
                :modules="[A11y]"
                :slides-per-view="'auto'"
                :space-between="15"
                :grab-cursor="true"
                :watch-overflow="true"
                class="favoritesModal--swiper flex-1 max-w-max"
            >
                <SwiperSlide>
                    <button
                        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-slate-500 transition-colors duration-300 hover:text-blue-500"
                    >
                        <CartIcon class="w-5 h-5" />
                    </button>
                </SwiperSlide>
                <SwiperSlide v-if="hasSelectedItem">
                    <button
                        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-slate-500 transition-colors duration-300 hover:text-blue-500"
                        @click="moveItems = true"
                    >
                        <FolderArrowIcon class="w-5 h-5" />
                    </button>
                </SwiperSlide>
                <SwiperSlide v-else>
                    <button
                        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-slate-500 transition-colors duration-300 hover:text-blue-500"
                        @click="newFolder = true"
                    >
                        <FolderPlusIcon class="w-5 h-5" />
                    </button>
                </SwiperSlide>
                <SwiperSlide v-if="hasSelectedItem">
                    <button
                        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-slate-500 transition-colors duration-300 hover:text-blue-500"
                        @click="copyItems = true"
                    >
                        <CopyIcon class="w-5 h-5" />
                    </button>
                </SwiperSlide>
                <SwiperSlide v-else>
                    <button
                        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-slate-500 transition-colors duration-300 hover:text-blue-500"
                        @click="editing = true"
                    >
                        <PenIcon class="w-5 h-5" />
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button
                        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-slate-500 transition-colors duration-300 hover:text-blue-500"
                    >
                        <CogIcon class="w-5 h-5" />
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <button
                        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-slate-500 transition-colors duration-300 hover:text-blue-500"
                        @click="deleteItem = true"
                    >
                        <TrashIcon class="w-5 h-5" />
                    </button>
                </SwiperSlide>
            </Swiper>
            <div
                class="absolute top-1/2 -translate-y-1/2 left-0 rounded-r-lg w-[5px] h-[50px] bg-blue-500 transition-transform duration-300"
                :class="[showMenu ? '' : '-translate-x-2']"
            />
            <div
                class="absolute top-1/2 -translate-y-1/2 right-0 rounded-l-lg w-[5px] h-[50px] bg-blue-500 transition-transform duration-300"
                :class="[showMenu ? 'translate-x-2' : '']"
            />
        </template>
        <div v-else class="flex items-center justify-center gap-[15px] w-full">
            <label class="w-full flex-1">
                <input
                    ref="newNameInputDOM"
                    v-model="newName"
                    type="text"
                    class="bg-white w-full px-2.5 pt-[11px] pb-2.5 text-sm leading-snug font-Inter border border-border rounded text-neutral-700 transition-colors duration-300 placeholder:text-slate-500 focus:outline-none focus:border-blue"
                />
            </label>
            <button class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-blue-500" @click="editing = false">
                <CheckIcon class="w-6 h-6" />
            </button>
            <button class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-rose-500" @click="editing = false">
                <XIcon class="w-5 h-5" />
            </button>
        </div>
    </div>
    <div class="flex-1 h-full overflow-y-auto scrollbar-thin max-h-vh overscroll-contain">
        <div class="flex items-center justify-between pt-2.5 px-5 mb-[30px]">
            <div class="text-sm leading-tight font-Inter">
                Items:
                <strong class="font-semibold">{{ folder.items?.length || 0 }}</strong>
            </div>
            <div class="text-sm leading-tight font-Inter">
                Total:
                <strong class="font-semibold">$ 175.413,75</strong>
            </div>
        </div>
        <div v-if="(products.filter((e) => e.type === 'folder') || []).length > 0" class="grid grid-cols-1 gap-5 px-[15px] mb-10">
            <LayoutFavoritesCartModalFavoritesFolderItem
                v-for="(item, index) in products.filter((e) => e.type === 'folder')"
                :key="index"
                :folder="item"
                @select="item.selected = !item.selected"
                @open="$emit('open-folder', item)"
            />
        </div>
        <div class="grid grid-cols-1 gap-4 px-4 mb-10">
            <LayoutFavoritesCartModalFavoritesProductItem
                v-for="(item, index) in products.filter((e) => e.type === 'product')"
                :key="index"
                :product="item"
                @select="item.selected = !item.selected"
            />
        </div>
    </div>
    <Teleport to="body">
        <Transition name="slide-from-top">
            <LayoutFavoritesModalsDelete v-if="deleteItem" :products="[folder]" @close="deleteItem = false" />
        </Transition>
        <Transition name="slide-from-top">
            <LayoutFavoritesModalsNewFolder v-if="newFolder" @close="newFolder = false" />
        </Transition>
        <Transition name="slide-from-top">
            <LayoutFavoritesModalsCopyMoveItems
                v-if="copyItems"
                :items="folder.items?.filter((e) => e.selected) || []"
                action="copy"
                @close="copyItems = false"
            />
        </Transition>
        <Transition name="slide-from-top">
            <LayoutFavoritesModalsCopyMoveItems
                v-if="moveItems"
                :items="folder.items?.filter((e) => e.selected) || []"
                action="move"
                @close="moveItems = false"
            />
        </Transition>
        <Transition name="fade">
            <div
                v-if="deleteItem || newFolder || copyItems || moveItems"
                class="fixed z-[60] top-0 left-0 w-full h-full bg-[#333333]/30 backdrop-blur-[2px] cursor-pointer md:z-50"
                @click="
                    deleteItem = false;
                    newFolder = false;
                    copyItems = false;
                    moveItems = false;
                "
            />
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { FavoriteItem } from '~~/types';
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg';
import CogIcon from '@/assets/icons/cog.svg';
import FolderPlusIcon from '@/assets/icons/folder-plus.svg';
import FolderOpenIcon from '@/assets/icons/folder-open.svg';
import CartIcon from '@/assets/icons/cart.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import TrashIcon from '@/assets/icons/trash-can.svg';
import FolderArrowIcon from '@/assets/icons/folder-arrow.svg';
import CheckIcon from '@/assets/icons/check.svg';
import PenIcon from '@/assets/icons/pen.svg';
import XIcon from '@/assets/icons/x.svg';
import { A11y } from 'swiper';
import { FavouriteFolderResponseInterface } from '~/model/favourite-folder/response/favourite-folder.interface';

const props = defineProps({
    folder: {
        type: Object as PropType<FavoriteItem>,
        required: true,
    },
});

defineEmits(['back', 'open-folder']);

const showMenu = ref(false);

const newNameInputDOM = ref<HTMLInputElement>();
const editing = ref(false);

const newName = ref(props.folder.title);

const deleteItem = ref(false);
const newFolder = ref(false);
const copyItems = ref(false);
const moveItems = ref(false);

const products = ref<FavoriteItem[]>([]);

const hasSelectedItem = computed(() => {
    return props.folder.items?.some((e) => e.selected);
});

const selectedItemsLength = computed(() => {
    return props.folder.items?.filter((e) => e.selected).length;
});

const parseProducts = (items: FavouriteFolderResponseInterface[]) => {
    let children = [];

    children = items.map((item: FavouriteFolderResponseInterface) => ({
        id: item._id,
        type: item.isFolder ? 'folder' : 'product',
        items: item.children?.length ? parseProducts(item.children) : [],
        title: item.isFolder ? item.name : item?.products[0].productEntity.alias,
        description: !item.isFolder && item.products.length && item.products[0].productEntity.description,
        image: !item.isFolder && item.products[0].productEntity.details.ProductImage.ProductImageSmall,
    }));

    return children;
};

products.value = parseProducts(props.folder.items);

watch(editing, (newVal) => {
    if (newVal) {
        nextTick(() => {
            if (newNameInputDOM.value) {
                newNameInputDOM.value.focus();
            }
        });
    }
});

watch(
    () => props.folder,
    () => {
        if (!props.folder) {
            return;
        }

        if (props.folder.type === 'undefined') {
            products.value = parseProducts(props.folder.items);
        } else {
            products.value = props.folder.items;
        }
    },
    { deep: true }
);

watch(selectedItemsLength, (newVal) => {
    showMenu.value = newVal && newVal >= 2;
});
</script>
