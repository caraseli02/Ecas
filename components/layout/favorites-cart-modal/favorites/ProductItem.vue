<template>
  <div class="flex flex-col pb-[15px] border-b border-gray-200">
    <div class="flex" :class="[inModal ? 'items-center' : 'items-start']">
      <label v-if="inModal" class="flex cursor-pointer mr-2.5">
        <input
          :value="product.selected"
          type="checkbox"
          class="sr-only"
          @change="$emit('select')"
        />
        <div
          class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
          :class="[
            product.selected
              ? 'bg-blue border-blue group-hover:bg-white'
              : 'bg-white  border-[#D4D4D4] group-hover:border-gray-300',
          ]"
        >
          <CheckIcon
            v-if="product.selected"
            class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
          />
        </div>
      </label>
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.title"
        :class="[inModal ? 'w-9 h-9 mr-2' : 'w-[70px] h-[70px] mr-2.5']"
      />
      <div>
        <div class="flex items-center" :class="[inModal ? '' : 'mb-2.5']">
          <div
            class="leading-tight font-semibold font-Inter mr-2.5"
            :class="[inModal ? 'text-xs' : '']"
          >
            {{ product.title }}
          </div>
          <button
            v-if="!inModal"
            class="flex text-gray-300 transition-colors duration-300 mr-2.5 hover:text-blue"
            @click="copyItems = true"
          >
            <CopyIcon class="w-5 h-5" />
          </button>
          <button
            v-if="!inModal"
            class="flex text-gray-300 transition-colors duration-300 mr-2.5 hover:text-blue"
          >
            <InfoIcon class="w-5 h-5" />
          </button>
        </div>
        <div
          v-if="product.description"
          class="text-gray-300 truncate"
          :class="[inModal ? 'text-xs' : 'text-sm mb-2.5 w-[205px]']"
        >
          {{ product.description }}
        </div>
        <div v-if="!inModal">
          <div class="text-xs leading-tight font-Inter line-through">
            $ 0,15 (100+)
          </div>
          <div class="text-sm leading-tight font-bold font-Inter text-red">
            $ 0,095 <span class="text-xs font-normal">(100+)</span>
          </div>
        </div>
      </div>
      <button
        v-if="!inModal"
        class="flex items-center justify-center w-[42px] h-[42px] bg-[#F5F5F5] rounded-full ml-auto text-gray-300 transition-colors duration-300 hover:text-blue"
        @click="deleteItem = true"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>
    <div v-if="!inModal" class="flex items-end justify-between mt-2">
      <div class="flex items-center">
        <label class="flex cursor-pointer mr-[15px]">
          <input
            :value="product.selected"
            type="checkbox"
            class="sr-only"
            @change="$emit('select')"
          />
          <div
            class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
            :class="[
              product.selected
                ? 'bg-blue border-blue group-hover:bg-white'
                : 'bg-white  border-[#D4D4D4] group-hover:border-gray-300',
            ]"
          >
            <CheckIcon
              v-if="product.selected"
              class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
            />
          </div>
        </label>
        <div class="flex items-center text-green">
          <CheckCircleIcon class="w-4 h-4 mr-1" />
          <span class="text-[11px] leading-tight font-semibold font-Inter">
            16,000 in stock
          </span>
        </div>
      </div>
      <QuantityButtons
        v-if="typeof product.quantity === 'number'"
        v-model="product.quantity"
      />
    </div>
  </div>
  <Teleport to="body">
    <Transition name="slide-from-top">
      <LayoutFavoritesModalsDelete
        v-if="deleteItem"
        :products="[product]"
        @close="deleteItem = false"
      />
    </Transition>
    <Transition name="slide-from-top">
      <LayoutFavoritesModalsCopyMoveItems
        v-if="copyItems"
        :items="[product]"
        action="copy"
        @close="copyItems = false"
      />
    </Transition>
    <Transition name="fade">
      <div
        v-if="deleteItem || copyItems"
        class="fixed z-50 top-0 left-0 w-full h-full bg-[#333333]/70 backdrop-blur-[2px] cursor-pointer"
        @click="
          deleteItem = false;
          copyItems = false;
        "
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FavoriteItem } from "~~/types";
import CheckIcon from "@/assets/icons/check.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import TrashIcon from "@/assets/icons/trash-can.svg";
import InfoIcon from "@/assets/icons/info-circle.svg";

defineProps({
  product: {
    type: Object as PropType<FavoriteItem>,
    required: true,
  },
  inModal: {
    type: Boolean,
    required: false,
  },
});

defineEmits(["select"]);

const deleteItem = ref(false);
const copyItems = ref(false);
</script>
