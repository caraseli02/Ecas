<template>
    <div class="bg-white rounded-md pt-5 pb-[25px] shadow-xs md:px-[5px] md:pb-5 lg:pb-[25px]">
        <div class="flex items-center mb-[13px] px-[15px] md:px-2.5">
            <QuickBuyIcon class="w-[30px] h-[30px] mr-2" />
            <h2 class="text-xl font-semibold">Quick Buy</h2>
        </div>
        <p class="text-xs text-slate-500 px-[15px] mb-6 md:px-2.5 md:mb-[15px] lg:mb-6 xl:text-sm xl:mb-[30px]">
            Are you in a hurry? Use the Quick Buy feature!
        </p>
        <div
            class="grid grid-cols-1 gap-2.5 mb-[25px] max-h-[146px] overflow-y-auto scrollbar-thin px-[15px] md:px-2.5 md:mb-6 md:max-h-[94px] xl:mb-8"
        >
            <div v-for="(product, index) in products" :key="index" class="flex gap-2.5">
                <label class="bg-[#F2F2F2] rounded-md flex-1">
                    <input
                        v-model="product.code"
                        type="text"
                        placeholder="Product code"
                        class="bg-transparent w-full px-2.5 py-2.5 text-sm leading-normal text-slate-500 placeholder:text-slate-500 focus:outline-none"
                    />
                </label>
                <QuantityButtons v-model="product.quantity" size="lg" :object="{action : 'add', id: product.code} as ProductActionObject" />
            </div>
        </div>
        <div class="flex gap-2.5 px-[15px] md:px-2.5">
            <button
                class="flex items-center justify-center w-[42px] h-[42px] rounded bg-[#F2F2F2]"
                @click="
                    products.push({
                        code: '',
                        quantity: 1,
                    })
                "
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" class="w-5 h-5 text-slate-500">
                    <g clip-path="url(#clip0_209_83)">
                        <path
                            fill="#5E6278"
                            d="M21.214 11c0 .653-.526 1.178-1.179 1.178h-7.857v7.858a1.18 1.18 0 0 1-2.357 0v-7.858H1.964a1.178 1.178 0 1 1 0-2.357H9.82V1.964a1.178 1.178 0 0 1 2.357 0v7.857h7.857c.653 0 1.179.53 1.179 1.179Z"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_209_83">
                            <path fill="#fff" d="M0 0h22v22H0z" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
            <button class="flex items-center justify-center flex-1 bg-blue-500 rounded text-white py-2" @click="addToCart()">
                <CartIcon class="w-6 h-6 mr-2" />
                <span class="text-sm font-medium">Add to cart</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import QuickBuyIcon from '@/assets/icons/quick-buy-2.svg';
import CartIcon from '@/assets/icons/cart.svg';
import { AddToCartRequestInterface } from '~/model/cart/request/cart.interface';
import { useNuxtApp } from '#app';
import ProductActionObject, { CartProductsInterface } from '~/model/cart/response/cart.interface';
import { useCartStore } from '~/store/cartStore';

const { $api } = useNuxtApp();

const cartStore = useCartStore();

const products = ref([
    {
        code: '',
        quantity: 1,
    },
    {
        code: '',
        quantity: 1,
    },
]);

const addToCart = async () => {
    const productsPayload: CartProductsInterface[] = [];

    for (const product of products.value) {
        if (product.code) {
            productsPayload.push({ id: product.code, stock: product.quantity, isFolder: false });
        }
    }

    const payload: AddToCartRequestInterface = {
        userId: '',
        products: productsPayload,
    };

    const object = await $api.cart.addEntityToCart(payload);

    if (object.status === 'success') {
        await cartStore.updateAndReturnCart();
    }
};

onMounted(() => {
    if (window.innerWidth < 768) {
        products.value.push({
            code: '',
            quantity: 1,
        });
    }
});
</script>