<template>
  <div class="flex flex-col">
    <div
      class="relative flex items-center pb-[26px] border-b border-gray-200 px-5"
    >
      <LayoutFavoritesCartModalFavoritesSearch v-model="searchVal" />
      <div class="ml-5">
        <button class="flex">
          <DotsVerticalIcon class="w-6 h-6" />
        </button>
      </div>
      <div
        class="absolute -top-0.5 right-0 w-[5px] h-[50px] bg-blue rounded-l-lg"
      />
    </div>
    <div class="p-5 pb-10">
      <div class="grid grid-cols-1 gap-2.5 mb-[30px]">
        <LayoutFavoritesCartModalFavoritesFolderItem
          v-for="(item, index) in filteredItems.filter(
            (e) => e.type === 'folder'
          )"
          :key="index"
          :folder="item"
          @select="item.selected = !item.selected"
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
  </div>
</template>

<script setup lang="ts">
import { FavoriteItem } from "@/types";
import DotsVerticalIcon from "@/assets/icons/dots-vertical.svg";
import ProductCover from "@/assets/media/home/product-2.jpg";

const searchVal = ref("");

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

const filteredItems = computed(() => {
  return items.value.filter((e) => {
    return `${e.title} ${e.description || ""}`
      .toLowerCase()
      .includes(searchVal.value.toLowerCase());
  });
});
</script>
