<script setup lang="ts">
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
            />
            <div
              class="flex absolute bottom-32 z-0 flex-col font-medium leading-6 left-[100px] min-w-[240px] max-w-[415px] text-zinc-800"
            >
              <h1
                id="hero-title"
                class="text-5xl font-bold"
              >
                Scale Your Business Beyond Limits
              </h1>
              <p class="mt-6 text-base">
                Join our growing community of successful vendors. Sign up for our
                waiting list today!
              </p>
              <button
                class="flex overflow-hidden justify-center items-center self-start px-4 mt-6 text-sm text-white bg-sky-500 rounded-lg transition-colors duration-300 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <span class="self-stretch p-2 my-auto">Book a Demo</span>
              </button>
            </div>
          </section>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="left-10" />
    <CarouselNext class="right-10" />
  </Carousel>
</template>
