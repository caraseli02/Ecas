<template>
  <div class="h-[474px] max-w-[330px] items-stretch shadow-xs bg-white hidden lg:flex flex-col p-6 rounded-xl">
    <header class="text-zinc-800 text-base font-semibold leading-6">Recently Bought</header>
    <section class="w-[282px] h-[312px] overflow-hidden flex flex-col gap-7 mt-8 ">
      <div v-for="item in data" :key="item.title" class="items-stretch flex justify-between gap-3">
        <div
          class="justify-center items-center border border-neutral-300 flex aspect-square flex-col w-10 h-10 rounded-lg border-solid">
          <svgo-card-placeholder-small class="w-8" />
          <img v-if="item.photo" :src="item.photo" />
        </div>
        <div class="items-stretch flex grow basis-[0%] flex-col whitespace-nowrap max-w-[230px]">
          <div class="text-neutral-800 text-sm font-semibold leading-4 text-ellipsis overflow-hidden">
            {{ item.title }}
          </div>
          <div class="overflow-hidden text-slate-500 text-ellipsis text-xs leading-4 mt-2 inline">
            {{ item.subtitle }}
          </div>
        </div>
      </div>
    </section>
    <div class="self-end align-end flex justify-end items-end gap-2 h-fit grow text-slate-500 hover:text-blue-500 transition-colors">
      <a href="..." class="text-sm font-medium leading-5 grow whitespace-nowrap"
        aria-label="View Orders">View Orders</a>
        <SvgoArrowLeft16
        class="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden shrink-0 max-w-full mb-0.5"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
const data = [
  {
    photo: '',
    title: 'RSCSK3343R3D02008T',
    subtitle: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW'
  },
  {
    photo: '',
    title: 'RSCSK3343R3D02008T',
    subtitle: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW'
  },
  {
    photo: '',
    title: 'RSCSK3343R3D02008T',
    subtitle: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW'
  },
  {
    photo: '',
    title: 'RSCSK3343R3D02008T',
    subtitle: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW'
  },
  {
    photo: '',
    title: 'RSCSK3343R3D02008T',
    subtitle: 'Diode: rectifying; SMD; 100V; 0.15A; 4ns; SOD323; Ufmax: 1.2V; 200mW'
  },
]
</script>

<style scoped>
</style>
