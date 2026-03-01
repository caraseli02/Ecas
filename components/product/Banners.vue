<template>
  <section class="mb-[30px] lg:mb-10">
    <div class="container">
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div class="relative flex items-center justify-between rounded-md backdrop-blur-lg px-[30px] py-[13px] overflow-hidden">
          <div class="relative z-20 flex flex-col md:flex-row md:items-center">
            <NewIcon class="w-8 h-8 flex-shrink-0 md:w-[42px] md:h-[42px] md:mr-[15px]" />
            <h2 class="font-semibold md:text-[32px] lg:text-2xl xl:text-[32px]">
              Fastest Intel Core i7 Ever
            </h2>
          </div>
          <img
            :src="Banner1Item"
            alt="Banner"
            class="relative z-20 w-[100px] object-contain md:w-[175px]"
          >
          <div class="absolute z-10 top-0 left-0 w-full h-full bg-white/20 backdrop-blur-lg rounded-md" />
          <img
            :src="Banner1Bg"
            alt="Background"
            class="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          >
        </div>
        <div class="relative flex items-center justify-between rounded-md px-[30px] py-[13px] overflow-hidden">
          <div class="relative z-20 flex flex-col md:flex-row md:items-center">
            <h2 class="font-semibold text-white md:text-[32px] lg:text-2xl xl:text-[32px]">
              Exclusive Black Friday Offer
            </h2>
          </div>
          <img
            :src="Banner2Item"
            alt="Banner"
            class="relative z-20 w-[100px] object-contain md:w-[175px]"
          >
          <div
            class="absolute z-10 top-0 left-0 w-full h-full rounded-md opacity-75"
            :style="{
              background: 'linear-gradient(85.26deg, #001238 17.24%, #007FFF 106.53%)',
            }"
          />
          <div class="absolute z-10 top-0 left-0 w-full h-full bg-blue-500/30 backdrop-blur-[3px] rounded-md" />
          <img
            :src="Banner2Bg"
            alt="Background"
            class="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import NewIcon from '@/assets/icons/new.svg';
import Banner1Item from '@/assets/media/home/banner-item.png';
import Banner1Bg from '@/assets/media/home/banner-bg.jpg';
import Banner2Item from '@/assets/media/home/exclusive-offer-item.png';
import Banner2Bg from '@/assets/media/home/exclusive-offer-bg.jpg';
</script>
