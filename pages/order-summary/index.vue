<template>
    <div class="pt-[30px] lg:pt-10">
        <div class="grid grid-cols-1">
            <div class="container">
                <div class="flex items-end justify-between mb-[15px]">
                    <h1 class="text-xl font-semibold">Order Summary</h1>
                    <div class="flex items-center">
                        <button
                            class="flex items-center text-gray-500 transition-colors duration-300 hover:text-blue-500 mr-[15px]">
                            <TriangleIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Report an error </span>
                        </button>
                        <button class="flex items-center text-gray-500 transition-colors duration-300 hover:text-blue-500">
                            <PrintIcon class="w-[22px] h-[22px]" />
                            <span class="text-xs leading-tight ml-[5px] max-md:hidden"> Print this page </span>
                        </button>
                    </div>
                </div>
                <div
                    class="gap-6 lg:grid lg:grid-cols-[1fr,320px] lg:gap-5 lg:items-start lg:mb-10 xl:grid-cols-[1fr,392px]">
                    <div class="flex flex-col gap-9 max-w-[976px]">
                        <OrderSummaryBackOrderWarning v-if="showWarning" />
                        <OrderSummaryTable :items="cartItems" :loading="loading" @checkAll="checkAll"
                            @addToFavs="addToFavsAll" @update-subtotal="calculateSubtotal" />
                        <div class="hidden lg:flex flex-col">
                            <OrderSummarySimilarProducts />
                            <OrderSummaryBannerImageCard class="hidden xl:flex" />
                        </div>
                    </div>
                    <div class="lg:grid lg:grid-cols-1">
                        <OrderType :items="cartItems" :account-credit="accountCredit" :order="order" />
                        <OrderSummaryNoteSection />
                        <OrderSummary :order="order" />
                        <OrderSummaryCheckoutButtons />
                        <OrderSummaryBannerCard />
                        <!-- <OrderSummaryEcxlusiveOffer class="max-lg:hidden" /> -->
                        <div class="flex flex-col">
                            <div class="flex lg:hidden">
                                <OrderSummarySimilarProducts />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <Banner />
            <NewProducts title="Hot Deals" />
            <div class="container mb-10 lg:hidden">
                <OrderSummaryEcxlusiveOffer />
            </div>
            <News /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import TriangleIcon from '@/assets/icons/triangle.svg';
import PrintIcon from '@/assets/icons/print.svg';
import { CartProductsInterface, OrderInterface } from '~/types';
import { ProductInterface } from '~/model/products/response/ProductResponse';
import { DiscountInterface } from '~/types/auth/account-settings';
import { useAuthStore } from '~/store/authStore';
import { CustomerCreditInterface } from '~/types/auth/account-settings';

useHead({
    title: 'Order Summary',
});

const showWarning = ref(() => {
    return cartItems.value.some((item: any) => item.productEntity?.stock !== undefined && item.productEntity.stock < item.stock);
});

