<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue';
import { cn } from '@/lib/utils';
import { storeToRefs } from 'pinia';
import { usePricingStore } from '~/store/pricingStore';

const props = defineProps<{ title: string; filterLength: number | null }>(); // Add filterLength prop
const emits = defineEmits(['updateSelectionLength']); // Define custom event
const pricingStore = usePricingStore();
const { margin } = storeToRefs(pricingStore);

const open = ref(false);
const selectedId = ref<string | null>(null); // Track selected item's _id

// Computed property to filter margin options based on filterLength
const filteredMargin = computed(() =>
    props.filterLength !== null ? margin.value.filter((item) => item.value.length === props.filterLength) : margin.value
);

// Computed property to display the selected label
const selectedLabel = computed(() => {
    const selectedItem = margin.value.find((item) => item._id === selectedId.value);
    return selectedItem ? selectedItem.label : `Select ${props.title} Template`;
});

// Emit selected length to parent when selection changes
const handleSelect = (framework) => {
    selectedId.value = framework._id;
    emits('updateSelectionLength', framework.value.length);
    open.value = false;
};
</script>

<template>
    <section class="flex flex-col gap-1 entry-price">
        <span class="text-grey-600 text-sm">{{ title }}</span>
        <UiPopover v-model:open="open" class="w-full">
            <UiPopoverTrigger as-child>
                <UiButton variant="outline" role="combobox" :aria-expanded="open" class="w-full justify-between">
                    {{ selectedLabel }}
                    <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent disabled-portal class="w-full p-0">
                <UiCommand class="w-full">
                    <UiCommandInput class="h-9" placeholder="Search framework..." />
                    <UiCommandEmpty>No framework found.</UiCommandEmpty>
                    <UiCommandList>
                        <UiCommandGroup>
                            <UiCommandItem
                                v-for="framework in filteredMargin"
                                :key="framework._id"
                                class="flex justify-between items-center w-full"
                                :value="framework.value"
                                @select="() => handleSelect(framework)"
                            >
                                {{ framework.label }}
                                <div class="flex items-center gap-1 p-0.5">
                                    <div v-for="val in framework.value" :key="val">
                                        <UiBadge class="bg-light-300" variant="secondary">{{ val }}</UiBadge>
                                    </div>
                                    <CheckIcon :class="cn('ml-auto h-4 w-4', selectedId === framework._id ? 'opacity-100' : 'opacity-0')" />
                                </div>
                            </UiCommandItem>
                        </UiCommandGroup>
                    </UiCommandList>
                </UiCommand>
            </UiPopoverContent>
        </UiPopover>
    </section>
</template>

<style>
.entry-price > [data-radix-popper-content-wrapper] {
    width: 100% !important;
    padding: 0 24px;
}

.entry-price > [data-radix-popper-content-wrapper] > div {
    width: 100% !important;
}

.entry-price > [data-radix-popper-content-wrapper] {
    max-width: 100% !important;
}
</style>
