<template>
    <div
        class="relative bg-white flex flex-col rounded-md pt-[30px] px-[15px] pb-5 shadow-card lg:pt-[70px] lg:pb-[15px] lg:self-stretch xl:pt-[45px]"
    >
        <img
            :src="props.images[activeImageIndex].ProductImageLarge"
            alt="Image"
            class="w-[220px] h-[220px] object-contain mx-auto mb-[50px] lg:w-[330px] lg:h-[330px] lg:mb-[60px] xl:w-[350px] xl:h-[350px] xl:mb-[38px]"
        />
        <Swiper
            :modules="[A11y]"
            :slides-per-view="4.5"
            :space-between="15"
            :grab-cursor="true"
            :breakpoints="{
                1024: {
                    slidePerView: 5.1,
                },
                1280: {
                    slidesPerView: 9.1,
                },
            }"
            class="productGallery--swiper w-full mt-auto"
        >
            <SwiperSlide v-for="(image, index) in images" :key="index">
                <button class="flex" @click="handleSlideTo(index)">
                    <img
                        :src="image.ProductImageSmall"
                        alt="Image"
                        class="w-[60px] h-[50x] object-contain transition-opacity duration-300 lg:w-[72px] lg:h-[60px]"
                        :class="[index !== activeImageIndex ? 'opacity-50' : '']"
                    />
                </button>
            </SwiperSlide>
        </Swiper>
        <div class="absolute top-[15px] right-[15px]">
            <div class="flex flex-col gap-2.5">
                <button class="flex justify-end text-gray-100 transition-colors duration-300 hover:text-blue">
                    <HeartIcon class="w-6 h-6" />
                </button>
                <button class="flex justify-end text-gray-100 transition-colors duration-300 hover:text-blue">
                    <ShareIcon class="w-6 h-6" />
                </button>
                <button class="flex justify-end text-gray-100 transition-colors duration-300 hover:text-blue">
                    <D3Icon class="w-6 h-6" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import GalleryImage1 from '@/assets/media/product/gallery-1.png';
import GalleryImage2 from '@/assets/media/product/gallery-2.jpg';
import GalleryImage3 from '@/assets/media/product/gallery-3.jpg';
import HeartIcon from '@/assets/icons/heart.svg';
import ShareIcon from '@/assets/icons/share.svg';
import D3Icon from '@/assets/icons/3d.svg';
import { A11y } from 'swiper';
import { ProductImage } from '~~/model/response/products/ProductResponse';

const props = defineProps<{
    images: ProductImage[];
}>();

const activeImageIndex = ref(0);

const handleSlideTo = (index: number) => {
    activeImageIndex.value = index;
};
</script>
