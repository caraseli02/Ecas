<template>
  <label class="relative">
    <div v-if="label" class="text-sm text-gray-300 mb-[5px]">
      {{ label }}
    </div>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="bg-transparent border border-[#D4D4D4] rounded px-2.5 py-[9px] text-sm placeholder:text-gray-100 w-full focus:outline-none"
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
});

const emits = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits("update:modelValue", target.value);
};
</script>
