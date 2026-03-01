<template>
  <div class="flex flex-row gap-[46px] p-9 linear-gradient rounded-xl shadow-xs w-full mb-9">
    <div class="flex flex-col gap-9 shrink-0 max-w-[50%]">
      <div class="flex flex-col gap-6">
        <h2 class="text-[#FFF] text-[32px] font-bold leading-9">
          Exclusive Business Offers
        </h2>
        <p class="text-[#FFF] text-base font-normal leading-6 text-">
          Get the best deals on premium electronics and industrial equipment. Limited time offers for our partners.
        </p>
      </div>
      <div>
        <NuxtLink
          to="/search"
          class="inline-block px-6 py-2 rounded-lg bg-[#F2F2F2] max-w-fit"
        >
          <span class="text-[#5E6278] text-base font-medium leading-7">View More</span>
        </NuxtLink>
      </div>
    </div>
    <div class="flex items-center justify-center flex-1">
      <img
        class="max-h-[220px] object-contain"
        :src="BlackFridayItem"
        alt="Exclusive Offer"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import BlackFridayItem from '@/assets/media/home/black-friday-item.png';
</script>

<style scoped lang="scss">
.linear-gradient {
    background: linear-gradient(264deg, #418dff 0%, #454dbb 62.59%, #463eab 99.53%);
}
</style>
