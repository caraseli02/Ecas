<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';
import { usePricingStore } from '~/store/pricingStore';
import { useNuxtApp } from '#app';

const { $api } = useNuxtApp();

const pricingStore = usePricingStore();

const isOpen = ref(false);

const quantityList = ref([{ id: 1, min: 0, max: 0 }]);

function addQuantity() {
    quantityList.value.push({ id: quantityList.value.length + 1, min: 0, max: 0 });
}

function removeQuantity(id: number) {
    quantityList.value = quantityList.value.filter((q) => q.id !== id);
}

function updateQuantity(id: number, quantity: { min: number; max: number }) {
    const index = quantityList.value.findIndex((q) => q.id === id);
    if (index !== -1) {
        quantityList.value[index] = { ...quantityList.value[index], ...quantity };
    }
}

const createNewQuantityTemplate = async () => {
    console.log(quantityList);
    if (quantityList.value.find((item) => item.min >= item.max || item.min < 0 || item.max < 0 || item.min === 0 || item.max === 0)) {
        // Add your logic here to handle the creation without the price range values
        return;
    }
    // Add your logic here to handle the creation
    const maxValues = quantityList.value.map((item) => item.max);

    const response = await $api.smartPricing.setNewQuantityRange({
        values: maxValues,
        label: `QTY-${pricingStore.quantity?.length + 1}`,
    });
    if (response.status !== 'success') {
        // Add your logic here to handle the creation error
        return;
    }

    pricingStore.addQuantityRange(
        {
            values: quantityList.value.map((item) => {
                return `${item.min} - ${item.max}`;
            }),
            label: `QTY-${pricingStore.quantity?.length + 1}`,
        },
        response.data.id
    );
};
</script>

<template>
    <UiDialog v-model:open="isOpen">
        <UiDialogTrigger as-child>
            <UiButton class="justify-start hover:text-blue-500" variant="ghost">Quantity</UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="max-w-sm p-4 sm:max-w-[480px] gap-10 border-none rounded-xl shadow-s">
            <UiDialogHeader>
                <UiDialogTitle>Create Quantity Template</UiDialogTitle>
            </UiDialogHeader>
            <section class="flex flex-col gap-4">
                <SmartPricingQuantityRange
                    v-for="quantity in quantityList"
                    :key="quantity.id"
                    :quantity="quantity"
                    @delete="removeQuantity(quantity.id)"
                    @updateRange="updateQuantity(quantity.id, $event)"
                />
            </section>
            <UiDialogFooter class="sm:justify-start">
                <UiButton type="button" class="min-w-10 h-10 p-0" variant="secondary" @click="addQuantity()">
                    <PlusIcon class="w-6 h-6" />
                </UiButton>
                <UiButton
                    class="w-full"
                    type="button"
                    @click="
                        createNewQuantityTemplate();
                        isOpen = false;
                    "
                >
                    Create
                </UiButton>
            </UiDialogFooter>
        </UiDialogContent>
    </UiDialog>
</template>
