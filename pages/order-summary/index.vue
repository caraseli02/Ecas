<template>
    <div class="pt-[30px] lg:pt-10">
        <div class="grid grid-cols-1">
            <div class="container">
                <div class="flex items-end justify-between mb-[15px]">
                    <h1 class="text-xl font-semibold">Order Summary</h1>
                    <div class="flex items-center">
                        <button
                            class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue mr-[15px]">
                            <TriangleIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Report an error </span>
                        </button>
                        <button class="flex items-center text-gray-100 transition-colors duration-300 hover:text-blue">
                            <PrintIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Print this page </span>
                        </button>
                    </div>
                </div>
                <div class="lg:grid lg:grid-cols-[1fr,310px] lg:gap-5 lg:items-start lg:mb-10 xl:grid-cols-[1fr,340px]">
                    <OrderSummaryTable :items="cartItems" :loading="loading" @checkAll="checkAll" @addToFavs="addToFavsAll" />
                    <div class="lg:grid lg:grid-cols-1">
                        <OrderSummary />
                        <OrderSummaryEcxlusiveOffer class="max-lg:hidden" />
                    </div>
                </div>
            </div>
            <Banner />
            <NewProducts title="Hot Deals" />
            <div class="container mb-10 lg:hidden">
                <OrderSummaryEcxlusiveOffer />
            </div>
            <News />
        </div>
    </div>
</template>

<script setup lang="ts">
import TriangleIcon from '@/assets/icons/triangle.svg';
import PrintIcon from '@/assets/icons/print.svg';
import { CartProductsInterface } from '~/types';
import { ProductInterface } from '~/model/products/response/ProductResponse';
import { DiscountInterface } from '~/types/auth/account-settings';
import CheckBoxAll from '~/components/shared/tables/micro/CheckBoxAll.vue';

useHead({
    title: 'Order Summary',
});

interface CartItemInterface {
    id: string;
    stock: number;
    isFolder: boolean;
    initialPrice: number;
    discountPrice: number;
    discount: DiscountInterface;
    productEntity: ProductInterface;
    liked: boolean;
    selected: boolean;
}


