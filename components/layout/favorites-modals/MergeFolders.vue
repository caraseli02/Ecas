<template>
    <div class="fixed z-[70] top-0 left-0 w-screen h-screen flex items-center justify-center pointer-events-none md:z-[60]">
        <div
            class="relative z-10 pointer-events-auto w-[450px] max-w-[calc(100vw-32px)] max-h-[80vh] overflow-y-auto scrollbar-thin p-[15px] pb-[35px] bg-white rounded-md shadow-xs flex flex-col justify-between"
        >
            <div class="flex items-center justify-between mb-[34px]">
                <div class="flex items-center text-gray-300">
                    <MergeIcon class="w-6 h-6 mr-2" />
                    <span class="font-medium"> Merge folders </span>
                </div>
                <button
                    class="rounded w-8 h-8 bg-[#F2F2F2] flex items-center justify-center text-gray-100 transition-colors duration-300 hover:text-gray-300"
                    @click="$emit('close')"
                >
                    <XIcon class="w-5 h-5" />
                </button>
            </div>
            <template v-if="!success">
                <div class="mb-[150px]">
                    <div class="text-sm font-medium mb-[15px]">Selected folders:</div>
                    <div class="grid grid-cols-1 gap-2.5 max-h-[132px] overflow-y-auto scrollbar-thin mb-[15px]">
                        <LayoutFavoritesCartModalFavoritesFolderItem
                            v-for="(folder, index) in foldersCopy"
                            :key="index"
                            :folder="folder"
                            in-modal
                            @select="folder.selected = !folder.selected"
                        />
                    </div>
                    <div>
                        <div class="text-sm font-medium mb-5">Merge selected folders to:</div>
                        <FormSelect
                            v-model="folder"
                            label="Select destination folder"
                            placeholder="Select Folder"
                            checkboxes
                            :options="[
                                { label: 'Folder 1', value: 'folder-1', icon: FolderIcon },
                                { label: 'Folder 2', value: 'folder-2', icon: FolderIcon },
                                { label: 'Folder 3', value: 'folder-3', icon: FolderIcon },
                                { label: 'Folder 4', value: 'folder-4', icon: FolderIcon },
                            ]"
                        />
                    </div>
                </div>
                <div class="flex items-center justify-center gap-2.5">
                    <button class="flex bg-blue rounded px-[34px] py-[11px] text-sm font-medium text-white" @click="success = true">
                        Merge
                    </button>
                    <button class="flex bg-gray-200 rounded px-[26px] py-[11px] text-sm font-medium text-gray-300" @click="$emit('close')">
                        Cancel
                    </button>
                </div>
            </template>
            <div v-else class="flex flex-col items-center flex-1 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" class="w-[100px] h-[100px] mb-[25px]">
                    <path fill="#00D395" d="M50 10c22.076 0 40 17.924 40 40S72.076 90 50 90 10 72.076 10 50s17.924-40 40-40Z" />
                    <path
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="5"
                        d="m37.555 49.41 9.948 8.82L65.01 41.758"
                    />
                </svg>
                <div class="text-xl text-center">Done</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import XIcon from '@/assets/icons/x.svg';
import MergeIcon from '@/assets/icons/merge.svg';
import FolderIcon from '@/assets/icons/folder.svg';
import { FavoriteItem, FormSelectOption } from '~~/types';

const props = defineProps({
    folders: {
        type: Array as PropType<FavoriteItem[]>,
        required: true,
    },
});

defineEmits(['close']);

const folder = ref<FormSelectOption | undefined>(undefined);
const success = ref(false);

const foldersCopy = ref(JSON.parse(JSON.stringify(props.folders)));

onMounted(() => {
    documentUtil.toggleBodyScroll();
});

onBeforeUnmount(() => {
    documentUtil.toggleBodyScroll();
});
</script>
