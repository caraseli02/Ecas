<script setup lang="ts">
import { CopyIcon, FilePenLineIcon } from 'lucide-vue-next';
import { ComputedRef, Ref, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { countries } from '@/data/countries';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { AccountType } from '~/types';

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

console.log(getUserDetails.value);

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

const formSchemaPersonal = toTypedSchema(
    z.object({
        firstName: z
            .string({
                required_error: 'First name is required',
            })
            .min(1),
        lastName: z
            .string({
                required_error: 'Last name is required',
            })
            .min(1),
        country: z
            .string({
                required_error: 'Country is required',
            })
            .min(1),
        county: z
            .string({
                required_error: 'County/Region is required',
            })
            .min(1),
        city: z
            .string({
                required_error: 'City is required',
            })
            .min(1),
        addressLine1: z
            .string({
                required_error: 'Address Line 1 is required',
            })
            .min(1),
        addressLine2: z.string().optional(),
        postcode: z
            .string({
                required_error: 'Postcode is required',
            })
            .min(1),
        phoneNumber: z
            .string({
                required_error: 'Phone Number is required',
            })
            .min(1)
            .regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid phone number'),
        mobileNumber: z
            .string({
                required_error: 'Mobile Number is required',
            })
            .min(1)
            .regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid mobile number'),
        bankName: z
            .string({
                required_error: 'Bank Name is required',
            })
            .min(1),
        iban: z
            .string({
                required_error: 'IBAN is required',
            })
            .min(1)
            .regex(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/, 'Invalid IBAN'),
        email: z
            .string({
                required_error: 'Email is required',
            })
            .min(1)
            .regex(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/, 'Invalid email'),
    })
);

const formSchemaBusiness = toTypedSchema(
    z.object({
        companyName: z
            .string({
                required_error: 'Company Name is required',
            })
            .min(1),
        registrationNumber: z
            .string({
                required_error: 'Company Registration Number is required',
            })
            .min(1),
        taxId: z
            .string({
                required_error: 'Tax ID is required',
            })
            .min(1),
        vatNumber: z
            .string({
                required_error: 'V.A.T Number is required',
            })
            .min(1),
        country: z
            .string({
                required_error: 'Country is required',
            })
            .min(1),
        county: z
            .string({
                required_error: 'County/Region is required',
            })
            .min(1),
        city: z
            .string({
                required_error: 'City is required',
            })
            .min(1),
        addressLine1: z
            .string({
                required_error: 'Address Line 1 is required',
            })
            .min(1),
        addressLine2: z.string().optional(),
        postcode: z
            .string({
                required_error: 'Postcode is required',
            })
            .min(1),
        phoneNumber: z
            .string({
                required_error: 'Phone Number is required',
            })
            .min(1)
            .regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid phone number'),
        mobileNumber: z
            .string({
                required_error: 'Mobile Number is required',
            })
            .min(1)
            .regex(/^\+?\d{1,4}?\s?-?\(?\d{1,3}?\)?\s?-?\d{1,4}\s?-?\d{1,4}\s?-?\d{1,9}$/, 'Invalid mobile number'),
        bankName: z
            .string({
                required_error: 'Bank Name is required',
            })
            .min(1),
        iban: z
            .string({
                required_error: 'IBAN is required',
            })
            .min(1)
            .regex(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/, 'Invalid IBAN'),
        companyEmail: z
            .string({
                required_error: 'Company Email is required',
            })
            .email('Invalid email address'),
    })
);

const personalFields = {
    firstName: ref(getUserDetails.value.personalDetails?.firstName || ''),
    lastName: ref(getUserDetails.value.personalDetails?.lastName || ''),
    country: ref(getUserDetails.value.personalDetails?.address.country || ''),
    county: ref(getUserDetails.value.personalDetails?.address.region || ''),
    city: ref(getUserDetails.value.personalDetails?.address.city || ''),
    addressLine1: ref(getUserDetails.value.personalDetails?.address.name1 || '-'),
    addressLine2: ref(getUserDetails.value.personalDetails?.address.name2 || '-'),
    postcode: ref(getUserDetails.value.personalDetails?.address.postcode || '-'),
    phoneNumber: ref(getUserDetails.value.contactDetails?.phone || ''),
    mobileNumber: ref(getUserDetails.value.contactDetails?.mobile || ''),
    bankName: ref(''),
    iban: ref(''),
    email: ref(getUserDetails.value.contactDetails?.email || ''),
};
const businessFields = {
    companyName: ref(getUserDetails.value.companyDetails?.name || ''),
    registrationNumber: ref(getUserDetails.value.companyDetails?.registrationNumber || ''),
    taxId: ref(getUserDetails.value.companyDetails?.taxId || ''),
    vatNumber: ref(getUserDetails.value.companyDetails?.vat || ''),
    country: ref(getUserDetails.value.companyDetails?.address.country || ''),
    county: ref(getUserDetails.value.companyDetails?.address.region || ''),
    city: ref(getUserDetails.value.companyDetails?.address.city || ''),
    addressLine1: ref(getUserDetails.value.companyDetails?.address.name1 || ''),
    addressLine2: ref(getUserDetails.value.companyDetails?.address.name2 || ''),
    postcode: ref(getUserDetails.value.companyDetails?.address.postcode || ''),
    phoneNumber: ref(getUserDetails.value.contactDetails?.phone || ''),
    mobileNumber: ref(getUserDetails.value.contactDetails?.mobile || ''),
    bankName: ref(''),
    iban: ref(''),
    companyEmail: ref(getUserDetails.value.contactDetails?.email || ''),
};

interface Fields {
    [key: string]: Ref<string | number>;
}

const usedFields = ref<Fields>(getUserDetails.value.accountType === AccountType.Personal ? personalFields : businessFields);
const isFieldNotEmpty: { [key: string]: ComputedRef<boolean> } = {};
for (const key in personalFields) {
    isFieldNotEmpty[key] = computed(() => usedFields.value[key].value.toString().trim().length > 0);
}

const { handleSubmit, setFieldValue } = useForm({
    validationSchema: getUserDetails.value.accountType === AccountType.Personal ? formSchemaPersonal : formSchemaBusiness,
});

const onSubmit = async () => {
    if (getUserDetails.value.accountType === AccountType.Personal) {
        console.log(personalFields);
    } else {
        console.log(businessFields);
    }
};

const openEdit = ref(false);
const country = ref<undefined | Country>(
    getUserDetails.value[getUserDetails.value.accountType === AccountType.Personal ? 'personalDetails' : 'companyDetails']?.address.country
        ? (countries.find(
              (c) =>
                  c.value ===
                  getUserDetails.value[getUserDetails.value.accountType === AccountType.Personal ? 'personalDetails' : 'companyDetails']
                      ?.address.country
          ) as Country)
        : undefined
);

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

const region = ref<undefined | Region>(
    findRegionByName(
        country.value?.regions,
        getUserDetails.value[getUserDetails.value.accountType === AccountType.Personal ? 'personalDetails' : 'companyDetails']?.address
            .region
    )
);

const regions = ref<Region[]>(country.value?.regions.map((e) => ({ label: e.name, value: e.name })) || []);

// Watch for changes to the country and update values.country
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
        region.value = country.value.regions.find(
            (c) =>
                c.shortCode ===
                getUserDetails.value[getUserDetails.value.accountType === AccountType.Personal ? 'personalDetails' : 'companyDetails']
                    ?.address.region
        ) as any;
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
</script>

<template>
    <div class="bg-white shadow-l rounded-xl">
        <section
            v-if="getUserDetails.accountType === AccountType.Personal"
            class="flex flex-col self-stretch p-4 md:p-6 bg-white rounded-xl shadow-sm"
        >
            <header class="flex flex-col md:flex-row gap-2.5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <h2 class="self-start text-xl font-semibold leading-7 text-neutral-700">Account Details</h2>
                <div class="flex flex-col md:flex-row gap-3 text-sm font-medium leading-6 text-gray-500">
                    <UiButton
                        :class="openEdit ? 'text-white' : 'text-slate-500'"
                        :variant="openEdit ? 'default' : 'secondary'"
                        @click="openEdit = !openEdit"
                    >
                        <FilePenLineIcon class="w-5 h-5 stroke-1.5 mr-2" />
                        <span>Edit</span>
                    </UiButton>
                    <UiButton class="text-slate-500" variant="secondary">
                        <CopyIcon class="w-5 h-5 stroke-1.5 mr-2" />
                        <span>Copy Details</span>
                    </UiButton>
                </div>
            </header>
            <form class="mt-9 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-9">
                <FormField v-slot="{ componentField }" name="firstName">
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="First Name"
                                v-bind="componentField"
                                :v-model="personalFields.firstName"
                                :default-value="getUserDetails.personalDetails?.firstName"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage v-if="!isFieldNotEmpty.firstName" />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="lastName">
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Last Name"
                                v-bind="componentField"
                                :v-model="personalFields.lastName"
                                :default-value="getUserDetails.personalDetails?.lastName"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage v-if="!isFieldNotEmpty.lastName" />
                    </FormItem>
                </FormField>

                <FormField name="country">
                    <FormItem class="flex flex-col">
                        <FormControl>
                            <FormSelect
                                v-if="country?.label"
                                v-model="country"
                                :disabled="!openEdit"
                                :options="countries"
                                :default-value="getUserDetails.personalDetails?.address.country"
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
                    <FormItem class="flex flex-col">
                        <FormControl>
                            <FormSelect
                                v-if="regions"
                                v-model="region"
                                :disabled="!openEdit"
                                :options="regions"
                                :default-value="getUserDetails.personalDetails?.address.region"
                                :show-disabled-styles="false"
                                label="County"
                                :placeholder="country?.regions[0].name"
                                search
                                size="lg"
                                class="relative z-20"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="city">
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="City"
                                v-bind="componentField"
                                :v-model="personalFields.city"
                                :default-value="getUserDetails.personalDetails?.address.city"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="addressLine1">
                    <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Address Line 1"
                                v-bind="componentField"
                                :v-model="personalFields.addressLine1"
                                :default-value="getUserDetails.personalDetails?.address?.name1"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="addressLine2">
                    <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Address Line 2"
                                v-bind="componentField"
                                :v-model="personalFields.addressLine2"
                                :default-value="getUserDetails.personalDetails?.address?.name2"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="postcode">
                    <FormItem>
                        <FormLabel>Postcode</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Postcode"
                                v-bind="componentField"
                                :v-model="personalFields.postcode"
                                :default-value="getUserDetails.personalDetails?.address?.postcode"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="phoneNumber">
                    <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="+1 (555) 867-5309"
                                v-bind="componentField"
                                :v-model="personalFields.phoneNumber"
                                :default-value="getUserDetails.contactDetails?.phone"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="mobileNumber">
                    <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="+1 (555) 867-5309"
                                v-bind="componentField"
                                :v-model="personalFields.phoneNumber"
                                :default-value="getUserDetails.contactDetails?.mobile"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="bankName">
                    <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Bank Name"
                                v-bind="componentField"
                                :v-model="personalFields.bankName"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="iban">
                    <FormItem>
                        <FormLabel>IBAN</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="ABCD 1234 5678 9012 3456 78"
                                v-bind="componentField"
                                :v-model="personalFields.iban"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="youremail@gmail.com"
                                v-bind="componentField"
                                :v-model="personalFields.email"
                                :default-value="getUserDetails.contactDetails?.email"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <div v-if="openEdit" class="flex flex-col md:flex-row justify-end gap-4 md:col-span-2">
                    <Button variant="secondary" type="reset" @click="openEdit = !openEdit"> Cancel</Button>
                    <Button
                        class="md:w-60"
                        @click="
                            onSubmit();
                            openEdit = !openEdit;
                        "
                    >
                        Save
                    </Button>
                </div>
            </form>
        </section>

        <section v-else class="flex flex-col self-stretch p-4 md:p-6 bg-white rounded-xl shadow-sm">
            <header class="flex flex-col md:flex-row gap-2.5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <h2 class="self-start text-xl font-semibold leading-7 text-neutral-700">Company Details</h2>
                <div class="flex flex-col md:flex-row gap-3 text-sm font-medium leading-6 text-gray-500">
                    <UiButton
                        :class="openEdit ? 'text-white' : 'text-slate-500'"
                        :variant="openEdit ? 'default' : 'secondary'"
                        @click="openEdit = !openEdit"
                    >
                        <FilePenLineIcon class="w-5 h-5 stroke-1.5 mr-2" />
                        <span>Edit</span>
                    </UiButton>
                    <UiButton class="text-slate-500" variant="secondary">
                        <CopyIcon class="w-5 h-5 stroke-1.5 mr-2" />
                        <span>Copy Details</span>
                    </UiButton>
                </div>
            </header>
            <form class="mt-9 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-9">
                <FormField v-slot="{ componentField }" name="companyName">
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Company Name"
                                v-bind="componentField"
                                :v-model="businessFields.companyName"
                                :default-value="getUserDetails.companyDetails?.name"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="registrationNumber">
                    <FormItem>
                        <FormLabel>Company Registration Number</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="ABC123456"
                                v-bind="componentField"
                                :v-model="businessFields.registrationNumber"
                                :default-value="getUserDetails.companyDetails?.registrationNumber"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="taxId">
                    <FormItem>
                        <FormLabel>Tax ID</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="ABC123456"
                                v-bind="componentField"
                                :v-model="businessFields.taxId"
                                :default-value="getUserDetails.companyDetails?.taxId"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="vatNumber">
                    <FormItem>
                        <FormLabel>V.A.T Number</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="ABC123456"
                                v-bind="componentField"
                                :v-model="businessFields.vatNumber"
                                :default-value="getUserDetails.companyDetails?.vat"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField name="country">
                    <FormItem class="flex flex-col">
                        <FormControl>
                            <FormSelect
                                v-if="country?.label"
                                v-model="country"
                                :disabled="!openEdit"
                                :options="countries"
                                :default-value="getUserDetails.companyDetails?.address.country"
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
                    <FormItem class="flex flex-col">
                        <FormControl>
                            <FormSelect
                                v-if="regions"
                                v-model="region"
                                :disabled="!openEdit"
                                :options="regions"
                                :default-value="getUserDetails.companyDetails?.address.region"
                                :show-disabled-styles="false"
                                label="County/Region"
                                :placeholder="country?.regions[0].name"
                                search
                                size="lg"
                                class="relative z-20"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="city">
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="City"
                                v-bind="componentField"
                                :v-model="businessFields.city"
                                :default-value="getUserDetails.companyDetails?.address.city"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="addressLine1">
                    <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Address Line 1"
                                v-bind="componentField"
                                :v-model="businessFields.addressLine1"
                                :default-value="getUserDetails.companyDetails?.address?.name1"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="addressLine2">
                    <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Address Line 2"
                                v-bind="componentField"
                                :v-model="businessFields.addressLine2"
                                :default-value="getUserDetails.companyDetails?.address?.name2"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="postcode">
                    <FormItem>
                        <FormLabel>Postcode</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Postcode"
                                v-bind="componentField"
                                :v-model="businessFields.postcode"
                                :default-value="getUserDetails.companyDetails?.address?.postcode"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="phoneNumber">
                    <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="+1 (555) 867-5309"
                                v-bind="componentField"
                                :v-model="businessFields.phoneNumber"
                                :default-value="getUserDetails.contactDetails?.phone"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="mobileNumber">
                    <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="+1 (555) 867-5309"
                                v-bind="componentField"
                                :v-model="businessFields.mobileNumber"
                                :default-value="getUserDetails.contactDetails?.mobile"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="bankName">
                    <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Bank Name"
                                v-bind="componentField"
                                :v-model="businessFields.bankName"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="iban">
                    <FormItem>
                        <FormLabel>IBAN</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="ABCD 1234 5678 9012 3456 78"
                                v-bind="componentField"
                                :v-model="businessFields.iban"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="companyEmail">
                    <FormItem>
                        <FormLabel>Company Email</FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="youremail@company.com"
                                v-bind="componentField"
                                :v-model="businessFields.companyEmail"
                                :default-value="getUserDetails.contactDetails?.email"
                                :disabled="!openEdit"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <div v-if="openEdit" class="flex flex-col md:flex-row justify-end gap-4 md:col-span-2">
                    <Button variant="secondary" type="reset" @click="openEdit = !openEdit"> Cancel</Button>
                    <Button
                        class="md:w-60"
                        @click="
                            onSubmit();
                            openEdit = !openEdit;
                        "
                    >
                        Save
                    </Button>
                </div>
            </form>
        </section>
    </div>
</template>

<style scoped lang="postcss">
label {
    @apply text-slate-500;
}
</style>
