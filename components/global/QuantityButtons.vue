<template>
    <div class="flex bg-[#F5F5F5] bg-opacity-95 rounded-lg max-w-max overflow-hidden">
        <button
            :disabled="modelValue === 0"
            class="flex items-center justify-center bg-gray-200 text-gray-300 px-2.5 transition-colors duration-300 disabled:text-border"
            :class="[size === 'sm' ? 'w-8 h-9' : 'w-[42px] h-[42px]']"
            @click="inputHandler(modelValue - 1)"
        >
            <MinusIcon class="w-6 h-6 flex-shrink-0" />
        </button>
        <label class="flex">
            <input
                :value="modelValue"
                type="number"
                :min="0"
                placeholder="Quantity"
                class="bg-transparent w-[56px] px-1 text-sm leading-normal text-dark text-center placeholder:text-[12px] focus:outline-none"
                :class="[size === 'sm' ? 'h-9' : 'h-[42px]']"
                @input="($event) => inputHandlerModified($event)"
            />
        </label>
        <button
            class="flex items-center justify-center bg-gray-200 px-2.5"
            :class="[size === 'sm' ? 'w-8 h-9' : 'w-[42px] h-[42px]']"
            @click="inputHandler(modelValue + 1)"
        >
            <PlusIcon class="w-6 h-6 flex-shrink-0 text-gray-300" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import PlusIcon from '@/assets/icons/plus.svg';
import MinusIcon from '@/assets/icons/minus.svg';

defineProps({
    modelValue: {
        type: Number,
        required: true,
    },
    size: {
        type: String as PropType<'sm' | 'lg'>,
        required: false,
        default: 'sm',
    },
});

const emits = defineEmits(['update:modelValue']);

const inputHandler = (quantity: number) => {
    emits('update:modelValue', quantity);
};

const inputHandlerModified = (event: Event) => {
    const target = event.target as HTMLInputElement;
    inputHandler(Number(target.value.replace(/\D+/g, '')));

    if (parseInt(target.value) < 0 || !target.value) {
        inputHandler(0);
    }
};
</script>
