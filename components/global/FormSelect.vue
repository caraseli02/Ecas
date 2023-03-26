<template>
  <div class="relative">
    <div
      v-if="label"
      class="text-sm transition-colors duration-300 mb-2"
      :class="[error ? 'text-red' : 'text-gray-300']"
    >
      {{ label }}
    </div>
    <button
      class="flex items-center justify-between px-2.5 py-2 text-sm w-full rounded border transition-colors duration-300 focus:outline-none"
      :class="[error ? 'border-red' : 'border-border']"
      @click="showOptions = !showOptions"
    >
      <span
        class="flex items-center text-left truncate"
        :class="{
          'text-gray-300': !modelValue,
          'font-semibold text-gray-300': checkboxes,
        }"
      >
        <img
          v-if="modelValue?.icon && typeof modelValue.icon === 'string'"
          :src="modelValue.icon"
          :alt="modelValue.label"
          class="w-8 rounded mr-2"
        />
        <component
          v-else-if="modelValue?.icon"
          :is="modelValue.icon"
          class="w-6 h-6 text-gray-300 mr-2"
        />
        <span>
          {{ modelValue?.label || placeholder }}
        </span>
      </span>
      <ChevronDownIcon
        class="w-6 h-6 text-gray-300 transition-transform duration-300"
        :class="{ 'rotate-180': showOptions }"
      />
    </button>
    <transition name="fade">
      <div
        v-if="showOptions"
        class="absolute -bottom-1 left-0 translate-y-full w-full bg-white rounded-md overflow-y-auto scrollbar-thin shadow-card px-2.5 py-[15px]"
        :class="[checkboxes ? 'max-h-[200px]' : 'max-h-[250px]']"
        v-click-outside="() => (showOptions = false)"
      >
        <template v-if="checkboxes">
          <label
            v-for="(option, index) in options"
            :key="index"
            class="group flex items-center cursor-pointer py-[9px] px-2.5 transition-colors duration-300 hover:bg-[#F2F2F2] rounded-[5px]"
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
                  ? 'bg-blue border-blue '
                  : 'bg-white  border-border group-hover:border-gray-300',
              ]"
            >
              <CheckIcon
                v-if="option.value === modelValue?.value"
                class="w-4 text-white"
              />
            </div>
            <component
              v-if="option.icon"
              :is="option.icon"
              class="w-6 h-6 text-gray-300 mr-2"
            />
            <span
              class="text-sm font-Inter text-gray-300 font-semibold truncate transition-colors duration-300 group-hover:text-dark"
              :class="[option.value === modelValue?.value ? 'text-dark' : '']"
            >
              {{ option.label }}
            </span>
          </label>
        </template>
        <template v-else>
          <button
            v-for="(option, index) in options"
            :key="index"
            class="flex w-full px-2.5 py-[9px] text-left rounded-[5px] text-gray-300 transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-dark"
            :class="[option.value === modelValue?.value ? 'text-blue' : '']"
            @click="inputHandler(option)"
          >
            <img
              v-if="option?.icon && typeof option.icon === 'string'"
              :src="option?.icon"
              :alt="option.label"
              class="w-8 rounded mr-2"
            />
            <component
              v-else-if="option?.icon"
              :is="option.icon"
              class="w-6 h-6 mr-2"
            />
            <span>
              {{ option.label }}
            </span>
          </button>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FormSelectOption } from "~~/types";
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
  icon: {
    required: false,
  },
  error: String,
});

const emits = defineEmits(["update:modelValue"]);

const showOptions = ref(false);

const inputHandler = (option: FormSelectOption) => {
  emits("update:modelValue", option);
  showOptions.value = false;
};
</script>
