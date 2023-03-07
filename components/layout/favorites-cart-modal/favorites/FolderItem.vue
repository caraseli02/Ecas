<template>
  <div
    class="relative flex items-center bg-[#F2F2F2] border border-gray-200 rounded-md pl-2.5 pr-[5px] py-[14px]"
  >
    <label class="flex cursor-pointer mr-2.5">
      <input
        :value="folder.selected"
        type="checkbox"
        class="sr-only"
        @change="$emit('select')"
      />
      <div
        class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
        :class="[
          folder.selected
            ? 'bg-blue border-blue group-hover:bg-white'
            : 'bg-white  border-[#D4D4D4] group-hover:border-gray-300',
        ]"
      >
        <CheckIcon
          v-if="folder.selected"
          class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
        />
      </div>
    </label>
    <FolderIcon class="w-9 h-9 mr-[15px]" />
    <div>
      <div class="text-sm leading-tight font-semibold font-Inter mb-[3px]">
        {{ folder.title }}
      </div>
      <div
        class="flex items-center text-xs leading-tight font-Inter text-gray-300"
      >
        <div class="flex items-center mr-[15px]">
          <span class="mr-1">Items:</span>
          <span class="font-semibold">{{ folder.items?.length }}</span>
        </div>
        <div class="flex items-center">
          <span class="mr-1">Total:</span>
          <span class="font-semibold">$ 175.413,75</span>
        </div>
      </div>
    </div>
    <button class="flex ml-auto">
      <DotsVerticalIcon class="w-6 h-6" />
    </button>
    <Transition name="fade">
      <div
        v-if="folder.selected"
        class="absolute top-1/2 right-0 -translate-y-1/2 w-[5px] h-[50px] bg-blue rounded-l-lg"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FavoriteItem } from "~~/types";
import FolderIcon from "@/assets/icons/folder.svg";
import CheckIcon from "@/assets/icons/check.svg";
import DotsVerticalIcon from "@/assets/icons/dots-vertical.svg";

defineProps({
  folder: {
    type: Object as PropType<FavoriteItem>,
    required: true,
  },
});

defineEmits(["select"]);
</script>
