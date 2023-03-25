<template>
  <div
    ref="elDOM"
    class="relative bg-white rounded-md font-Inter pt-7 pb-[25px] shadow-card md:py-[15px]"
  >
    <div
      class="flex flex-col items-center mb-[30px] md:flex-row md:justify-between md:items-end md:mb-10 md:border-b md:border-gray-200 md:px-[15px] lg:px-5"
    >
      <div
        class="border-b border-gray-200 w-full px-[15px] mb-[30px] md:px-0 md:mb-0 md:border-b-0"
      >
        <div class="relative flex items-center gap-[15px]">
          <button
            v-for="(filter, index) in filters"
            :key="index"
            :data-tab="textUtil.slugify(filter)"
            class="relative font-medium pb-5 transition-colors duration-300 hover:text-blue md:text-base md:pb-4"
            :class="[
              activeFilter === textUtil.slugify(filter)
                ? 'text-blue'
                : 'text-gray-300 after:opacity-0',
            ]"
            @click="setActiveFilter(filter)"
          >
            {{ filter }}
          </button>
          <div
            class="absolute bottom-0 h-[5px] bg-blue rounded-t-[5px] transition-all duration-300"
            :style="{
              left: filterLineLeftPosition + 'px',
              width: filterLineWidth + 'px',
            }"
          />
        </div>
      </div>
      <NuxtLink
        to="/search"
        class="flex bg-gray-300 px-[22px] py-[11px] rounded text-sm font-medium text-white flex-shrink-0 md:mb-[15px]"
      >
        Show similar products (278)
      </NuxtLink>
    </div>
    <div class="mb-[25px]">
      <table class="w-full">
        <tr
          v-for="(item, index) in tableItems"
          :key="index"
          class="group w-full text-xs leading-tight font-medium font-Inter text-left cursor-pointer transition-colors duration-300 odd:bg-[#F2F2F2] hover:text-blue"
          @click="item.checked = !item.checked"
        >
          <td class="pl-[15px] py-1 lg:pl-5">
            {{ item.label }}
          </td>
          <td class="py-1">
            {{ item.value }}
          </td>
          <td class="flex justify-end pr-[15px] py-1 lg:pr-5">
            <div
              class="flex items-center justify-center w-[18px] h-[18px] rounded border transition-colors duration-300"
              :class="[
                item.checked
                  ? 'bg-blue border-blue'
                  : 'border-border group-hover:border-gray-300',
              ]"
            >
              <CheckIcon v-if="item.checked" class="w-4 text-white" />
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="flex justify-center px-[15px] md:justify-end lg:px-5">
      <NuxtLink
        to="/search"
        class="flex bg-gray-300 px-[22px] py-[11px] rounded text-sm font-medium text-white"
      >
        Show similar products (278)
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckIcon from "@/assets/icons/check.svg";

const elDOM = ref<HTMLElement | null>(null);

const filters = ref(["Specifications", "Tab 2", "Tab 3"]);
const activeFilter = ref("specifications");
const filterLineLeftPosition = ref(0);
const filterLineWidth = ref(0);

const tableItems = ref([
  {
    label: "EU RoHS",
    value: "Compliant",
    checked: false,
  },
  {
    label: "ECCN (US)",
    value: "EAR99",
    checked: false,
  },
  {
    label: "Part Status",
    value: "Active",
    checked: true,
  },
  {
    label: "HTS",
    value: "8542.31.00.01",
    checked: false,
  },
  {
    label: "Automotive",
    value: "Yes",
    checked: true,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
  {
    label: "EU RoHS",
    value: "EU RoHS",
    checked: false,
  },
]);

const setFilterLine = () => {
  if (elDOM.value) {
    const activeFilterEl = elDOM.value.querySelector(
      `[data-tab=${activeFilter.value}]`
    ) as HTMLButtonElement;

    if (activeFilterEl) {
      const rect = activeFilterEl.getBoundingClientRect();
      filterLineLeftPosition.value = activeFilterEl.offsetLeft;
      filterLineWidth.value = rect.width;
    }
  }
};

const setActiveFilter = (filter: string) => {
  activeFilter.value = textUtil.slugify(filter);
  setFilterLine();
};

onMounted(() => {
  setFilterLine();
});
</script>