const mockProducts = [
    {
        id: 'RSCSK3143R3D02008TSCSK38TDASDKAKSDKK342NK4N234234N23K4K24NK2N4N2K42K34N2K4234L2BH3VV243K23N4JK3V23CV42N34J4UBJ547B5',
        stock: 95000,
        isFolder: true,
        initialPrice: 104,
        discountPrice: 98,
        discount: {
            value: 6,
            startDate: '2021-09-01T00:00:00.000Z',
            endDate: '2021-09-30T00:00:00.000Z',
        } as DiscountInterface,
        productEntity: {
            stock: 0,
            priceRon: 9,
            details: {
                ProductImage: {
                    ProductImageSmall: 'https://s3-alpha-sig.figma.com/img/e56e/9346/144e461edd7834604628f2e3ae156b7b?Expires=1701043200&Signature=qxY85cJbNFF~kBxuztQ85C4qJheuDZEg4x7I1HM8LtrM6xopbKw-VukCJBxVEx4M5uPtjGDiOOsMwoMjzubh11HmNEOYgIqLzn1hbuGMXwMgkt3M0F3VtRhSGQd2faa0DjGg9xA2XTv6j8LLC-S5GSS6YTBVYPD6sG54OAkO2L5yFy-5POv5JT~Vf-52Me2D7e8lUMho8NN7zZhkU9tob9otzUV2HBeSBpo4bYvpDGV5bUC27qmD7zL1iFVZ~b3eSgpft-2hkJvAaDL1iNqead7sHbHcHzq72iu7OHbJQYryebRXWBVgDniCChFnRx9NvzlmmXDRKLRzdPvAZxxEfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
                },
                SummaryData: {
                    PartDescription: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW',
                    Manufacturer: 'Panasonic',
                },
            },
        } as ProductInterface,
    },
    {
        id: 'CSMSK3143R3D02008TSCSK38FGN13KKLKLKL45N6KN34L5KL23NLK2N3K4NKLN34LK1NK5LN45LK765KV7GCG7C45VHKJN3K4N5K2N342V46G5C47G4C7',
        stock: 1,
        isFolder: true,
        initialPrice: 124,
        discountPrice: 92,
        discount: {
            value: 0,
            startDate: '2021-09-01T00:00:00.000Z',
            endDate: '2021-09-30T00:00:00.000Z',
        } as DiscountInterface,
        productEntity: {
            stock: 2,
            priceRon: 92,
            details: {
                ProductImage: {
                    ProductImageSmall: 'https://s3-alpha-sig.figma.com/img/e56e/9346/144e461edd7834604628f2e3ae156b7b?Expires=1701043200&Signature=qxY85cJbNFF~kBxuztQ85C4qJheuDZEg4x7I1HM8LtrM6xopbKw-VukCJBxVEx4M5uPtjGDiOOsMwoMjzubh11HmNEOYgIqLzn1hbuGMXwMgkt3M0F3VtRhSGQd2faa0DjGg9xA2XTv6j8LLC-S5GSS6YTBVYPD6sG54OAkO2L5yFy-5POv5JT~Vf-52Me2D7e8lUMho8NN7zZhkU9tob9otzUV2HBeSBpo4bYvpDGV5bUC27qmD7zL1iFVZ~b3eSgpft-2hkJvAaDL1iNqead7sHbHcHzq72iu7OHbJQYryebRXWBVgDniCChFnRx9NvzlmmXDRKLRzdPvAZxxEfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
                },
                SummaryData: {
                    PartDescription: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW',
                    Manufacturer: 'General Electric',
                },
            }
        } as ProductInterface,
    },
    {
        id: 'RSCSK3143R3D02008TSCSK38TD',
        stock: 56,
        isFolder: false,
        initialPrice: 160,
        discountPrice: 101,
        discount: {
            value: 36,
            startDate: '2021-09-01T00:00:00.000Z',
            endDate: '2021-09-30T00:00:00.000Z',
        } as DiscountInterface,
        productEntity: {
            stock: 98,
            priceRon: 101,
            details: {
                ProductImage: {
                    ProductImageSmall: 'https://s3-alpha-sig.figma.com/img/e56e/9346/144e461edd7834604628f2e3ae156b7b?Expires=1701043200&Signature=qxY85cJbNFF~kBxuztQ85C4qJheuDZEg4x7I1HM8LtrM6xopbKw-VukCJBxVEx4M5uPtjGDiOOsMwoMjzubh11HmNEOYgIqLzn1hbuGMXwMgkt3M0F3VtRhSGQd2faa0DjGg9xA2XTv6j8LLC-S5GSS6YTBVYPD6sG54OAkO2L5yFy-5POv5JT~Vf-52Me2D7e8lUMho8NN7zZhkU9tob9otzUV2HBeSBpo4bYvpDGV5bUC27qmD7zL1iFVZ~b3eSgpft-2hkJvAaDL1iNqead7sHbHcHzq72iu7OHbJQYryebRXWBVgDniCChFnRx9NvzlmmXDRKLRzdPvAZxxEfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
                },
                SummaryData: {
                    PartDescription: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW',
                    Manufacturer: 'Siemens',
                },
            }
        } as ProductInterface,
    },
];

const { $api } = useNuxtApp();
const loading = ref(false);

const cartItems = ref([] as CartProductsInterface[]);
const fetchCartItems = async () => {
    try {
        loading.value = true;
        const response = await $api.cart.fetchCartProducts();
        if (response.status === 'success') {
            let products: CartProductsInterface[] = [];
            // response.data.products.forEach((product: string) => {
            //     products.push(JSON.parse(product));
            // });
            products = mockProducts;
            cartItems.value = products.map((product: CartProductsInterface) => {
                return {
                    id: product.id,
                    stock: product.stock,
                    isFolder: product.isFolder,
                    initialPrice: product.initialPrice,
                    discountPrice: product.discountPrice,
                    discount: product.discount,
                    productEntity: product.productEntity,
                    liked: false,
                    selected: false,
                };
            });
        }
        else {
            console.log('error');
        }
    } catch {
        console.log('error');
    }
};

await fetchCartItems().then(() => loading.value = false);

const checkAll = (checked: boolean) => {
    cartItems.value.forEach((item: any) => {
        item.selected = checked;
    });
};

const addToFavsAll = (liked: boolean) => {
    cartItems.value.forEach((item: any) => {
        item.liked = liked;
    });
};

</script>
