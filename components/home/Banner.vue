<template>
    <section class="mb-[30px] lg:mb-10 xl:mb-[60px]">
        <div class="container">
            <div
                class="relative flex items-center justify-between rounded-md backdrop-blur-lg py-[13px] pl-5 pr-[15px] overflow-hidden md:px-10 md:py-[5px] lg:pl-[50px] lg:pr-[114px] xl:pr-[200px] xl:py-1.5"
            >
                <div class="relative z-20 flex flex-col md:flex-row md:items-center">
                    <NewIcon class="w-8 h-8 md:w-[42px] md:h-[42px] md:mr-[15px]" />
                    <h2 class="font-semibold md:text-[32px] lg:text-4xl">Fastest Intel Core i7 Ever</h2>
                </div>
                <img :src="BannerItem" alt="Banner" class="relative z-20 w-[100px] object-contain md:w-[166px] xl:w-[210px]" />
                <div class="absolute z-10 top-0 left-0 w-full h-full bg-white/20 backdrop-blur-lg rounded-md" />
                <img :src="BannerBg" alt="Background" class="absolute top-0 left-0 w-full h-full object-cover rounded-md" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import NewIcon from '@/assets/icons/new.svg';
import BannerItem from '@/assets/media/home/banner-item.png';
import BannerBg from '@/assets/media/home/banner-bg.jpg';
</script>
