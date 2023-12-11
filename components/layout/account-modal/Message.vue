<template>
  <div>
    <Swiper
:modules="[A11y, Pagination]" :slides-per-view="1" :space-between="15" :grab-cursor="true" :pagination="{
      bulletElement: 'button',
      clickable: true,
    }" :breakpoints="{
  768: {
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 1,
  },
}" class="homeNews--swiper">
      <SwiperSlide v-for="item in 9" :key="item">
        <div
          class="self-stretch bg-white flex flex-col p-4 rounded-xl items-end w-full max-w-[396px] shadow-[0_0px_8px_-0px_rgba(133,133,133,0.25)] ml-0.5">
          <div class="justify-between items-stretch self-stretch flex gap-5">
            <div class="text-neutral-800 text-sm font-medium leading-5 grow whitespace-nowrap">
              Account warning message
            </div>
            <XIcon
              class="aspect-square object-contain object-center w-[18px] justify-center items-center overflow-hidden shrink-0 max-w-full" />
          </div>
          <div class="self-stretch text-neutral-800 text-xs leading-4 mt-2">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </div>
          <div class="items-center flex gap-2 mt-2">
            <SettingIcon
              class="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto" />
            <div class="text-sky-500 text-sm font-medium leading-5 self-stretch grow whitespace-nowrap">
              Settings
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import SettingIcon from '@/assets/icons/menu/Setting.svg';
import { A11y, Pagination } from 'swiper';
</script>
