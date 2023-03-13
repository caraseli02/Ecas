<template>
  <div class="flex flex-col flex-1 max-w-full h-full">
    <LayoutFavoritesCartModalFavoritesFolderView
      v-if="selectedFolder"
      :folder="selectedFolder"
      @back="selectedFolder = null"
    />
    <template v-else>
      <div
        class="relative flex items-center px-5 h-[95px] overflow-hidden"
        :style="{
          boxShadow: '0px 0px 4px rgba(51, 51, 51, 0.25)',
        }"
      >
        <LayoutFavoritesCartModalFavoritesSearch
          v-if="!showMenu"
          v-model="searchVal"
          class="mr-5"
        />
        <button
          class="flex flex-shrink-0 text-gray-300 transition-colors duration-300 hover:text-blue"
          @click="showMenu = !showMenu"
        >
          <DotsVerticalIcon class="w-6 h-6" />
        </button>
        <label v-if="showMenu" class="flex cursor-pointer ml-[15px] mr-7">
          <input
            :value="allItemsSelected"
            type="checkbox"
            class="sr-only"
            @change="handleSelectAll"
          />
          <div
            class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
            :class="[
              allItemsSelected
                ? 'bg-blue border-blue group-hover:bg-white'
                : 'bg-white  border-[#D4D4D4] group-hover:border-gray-300',
            ]"
          >
            <CheckIcon
              v-if="allItemsSelected"
              class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
            />
          </div>
        </label>
        <Swiper
          v-if="showMenu"
          :modules="[A11y]"
          :slides-per-view="'auto'"
          :space-between="15"
          :grab-cursor="true"
          :watch-overflow="true"
          class="favoritesModal--swiper flex-1 max-w-max"
        >
          <SwiperSlide v-if="hasSelectedItem">
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
          <SwiperSlide v-if="hasSelectedItem">
            <button
              class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
              @click="copyItems = true"
            >
              <CopyIcon class="w-5 h-5" />
            </button>
          </SwiperSlide>
          <SwiperSlide v-if="onlyFoldersSelected">
            <button
              class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
              @click="mergeFolders = true"
            >
              <MergeIcon class="w-5 h-5" />
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button
              class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full text-gray-300 transition-colors duration-300 hover:text-blue"
            >
              <CogIcon class="w-5 h-5" />
            </button>
          </SwiperSlide>
          <SwiperSlide v-if="!hasSelectedItem">
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
              @click="deleteItems = true"
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
      </div>
      <div
        class="p-5 pb-10 flex-1 h-full overflow-y-auto scrollbar-thin max-h-vh"
      >
        <div class="grid grid-cols-1 gap-2.5 mb-[30px]">
          <LayoutFavoritesCartModalFavoritesFolderItem
            v-for="(item, index) in filteredItems.filter(
              (e) => e.type === 'folder'
            )"
            :key="index"
            :folder="item"
            @select="item.selected = !item.selected"
            @open="selectedFolder = item"
          />
        </div>
        <div class="grid grid-cols-1 gap-5">
          <LayoutFavoritesCartModalFavoritesProductItem
            v-for="(item, index) in filteredItems.filter(
              (e) => e.type === 'product'
            )"
            :key="index"
            :product="item"
            @select="item.selected = !item.selected"
          />
        </div>
      </div>
    </template>
  </div>
  <Teleport to="body">
    <Transition name="slide-from-top">
      <LayoutFavoritesModalsDelete
        v-if="deleteItems"
        :products="items.filter((e) => e.selected)"
        @close="deleteItems = false"
      />
    </Transition>
    <Transition name="slide-from-top">
      <LayoutFavoritesModalsNewFolder
        v-if="newFolder"
        @close="newFolder = false"
      />
    </Transition>
    <Transition name="slide-from-top">
      <LayoutFavoritesModalsMergeFolders
        v-if="mergeFolders"
        :folders="items.filter((e) => e.selected && e.type === 'folder')"
        @close="mergeFolders = false"
      />
    </Transition>
    <Transition name="slide-from-top">
      <LayoutFavoritesModalsCopyMoveItems
        v-if="copyItems"
        :items="items.filter((e) => e.selected) || []"
        action="copy"
        @close="copyItems = false"
      />
    </Transition>
    <Transition name="slide-from-top">
      <LayoutFavoritesModalsCopyMoveItems
        v-if="moveItems"
        :items="items.filter((e) => e.selected) || []"
        action="move"
        @close="moveItems = false"
      />
    </Transition>
    <Transition name="fade">
      <div
        v-if="
          deleteItems || newFolder || mergeFolders || copyItems || moveItems
        "
        class="fixed z-50 top-0 left-0 w-full h-full bg-[#333333]/70 backdrop-blur-[2px] cursor-pointer"
        @click="
          deleteItems = false;
          newFolder = false;
          mergeFolders = false;
          copyItems = false;
          moveItems = false;
        "
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { FavoriteItem } from "@/types";
import DotsVerticalIcon from "@/assets/icons/dots-vertical.svg";
import CogIcon from "@/assets/icons/cog.svg";
import FolderPlusIcon from "@/assets/icons/folder-plus.svg";
import CheckIcon from "@/assets/icons/check.svg";
import CartIcon from "@/assets/icons/cart.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import TrashIcon from "@/assets/icons/trash-can.svg";
import MergeIcon from "@/assets/icons/merge.svg";
import FolderArrowIcon from "@/assets/icons/folder-arrow.svg";
import ProductCover from "@/assets/media/home/product-2.jpg";
import { A11y } from "swiper";

