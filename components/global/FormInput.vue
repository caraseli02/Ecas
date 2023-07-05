<template>
    <div class="relative" :class="[error ? 'mb-4' : '']">
        <label class="flex flex-col relative">
            <div v-if="label" class="text-sm text-gray-300 mb-1">
                {{ label }}
            </div>
            <input
                :value="modelValue"
                :type="type"
                :placeholder="placeholder"
                class="bg-transparent border rounded px-3 py-2 text-sm placeholder:text-gray-100 w-full transition-colors duration-300 focus:outline-none"
                :class="[
                    error ? 'border-red' : 'border-border focus:border-blue',
                    disabled ? 'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' : '',
                ]"
                :disabled="disabled"
                @input="handleInput"
            />
        </label>
        <Transition name="fade">
            <div v-if="error" class="absolute -bottom-1 left-0 translate-y-full pointer-events-none text-xs leading-normal text-red">
                {{ error }}
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    type: {
        type: String as PropType<'text' | 'number' | 'tel' | 'email'>,
        required: false,
        default: 'text',
    },
    label: String,
    placeholder: String,
    error: String,
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    emits('update:modelValue', target.value);
};
</script>
