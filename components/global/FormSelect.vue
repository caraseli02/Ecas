<template>
  <div class="relative">
    <div v-if="label" class="text-sm mb-2">
      {{ label }}
    </div>
    <button
      class="flex items-center justify-between px-2.5 py-2 text-sm w-full rounded border border-[#D4D4D4] focus:outline-none"
      @click="showOptions = !showOptions"
    >
      <span
        class="text-left truncate"
        :class="{ 'text-gray-300': !modelValue }"
      >
        {{ modelValue?.label || placeholder }}
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
        <template v-if="checkboxes">
          <label
            v-for="(option, index) in options"
            :key="index"
            class="group flex items-center cursor-pointer py-3 px-2.5 transition-colors duration-300 hover:bg-[#F2F2F2] rounded-[5px]"
          >
            <input
              :value="option.value === modelValue?.value"
              :checked="option.value === modelValue?.value"
              type="radio"
              name="option"
              class="sr-only"
              @change="inputHandler(option)"
            />
            <div
              class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300 mr-2.5"
              :class="[
                option.value === modelValue?.value
                  ? 'bg-blue border-blue group-hover:bg-white'
                  : 'bg-white  border-[#D4D4D4] group-hover:border-gray-300',
              ]"
            >
              <CheckIcon
                v-if="option.value === modelValue?.value"
                class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
              />
            </div>
            <FolderIcon class="w-6 h-6 text-gray-300 mr-2" />
            <span
              class="text-sm font-Inter truncate transition-colors duration-300 group-hover:text-blue"
            >
              {{ option.label }}
            </span>
          </label>
        </template>
        <template v-else>
          <button
            v-for="(option, index) in options"
            :key="index"
            class="flex w-full px-2.5 py-3 text-left rounded-[5px] text-gray-300 transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-dark"
            :class="[option.value === modelValue?.value ? 'text-blue' : '']"
            @click="inputHandler(option)"
          >
            {{ option.label }}
          </button>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FormSelectOption } from "~~/types";
import FolderIcon from "@/assets/icons/folder.svg";
import CheckIcon from "@/assets/icons/check.svg";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";

defineProps({
  modelValue: {
    type: Object as PropType<FormSelectOption>,
    required: false,
  },
  label: String,
  placeholder: String,
  options: {
    type: Array as PropType<FormSelectOption[]>,
    required: true,
  },
  checkboxes: Boolean,
});

const emits = defineEmits(["update:modelValue"]);

const showOptions = ref(false);

const inputHandler = (option: FormSelectOption) => {
  emits("update:modelValue", option);
  showOptions.value = false;
};
</script>
