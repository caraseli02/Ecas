<template>
  <label class="flex cursor-pointer">
    <input :value="item.checked" type="checkbox" class="sr-only" @change="$emit('check')" />
    <div
      class="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px] rounded mt-px border transition-colors duration-300"
      :class="[
        item.checked ? 'bg-blue-500 border-blue-500 group-hover:bg-white' : 'bg-white  border-border group-hover:border-gray-300',
      ]">
      <CheckIcon v-if="item.checked" class="w-4 text-white transition-colors duration-300 group-hover:text-blue-500" />
    </div>
  </label>
</template>
<script lang="ts">
import CheckIcon from '@/assets/icons/check.svg';

export default defineComponent({
  name: 'CustomCheckBox',
  props: ['item'],
  components: {
    CheckIcon,
  },
});
</script>
