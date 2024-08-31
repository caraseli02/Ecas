<script setup lang="ts">
import { Building2Icon, PlusCircleIcon } from 'lucide-vue-next';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { countries } from '@/data/countries';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ref, watch } from 'vue';
import { AccountType } from '~/types';
import { useNuxtApp } from '#app';
import { AddressInterface } from '~/types/auth/user-interface';
import { updateStoreDetails } from '~/helpers/auth-store.helper';

const { $api } = useNuxtApp();

const props = defineProps<{
    address: any;
    accountType: AccountType;
}>();

const isOpen = defineModel<boolean>();

const emit = defineEmits(['addBillingAddress']);

const typeOfDialog = ref('');

interface Country {
    label: string;
    value: string;
    icon: string;
    regions: {
        name: string;
        shortCode: string;
    }[];
}

interface Region {
    label: string;
    value: string;
}

const formSchema = toTypedSchema(
    z.object({
        addressAlias: z
            .string()
            .min(1, 'Address Alias is required')
            .default(props.address?.value.alias || ''),
        city: z
            .string()
            .min(1, 'City is required')
            .default(props.address?.value.city || ''),
        country: z
            .string()
            .min(1, 'Country is required')
            .default(props.address?.value.country || ''),
        county: z
            .string()
            .min(1, 'Region is required')
            .default(props.address?.value.region || ''),
        addressLine1: z
            .string()
            .min(1, 'Address Line 1 is required')
            .default(props.address?.value.name1 || ''),
        addressLine2: z
            .string()
            .optional()
            .default(props.address?.value.name2 || ''),
        postcode: z
            .string()
            .min(1, 'Postcode is required')
            .default(props.address?.value.postcode || ''),
    })
);

const { handleSubmit, values, setFieldValue } = useForm({
    validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
    console.log({
        title: 'You submitted the following values:',
        description: JSON.stringify(values, null, 2),
    });

    const payload: AddressInterface = {
        alias: values.addressAlias,
        name1: values.addressLine1,
        name2: values.addressLine2,
        city: values.city,
        country: values.country,
        postcode: values.postcode,
        region: values.county,
        icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cd8b9b1c0d2b925f29e818d6e49d9d83c8bd553c0416b56bcae00e809eb1cd1b?apiKey=20497529553648aab918fa2d322ece87&',
    };

    const response = props.address?.value
        ? await $api.user.updateBillingAsCustomer(payload)
        : await $api.user.addBillingAsCustomer(payload);

    if (response.status === 'success') {
        emit('addBillingAddress', payload);
        await updateStoreDetails();
        onCloseDialog();
    }
});

const findRegionByName = (regions: Country['regions'] | undefined, name: string | undefined) => {
    const region = regions?.find((region) => region.name === name);
    if (region) {
        return {
            label: region.name,
            value: region.shortCode,
        };
    }
    return undefined;
};

const country = ref<undefined | Country>(countries.find((c) => c.value === (props.address?.value.country || 'US')) as Country);

const region = ref<undefined | Region>(findRegionByName(country.value?.regions, props.address?.value.region));

const regions = ref<Region[]>(country.value?.regions.map((e) => ({ label: e.name, value: e.name })) || []);

const showErrorMsg = ref(true);

watch(country, (newCountry) => {
    if (newCountry) {
        setFieldValue('country', newCountry.value);
        country.value = countries.find((c) => c.value === newCountry.value) as Country;
        regions.value =
            newCountry.regions.map((e) => {
                return {
                    label: e.name,
                    value: e.name,
                };
            }) || [];
        region.value = { label: country.value.regions[0].name, value: country.value.regions[0].shortCode };
    } else {
        region.value = undefined;
    }
});

watch(region, (newRegion) => {
    if (newRegion) {
        setFieldValue('county', newRegion.value);
        region.value = regions.value.find((c) => c.value === newRegion.value) as any;
    } else {
        region.value = undefined;
    }
});

const onCloseDialog = () => {
    console.log('close');
    showErrorMsg.value = false;
    isOpen.value = false;
};
</script>

<template>
    <UiDialog v-model:open="isOpen">
        <UiDialogTrigger as-child>
            <UiButton class="rounded-full" size="icon" variant="ghost">
                <PlusCircleIcon class="aspect-square w-10 h-10 stroke-1 text-blue-500" />
            </UiButton>
        </UiDialogTrigger>
        <UiDialogContent ref="dialog" class="max-w-[350px] sm:max-w-[640px] rounded-xl">
            <UiDialogHeader>
                <UiDialogTitle>{{ (typeOfDialog === 'edit' ? 'Edit ' : 'Add ') + 'Billing Address' }}</UiDialogTitle>
            </UiDialogHeader>
            <section class="flex flex-col self-stretch bg-white rounded-xl shadow-sm max-md:px-5 max-h-[85vh] overflow-y-auto">
                <form class="mt-5 flex flex-col gap-y-6 gap-x-9" @submit="onSubmit">
                    <FormField v-slot="{ componentField }" name="addressAlias">
                        <FormItem>
                            <FormLabel>Address Alias</FormLabel>
                            <FormControl>
                                <section class="flex items-center">
                                    <div class="flex items-center justify-center w-11 h-11 rounded-l-lg bg-stone-50 border border-grey-300">
                                        <Building2Icon class="w-5 h-5" />
                                    </div>
                                    <UiInput
                                        class="rounded-l-[0px] border-l-0"
                                        type="text"
                                        v-bind="componentField"
                                        placeholder="Address Alias 1"
                                    />
                                </section>
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>
                    <section class="flex flex-col md:flex-row justify-between gap-6">
                        <FormField name="country">
                            <FormItem class="flex flex-col w-full">
                                <FormControl>
                                    <FormSelect
                                        v-model="country"
                                        :options="countries"
                                        :show-disabled-styles="false"
                                        label="Country"
                                        placeholder="United States"
                                        search
                                        size="lg"
                                        class="relative z-20"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField name="county">
                            <FormItem class="flex flex-col w-full">
                                <FormControl>
                                    <FormSelect
                                        v-model="region"
                                        :options="regions"
                                        :show-disabled-styles="false"
                                        label="Region"
                                        placeholder="New York"
                                        search
                                        size="lg"
                                        class="relative z-20"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </section>

                    <FormField v-slot="{ componentField }" name="city">
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <UiInput type="text" placeholder="Bucharest" v-bind="componentField" />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="addressLine1">
                        <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                                <UiInput type="text" placeholder="Address Line 1" v-bind="componentField" />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="addressLine2">
                        <FormItem>
                            <FormLabel>Address Line 2</FormLabel>
                            <FormControl>
                                <UiInput type="text" placeholder="Address Line 2" v-bind="componentField" />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="postcode">
                        <FormItem>
                            <FormLabel>Postcode</FormLabel>
                            <FormControl>
                                <UiInput type="text" placeholder="Postcode" v-bind="componentField" />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <div class="flex justify-end gap-4 col-span-2 sticky bottom-0 bg-white pt-2">
                        <UiButton variant="secondary" type="reset" @click="onCloseDialog()">Cancel</UiButton>
                        <UiButton type="submit" class="w-60"> Save</UiButton>
                    </div>
                </form>
            </section>
        </UiDialogContent>
    </UiDialog>
</template>

<style scoped lang="postcss">
label {
    @apply text-slate-500;
}
</style>
