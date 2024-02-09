<template>
    <div class="flex flex-col flex-1 max-w-full h-full">
        <div class="py-4 px-4 flex-1 h-full overflow-y-auto overscroll-contain scrollbar-thin max-h-vh md:py-6">
            <div class="grid grid-cols-1 gap-4">
                <LayoutFavoritesCartModalFavoritesProductItem v-for="(item, index) in items" :key="item.id" :product="item" in-cart />
            </div>
        </div>
        <div
            class="px-4 pt-4 pb-6 md:p-6"
            :style="{
                boxShadow: '0px 0px 8px 0px rgba(133, 133, 133, 0.25)',
            }"
        >
            <div class="flex items-center justify-between leading-[1.25] font-semibold mb-4 md:text-xl md:leading-[1.2] md:mb-6">
                <div>Subtotal</div>
                <div class="text-right">$ {{ totalCartPrice.toFixed(2) }}</div>
            </div>
            <NuxtLink
                class="flex items-center justify-center gap-2 bg-blue-500 text-white rounded-lg px-[15px] py-2 leading-[1.75] font-medium w-full"
                :to="'/order-summary'"
                @click="$emit('close')"
            >
                <CartIcon class="w-6 h-6" />
                <span> Go to Checkout </span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import CartIcon from '@/assets/icons/cart.svg';
import { CartInterface, CartProductsInterface } from '~/model/cart/response/cart.interface';
import Emitter from 'tiny-emitter/instance.js';
import { PropType } from 'vue';
import { parseProductPriceConfiguration } from '~/helpers/prices.helper';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { FavoriteItem } from '~/types';

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

const items = ref<CartProductsInterface[]>([] as CartProductsInterface[]);
const cart = ref<CartProductsInterface[]>([] as CartProductsInterface[]);

defineEmits(['close']);

const props = defineProps({
    data: {
        type: Object as PropType<CartInterface>,
        required: true,
    },
});

const totalCartPrice = ref(0);

watch(
    [items],
    ([_items]) => {
        calculateTotalCartPrice(_items);
    },
    { deep: true }
);

const calculateTotalCartPrice = (items: CartProductsInterface[]) => {
    totalCartPrice.value = 0;

    items.forEach((cartProduct: CartProductsInterface) => {
        if (!cartProduct.productEntity) {
            return;
        }

        const discountsHelper = parseProductPriceConfiguration(
            cartProduct.productEntity,
            getUserDetails.value,
            (cartProduct as unknown as FavoriteItem).quantity
        );
        const discountPrice = discountsHelper?.currentConfigurationDiscountPrice || 0;

        totalCartPrice.value += Number(discountPrice) * Number((cartProduct as unknown as FavoriteItem).quantity);
    });
};

const fetchList = async () => {
    cart.value = props.data.products;
    mapCartItems(cart.value);
};

Emitter.on('delete-product-item', async (object: { id: string }) => {
    cart.value = cart.value.filter((product) => product.id !== object.id);
    mapCartItems(cart.value);
});

const mapCartItems = (cart: CartProductsInterface[]) => {
    items.value = cart.map((item: CartProductsInterface) => ({
        id: item.id,
        type: item.isFolder ? 'folder' : 'product',
        quantity: Number(item.stock),
        title: item.productEntity?.alias,
        description: item.productEntity?.description,
        image: item.productEntity?.details.ProductImage.ProductImageSmall,
        productEntity: item.productEntity,
    }));
};

await fetchList();
calculateTotalCartPrice(items.value);
</script>