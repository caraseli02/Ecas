<template>
    <div class="relative bg-white flex flex-col justify-between rounded-xl shadow-m h-[298px] p-4 pt-7">
        <img
            :src="props.images[activeImageIndex]?.ProductImageLarge"
            alt="Image"
            class="w-[284px] h-[160px] object-contain mx-auto lg:w-[330px] xl:w-[350px] cursor-pointer"
            @click="emit('showZoomModal')"
        />
        <Swiper
            :modules="[A11y, Zoom]"
            :slides-per-view="4.5"
            :space-between="15"
            :grab-cursor="true"
            :zoom="true"
            :breakpoints="{
                1024: {
                    slidePerView: 5.1,
                },
                1280: {
                    slidesPerView: 9.1,
                },
            }"
            class="productGallery--swiper w-full !pb-2"
        >
            <SwiperSlide
                v-for="(image, index) in images"
                :key="index"
                style="{width: 56px, height: 48px;}"
                class="lg:!w-[56px] lg:!h-[48px] lg:!max-w-[56px] lg:!max-h-[48px] first:ml-2"
            >
                <button class="flex" @click="handleSlideTo(index)">
                    <div class="swiper-zoom-container">
                        <img
                            :src="image?.ProductImageSmall"
                            alt="Image"
                            class="w-[60px] h-[50x] object-contain transition-opacity duration-300 lg:w-[56px] lg:h-[48px] mb-2 ml-2"
                            :class="[index !== activeImageIndex ? 'opacity-50' : '']"
                        />
                    </div>
                </button>
            </SwiperSlide>
        </Swiper>
        <div class="absolute top-[15px] right-[15px]">
            <div class="flex flex-col gap-2.5">
                <button
                    class="flex justify-end text-slate-200 transition-colors duration-300 hover:text-blue-500"
                    @click="addToFavourite(product)"
                >
                    <HeartIcon class="w-6 h-6" />
                </button>
                <button class="flex justify-end text-slate-200 transition-colors duration-300 hover:text-blue-500">
                    <Share2Icon class="w-6 h-6" />
                </button>
                <button class="flex justify-end text-slate-200 transition-colors duration-300 hover:text-blue-500">
                    <BoxIcon class="w-6 h-6" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HeartIcon, Share2Icon, BoxIcon } from 'lucide-vue-next';

import { A11y, Zoom } from 'swiper';
import type { ProductImage } from '~/model/products/response/ProductResponse';
import type { FavouriteFolderRequestInterface } from '~/model/favourite-folder/request/favourite-folder.interface';
import { useNuxtApp } from '#app';
import type { ProductDetail } from '~/model/products/response/ProductDetailResponse';

const { $api } = useNuxtApp();

const props = defineProps<{
    images: ProductImage[];
    product: ProductDetail;
}>();

const emit = defineEmits(['showZoomModal']);

const activeImageIndex = defineModel();

const handleSlideTo = (index: number) => {
    activeImageIndex.value = index;
};

const addToFavourite = async (product: ProductDetail) => {
    const payload: FavouriteFolderRequestInterface = {
        name: product.name,
        isFolder: false,
        products: { id: product._id, stock: product.stock || 1 },
    };
    await $api.favouriteFolder.addEntityToFavouriteList(payload);
};
</script>
