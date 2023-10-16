<template>
  <div>
    <button class="relative flex items-center h-5" @click="handleSortChange()">
      <span class="text-sm leading-[1.43] font-medium mr-1"> {{ title }} </span>
      <SortDownIcon v-if="order === 0" class="w-5 h-5 rounded-full" />
      <SortUpIcon v-else class="w-5 h-5 rounded-full" />
    </button>
  </div>
</template>
<script lang="ts">
import SortUpIcon from '@/assets/icons/dashboard/sort-up.svg';
import SortDownIcon from '@/assets/icons/dashboard/sort-down.svg';

export default defineComponent({
  name: "SortAscDesc",
  props: ["order", "title"],
  components: {
    SortUpIcon,
    SortDownIcon,
  },
  methods: {
    handleSortChange() {
      this.$emit("sortChange");
    },
  },
});
</script>