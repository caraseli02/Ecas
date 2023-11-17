<template>
    <div class="bg-[#EBEBEB] p-4 rounded-lg flex sm:flex-row gap-6 sm:gap-0 flex-col justify-between">
        <div class="flex flex-row justify-between">    
            <div class="flex justify-center items-center gap-2">    
                <SharedTablesMicroCheckBoxAll :checkAll="checkAllBox" @checkAll="checkAll()" />
                <span class="text-sm font-normal text-[#5E6278]">Select All</span>
            </div>
            <div class="ml-9 flex gap-2 items-center">
                <span class="text-[#222] text-sm font-medium">1</span>
                <span class="text-sm font-normal text-[#5E6278]">Items selected</span>
            </div>
        </div>
        <div class="flex flex-row gap-9">
            <button class="relative flex group" @click="addToFavs">
                <HeartSolid v-show="liked" class="absolute r-0 top-[1px] text-[#007FFF]"/>
                <HeartOutline class="w-5 h-5 text-[#5E6278] group-hover:text-[#007FFF] transition duration-150"/>
                <span class="text-sm font-normal text-[#5E6278] ml-2 group-hover:text-[#007FFF] transition duration-150">Add to Favourites</span>
            </button>
            <button class="flex group" @click="deleteSelected">
                <TrashOutline class="text-[#5E6278] group-hover:text-[#FA4B4B] transition duration-150"/>
                <span class="text-sm font-normal text-[#5E6278] ml-2 group-hover:text-[#FA4B4B] transition duration-150">Delete Selected</span>
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import HeartOutline from '@/assets/icons/heart-outline.svg';
import HeartSolid from '@/assets/icons/heart-solid.svg';
import TrashOutline from '@/assets/icons/trash-outline.svg';

export default defineComponent({
    name: 'TableHead',
    components: {
        HeartOutline,
        HeartSolid,
        TrashOutline,
    },
    data() {
        return {
            checkAllBox: false,
            liked: false,
        };
    },
    methods: {
        checkAll() {
            this.checkAllBox = !this.checkAllBox;
            this.$emit('checkAll', this.checkAllBox);
        },
        addToFavs() {
            this.liked = !this.liked;
            this.$emit('addToFavs', this.liked);
        },
        deleteSelected() {
            this.$emit('deleteSelected');
        },
    }
    
});
</script>