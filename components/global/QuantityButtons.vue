<template>
  <div class="flex bg-[#F5F5F5] bg-opacity-95 rounded-lg max-w-max overflow-hidden">
    <button
        :disabled="modelValue === object.min"
        class="flex items-center justify-center bg-gray-200 text-gray-300 px-2.5 transition-colors duration-300 disabled:text-border"
        :class="[size === 'sm' ? 'w-8 h-9' : 'w-[42px] h-[42px]']"
        @click="inputHandler(modelValue - 1);minShow()"
    >
      <MinusIcon class="w-6 h-6 flex-shrink-0"/>
    </button>
    <label class="flex">
      <input
          :value="modelValue < 1 ? Number(1) : modelValue"
          type="number"
          :min="1"
          placeholder="Quantity"
          class="bg-transparent w-[56px] px-1 text-sm leading-normal text-dark text-center placeholder:text-[12px] focus:outline-none"
          :class="[size === 'sm' ? 'h-9' : 'h-[42px]']"
          @focusout="($event) => inputHandlerModified($event)"
      />
    </label>
    <button
        class="flex items-center justify-center bg-gray-200 px-2.5"
        :class="[size === 'sm' ? 'w-8 h-9' : 'w-[42px] h-[42px]']"
        @click="inputHandler(modelValue + 1)"
    >
      <PlusIcon class="w-6 h-6 flex-shrink-0 text-gray-300"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import {PropType} from 'vue';
import PlusIcon from '@/assets/icons/plus.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import {CartProductsInterface, ProductAction, ProductActionObject} from '~/model/cart/response/cart.interface';
import {UpdateProductCartRequestInterface} from '~/model/cart/request/cart.interface';
import {useNuxtApp} from '#app';
import Emitter from 'tiny-emitter/instance.js';

const {$api} = useNuxtApp();

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
});

const emits = defineEmits(['update:modelValue']);
const inputHandler = async (quantity: number) => {
  emits('update:modelValue', quantity);

  if (props.object) {
    if (props.object.action === ProductAction.Update) {
      const payload = {} as UpdateProductCartRequestInterface;
      payload.products = [];

      const product = {
        id: props.object.id,
        isFolder: false,
        stock: quantity,
      } as CartProductsInterface;

      payload.products.push(product);

      const object = await $api.cart.updateEntityFromCart(payload);

      if (object.status === 'success') {
        const {data} = await $api.cart.fetchCartList();
        Emitter.emit('update-cart', data);
      }
    }
  }
};

const inputHandlerModified = (event: Event) => {
  const target = event.target as HTMLInputElement;

  inputHandler(Number(target.value.replace(/\D+/g, '')));

  if (parseInt(target.value) < 1 || !target.value) {
    inputHandler(1);
  }
};

const minShow = () => {
  console.log(props.object?.min)
}
</script>