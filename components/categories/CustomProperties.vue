<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    avgItemWeight: string;
    length: string;
    width: string;
    height: string;
    enabled: boolean;
}>();

const customProperties = ref(props.enabled);
const avgWeightValue = ref<string | null>(props.avgItemWeight);
const widthValue = ref<string | null>(props.width);
const heightValue = ref<string | null>(props.height);
const lengthValue = ref<string | null>(props.length);

const emit = defineEmits<{
    (e: 'update:weight', value: string): void;
    (e: 'update:width', value: string): void;
    (e: 'update:length', value: string): void;
    (e: 'update:height', value: string): void;
    (e: 'update:enabled', value: boolean): void;
}>();

watch(
    () => customProperties.value,
    (value) => {
        emit('update:enabled', value);
    },
    { immediate: true }
);
</script>

<template>
    <section>
        <div class="flex items-center justify-between space-x-2 mb-6">
            <UiLabel for="airplane-mode">Custom Properties</UiLabel>
            <UiSwitch id="airplane-mode" v-model:checked="customProperties" />
        </div>
        <div v-if="customProperties">
            <div class="flex flex-col items-start gap-4">
                <UiLabel for="title" class="text-right">Average Item Weight</UiLabel>
                <UiInput id="title" v-model="avgWeightValue" class="col-span-3" @input="emit('update:weight', $event.target.value)" />
            </div>
            <div class="flex flex-col items-start gap-4 mt-5">
                <UiLabel for="title" class="text-right">Item Length</UiLabel>
                <UiInput id="title" v-model="lengthValue" class="col-span-3" @input="emit('update:length', $event.target.value)" />
            </div>
            <div class="flex flex-col items-start gap-4 mt-5">
                <UiLabel for="title" class="text-right">Item Width</UiLabel>
                <UiInput id="title" v-model="widthValue" class="col-span-3" @input="emit('update:width', $event.target.value)" />
            </div>
            <div class="flex flex-col items-start gap-4 mt-5">
                <UiLabel for="title" class="text-right">Item Height</UiLabel>
                <UiInput id="title" v-model="heightValue" class="col-span-3" @input="emit('update:height', $event.target.value)" />
            </div>
        </div>
    </section>
</template>
