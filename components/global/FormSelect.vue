<template>
  <div class="relative">
    <div v-if="label" class="text-sm font-medium mb-2">
      {{ label }}
    </div>
    <button
      class="flex items-center justify-between px-2.5 py-2 text-sm w-full rounded border border-[#D4D4D4] focus:outline-none"
      @click="showOptions = !showOptions"
    >
      <span
        class="text-left truncate"
        :class="{ 'text-mainGray/50': !modelValue }"
      >
        {{ modelValue || placeholder }}
      </span>
      <ChevronDownIcon
        class="w-6 h-6 text-gray-300 transition-transform duration-300"
        :class="{ 'rotate-180': showOptions }"
      />
    </button>
    <transition name="fade">
      <div
        v-if="showOptions"
        class="absolute -bottom-1 left-0 translate-y-full w-full bg-white rounded-md max-h-[250px] overflow-y-auto shadow-card px-2.5 py-[15px]"
        v-click-outside="() => (showOptions = false)"
      >
        <button
          v-for="option in options"
          :key="option"
          class="flex w-full px-2.5 py-3 text-left rounded-[5px] text-gray-300 transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-dark"
          :class="[option === modelValue ? 'text-blue' : '']"
          @click="inputHandler(option)"
        >
          {{ option }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";

defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: String,
  placeholder: String,
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const showOptions = ref(false);

const inputHandler = (option: string) => {
  emits("update:modelValue", option);
  showOptions.value = false;
};
</script>
