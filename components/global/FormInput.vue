<template>
  <label class="flex flex-col relative">
    <div
      v-if="label"
      class="text-sm transition-colors duration-300 mb-[5px]"
      :class="[error ? 'text-red' : 'text-gray-300']"
    >
      {{ label }}
      <abbr v-if="mandatory" title="required" class="text-red">*</abbr>
    </div>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="bg-transparent border rounded px-2.5 py-[9px] text-sm placeholder:text-gray-100 w-full transition-colors duration-300 focus:outline-none mb-3"
      :class="[error ? 'border-red' : 'border-border focus:border-blue', disabled ? 'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' : '']"
      @input="handleInput"
      :disabled="disabled"
    />
    <p class="text-rose-500 text-xs italic" v-if="error">{{ error }}</p>
  </label>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<"text" | "number" | "tel" | "email">,
    required: false,
    default: "text",
  },
  label: String,
  placeholder: String,
  error: String,
  disabled: {
    type: Boolean,
    default: false
  },
  mandatory: {
    type: Boolean,
    default: true,
    required: false
  
});

const emits = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits("update:modelValue", target.value);
};
</script>
