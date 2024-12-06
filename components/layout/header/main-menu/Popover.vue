<script setup lang="ts">
import { MenuIcon, ChevronRight, ArrowRight, GemIcon, HeadsetIcon, Building2Icon, ChevronLeftIcon } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Breadcrumb from './Breadcrumb.vue'
import CardPlaceholderSmall from '@/assets/icons/card-placeholder-small.svg'

defineProps<{
  isScrolled: boolean
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanSm = breakpoints.smaller('sm') // sm and larger
const lgAndLarger = breakpoints.greaterOrEqual('lg') // sm and larger

const { categories } = useCategories()

// State to keep track of the selected categories path
const selectedCategories = ref([] as any[])

// Computed property to get the current category
const currentCategory = computed(() => {
  return selectedCategories.value.length > 0 ? selectedCategories.value[selectedCategories.value.length - 1] : null
})

const router = useRouter()

// Function to handle category clicks
const onCategoryClick = (category, makeReset: boolean) => {
  if (makeReset) selectedCategories.value = []
  if (category.subcategory.length === 0) {
    // Redirect to the category link if it's the last level
    isOpen.value = false
    selectedCategories.value = []
    router.push(`/search?category=${category.id}`)
  }
  else {
    selectedCategories.value.push(category)
  }
}

// Function to handle breadcrumb clicks
// const onBreadcrumbClick = (index) => {
//   selectedCategories.value = selectedCategories.value.slice(0, index + 1)
// }

// Function to reset to all categories
const resetCategories = () => {
  selectedCategories.value = []
}

const isOpen = ref(true)
</script>

<template>
  <UiPopover
    v-if="lgAndLarger"
    v-model:open="isOpen"
  >
    <UiPopoverTrigger as-child>
      <UiButton
        :variant="isOpen ? 'secondary' : 'ghost'"
        class="flex items-center mr-4 md:mr-0"
        :class="[{ 'text-white hover:text-blue-500': !isOpen }]"
      >
        <MenuIcon class="w-6 h-6" />
        <span
          v-if="!isScrolled"
          class="hidden leading-normal font-medium ml-2 md:inline-block lg:ml-4"
        >
          Products
        </span>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent
      align="start"
      :side-offset="25"
      class="p-0 w-screen bg-transparent shadow-none border-none hidden lg:block"
    >
      <div class="container ">
        <section
          class="w-full h-[588px] grid grid-cols-[288px_1fr]  items-stretch p-2 bg-grey-50 rounded-xl shadow-s overflow-hidden"
        >
          <!-- Left Column: Main Categories -->
          <div class="w-full flex flex-col items-start">
            <UiButton
              v-for="category in categories"
              :key="category.id"
              class="text-start h-11 w-full max-w-[268px] flex flex-row flex-nowrap justify-between gap-2"
              variant="ghost"
              @click="onCategoryClick(category, true)"
            >
              <div class="flex gap-2 items-center">
                <component
                  :is="category.icon"
                  v-if="category.icon && category.icon !== 'N/A'"
                  class="min-w-5 min-h-5 text-black"
                />
                <CardPlaceholderSmall
                  v-else
                  class="min-w-6 min-h-6 text-black"
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
          <div
            v-if="currentCategory"
            class="flex flex-col gap-8 bg-white px-6 py-4 rounded-xl"
          >
            <!-- Breadcrumb Navigation -->
            <section class="flex justify-between items-center h-8">
              <Breadcrumb :links="selectedCategories.map((link) => link.name)" />
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
            <section
              class="h-full"
            >
              <template v-if="currentCategory.subcategory && currentCategory.subcategory.length > 0">
                <div class="grid grid-cols-[320px_minmax(320px,_1fr)] xl:grid-cols-3 2xl:grid-cols-4 gap-4 h-full max-h-[384px] overflow-y-auto">
                  <div
                    v-for="sub in currentCategory.subcategory"
                    :key="sub.id"
                    class="flex flex-col gap-4 max-w-xs"
                  >
                    <h3
                      class="font-medium"
                    >
                      {{ sub.name }}
                    </h3>
                    <div
                      v-if="sub.subcategory && sub.subcategory.length > 0"
                      class="flex flex-col gap-3 items-start"
                    >
                      <div
                        v-for="childSub in sub.subcategory.slice(0, 8)"
                        :key="childSub.id"
                      >
                        <UiButton
                          variant="link"
                          class="text-left pl-0 flex-col items-start"
                          :disabled="childSub.productCount === 0"
                          @click="onCategoryClick(childSub, false)"
                        >
                          {{ childSub.name }}
                          <span class="text-xs">{{ childSub.productCount }} items</span>
                        </UiButton>
                        <UiBadge
                          v-if="false"
                          class="bg-blue-500 text-xs px-2"
                        >
                          New
                        </UiBadge>
                        <UiBadge
                          v-if="false"
                          class="bg-rose-600 text-xs px-2"
                        >
                          Sale
                        </UiBadge>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else>
                <p>No subcategories available.</p>
              </div>
            </section>
            <!-- Footer Section -->
            <section class="flex flex-col justify-between gap-3 h-[60px]">
              <UiSeparator />
              <div class="flex justify-between items-center gap-4">
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
                <UiSkeleton class="w-[140px] h-10 hidden 2xl:block" />
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
          <LayoutHeaderMainMenuBannerNew v-else />
        </section>
      </div>
    </UiPopoverContent>
  </UiPopover>
  <UiSheet v-else>
    <UiSheetTrigger as-child>
      <UiButton
        :variant="isOpen ? 'secondary' : 'ghost'"
        class="flex items-center mr-4 md:mr-0"
        :class="[{ 'text-white hover:text-blue-500': !isOpen }]"
      >
        <MenuIcon class="w-6 h-6" />
        <span
          v-if="!isScrolled"
          class="hidden leading-normal font-medium ml-2 md:inline-block lg:ml-4"
        >
          Products
        </span>
      </UiButton>
    </UiSheetTrigger>
    <UiSheetContent
      class="px-1 pt-1.5"
      side="left"
    >
      <UiSheetHeader>
        <UiSheetTitle v-if="currentCategory">
          <UiButton
            variant="link"
            class="flex items-center mr-4 md:mr-0"
            @click="resetCategories"
          >
            <ChevronLeftIcon class="w-4 h-4" />
            <span
              v-if="!isScrolled"
              class="hidden leading-normal font-medium ml-2 md:inline-block lg:ml-4"
            >
              Back
            </span>
          </UiButton>
          <UiSeparator class="my-1" />
        </UiSheetTitle>
      </UiSheetHeader>
      <div
        v-if="currentCategory"
        class="flex flex-col ml-4 overflow-auto max-h-screen pb-32"
      >
        <div
          v-for="sub in currentCategory.subcategory"
          :key="sub.id"
          class="flex flex-col gap-4 max-w-xs"
        >
          <h3
            class="font-medium"
          >
            {{ sub.name }}
          </h3>
          <div
            v-if="sub.subcategory && sub.subcategory.length > 0"
            class="flex flex-col gap-3 items-start"
          >
            <div
              v-for="childSub in sub.subcategory.slice(0, 8)"
              :key="childSub.id"
            >
              <UiButton
                variant="link"
                class="text-left pl-0 flex-col items-start"
                :disabled="childSub.productCount === 0"
                @click="onCategoryClick(childSub, false)"
              >
                {{ childSub.name }}
                <span class="text-xs">{{ childSub.productCount }} items</span>
              </UiButton>
              <UiBadge
                v-if="false"
                class="bg-blue-500 text-xs px-2"
              >
                New
              </UiBadge>
              <UiBadge
                v-if="false"
                class="bg-rose-600 text-xs px-2"
              >
                Sale
              </UiBadge>
            </div>
          </div>
        </div>
      </div>
      <!-- Left Column: Main Categories -->
      <div
        v-else
        class="w-full flex flex-col items-start"
      >
        <UiButton
          v-for="category in categories"
          :key="category.id"
          class="text-start h-11 w-full max-w-[366px] flex flex-row flex-nowrap justify-between gap-2"
          variant="ghost"
          @click="onCategoryClick(category, true)"
        >
          <div class="flex gap-2 items-center">
            <component
              :is="category.icon"
              v-if="category.icon && category.icon !== 'N/A'"
              class="min-w-5 min-h-5 text-black"
            />
            <CardPlaceholderSmall
              v-else
              class="min-w-6 min-h-6 text-black"
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
    </UiSheetContent>
  </UiSheet>
</template>
