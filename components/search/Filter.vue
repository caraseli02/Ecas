<template>
  <div class="flex flex-col bg-white rounded-md shadow-card">
    <div class="flex items-start justify-between p-2.5">
      <div class="font-Inter">
        <div
          class="text-xs font-semibold leading-tight truncate w-[140px] mb-[5px]"
        >
          Max. forward impulse lorem ipsum
        </div>
        <div class="text-xs leading-tight">(18945)</div>
      </div>
      <button
        class="rounded w-[22px] h-[22px] bg-[#F2F2F2] flex items-center justify-center text-gray-100 transition-colors duration-300 hover:text-gray-300"
        @click="$emit('close')"
      >
        <XIcon class="w-[14px] h-[14px]" />
      </button>
    </div>
    <div class="px-2.5 mb-2.5">
      <label class="flex relative">
        <input
          v-model="searchValue"
          type="search"
          placeholder="Type here"
          class="w-full border border-border bg-white rounded px-2.5 pt-[5px] pb-1.5 pr-10 text-xs placeholder:text-gray-100 focus:outline-none"
        />
        <FiltersIcon
          class="absolute top-1/2 -translate-y-1/2 right-2.5 w-5 h-5 text-gray-100"
        />
      </label>
    </div>
    <div class="flex-1 pr-[5px]">
      <div
        class="grid grid-cols-1 gap-2 flex-1 max-h-[115px] overflow-y-auto scrollbar-thin pb-[13px]"
      >
        <label
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="group flex items-start justify-between cursor-pointer px-2.5"
        >
          <input v-model="option.checked" type="checkbox" class="sr-only" />
          <span
            class="text-xs font-Inter transition-colors duration-300 group-hover:text-blue"
          >
            {{ option.label }} ({{ option.quantity }})
          </span>
          <div
            class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
            :class="[
              option.checked
                ? 'bg-blue border-blue group-hover:bg-white'
                : 'bg-white  border-border group-hover:border-gray-300',
            ]"
          >
            <CheckIcon
              v-if="option.checked"
              class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
            />
          </div>
        </label>
      </div>
    </div>
    <button
      class="group flex items-center justify-between bg-gray-200 pr-[15px] py-2 pl-2.5"
      @click="handleAll"
    >
      <span
        class="text-xs transition-colors duration-300 group-hover:text-blue"
      >
        {{ selectedAll ? "Unselect All" : "Select All" }}
      </span>
      <div
        class="flex items-center justify-center w-[18px] h-[18px] rounded border transition-colors duration-300"
        :class="[
          selectedAll
            ? 'bg-blue border-blue group-hover:bg-white'
            : 'bg-white  border-border group-hover:border-gray-300',
        ]"
      >
        <CheckIcon
          v-if="selectedAll"
          class="w-4 text-white transition-colors duration-300 group-hover:text-blue"
        />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import FiltersIcon from "@/assets/icons/filters.svg";
import CheckIcon from "@/assets/icons/check.svg";
import XIcon from "@/assets/icons/x.svg";

defineEmits(["close"]);

const searchValue = ref("");

const options = ref([
  {
    label: "Micro Comercial Components",
    quantity: 17897,
    checked: false,
  },
  {
    label: "Manufacturer1",
    quantity: 17897,
    checked: true,
  },
  {
    label: "Manufacturer2",
    quantity: 17897,
    checked: false,
  },
  {
    label: "Manufacturer3",
    quantity: 17897,
    checked: true,
  },
  {
    label: "Manufacturer4",
    quantity: 17897,
    checked: false,
  },
  {
    label: "Micro Comercial Components",
    quantity: 17897,
    checked: false,
  },
]);

const filteredOptions = computed(() => {
  return options.value.filter((e) =>
    e.label.toLowerCase().includes(searchValue.value.toLowerCase())
  );
});

const selectedAll = computed(() => {
  return options.value.every((e) => e.checked);
});

const handleAll = () => {
  options.value = options.value.map((e) => {
    return {
      ...e,
      checked: selectedAll.value ? false : true,
    };
  });
};
</script>
