<script setup lang="ts">
import { CopyIcon, FilePenLineIcon } from 'lucide-vue-next';
import { ref, watch } from 'vue';
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
import { useNuxtApp } from '#app';
import { updateStoreDetails } from '~/helpers/auth-store.helper';

const { $api } = useNuxtApp();

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);

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

const baseSchema = z.object({
    country: z
        .string({
            required_error: 'Country is required',
        })
        .min(1)
        .default(
            getUserDetails.value.accountType === AccountType.Personal
                ? getUserDetails.value.personalDetails?.address.country || ''
                : getUserDetails.value.companyDetails?.address.country || ''
        ),
    county: z
        .string({
            required_error: 'County/Region is required',
        })
        .min(1)
        .default(
            getUserDetails.value.accountType === AccountType.Personal
                ? getUserDetails.value.personalDetails?.address.region || ''
                : getUserDetails.value.companyDetails?.address.region || ''
        ),
    city: z
        .string({
            required_error: 'City is required',
        })
        .min(1)
        .default(
            getUserDetails.value.accountType === AccountType.Personal
                ? getUserDetails.value.personalDetails?.address.city || ''
                : getUserDetails.value.companyDetails?.address.city || ''
        ),
    addressLine1: z
        .string({
            required_error: 'Address Line 1 is required',
        })
        .min(1)
        .default(
            getUserDetails.value.accountType === AccountType.Personal
                ? getUserDetails.value.personalDetails?.address.name1 || ''
                : getUserDetails.value.companyDetails?.address.name1 || ''
        ),
    addressLine2: z
        .string()
        .optional()
        .default(
            getUserDetails.value.accountType === AccountType.Personal
                ? getUserDetails.value.personalDetails?.address.name2 || ''
                : getUserDetails.value.companyDetails?.address.name2 || ''
        ),
    postcode: z
        .string({
            required_error: 'Postcode is required',
        })
        .min(1)
        .default(
            getUserDetails.value.accountType === AccountType.Personal
                ? getUserDetails.value.personalDetails?.address.postcode || ''
                : getUserDetails.value.companyDetails?.address.postcode || ''
        ),
    phoneNumber: z
        .number({
            required_error: 'Phone Number is required',
        })
        .min(1)
        .default(getUserDetails.value.contactDetails?.phone || ''),
    mobile: z
        .string({
            required_error: 'Mobile is required',
        })
        .min(1)
        .regex(/^\+?\d{1,4}[\s-]?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/, 'Invalid mobile number')
        .default(getUserDetails.value.contactDetails.mobile),
    email: z
        .string({
            required_error: 'Email is required',
        })
        .min(1)
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email')
        .default(getUserDetails.value.contactDetails.email),
});

const formSchema = toTypedSchema(
    baseSchema.extend({
        firstName: z
            .string({
                required_error: 'First name is required',
            })
            .min(1)
            .default(getUserDetails.value.personalDetails?.firstName || ''),
        lastName: z
            .string({
                required_error: 'Last name is required',
            })
            .min(1)
            .default(getUserDetails.value.personalDetails?.lastName || ''),
    })
);

const formBusinessSchema = toTypedSchema(
    baseSchema.extend({
        companyName: z
            .string({
                required_error: 'Company Name is required',
            })
            .min(1)
            .default(getUserDetails.value.companyDetails?.name || ''),
        registrationNumber: z
            .string({
                required_error: 'Company Registration Number is required',
            })
            .min(1)
            .default(getUserDetails.value.companyDetails?.registrationNumber || ''),
        taxId: z
            .string({
                required_error: 'Tax ID is required',
            })
            .min(1)
            .default(getUserDetails.value.companyDetails?.taxId || ''),
        vatNumber: z
            .string({
                required_error: 'V.A.T Number is required',
            })
            .min(1)
            .default(getUserDetails.value.companyDetails?.vat || ''),
        bankName: z
            .string()
            .optional()
            .default(getUserDetails.value.companyDetails?.bank_name || '')
            .or(z.literal('')),
        iban: z
            .union([z.string().length(0), z.string().regex(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/, 'Invalid IBAN')])
            .optional()
            .default(getUserDetails.value.companyDetails?.bank_iban || '')
            .transform((e: string) => (e === '' ? undefined : e)),
    })
);

const { handleSubmit, setFieldValue, errors } = useForm({
    validationSchema: getUserDetails.value.accountType === AccountType.Personal ? formSchema : formBusinessSchema,
});

