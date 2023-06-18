<template>
  <label
    class="flex relative border border-border bg-white rounded-lg overflow-hidden transition-colors duration-300 focus-within:border-blue"
    :class="[size === 'lg' ? 'h-11' : 'h-9']"
  >
    <input
      :value="modelValue"
      type="search"
      :placeholder="placeholder"
      class="flex w-full px-3 pr-10 text-sm bg-white leading-[1.6] text-gray-300 placeholder:text-gray-100 font-normal placeholder:font-normal transition-colors duration-300 focus:outline-none focus:border-blue"
      :class="[size === 'lg' ? 'py-2.5 h-11' : 'py-1.5 h-9']"
      @input="handleInput"
    />
    <XIcon
      v-if="modelValue"
      class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-300 cursor-pointer"
      @click="$emit('update:modelValue', '')"
    />
    <SearchIcon
      v-else
      class="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-100"
    />
  </label>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/icons/dashboard/search.svg";
import XIcon from "@/assets/icons/dashboard/x.svg";
import { PropType } from "vue";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: String,
  error: String,
  size: {
    type: String as PropType<"lg" | "sm">,
    required: false,
    default: "lg",
  },
});

const emits = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits("update:modelValue", target.value);
};
</script>
