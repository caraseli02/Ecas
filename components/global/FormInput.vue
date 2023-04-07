<template>
  <label class="flex flex-col relative">
    <div
      v-if="label"
      class="text-sm transition-colors duration-300 mb-[5px]"
      :class="[error ? 'text-red' : 'text-gray-300']"
    >
      {{ label }}
    </div>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="bg-transparent border rounded px-2.5 py-[9px] text-sm placeholder:text-gray-100 w-full transition-colors duration-300 focus:outline-none"
      :class="[error ? 'border-red' : 'border-border focus:border-blue']"
      @input="handleInput"
    />
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
});

const emits = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits("update:modelValue", target.value);
};
</script>
