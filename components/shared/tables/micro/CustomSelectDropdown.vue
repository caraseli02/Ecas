<template>
    <div class="absolute z-10 -translate-x-full grid grid-cols-1 gap-1 rounded-lg bg-white p-3 shadow-m" :style="{
        top: dropdownTop + 'px',
        left: dropdownLeft + 'px',
    }" :class="customClasses">
        <div class="overflow-y-auto scrollbar-thin max-h-[304px]" :class="items.length > 7 ? ' move-right' : ''">
            <button v-for="item in items"
                class="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-[#F2F2F2] hover:text-blue-500"
                :class="[selectedItem === item.label ? 'text-blue-500 bg-[#F2F2F2]' : '']"
                @click="handleSelection($event, item)">
                <component :is="item.iconType" v-if="item.iconType" class="w-6 h-6 mr-3 text-current" />
                <span class="text-sm leading-[1.71]">{{ item.label }}</span>
            </button>
        </div>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    name: 'CustomSelectDropdown',
    props: ['dropdownTop', 'dropdownLeft', 'selectedItem', 'items', 'customClasses'],
    methods: {
        handleSelection(event: MouseEvent, item: object) {
            this.$emit('handleSelection', event, item);
        },
    },
});
</script>
<style scoped>

.move-right {
    transform: translateX(8px);
    padding-right: 8px;
}
</style>