const onSubmit = handleSubmit(async (values) => {
    if (getUserDetails.value.accountType === AccountType.Personal) {
        const payloadPersonal = {
            personalDetails: {
                firstName: values.firstName,
                lastName: values.lastName,
                address: {
                    country: values.country,
                    region: values.county,
                    city: values.city,
                    name1: values.addressLine1,
                    name2: values.addressLine2,
                    postcode: values.postcode,
                    _id: getUserDetails.value.personalDetails?.address._id,
                },
            },
            contactDetails: {
                phone: values.phoneNumber,
                email: values.email,
                mobile: values.mobile,
            },
        };
        const response = await $api.settingsClient.updateDetails(payloadPersonal);
        if (response.status === 'success') {
            console.log('success');
        }
    } else {
        const payloadBusiness = {
            companyDetails: {
                name: values.companyName,
                registrationNumber: values.registrationNumber,
                vat: values.vatNumber,
                address: {
                    country: values.country,
                    region: values.county,
                    city: values.city,
                    name1: values.addressLine1,
                    name2: values.addressLine2,
                    postcode: values.postcode,
                    _id: getUserDetails.value.companyDetails?.address._id,
                },
            },
            contactDetails: {
                phone: values.phoneNumber,
                email: values.companyEmail,
                mobile: values.mobile,
            },
        };
        const response = await $api.settingsClient.updateDetails(payloadBusiness);
        if (response.status === 'success') {
            console.log('success');
        }
    }

    await updateStoreDetails();
    openEdit.value = !openEdit.value;
});

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
        <section class="flex flex-col self-stretch p-4 md:p-6 bg-white rounded-xl shadow-sm">
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
            <form class="mt-9 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-9" @submit="onSubmit">
                <FormField v-if="getUserDetails.accountType !== AccountType.Personal" v-slot="{ componentField }" name="companyName">
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Company Name" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-if="getUserDetails.accountType !== AccountType.Personal" v-slot="{ componentField }" name="registrationNumber">
                    <FormItem>
                        <FormLabel>Company Registration Number</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="ABC123456" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-if="getUserDetails.accountType !== AccountType.Personal" v-slot="{ componentField }" name="taxId">
                    <FormItem>
                        <FormLabel>Tax ID</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="ABC123456" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-if="getUserDetails.accountType !== AccountType.Personal" v-slot="{ componentField }" name="vatNumber">
                    <FormItem>
                        <FormLabel>V.A.T Number</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="ABC123456" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-if="getUserDetails.accountType === AccountType.Personal" v-slot="{ componentField }" name="firstName">
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="First Name" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-if="getUserDetails.accountType === AccountType.Personal" v-slot="{ componentField }" name="lastName">
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Last Name" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField name="country">
                    <FormItem class="flex flex-col">
                        <FormControl>
                            <FormSelect
                                v-model="country"
                                :disabled="!openEdit"
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
                    <FormItem class="flex flex-col">
                        <FormControl>
                            <FormSelect
                                v-model="region"
                                type="button"
                                :disabled="!openEdit"
                                :options="regions"
                                :show-disabled-styles="false"
                                label="County"
                                placeholder="New York"
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
                            <Input type="text" placeholder="City" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="addressLine1">
                    <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Address Line 1" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="addressLine2">
                    <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Address Line 2" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="postcode">
                    <FormItem>
                        <FormLabel>Postcode</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Postcode" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="phoneNumber">
                    <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="+1 (555) 867-5309" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="mobile">
                    <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="+1 (555) 867-5309" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-if="getUserDetails.accountType !== AccountType.Personal" v-slot="{ componentField }" name="bankName">
                    <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                            <Input type="text" v-bind="componentField" placeholder="Bank Name" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-if="getUserDetails.accountType !== AccountType.Personal" v-slot="{ componentField }" name="iban">
                    <FormItem>
                        <FormLabel>IBAN</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="ABCD 1234 5678 9012 3456 78" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormLabel>{{ getUserDetails.accountType !== AccountType.Personal ? 'Company Email' : 'Email' }} </FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="youremail@gmail.com" v-bind="componentField" :disabled="!openEdit" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <div v-if="openEdit" class="flex flex-col md:flex-row justify-end gap-4 md:col-span-2">
                    <Button variant="secondary" type="reset" @click="openEdit = !openEdit">Cancel</Button>
                    <Button type="submit" class="md:w-60">Save</Button>
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
