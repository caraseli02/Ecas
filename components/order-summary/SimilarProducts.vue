<template>
    <div class="flex flex-col gap-6 pb-6">
        <div class="flex w-full">
            <span class="text-neutral-700 text-xl font-semibold leading-7">Similar Products</span>
        </div>
        <div
            class="max-h-[350px] max-w-[976px] w-[358px] sm:w-[608px] md:w-[736px] lg:w-[636px] xl:w-[976px] 2xl:w-[1024px]">
            <Swiper :modules="[A11y, Pagination, Autoplay]" :autoplay="{
                delay: 5000,
            }" :slides-per-view="viewsPerSlide" :space-between="24" :grab-cursor="true" :pagination="{
    bulletElement: 'button',
    clickable: true,
}" class="orderSummaryExclusiveOffer--swiper">
                <SwiperSlide v-for="(item, index) in slides" :key="index">
                    <div class="mb-10 mt-1 flex items-center justify-center">
                        <OrderSummaryProductCard :item="item" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>

<script setup lang="ts">
import { A11y, Autoplay, Pagination } from 'swiper';
import { ProductInterface } from '@/model/products/response/ProductResponse';

const slides = ref([
    {
        alias: 'ADGN2999BCPZ3577XKRT',
        stock: 10,
        details: {
            ProductImage: {
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/7d3c/615c/44d963c4cf38c99814b953510fac139f?Expires=1702252800&Signature=k6QT-9h4Y80HCnG6PLKsaPDaNiDn2aJk~Nhzx1rVhPsgKdpBSwoRvWvmEKoZEdawvduQ-aN9WR3z753gvgYweWUyiagpiQ6--3H6dMZG9ZZM3GOefZ6aETyoK80fnuRH36yKmcc1d~zu4I1GWtCYjYf3jFUGrrWlm9z3i-LG~zoTwANPbA9wcdDWiXmN9hKEBuLoxphz2tHCYXbnDNspGB~JH4DYwSY7aHHuCiqiVoE9IL2HKt43UVuT94KtxPnmxGxTmKwH0lu9iW59s-zS8d7v-epCFN8W3jFMrxaFCOYgCGQrLpWOFICp5KZPlAusgLNzbWdpg0EjVITxT0NmMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            },
            SummaryData: {
                PartDescription: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW',
                Manufacturer: 'Panasonic',
            },
        },
        priceRon: 0.5,
        adminSettings: {
            discount: {
                value: 0,
            },
        },
    },
    {
        alias: 'MTIF2999BCPZ3577RTDF',
        stock: 85,
        details: {
            ProductImage: {
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/7d3c/615c/44d963c4cf38c99814b953510fac139f?Expires=1702252800&Signature=k6QT-9h4Y80HCnG6PLKsaPDaNiDn2aJk~Nhzx1rVhPsgKdpBSwoRvWvmEKoZEdawvduQ-aN9WR3z753gvgYweWUyiagpiQ6--3H6dMZG9ZZM3GOefZ6aETyoK80fnuRH36yKmcc1d~zu4I1GWtCYjYf3jFUGrrWlm9z3i-LG~zoTwANPbA9wcdDWiXmN9hKEBuLoxphz2tHCYXbnDNspGB~JH4DYwSY7aHHuCiqiVoE9IL2HKt43UVuT94KtxPnmxGxTmKwH0lu9iW59s-zS8d7v-epCFN8W3jFMrxaFCOYgCGQrLpWOFICp5KZPlAusgLNzbWdpg0EjVITxT0NmMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            },
            SummaryData: {
                PartDescription: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW',
                Manufacturer: 'Panasonic',
            },
        },
        priceRon: 0.5,
        adminSettings: {
            discount: {
                value: 0.5,
            },
        },
    },
    {
        alias: 'GOWE2999BCPZ3577NPRT',
        stock: 100,
        details: {
            ProductImage: {
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/7d3c/615c/44d963c4cf38c99814b953510fac139f?Expires=1702252800&Signature=k6QT-9h4Y80HCnG6PLKsaPDaNiDn2aJk~Nhzx1rVhPsgKdpBSwoRvWvmEKoZEdawvduQ-aN9WR3z753gvgYweWUyiagpiQ6--3H6dMZG9ZZM3GOefZ6aETyoK80fnuRH36yKmcc1d~zu4I1GWtCYjYf3jFUGrrWlm9z3i-LG~zoTwANPbA9wcdDWiXmN9hKEBuLoxphz2tHCYXbnDNspGB~JH4DYwSY7aHHuCiqiVoE9IL2HKt43UVuT94KtxPnmxGxTmKwH0lu9iW59s-zS8d7v-epCFN8W3jFMrxaFCOYgCGQrLpWOFICp5KZPlAusgLNzbWdpg0EjVITxT0NmMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            },
            SummaryData: {
                PartDescription: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW',
                Manufacturer: 'Panasonic',
            },
        },
        priceRon: 0.5,
        adminSettings: {
            discount: {
                value: 0,
            },
        },
    },
    {
        alias: 'AKTC2999BCPZ3577FRBY',
        stock: 5,
        details: {
            ProductImage: {
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/7d3c/615c/44d963c4cf38c99814b953510fac139f?Expires=1702252800&Signature=k6QT-9h4Y80HCnG6PLKsaPDaNiDn2aJk~Nhzx1rVhPsgKdpBSwoRvWvmEKoZEdawvduQ-aN9WR3z753gvgYweWUyiagpiQ6--3H6dMZG9ZZM3GOefZ6aETyoK80fnuRH36yKmcc1d~zu4I1GWtCYjYf3jFUGrrWlm9z3i-LG~zoTwANPbA9wcdDWiXmN9hKEBuLoxphz2tHCYXbnDNspGB~JH4DYwSY7aHHuCiqiVoE9IL2HKt43UVuT94KtxPnmxGxTmKwH0lu9iW59s-zS8d7v-epCFN8W3jFMrxaFCOYgCGQrLpWOFICp5KZPlAusgLNzbWdpg0EjVITxT0NmMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            },
            SummaryData: {
                PartDescription: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW',
                Manufacturer: 'Panasonic',
            },
        },
        priceRon: 0.5,
        adminSettings: {
            discount: {
                value: 0.5,
            },
        },
    },
    {
        alias: 'QLVB2999BCPZ3577PXDF',
        stock: 2346,
        details: {
            ProductImage: {
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/7d3c/615c/44d963c4cf38c99814b953510fac139f?Expires=1702252800&Signature=k6QT-9h4Y80HCnG6PLKsaPDaNiDn2aJk~Nhzx1rVhPsgKdpBSwoRvWvmEKoZEdawvduQ-aN9WR3z753gvgYweWUyiagpiQ6--3H6dMZG9ZZM3GOefZ6aETyoK80fnuRH36yKmcc1d~zu4I1GWtCYjYf3jFUGrrWlm9z3i-LG~zoTwANPbA9wcdDWiXmN9hKEBuLoxphz2tHCYXbnDNspGB~JH4DYwSY7aHHuCiqiVoE9IL2HKt43UVuT94KtxPnmxGxTmKwH0lu9iW59s-zS8d7v-epCFN8W3jFMrxaFCOYgCGQrLpWOFICp5KZPlAusgLNzbWdpg0EjVITxT0NmMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            },
            SummaryData: {
                PartDescription: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW',
                Manufacturer: 'Panasonic',
            },
        },
        priceRon: 0.5,
        adminSettings: {
            discount: {
                value: 0,
            },
        },
    },
] as ProductInterface[]);

