<template>
  <div class="relative">
    <div v-if="label" class="text-sm text-gray-300 mb-1">
      {{ label }}
    </div>
    <button
      class="flex items-center justify-between px-2.5 py-2 text-sm w-full rounded border transition-colors duration-300 focus:outline-none"
      :class="[
        error ? 'border-red' : showOptions ? 'border-blue' : 'border-border',
      ]"
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
    <Transition name="fade">
      <div
        v-if="showOptions"
        class="absolute -bottom-1 left-0 translate-y-full w-full bg-white rounded-md overflow-y-auto scrollbar-thin shadow-card px-2.5 py-[15px]"
        :class="[checkboxes ? 'max-h-[200px]' : 'max-h-[250px]']"
        v-click-outside="() => (showOptions = false)"
      >
        <div v-if="search" class="mb-[15px]">
          <div class="text-sm text-gray-300 mb-[5px]">Search {{ label }}</div>
          <label
            class="relative flex items-center border border-border rounded px-3"
          >
            <SearchIcon class="w-[18px] h-[18px] text-gray-100" />
            <input
              v-model="searchValue"
              type="search"
              :placeholder="`Search ${label}`"
              class="bg-transparent flex-1 pl-2 pr-8 py-[9px] w-full text-sm placeholder:text-gray-100 focus:outline-none"
            />
            <Transition name="fade">
              <XIcon
                v-if="searchValue"
                class="w-[18px] h-[18px] text-gray-100 cursor-pointer"
                @click="searchValue = ''"
              />
            </Transition>
          </label>
        </div>
        <template v-if="checkboxes">
          <label
            v-for="(option, index) in filteredOptions"
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
            v-for="option in filteredOptions"
            :key="option.value"
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
    </Transition>
    <Transition name="fade">
      <div
        v-if="error"
        class="absolute bottom-0 left-0 translate-y-full pointer-events-none text-[10px] leading-normal text-red"
      >
        {{ error }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FormSelectOption } from "~~/types";
import CheckIcon from "@/assets/icons/check.svg";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import SearchIcon from "@/assets/icons/search.svg";
import XIcon from "@/assets/icons/x.svg";

const props = defineProps({
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
  search: Boolean,
  error: String,
});

const emits = defineEmits(["update:modelValue"]);

const searchValue = ref("");

const showOptions = ref(false);

const filteredOptions = computed(() => {
  return props.options.filter((e) => {
    return e.label.toLowerCase().includes(searchValue.value.toLowerCase());
  });
});

const inputHandler = (option: FormSelectOption) => {
  emits("update:modelValue", option);
  showOptions.value = false;
};
</script>
