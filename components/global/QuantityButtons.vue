<template>
    <div class="flex bg-[#F5F5F5] bg-opacity-95 rounded-lg max-w-max overflow-hidden">
        <button
            :disabled="Number(modelValue) === object.min"
            class="flex items-center justify-center bg-gray-100 text-slate-500 px-2.5 transition-colors duration-300 disabled:text-border"
            :class="[size === 'sm' ? 'w-8 h-9' : 'w-[42px] h-[42px]']"
            @click="inputHandler(Number(modelValue) - 1)"
        >
            <MinusIcon class="w-6 h-6 flex-shrink-0" />
        </button>
        <label class="flex">
            <input
                v-if="modelValue > -1"
                :value="Number(modelValue) < object.min && type === OrderType.Stock ? Number(object.min) : Number(modelValue)"
                type="number"
                :min="1"
                placeholder="Quantity"
                class="bg-transparent w-[56px] px-1 text-sm leading-normal text-neutral-700 text-center placeholder:text-[12px] focus:outline-none"
                :class="[size === 'sm' ? 'h-9' : 'h-[42px]']"
                @focusout="($event) => inputHandlerModified($event)"
            />
        </label>
        <button
            class="flex items-center justify-center bg-gray-100 px-2.5"
            :class="[size === 'sm' ? 'w-8 h-9' : 'w-[42px] h-[42px]']"
            :disabled="object.max ? Number(modelValue) >= object.max : false"
            @click="inputHandler(Number(modelValue) + 1)"
        >
            <PlusIcon class="w-6 h-6 flex-shrink-0 text-slate-500" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import PlusIcon from '@/assets/icons/plus.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import { CartProductsInterface, ProductAction, ProductActionObject } from '~/model/cart/response/cart.interface';
import { UpdateProductCartRequestInterface } from '~/model/cart/request/cart.interface';
import { useNuxtApp } from '#app';
import { useCartStore } from '~/store/cartStore';
import { OrderType } from '~/types';

const { $api } = useNuxtApp();
const cartStore = useCartStore();

const props = defineProps({
    modelValue: {
        type: Number,
        required: true,
    },
    size: {
        type: String as PropType<'sm' | 'lg'>,
        required: false,
        default: 'sm',
    },
    object: {
        type: Object as PropType<ProductActionObject>,
        required: false,
        default: {} as ProductActionObject,
    },
    type: {
        type: Number,
        required: false,
    },
    updateOnlyAvailableStock: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emits = defineEmits(['update:modelValue']);
const inputHandler = async (quantity: number) => {
    emits('update:modelValue', quantity);

    if (props.object && props.object.action === ProductAction.Update) {
        const payload = {} as UpdateProductCartRequestInterface;
        let product: CartProductsInterface;
        payload.products = [];

        if (props.type === OrderType.Back) {
            product = {
                id: props.object.id,
                isFolder: false,
                backorder_stock: quantity,
            } as CartProductsInterface;
        } else {
            product = {
                id: props.object.id,
                isFolder: false,
                stock: quantity,
                updateOnlyAvailableStock: props.updateOnlyAvailableStock,
            } as CartProductsInterface;
        }

        payload.products.push(product);

        const object = await $api.cart.updateEntityFromCart(payload);

        if (object.status === 'success') {
            await cartStore.updateAndReturnCart();
        }
    }
};

const inputHandlerModified = (event: Event) => {
    const target = event.target as HTMLInputElement;

    inputHandler(Number(target.value.replace(/\D+/g, '')));

    if (parseInt(target.value) < props.object.min || !target.value) {
        inputHandler(props.object.min);
    }
};
</script>
