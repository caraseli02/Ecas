<template>
    <div class="flex flex-row">
        <button @click="decreaseValue()" class="p-1 bg-[#EBEBEB] rounded-l-lg group">
            <MinusGrey class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-150" />
        </button>
        <div class="min-w-[48px] h-[36px] items-center flex justify-center bg-[#F5F5F5F2]">
            <span class="text-center px-1">{{ value }}</span>
        </div>
        <button @click="increaseValue()" class="p-1 bg-[#EBEBEB] rounded-r-lg group">
            <PlusGrey class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-150" />
        </button>
    </div>
</template>
<script lang="ts">
import MinusGrey from '@/assets/icons/minus-grey.svg';
import PlusGrey from '@/assets/icons/plus-grey.svg';

export default defineComponent({
    name: 'QuantityCounter',
    props: ['value'],
    components: {
        MinusGrey,
        PlusGrey,
    },
    methods: {
        increaseValue() {
            this.$emit('update:value', this.value + 1);
        },
        decreaseValue() {
            if (this.value > 1) {
                this.$emit('update:value', this.value - 1);
            }
        },
    },
})
</script>