<script setup lang="ts">
import { ref } from 'vue';
import { useCategories } from '@/composables/useCategories';
import type { ICreatePayload, TaxonomyInterface } from '~/types/dashboard/categories';
import { PencilLine } from 'lucide-vue-next';
import { type IconName } from '@/types/Icons';

const props = defineProps<{ category: TaxonomyInterface }>();
const enableSmartPricing = ref(false);
const enableCustomProperties = ref(false);

const title = ref('');
const icon = ref<IconName>('PlugIcon');
const selectedEntryPrice = ref<string>('');
const selectedQuantity = ref<string>('');
const selectedMargin = ref<string>('');

const avgWeight = ref<number | null>(null);
const width = ref<number | null>(null);
const height = ref<number | null>(null);
const length = ref<number | null>(null);

onMounted(() => {
    title.value = props.category.name;
    icon.value = props.category.icon || 'PlugIcon';

    selectedEntryPrice.value = props?.category?.smartPricingSettings?.priceRangeId || '';
    selectedQuantity.value = props?.category?.smartPricingSettings?.quantityId || '';
    selectedMargin.value = props?.category?.smartPricingSettings?.marginId || '';
    enableSmartPricing.value = selectedEntryPrice.value !== '' && selectedQuantity.value !== '' && selectedMargin.value !== '';

    avgWeight.value = props?.category?.customProperties?.avgItemWeight || null;
    length.value = props?.category?.customProperties?.length || null;
    width.value = props?.category?.customProperties?.width || null;
    height.value = props?.category?.customProperties?.height || null;
    enableCustomProperties.value = avgWeight.value !== null && length.value !== null && width.value !== null && height.value !== null;
});

const { updateCategory, selectedCategories } = useCategories();

const isOpen = ref(false);

async function makeUpdate() {
    const payload: ICreatePayload = {
        name: title.value,
        icon: icon.value,

        smartPricingSettings: {
            priceRangeId: selectedEntryPrice.value,
            quantityId: selectedQuantity.value,
            marginId: selectedMargin.value,
        },
        enableSmartPricing: enableSmartPricing.value,

        customProperties: {
            avgItemWeight: avgWeight.value,
            length: length.value,
            width: width.value,
            height: height.value,
        },
        enableCustomProperties: enableCustomProperties.value,
    };
    if (selectedCategories.value[0]) {
        payload.parentId = selectedCategories.value[0];
    }
    const response = await updateCategory(props.category.id, payload);
    if (response) {
        title.value = '';
        isOpen.value = false;
    }
}

const updateSmartPricingEnabled = (value: boolean) => {
    enableSmartPricing.value = value;
};

const updateCustomPropertiesEnabled = (value: boolean) => {
    enableCustomProperties.value = value;
};
</script>

<template>
    <UiDialog v-model:open="isOpen">
        <UiDialogTrigger as-child>
            <UiButton variant="ghost" size="icon" :disabled="selectedCategories.length > 1">
                <PencilLine class="w-5 h-5 text-slate-500" />
            </UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="sm:max-w-[640px]">
            <UiDialogHeader>
                <UiDialogTitle>Edit Category</UiDialogTitle>
            </UiDialogHeader>
            <div class="grid gap-4 py-4">
                <div class="flex flex-col items-start gap-4">
                    <UiLabel for="title" class="text-right">Title</UiLabel>
                    <UiInput id="title" v-model="title" class="col-span-3" />
                </div>
                <div class="flex flex-col items-start gap-4">
                    <UiLabel for="title" class="text-right"
                        >ID: <b>{{ category.id }}</b></UiLabel
                    >
                </div>
                <div class="flex flex-col items-start gap-4">
                    <IconUpload @update:svg-preview="icon = $event" />
                </div>
                <CategoriesSmartPricing
                    :entry-price="selectedEntryPrice"
                    :quantity="selectedQuantity"
                    :margin="selectedMargin"
                    :enabled="enableSmartPricing"
                    @update:enabled="updateSmartPricingEnabled"
                    @update:entry-price="selectedEntryPrice = $event"
                    @update:quantity="selectedQuantity = $event"
                    @update:margin="selectedMargin = $event"
                />
                <CategoriesCustomProperties
                    :avg-item-weight="avgWeight"
                    :length="length"
                    :width="width"
                    :height="height"
                    :enabled="enableCustomProperties"
                    @update:enabled="updateCustomPropertiesEnabled"
                    @update:weight="avgWeight = $event"
                    @update:length="length = $event"
                    @update:width="width = $event"
                    @update:height="height = $event"
                />
            </div>
            <UiDialogFooter>
                <UiButton variant="secondary" @click="isOpen = false"> Cancel</UiButton>
                <UiButton @click="makeUpdate()"> Update</UiButton>
            </UiDialogFooter>
        </UiDialogContent>
    </UiDialog>
</template>
