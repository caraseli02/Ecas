<script setup lang="ts">
import { ChevronRight, ArrowRight, GemIcon, HeadsetIcon, Building2Icon } from 'lucide-vue-next';
import Breadcrumb from './Breadcrumb.vue';
import CardPlaceholderSmall from '@/assets/icons/card-placeholder-small.svg';

const { selectedCategories, currentCategory, onCategoryClick, resetCategories } = useCategoriesNavigation();
const { categories, getCategories } = useCategories();

const setCategories = async () => {
  await getCategories();
};

onMounted(async () => {
  await setCategories();
});
</script>

<template>
  <div class="font-Poppins mt-8 lg:mt-3">
    <section
      class="
      lg:h-[588px] lg:grid grid-cols-[288px_1fr] items-stretch lg:p-2 bg-grey-50 rounded-xl shadow-s overflow-hidden"
    >
      <!-- Left Column: Main Categories -->
      <div class="
      hidden lg:flex flex-col items-start pr-2 gap-1 ">
        <UiButton
          v-for="category in categories"
          :key="category.id"
          class="text-start h-11 
          flex flex-row flex-nowrap justify-between gap-2 p-2"
          :class="{ 'bg-light-300 text-blue-500': selectedCategories.includes(category) }"
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
              <span
                class="text-xs font-normal"
                :class="selectedCategories.includes(category) ? 'text-blue-500' : 'text-slate-500'"
              >
                {{ category.productCount }}
              </span>
            </p>
          </div>
          <ChevronRight
            class="w-4 h-4"
            :class="selectedCategories.includes(category) ? 'text-blue-500' : 'text-neutral-700'"
          />
        </UiButton>
      </div>
      <!-- Right Column: Subcategories -->
      <div
        v-if="currentCategory"
        class="flex flex-col gap-8 bg-white px-6 py-4 rounded-xl w-fit shadow-s ring-1 ring-gray-200 border-solid"
      >
        <!-- Breadcrumb Navigation -->
        <section class="flex justify-between items-center h-8 w-fit xl:w-full min-w-[636px]">
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
          class="h-fit"
        >
          <template v-if="currentCategory.subcategory && currentCategory.subcategory.length > 0">
            <UiScrollArea class="h-[334px] xl:h-[384px]">
              <div class="w-fit grid grid-cols-[320px_320px] xl:grid-cols-3 2xl:grid-cols-4 gap-4 h-full">
                <div
                  v-for="sub in currentCategory.subcategory"
                  :key="sub.id"
                  class="flex flex-col gap-4 max-w-xs"
                >
                  <h3
                    class="font-medium text-sm"
                  >
                    {{ sub.name }}
                  </h3>
                  <div
                    v-if="sub.subcategory && sub.subcategory.length > 0"
                    class="flex flex-col gap-3 items-start"
                  >
                    <div
                      v-for="childSub in sub.subcategory.sort((a, b) => b.productCount - a.productCount)"
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
            </UiScrollArea>
          </template>
          <div v-else>
            <p>No subcategories available.</p>
          </div>
        </section>
        <!-- Footer Section -->
        <section class="flex flex-col justify-between gap-3 h-[134px] xl:h-[60px]">
          <UiSeparator class="bg-grey-100" />
          <div class="flex flex-wrap xl:flex-nowrap xl:justify-between items-center gap-0.5 xl:gap-4">
            <UiButton
              class="font-medium gap-1 p-0"
              size="xs"
              variant="link"
            >
              <GemIcon class="w-4 h-4 text-black" />
              View our discounted offers
            </UiButton>
            <LayoutHeaderMainMenuOffersSvgs />
            <div class="flex gap-1 items-center justify-end w-full xl:w-fit pr-4 xl:pr-0">
              <UiButton
                size="xs"
                class="text-xs gap-2 px-1 self-end text-slate-500"
                variant="link"
              >
                <Building2Icon class="w-4 h-4 text-black" />
                Contact Sales
              </UiButton>
              <UiButton
                size="xs"
                class="text-xs gap-2 px-1 text-slate-500"
                variant="link"
              >
                <HeadsetIcon class="w-4 h-4 text-black" />
                Support
              </UiButton>
            </div>
          </div>
        </section>
      </div>
      <LayoutHeaderMainMenuBannerNew v-else />
    </section>
  </div>
</template>

<style scoped>

</style>
