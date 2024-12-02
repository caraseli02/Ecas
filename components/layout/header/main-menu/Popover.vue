<script setup lang="ts">
import { MenuIcon, ChevronRight, Rows3Icon, ArrowRight, GemIcon, HeadsetIcon, Building2Icon  } from 'lucide-vue-next';
import Breadcrumb from './Breadcrumb.vue';

defineProps<{
  isScrolled: boolean;
}>()


const { categories } = useCategories();

</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <button class="flex items-center mr-4 md:mr-0">
        <MenuIcon class="w-6 h-6 text-white" />
        <span v-if="!isScrolled" class="hidden leading-normal font-medium text-white ml-2 md:inline-block lg:ml-4">
          Products
        </span>
      </button>
    </UiPopoverTrigger>
    <UiPopoverContent align="start"
      class="w-full h-[588px] grid grid-cols-[288px_minmax(1084px,_1fr)] max-w-none items-stretch p-2 bg-grey-50">
      <div class="w-full flex flex-col items-start">
        <UiButton class="text-start h-12 w-full max-w-[268px] flex flex-row flex-nowrap justify-between gap-2"
          v-for="category in categories" :key="category.id" variant="ghost">
          <div class="flex gap-2 items-center">
            <component v-if="category.icon && category.icon !== 'N/A'" :is="category.icon"
              class="min-w-5 min-h-5 text-black" />
            <Rows3Icon v-else class="min-w-5 min-h-5 text-black" />
            <p class="flex flex-col items-start w-full font-medium">
              {{ category.name }}
              <span class="text-xs font-normal text-slate-500">
                {{ category.productCount }}
              </span>
            </p>
          </div>
          <ChevronRight class="w-4 h-4 text-black" />
        </UiButton>
      </div>
      <div class="w-full flex flex-col justify-between gap-8 bg-white px-6 py-4 rounded-xl">
        <section class="flex justify-between items-center h-8 w-full">
          <Breadcrumb />
          <UiButton class="gap-1" size="xs" variant="outline">
            All Categories
            <ArrowRight class="w-4 h-4" />
          </UiButton>
        </section>
        <section></section>
        <section class="flex flex-col justify-between gap-3 h-[60px]">
          <UiSeparator />
          <div class="flex items-center gap-4">
            <UiButton class="font-medium gap-1" size="xs" variant="link">
              <GemIcon class="w-4 h-4 text-black" />
              View our discounted offers
            </UiButton>
            <UiSkeleton class="w-[140px] h-10" />
            <UiSkeleton class="w-[140px] h-10" />
            <UiSkeleton class="w-[140px] h-10" />
            <UiSkeleton class="w-[140px] h-10" />
            <UiButton size="xs" class="text-xs gap-2" variant="link">
              <Building2Icon class="w-4 h-4 text-black" />
              Contact Sales
            </UiButton>
            <UiButton size="xs" class="text-xs gap-2" variant="link">
              <HeadsetIcon class="w-4 h-4 text-black" />
              Support
            </UiButton>
          </div>
        </section>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>