const screenWidth = ref(0);

const viewport = useViewport()

if (viewport.breakpoint.value === 'xs') {
    screenWidth.value = 390;
} else if (viewport.breakpoint.value === 'sm') {
    screenWidth.value = 640;
} else if (viewport.breakpoint.value === 'md') {
    screenWidth.value = 768;
} else if (viewport.breakpoint.value === 'lg') {
    screenWidth.value = 1024;
} else if (viewport.breakpoint.value === 'xl') {
    screenWidth.value = 1280;
} else if (viewport.breakpoint.value === '2xl') {
    screenWidth.value = 1440;
} else {
    screenWidth.value = 390;
}

watch(viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
    if (newBreakpoint === 'xs') {
        screenWidth.value = 390;
    } else if (newBreakpoint === 'sm') {
        screenWidth.value = 640;
    } else if (newBreakpoint === 'md') {
        screenWidth.value = 768;
    } else if (newBreakpoint === 'lg') {
        screenWidth.value = 1024;
    } else if (newBreakpoint === 'xl') {
        screenWidth.value = 1280;
    } else if (newBreakpoint === '2xl') {
        screenWidth.value = 1440;
    } else {
        screenWidth.value = 390;
    }
})

const viewsPerSlide = computed(() => {
    if (screenWidth.value < 390) {
        return 1;
    } else if (screenWidth.value < 640) {
        return 1;
    } else if (screenWidth.value < 768) {
        return 2;
    } else if (screenWidth.value < 1024) {
        return 2;
    } else if (screenWidth.value < 1280) {
        return 2;
    } else if (screenWidth.value < 1440) {
        return 3;
    } else {
        return 3;
    }
});
</script>

<style lang="scss">
.orderSummaryExclusiveOffer--swiper .swiper-pagination {
    @apply bottom-[15px] space-x-1.5 md:space-x-2 lg:left-1/2 lg:-translate-x-1/2 translate-y-4 #{!important};
}

.orderSummaryExclusiveOffer--swiper .swiper-pagination-bullet {
    @apply w-1.5 h-1.5 bg-[#EBEBEB] rounded-full opacity-100 m-0 transition-all duration-300 md:w-2 md:h-2 #{!important};
    margin-right: 0 !important;
}

.orderSummaryExclusiveOffer--swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
    @apply w-[25px] bg-[#D4D4D4] #{!important};
}

// .orderSummaryExclusiveOffer--swiper .swiper-slide {
//     @apply max-w-[309px];
// }
</style>