const mockProducts = [
    {
        id: 'RSCSK3143R3D02008TSCSK38TDASDKAKSDKK342NK4N234234N23K4K24NK2N4N2K42K34N2K4234L2BH3VV243K23N4JK3V23CV42N34J4UBJ547B5',
        stock: 1,
        isFolder: true,
        initialPrice: 5,
        discountPrice: 2,
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
                    ProductImageSmall: 'https://s3-alpha-sig.figma.com/img/7d3c/615c/44d963c4cf38c99814b953510fac139f?Expires=1702252800&Signature=k6QT-9h4Y80HCnG6PLKsaPDaNiDn2aJk~Nhzx1rVhPsgKdpBSwoRvWvmEKoZEdawvduQ-aN9WR3z753gvgYweWUyiagpiQ6--3H6dMZG9ZZM3GOefZ6aETyoK80fnuRH36yKmcc1d~zu4I1GWtCYjYf3jFUGrrWlm9z3i-LG~zoTwANPbA9wcdDWiXmN9hKEBuLoxphz2tHCYXbnDNspGB~JH4DYwSY7aHHuCiqiVoE9IL2HKt43UVuT94KtxPnmxGxTmKwH0lu9iW59s-zS8d7v-epCFN8W3jFMrxaFCOYgCGQrLpWOFICp5KZPlAusgLNzbWdpg0EjVITxT0NmMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
        initialPrice: 10,
        discountPrice: 7.5,
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
                    ProductImageSmall: 'https://s3-alpha-sig.figma.com/img/7d3c/615c/44d963c4cf38c99814b953510fac139f?Expires=1702252800&Signature=k6QT-9h4Y80HCnG6PLKsaPDaNiDn2aJk~Nhzx1rVhPsgKdpBSwoRvWvmEKoZEdawvduQ-aN9WR3z753gvgYweWUyiagpiQ6--3H6dMZG9ZZM3GOefZ6aETyoK80fnuRH36yKmcc1d~zu4I1GWtCYjYf3jFUGrrWlm9z3i-LG~zoTwANPbA9wcdDWiXmN9hKEBuLoxphz2tHCYXbnDNspGB~JH4DYwSY7aHHuCiqiVoE9IL2HKt43UVuT94KtxPnmxGxTmKwH0lu9iW59s-zS8d7v-epCFN8W3jFMrxaFCOYgCGQrLpWOFICp5KZPlAusgLNzbWdpg0EjVITxT0NmMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
        stock: 1,
        isFolder: false,
        initialPrice: 10,
        discountPrice: 7.5,
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
                    ProductImageSmall: 'https://s3-alpha-sig.figma.com/img/7d3c/615c/44d963c4cf38c99814b953510fac139f?Expires=1702252800&Signature=k6QT-9h4Y80HCnG6PLKsaPDaNiDn2aJk~Nhzx1rVhPsgKdpBSwoRvWvmEKoZEdawvduQ-aN9WR3z753gvgYweWUyiagpiQ6--3H6dMZG9ZZM3GOefZ6aETyoK80fnuRH36yKmcc1d~zu4I1GWtCYjYf3jFUGrrWlm9z3i-LG~zoTwANPbA9wcdDWiXmN9hKEBuLoxphz2tHCYXbnDNspGB~JH4DYwSY7aHHuCiqiVoE9IL2HKt43UVuT94KtxPnmxGxTmKwH0lu9iW59s-zS8d7v-epCFN8W3jFMrxaFCOYgCGQrLpWOFICp5KZPlAusgLNzbWdpg0EjVITxT0NmMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
const loading = ref(true);

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
        if (item.selected) {
            item.liked = liked;
        }
    });
};

const orderItems = computed(() => {
    return cartItems.value.map((item: any) => {
        const { selected, liked, ...rest } = item;
        return rest;
    });
});

const store = useAuthStore();
const user = computed(() => store.getUserDetails);

const userId = user.value?.firebaseId;
const creditObject = ref({} as CustomerCreditInterface);

const getCustomerCredit = async () => {
    if (!userId) {
        return;
    }
    const response = await $api.controlPanel.fetchCustomerCredit(userId);

    if (response.status !== 'success') {
        setTimeout(() => {
            loading.value = false;
        }, 100);
        return;
    } else {
        setTimeout(() => {
            loading.value = false;
        }, 100);
    }

    creditObject.value = response.data;
};

await getCustomerCredit();

const accountCredit = ref({
    limit: creditObject.value?.limit,
    spent: creditObject.value?.spent,
    available: creditObject.value?.available,
    dueDate: creditObject.value?.dueDate,
    tillDue: creditObject.value?.tillDue,
    term: creditObject.value?.term,
});

const order = ref({
    total: 0,
    subtotal: 1000,
    products: orderItems.value,
    discount: {
        value: 0.25,
    },
    shippingDetails: {
        address: {
            alias: 'Home',
            name1: '5073 Mark Brown Rd',
            city: 'NE Dalton',
            region: 'Georgia (GA)',
            postcode: '30721',
            country: 'United States',
        },
        billingAddress: {
            alias: 'Home',
            name1: '5073 Mark Brown Rd',
            city: 'NE Dalton',
            region: 'Georgia (GA)',
            postcode: '30721',
            country: 'United States',
        },
    },
    paymentDetails: {
        type: null,
    },
    type: '',
    backorderOption: 0,
    deliveryMethod: 0,
});

const calculateSubtotal = () => {
    let subtotal = 0;
    orderItems.value.forEach((item) => {
        subtotal += item.discountPrice * item.stock;
    });
    order.value.subtotal = subtotal;
};

calculateSubtotal();

</script>
