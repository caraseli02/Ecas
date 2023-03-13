<template>
  <div
    class="relative flex items-center px-5 h-[95px] flex-shrink-0 overflow-hidden"
    :style="{
      boxShadow: '0px 0px 4px rgba(51, 51, 51, 0.25)',
    }"
  >
    <template v-if="!editing">
      <button
        class="flex text-gray-300 transition-colors duration-300 hover:text-blue"
        @click="$emit('back')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-6 h-6 mr-5"
        >
          <path
            fill="currentColor"
            d="M6.373 12c.001-.298.12-.584.328-.797l7.5-7.5a1.127 1.127 0 1 1 1.594 1.594L9.092 12l6.703 6.703a1.127 1.127 0 1 1-1.594 1.594l-7.5-7.5A1.144 1.144 0 0 1 6.373 12Z"
          />
        </svg>
      </button>
      <div v-if="!showMenu" class="flex items-center">
        <FolderOpenIcon class="w-7 h-7 text-gray-300 mr-[15px]" />
        <span class="text-sm leading-tight font-semibold font-Inter truncate">
          {{ folder.title }}
        </span>
      </div>
      <button
        class="flex text-gray-300 transition-colors duration-300 ml-auto hover:text-blue"
        :class="[showMenu ? 'mr-7' : '']"
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
            class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
          >
            <CartIcon class="w-5 h-5" />
          </button>
        </SwiperSlide>
        <SwiperSlide v-if="hasSelectedItem">
          <button
            class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
            @click="moveItems = true"
          >
            <FolderArrowIcon class="w-5 h-5" />
          </button>
        </SwiperSlide>
        <SwiperSlide v-else>
          <button
            class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
            @click="newFolder = true"
          >
            <FolderPlusIcon class="w-5 h-5" />
          </button>
        </SwiperSlide>
        <SwiperSlide v-if="hasSelectedItem">
          <button
            class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
            @click="copyItems = true"
          >
            <CopyIcon class="w-5 h-5" />
          </button>
        </SwiperSlide>
        <SwiperSlide v-else>
          <button
            class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
            @click="editing = true"
          >
            <PenIcon class="w-5 h-5" />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
          >
            <CogIcon class="w-5 h-5" />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
            @click="deleteItem = true"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
        </SwiperSlide>
      </Swiper>
      <div
        class="absolute top-1/2 -translate-y-1/2 left-0 rounded-r-lg w-[5px] h-[50px] bg-blue transition-transform duration-300"
        :class="[showMenu ? '' : '-translate-x-2']"
      />
      <div
        class="absolute top-1/2 -translate-y-1/2 right-0 rounded-l-lg w-[5px] h-[50px] bg-blue transition-transform duration-300"
        :class="[showMenu ? 'translate-x-2' : '']"
      />
    </template>
    <div v-else class="flex items-center justify-center gap-[15px] w-full">
      <label class="w-full flex-1">
        <input
          v-model="newName"
          type="text"
          class="bg-transparent w-full px-2.5 pt-[11px] pb-2.5 text-sm leading-snug font-Inter border border-[#D4D4D4] rounded text-dark placeholder:text-gray-300 focus:outline-none"
        />
      </label>
      <button
        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-blue"
        @click="editing = false"
      >
        <CheckIcon class="w-6 h-6" />
      </button>
      <button
        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-red"
        @click="editing = false"
      >
        <XIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
  <div class="flex-1 h-full overflow-y-auto scrollbar-thin max-h-vh">
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
    <div class="grid grid-cols-1 gap-5 px-5 mb-10">
      <LayoutFavoritesCartModalFavoritesProductItem
        v-for="(item, index) in folder.items"
        :key="index"
        :product="item"
        @select="item.selected = !item.selected"
      />
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <LayoutFavoritesModalsDelete
        v-if="deleteItem"
        :products="[folder]"
        @close="deleteItem = false"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="fade">
      <LayoutFavoritesModalsNewFolder
        v-if="newFolder"
        @close="newFolder = false"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="fade">
      <LayoutFavoritesModalsCopyMoveItems
        v-if="copyItems"
        :items="folder.items?.filter((e) => e.selected) || []"
        action="copy"
        @close="copyItems = false"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="fade">
      <LayoutFavoritesModalsCopyMoveItems
        v-if="moveItems"
        :items="folder.items?.filter((e) => e.selected) || []"
        action="move"
        @close="moveItems = false"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FavoriteItem } from "~~/types";
import DotsVerticalIcon from "@/assets/icons/dots-vertical.svg";
import CogIcon from "@/assets/icons/cog.svg";
import FolderPlusIcon from "@/assets/icons/folder-plus.svg";
import FolderOpenIcon from "@/assets/icons/folder-open.svg";
import CartIcon from "@/assets/icons/cart.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import TrashIcon from "@/assets/icons/trash-can.svg";
import FolderArrowIcon from "@/assets/icons/folder-arrow.svg";
import CheckIcon from "@/assets/icons/check.svg";
import PenIcon from "@/assets/icons/pen.svg";
import XIcon from "@/assets/icons/x.svg";
import { A11y } from "swiper";

const props = defineProps({
  folder: {
    type: Object as PropType<FavoriteItem>,
    required: true,
  },
});

defineEmits(["back"]);

const showMenu = ref(false);
const editing = ref(false);

const newName = ref(props.folder.title);

const deleteItem = ref(false);
const newFolder = ref(false);
const copyItems = ref(false);
const moveItems = ref(false);

const hasSelectedItem = computed(() => {
  return props.folder.items?.some((e) => e.selected);
});
</script>