const searchVal = ref("");
const deleteItems = ref(false);
const newFolder = ref(false);
const mergeFolders = ref(false);
const copyItems = ref(false);
const moveItems = ref(false);

const items = ref<FavoriteItem[]>([
  {
    type: "folder",
    title: "Gas detector Homplex",
    items: [
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
    ],
    selected: false,
  },
  {
    type: "folder",
    title: "Gas detector Homplex",
    items: [
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
    ],
    selected: false,
  },
  {
    type: "folder",
    title: "Gas detector Homplex",
    items: [
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
    ],
    selected: false,
  },
  {
    type: "folder",
    title: "Gas detector Homplex",
    items: [
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
    ],
    selected: false,
  },
  {
    type: "folder",
    title: "Gas detector Homplex",
    items: [
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
      {
        type: "product",
        title: "ADIN2111BCPZ",
        description:
          "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
        selected: false,
        quantity: 16,
        image: ProductCover,
      },
    ],
    selected: false,
  },
  {
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    selected: false,
    quantity: 16,
    image: ProductCover,
  },
  {
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    selected: false,
    quantity: 16,
    image: ProductCover,
  },
  {
    type: "product",
    title: "ADIN2111BCPZ",
    description: "Diode: rectifying; SMD; 100V Diode: rectifying; SMD; 100V ",
    selected: false,
    quantity: 16,
    image: ProductCover,
  },
]);

const selectedFolder = ref<FavoriteItem | null>(null);

const filteredItems = computed(() => {
  return items.value.filter((e) => {
    return `${e.title} ${e.description || ""}`
      .toLowerCase()
      .includes(searchVal.value.toLowerCase());
  });
});

const showMenu = ref(false);

const allItemsSelected = computed(() => {
  return items.value.every((e) => e.selected);
});

const onlyFoldersSelected = computed(() => {
  return (
    items.value.some((e) => e.type === "folder" && e.selected) &&
    items.value.filter((e) => e.type === "folder" && e.selected).length > 1 &&
    !items.value.some((e) => e.type === "product" && e.selected)
  );
});

const hasSelectedItem = computed(() => {
  return items.value.some((e) => e.selected);
});

const handleSelectAll = () => {
  if (allItemsSelected.value) {
    items.value = items.value.map((e) => {
      return {
        ...e,
        selected: false,
      };
    });
  } else {
    items.value = items.value.map((e) => {
      return {
        ...e,
        selected: true,
      };
    });
  }
};
</script>

<style>
.favoritesModal--swiper .swiper-slide {
  @apply w-[42px];
}
</style>
