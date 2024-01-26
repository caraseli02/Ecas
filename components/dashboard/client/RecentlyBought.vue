<template>
  <div class="justify-between items-stretch shadow-xs bg-white flex max-w-[330px] flex-col p-6 rounded-xl">
    <header class="text-zinc-800 text-base font-semibold leading-6">Recently Bought</header>
    <section class="w-[282px] h-[312px] overflow-hidden flex flex-col gap-7 mt-8 ">
      <div v-for="item in 5" :key="item" class="items-stretch flex justify-between gap-3">
        <div
          class="justify-center items-center border border-neutral-300 flex aspect-square flex-col w-10 h-10 rounded-lg border-solid">
          <SvgoNotFound 
            class="w-10 h-10" 
            />
        </div>
        <div  class="items-stretch flex grow basis-[0%] flex-col whitespace-nowrap max-w-[230px]">
          <div class="text-neutral-800 text-sm font-semibold leading-4 text-ellipsis overflow-hidden">RSCSK3343R3D02008T</div>
          <div class="overflow-hidden text-gray-500 text-ellipsis text-xs leading-4 mt-2 inline">
            Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW
          </div>
        </div>
      </div>
    </section>
    <form>
      <div class="items-stretch self-center flex gap-2 mt-10">
        <a href="..." class="text-gray-500 text-sm font-medium leading-5 grow whitespace-nowrap"
          aria-label="View Orders">View Orders</a>
        <img loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/266e601ce3e7d5089933deec3d97eace0781b809a343338853e303133b49c7ae?apiKey=20497529553648aab918fa2d322ece87&"
          class="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto"
          alt="Image" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>
