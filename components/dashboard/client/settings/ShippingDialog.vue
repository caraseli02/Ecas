<script setup lang="ts">
import { Building2Icon, PlusCircleIcon } from 'lucide-vue-next';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { countries } from '@/data/countries';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AddressInterface } from '~/types/auth/user-interface';
import { ref, watch } from 'vue';
import { AccountType } from '~/types';

const props = defineProps<{
    address?: AddressInterface;
    isOpen?: boolean;
    accountType?: AccountType;
    dialogType: string;
}>();

const emit = defineEmits<{
    (e: 'add', address: null): void;
}>();

watch(
    () => props.dialogType,
    (newVal) => {
        console.log('Dialog type changed to:', newVal);
    }
);

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
        addressAlias: z.string().min(1, 'Address Alias is required'),
        country: z.string().min(1, 'Country is required'),
        county: z.string().min(1, 'County/Region is required'),
        addressLine1: z.string().min(1, 'Address Line 1 is required'),
        addressLine2: z.string().optional(),
        postcode: z.string().min(1, 'Postcode is required'),
        phoneNumber: z
            .string()
            .min(1, 'Phone Number is required')
            .regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid phone number'),
        companyEmail: z.string().min(1, 'Company Email is required').email('Invalid email address'),
        contactName: z.string().min(1, 'Contact Name is required'),
        contactPhoneNumber: z
            .string()
            .min(1, 'Contact Phone Number is required')
            .regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid phone number'),
    })
);

const isOpen = ref(props.isOpen || false);

watch(
    () => props.isOpen,
    (newVal) => {
        isOpen.value = newVal;
    }
);

const { handleSubmit, values } = useForm({
    validationSchema: formSchema,
    initialValues: {
        country: '',
    },
});

const personalFields = ref({
    addressAlias: '',
    country: '',
    county: '',
    name1: '',
    name2: '',
    postcode: '',
    phoneNumber: '',
    email: '',
    mobileNumber: '',
});
const businessFields = ref({
    addressAlias: '',
    country: '',
    county: '',
    name1: '',
    name2: '',
    postcode: '',
    companyPhoneNumber: '',
    companyEmail: '',
    companyMobileNumber: '',
});

watch(
    () => props.address,
    (newVal) => {
        console.log(newVal);
        if (props.accountType === AccountType.Personal) {
            personalFields.value.addressAlias = newVal?.alias || '';
            personalFields.value.country = newVal?.country || '';
            personalFields.value.county = newVal?.region || '';
            personalFields.value.name1 = newVal?.name1 || '';
            personalFields.value.name2 = newVal?.name2 || '';
            personalFields.value.postcode = newVal?.postcode || '';
        } else if (props.accountType === AccountType.Business) {
            businessFields.value.addressAlias = newVal?.alias || '';
            businessFields.value.country = newVal?.country || '';
            businessFields.value.county = newVal?.region || '';
            businessFields.value.name1 = newVal?.name1 || '';
            businessFields.value.name2 = newVal?.name2 || '';
            businessFields.value.postcode = newVal?.postcode || '';
        }
    }
);

const onSubmit = handleSubmit((values) => {
    console.log({
        title: 'You submitted the following values:',
        description: JSON.stringify(values, null, 2),
    });
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

const country = ref<undefined | Country>(countries.find((c) => c.value === (props.address?.country || 'US')) as Country);

const region = ref<undefined | Region>(findRegionByName(country.value?.regions, props.address?.region));

const regions = ref<Region[]>(country.value?.regions.map((e) => ({ label: e.name, value: e.name })) || []);

const showErrorMsg = ref(true);

function onCloseDialog() {
    showErrorMsg.value = false;
    isOpen.value = false;
}

watch(country, (newCountry) => {
    if (newCountry) {
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
        region.value = regions.value.find((c) => c.value === newRegion.value) as any;
    } else {
        region.value = undefined;
    }
});

const handleAdd = () => {
    emit('add', null);
};
</script>

<template>
    <UiDialog v-model:open="isOpen">
        <UiDialogTrigger as-child>
            <UiButton size="icon" class="rounded-full" variant="ghost" @click="handleAdd">
                <PlusCircleIcon class="aspect-square w-10 h-10 stroke-1 text-blue-500" />
            </UiButton>
        </UiDialogTrigger>
        <UiDialogContent ref="dialog" class="max-w-[350px] sm:max-w-[640px] rounded-xl">
            <UiDialogHeader>
                <UiDialogTitle>{{ (props.dialogType === 'edit' ? 'Edit ' : 'Add ') + 'Shipping Address' }}</UiDialogTitle>
            </UiDialogHeader>
            <section class="flex flex-col self-stretch bg-white rounded-xl shadow-sm max-md:px-5 max-h-[85vh] overflow-y-auto">
                <form class="mt-5 flex flex-col gap-y-6 gap-x-9" @submit="onSubmit">
                    <FormField name="addressAlias">
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
                                        placeholder="Address Alias 1"
                                        :v-model="personalFields.addressAlias"
                                        :default-value="personalFields.addressAlias"
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
                                <FormMessage v-if="showErrorMsg" />
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
                                        placeholder="Select Region"
                                        search
                                        size="lg"
                                        class="relative z-20"
                                    />
                                </FormControl>
                                <FormMessage v-if="showErrorMsg" />
                            </FormItem>
                        </FormField>
                    </section>
                    <FormField v-slot="{ componentField }" name="addressLine1">
                        <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                                <UiInput
                                    type="text"
                                    placeholder="Address Line 1"
                                    v-bind="componentField"
                                    :v-model="personalFields.name1"
                                    :default-value="personalFields.name1"
                                />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="addressLine2">
                        <FormItem>
                            <FormLabel>Address Line 2</FormLabel>
                            <FormControl>
                                <UiInput
                                    type="text"
                                    placeholder="Address Line 2"
                                    v-bind="componentField"
                                    :v-model="personalFields.name1"
                                    :default-value="personalFields.name2"
                                />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <FormField name="postcode">
                        <FormItem>
                            <FormLabel>Postcode</FormLabel>
                            <FormControl>
                                <UiInput
                                    type="text"
                                    placeholder="Postcode"
                                    :v-model="personalFields.postcode"
                                    :default-value="personalFields.postcode"
                                />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <FormField name="phoneNumber">
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <UiInput
                                    type="tel"
                                    placeholder="+1 (555) 867-5309"
                                    :v-model="personalFields.phoneNumber"
                                    :default-value="personalFields.phoneNumber"
                                />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="companyEmail">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <UiInput type="email" placeholder="youremail@gmail.com" v-bind="componentField" />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="contactName">
                        <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                                <UiInput type="text" placeholder="Contact Name" v-bind="componentField" />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="contactPhoneNumber">
                        <FormItem>
                            <FormLabel>Contact Phone Number</FormLabel>
                            <FormControl>
                                <UiInput type="tel" placeholder="+1 (555) 867-5309" v-bind="componentField" />
                            </FormControl>
                            <FormMessage v-if="showErrorMsg" />
                        </FormItem>
                    </FormField>

                    <div class="flex justify-end gap-4 col-span-2 sticky bottom-0 bg-white pt-2">
                        <UiButton variant="secondary" type="reset" @click="onCloseDialog()"> Cancel</UiButton>
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
