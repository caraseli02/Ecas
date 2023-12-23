<template>
    <div class="mb-[30px] md:mb-10 xl:mb-8">
        <div class="container">
            <div class="flex items-center justify-between border-b border-gray-200 py-2.5">
                <div class="flex items-center gap-1">
                    <CaretRightIcon class="hidden w-4 h-4 md:flex" />
                    <NuxtLink to="/" class="hidden text-xs leading-[1.33] text-slate-500 font-Inter md:flex lg:font-medium">
                        Products
                    </NuxtLink>
                    <CaretRightIcon class="hidden w-4 h-4 md:flex" />
                    <NuxtLink to="/" class="hidden text-xs leading-[1.33] text-slate-500 font-Inter md:flex lg:font-medium">
                        Semiconductors
                    </NuxtLink>
                    <CaretRightIcon class="hidden w-4 h-4 md:flex" />
                    <NuxtLink to="/" class="hidden text-xs leading-[1.33] text-slate-500 font-Inter md:flex lg:font-medium">
                        Diodes
                    </NuxtLink>
                    <CaretRightIcon class="w-4 h-4" />
                    <NuxtLink to="/" class="text-xs leading-[1.33] text-slate-500 font-Inter lg:font-medium"> Universal Diodes </NuxtLink>
                    <CaretRightIcon class="w-4 h-4" />
                    <NuxtLink to="/" class="text-xs leading-[1.33] text-slate-500 font-Inter font-semibold"> SMD Universal Diodes </NuxtLink>
                </div>
                <div class="hidden font-semibold md:block">SMD Universal Diodes</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CaretRightIcon from '@/assets/icons/caret-right.svg';
</script>
