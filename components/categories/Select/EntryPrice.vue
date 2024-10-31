<script setup lang="ts">
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue';
import { cn } from '@/lib/utils';
import { usePricingStore } from '~/store/pricingStore';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';

const pricingStore = usePricingStore();
const { range } = storeToRefs(pricingStore);

const frameworks = ref(range.value);

const emit = defineEmits<{
    (e: 'update:entry-price', value: string): void;
}>();

const handleSelect = (ev: CustomEvent) => {
    console.log(ev.detail.value);
    if (Array.isArray(ev.detail.value.value)) {
        value.value = ev.detail.value.value;
        emit('update:entry-price', ev.detail.value._id);
    }
    open.value = false;
};

const open = ref(false);
const value = ref<string[]>([]);

const props = defineProps<{
    title: string;
    entryPrice: string;
}>();

watchEffect(() => {
    if (props.entryPrice) {
        console.log(props.entryPrice);
        const selectedFramework = range.value.find((entry) => entry._id === props.entryPrice);
        if (selectedFramework) {
            value.value = selectedFramework.value;
        }
    }
});
</script>

<template>
    <section class="flex flex-col gap-1 entry-price">
        <span class="text-grey-600 text-sm">{{ title }}</span>
        <UiPopover v-model:open="open" class="w-full">
            <UiPopoverTrigger as-child>
                <UiButton variant="outline" role="combobox" :aria-expanded="open" class="w-full justify-between">
                    {{
                        value.length
                            ? frameworks.find((framework) => framework.value.some((val) => value.includes(val)))?.label
                            : `Select ${title} Template`
                    }}
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
                                v-for="framework in frameworks"
                                :key="framework.label"
                                class="flex justify-between items-center w-full"
                                :value="framework"
                                @select="handleSelect"
                            >
                                {{ framework.label }}
                                <div class="flex items-center gap-1 p-0.5">
                                    <div v-for="val in framework.value" :key="val">
                                        <UiBadge class="bg-light-300" variant="secondary">{{ val }}</UiBadge>
                                    </div>
                                    <CheckIcon
                                        :class="
                                            cn(
                                                'ml-auto h-4 w-4',
                                                framework.value.some((val) => value.includes(val)) ? 'opacity-100' : 'opacity-0'
                                            )
                                        "
                                    />
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
/* Apply the change here */
.entry-price > [data-radix-popper-content-wrapper] {
    width: 100% !important;
    padding: 0 24px;
}

/* Ensure the content inside also takes full width */
.entry-price > [data-radix-popper-content-wrapper] > div {
    width: 100% !important;
}

/* If needed, adjust the max-width as well */
.entry-price > [data-radix-popper-content-wrapper] {
    max-width: 100% !important;
}
</style>
