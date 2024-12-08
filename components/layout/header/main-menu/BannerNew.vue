<script setup lang="ts">
import Circles from './Circles.vue'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
</script>

<template>
  <Carousel class="relative w-full max-h-[572px] bg-white rounded-xl border border-gray-200 border-solid shadow-sm max-md:px-5 max-md:py-24 focus-visible:ring-0">
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
      >
        <div class="p-1">
          <section
            class="flex overflow-hidden relative justify-between items-start self-stretch px-6 py-64 h-full"
            role="region"
            aria-labelledby="hero-title"
          >
            <div
              class="flex absolute -right-7 z-0 shrink-0 h-[272px] min-w-[240px] top-[67px] w-[554px] bg-gradient-to-r"
              aria-hidden="true"
            >
              <Circles />
            </div>
            <div
              class="flex gap-6 absolute bottom-32 z-0 flex-col font-medium leading-6 left-[100px] min-w-[240px] max-w-[415px] text-zinc-800"
            >
              <h4
                id="hero-title"
                class="text-5xl font-bold"
              >
                Scale Your Business Beyond Limits
              </h4>
              <p class="text-base">
                Join our growing community of successful vendors. Sign up for our
                waiting list today!
              </p>
              <UiButton class="w-fit">
                Book a Demo
              </UiButton>
            </div>
          </section>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="left-10" />
    <CarouselNext class="right-10" />
  </Carousel>
</template>
