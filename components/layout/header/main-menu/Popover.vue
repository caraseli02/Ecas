<script setup lang="ts">
import { MenuIcon, ChevronRight, ArrowRight, GemIcon, HeadsetIcon, Building2Icon } from 'lucide-vue-next'
import Breadcrumb from './Breadcrumb.vue'
import CardPlaceholderSmall from '@/assets/icons/card-placeholder-small.svg'
import { ref, computed } from 'vue'

defineProps<{
  isScrolled: boolean
}>()

const { categories } = useCategories()

// State to keep track of the selected categories path
const selectedCategories = ref([] as any[])

// Computed property to get the current category
const currentCategory = computed(() => {
  return selectedCategories.value.length > 0 ? selectedCategories.value[selectedCategories.value.length - 1] : null
})

// Function to handle category clicks
const onCategoryClick = (category) => {
  selectedCategories.value.push(category)
}

// Function to handle breadcrumb clicks
const onBreadcrumbClick = (index) => {
  selectedCategories.value = selectedCategories.value.slice(0, index + 1)
}

// Function to reset to all categories
const resetCategories = () => {
  selectedCategories.value = []
}
</script>


<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <button class="flex items-center mr-4 md:mr-0">
        <MenuIcon class="w-6 h-6 text-white" />
        <span
          v-if="!isScrolled"
          class="hidden leading-normal font-medium text-white ml-2 md:inline-block lg:ml-4"
        >
          Products
        </span>
      </button>
    </UiPopoverTrigger>
    <UiPopoverContent
      align="start"
      class="w-full h-[588px] container grid grid-cols-[288px_1fr] max-w-[1392px] items-stretch p-2 bg-grey-50"
    >
      <!-- Left Column: Main Categories -->
      <div class="w-full flex flex-col items-start">
        <UiButton
          v-for="category in categories"
          :key="category.id"
          class="text-start h-11 w-full max-w-[268px] flex flex-row flex-nowrap justify-between gap-2"
          variant="ghost"
          @click="onCategoryClick(category)"
        >
          <div class="flex gap-2 items-center">
            <component
              :is="category.icon"
              v-if="category.icon && category.icon !== 'N/A'"
              class="min-w-5 min-h-5 text-black"
            />
            <CardPlaceholderSmall
              v-else
              class="min-w-5 min-h-5 text-black"
            />
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
      <!-- Right Column: Subcategories -->
      <div class="flex flex-col justify-between gap-8 bg-white px-6 py-4 rounded-xl">
        <!-- Breadcrumb Navigation -->
        <section class="flex justify-between items-center h-8 w-full">
          <div class="breadcrumb flex items-center space-x-2">
            <span @click="resetCategories" class="cursor-pointer text-blue-500">All Categories</span>
            <span v-for="(category, index) in selectedCategories" :key="category.id" class="flex items-center">
              <ChevronRight class="w-4 h-4 text-gray-400" />
              <span @click="onBreadcrumbClick(index)" class="cursor-pointer text-blue-500">
                {{ category.name }}
              </span>
            </span>
          </div>
          <UiButton
            class="gap-1"
            size="xs"
            variant="outline"
            @click="resetCategories"
          >
            All Categories
            <ArrowRight class="w-4 h-4" />
          </UiButton>
        </section>
        <!-- Subcategories Display -->
        <section v-if="currentCategory">
          <div v-if="currentCategory.subcategory && currentCategory.subcategory.length > 0">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="sub in currentCategory.subcategory"
                :key="sub.id"
                class="flex flex-col"
              >
                <h3 class="font-semibold text-lg mb-2 cursor-pointer" @click="onCategoryClick(sub)">
                  {{ sub.name }}
                </h3>
                <div v-if="sub.subcategory && sub.subcategory.length > 0" class="space-y-1">
                  <UiButton
                    v-for="childSub in sub.subcategory"
                    :key="childSub.id"
                    variant="link"
                    class="text-left"
                    @click="onCategoryClick(childSub)"
                  >
                    {{ childSub.name }}
                  </UiButton>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No subcategories available.</p>
          </div>
        </section>
        <!-- Footer Section -->
        <section class="flex flex-col justify-between gap-3 h-[60px]">
          <UiSeparator />
          <div class="flex items-center gap-4">
            <UiButton
              class="font-medium gap-1 p-0"
              size="xs"
              variant="link"
            >
              <GemIcon class="w-4 h-4 text-black" />
              View our discounted offers
            </UiButton>
            <UiSkeleton class="w-[140px] h-10" />
            <UiSkeleton class="w-[140px] h-10" />
            <UiSkeleton class="w-[140px] h-10" />
            <UiSkeleton class="w-[140px] h-10" />
            <UiButton
              size="xs"
              class="text-xs gap-2 px-1"
              variant="link"
            >
              <Building2Icon class="w-4 h-4 text-black" />
              Contact Sales
            </UiButton>
            <UiButton
              size="xs"
              class="text-xs gap-2 px-1"
              variant="link"
            >
              <HeadsetIcon class="w-4 h-4 text-black" />
              Support
            </UiButton>
          </div>
        </section>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>

