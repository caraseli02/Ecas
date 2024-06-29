<template>
    <div class="bg-white rounded-md shadow-xs py-6 px-8">
        <div class="flex flex-col items-center mb-[13px] px-[15px] md:px-2.5">
            <QuickBuyIcon class="mr-2" />
            <h2 class="text-3xl font-semibold">Quick Buy</h2>
        </div>
        <p class="text-xs text-center text-slate-500 px-[15px] mb-6 md:px-2.5 md:mb-[15px] lg:mb-6 xl:text-sm xl:mb-[24px]">
            Are you in a hurry? Use the Quick Buy feature!
        </p>
        <UiDialog>
            <UiDialogTrigger as-child>
                <div class="flex gap-2.5 py-3">
                    <button class="flex items-center justify-center flex-1 bg-blue-500 rounded-lg text-white py-2"
                        @click="addToCart()">
                        <CartIcon class="w-6 h-6 mr-2" />
                        <span class="text-sm font-medium">Add to cart</span>
                    </button>
                </div>
            </UiDialogTrigger>
            <UiDialogContent class="max-w-[358px] sm:max-w-[640px] rounded-lg">
                <UiDialogHeader>
                    <UiDialogTitle>Quick buy</UiDialogTitle>
                </UiDialogHeader>
                <div class="grid gap-4 py-4">
                    <QuickBuyInput v-for="(product, index) in products" :key="index" :index="index" :code="product.code"
                        :quantity="product.quantity" @update-product="updateProduct" />
                </div>
                <UiDialogFooter class="w-full">
                    <div class="flex gap-2.5 w-full">
                        <UiButton variant="secondary" @click="addProduct">
                            <PlusIcon class="w-5 h-5" />
                        </UiButton>
                        <UiButton class="w-full" @click="addToCart()">
                            <CartIcon class="w-6 h-6 mr-2" />
                            <span class="text-sm font-medium">Add to cart</span>
                        </UiButton>
                    </div>
                </UiDialogFooter>
            </UiDialogContent>
        </UiDialog>
    </div>
</template>
  
<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';
import QuickBuyIcon from '@/assets/icons/quick-buy-2.svg';
import CartIcon from '@/assets/icons/cart.svg';
import { ref, onMounted } from 'vue';
import { AddToCartRequestInterface } from '~/model/cart/request/cart.interface';
import { useNuxtApp } from '#app';
import { type CartProductsInterface } from '~/model/cart/response/cart.interface';
import { useCartStore } from '~/store/cartStore';
import { QuickBuyItem } from '~/types/product';

const { $api } = useNuxtApp();
const cartStore = useCartStore();
const products = ref<Omit<QuickBuyItem, 'index'>[]>([
    { code: '', quantity: 1 },
    { code: '', quantity: 1 }
]);

const updateProduct = (payload: QuickBuyItem) => {
    products.value[payload.index].code = payload.code;
    products.value[payload.index].quantity = payload.quantity;
};

const addProduct = () => {
    products.value.push({ code: '', quantity: 1 });
};

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
        products.value.push({ code: '', quantity: 1 });
    }
});
</script>
  