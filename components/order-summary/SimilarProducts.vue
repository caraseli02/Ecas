<template>
    <div class="flex flex-col gap-6 pb-6">
        <div class="flex w-full">
            <span class="text-[#222] text-xl font-semibold leading-7">Similar Products</span>
        </div>
        <div
            class="max-h-[350px] w-[380px] sm:w-[608px] md:w-[720px] lg:w-screen-sm xl:w-[860px] 2xl:w-[1024px]">
            <Swiper :modules="[A11y, Pagination, Autoplay]" :autoplay="{
                delay: 5000,
            }" :slides-per-view="viewsPerSlide" :space-between="24" :grab-cursor="true" :pagination="{
    bulletElement: 'button',
    clickable: true,
}" class="orderSummaryExclusiveOffer--swiper">
                <SwiperSlide v-for="(item, index) in slides" :key="index">
                    <div class="mb-10 flex items-center justify-center">
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
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/e56e/9346/144e461edd7834604628f2e3ae156b7b?Expires=1701043200&Signature=qxY85cJbNFF~kBxuztQ85C4qJheuDZEg4x7I1HM8LtrM6xopbKw-VukCJBxVEx4M5uPtjGDiOOsMwoMjzubh11HmNEOYgIqLzn1hbuGMXwMgkt3M0F3VtRhSGQd2faa0DjGg9xA2XTv6j8LLC-S5GSS6YTBVYPD6sG54OAkO2L5yFy-5POv5JT~Vf-52Me2D7e8lUMho8NN7zZhkU9tob9otzUV2HBeSBpo4bYvpDGV5bUC27qmD7zL1iFVZ~b3eSgpft-2hkJvAaDL1iNqead7sHbHcHzq72iu7OHbJQYryebRXWBVgDniCChFnRx9NvzlmmXDRKLRzdPvAZxxEfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
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
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/e56e/9346/144e461edd7834604628f2e3ae156b7b?Expires=1701043200&Signature=qxY85cJbNFF~kBxuztQ85C4qJheuDZEg4x7I1HM8LtrM6xopbKw-VukCJBxVEx4M5uPtjGDiOOsMwoMjzubh11HmNEOYgIqLzn1hbuGMXwMgkt3M0F3VtRhSGQd2faa0DjGg9xA2XTv6j8LLC-S5GSS6YTBVYPD6sG54OAkO2L5yFy-5POv5JT~Vf-52Me2D7e8lUMho8NN7zZhkU9tob9otzUV2HBeSBpo4bYvpDGV5bUC27qmD7zL1iFVZ~b3eSgpft-2hkJvAaDL1iNqead7sHbHcHzq72iu7OHbJQYryebRXWBVgDniCChFnRx9NvzlmmXDRKLRzdPvAZxxEfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
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
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/e56e/9346/144e461edd7834604628f2e3ae156b7b?Expires=1701043200&Signature=qxY85cJbNFF~kBxuztQ85C4qJheuDZEg4x7I1HM8LtrM6xopbKw-VukCJBxVEx4M5uPtjGDiOOsMwoMjzubh11HmNEOYgIqLzn1hbuGMXwMgkt3M0F3VtRhSGQd2faa0DjGg9xA2XTv6j8LLC-S5GSS6YTBVYPD6sG54OAkO2L5yFy-5POv5JT~Vf-52Me2D7e8lUMho8NN7zZhkU9tob9otzUV2HBeSBpo4bYvpDGV5bUC27qmD7zL1iFVZ~b3eSgpft-2hkJvAaDL1iNqead7sHbHcHzq72iu7OHbJQYryebRXWBVgDniCChFnRx9NvzlmmXDRKLRzdPvAZxxEfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
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
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/e56e/9346/144e461edd7834604628f2e3ae156b7b?Expires=1701043200&Signature=qxY85cJbNFF~kBxuztQ85C4qJheuDZEg4x7I1HM8LtrM6xopbKw-VukCJBxVEx4M5uPtjGDiOOsMwoMjzubh11HmNEOYgIqLzn1hbuGMXwMgkt3M0F3VtRhSGQd2faa0DjGg9xA2XTv6j8LLC-S5GSS6YTBVYPD6sG54OAkO2L5yFy-5POv5JT~Vf-52Me2D7e8lUMho8NN7zZhkU9tob9otzUV2HBeSBpo4bYvpDGV5bUC27qmD7zL1iFVZ~b3eSgpft-2hkJvAaDL1iNqead7sHbHcHzq72iu7OHbJQYryebRXWBVgDniCChFnRx9NvzlmmXDRKLRzdPvAZxxEfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
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
                ProductImageLarge: 'https://s3-alpha-sig.figma.com/img/e56e/9346/144e461edd7834604628f2e3ae156b7b?Expires=1701043200&Signature=qxY85cJbNFF~kBxuztQ85C4qJheuDZEg4x7I1HM8LtrM6xopbKw-VukCJBxVEx4M5uPtjGDiOOsMwoMjzubh11HmNEOYgIqLzn1hbuGMXwMgkt3M0F3VtRhSGQd2faa0DjGg9xA2XTv6j8LLC-S5GSS6YTBVYPD6sG54OAkO2L5yFy-5POv5JT~Vf-52Me2D7e8lUMho8NN7zZhkU9tob9otzUV2HBeSBpo4bYvpDGV5bUC27qmD7zL1iFVZ~b3eSgpft-2hkJvAaDL1iNqead7sHbHcHzq72iu7OHbJQYryebRXWBVgDniCChFnRx9NvzlmmXDRKLRzdPvAZxxEfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
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
        return 1;
    } else if (screenWidth.value < 1024) {
        return 2;
    } else if (screenWidth.value < 1280) {
        return 2;
    } else if (screenWidth.value < 1440) {
        return 2;
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
</style>
