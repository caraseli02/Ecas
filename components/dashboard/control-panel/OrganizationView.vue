<template>
    <div>
        <div class="mb-9 md:flex md:items-center md:justify-between">
            <h2 class="text-xl leading-[1.4] font-semibold max-md:mb-9">Company Details</h2>
            <div class="grid grid-cols-2 gap-3 md:grid-cols-[repeat(2,auto)]">
                <button
                    class="flex items-center justify-center w-full text-left px-4 py-2 rounded-md transition-colors duration-300 bg-[#F2F2F2] text-gray-300 hover:text-white hover:bg-blue xl:px-6"
                    :class="[isEditing ? 'text-white bg-blue' : '']"
                    @click="isEditing = !isEditing"
                >
                    <EditIcon class="w-5 h-5 mr-2 text-current xl:w-6 xl:h-6" />
                    <span class="text-sm leading-[1.42857] font-medium"> Edit </span>
                </button>
                <button
                    class="flex items-center justify-center w-full text-left px-4 py-2 rounded-md transition-colors duration-300 bg-[#F2F2F2] text-gray-300 hover:text-white hover:bg-blue xl:px-6"
                >
                    <CopyIcon class="w-5 h-5 mr-2 text-current xl:w-6 xl:h-6" />
                    <span class="text-sm leading-[1.42857] font-medium"> Copy Details </span>
                </button>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-x-9">
            <FormInput
                v-model="form.companyName.value"
                :error="form.companyName.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="Company Name"
                size="lg"
                placeholder="Company Name srl"
            />
            <FormInput
                v-model="form.companyRegistrationNumber.value"
                :error="form.companyRegistrationNumber.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="Company Registration Number"
                size="lg"
                placeholder="RO123456"
            />
            <FormInput
                v-model="form.taxID.value"
                :error="form.taxID.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="Tax ID"
                size="lg"
                placeholder="RO123456"
            />
            <FormInput
                v-model="form.vatNumber.value"
                :error="form.vatNumber.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="V.A.T Number"
                size="lg"
                placeholder="RO123456"
            />
            <FormSelect
                v-model="form.country.value"
                :error="form.country.error"
                :options="countries"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="Country"
                placeholder="United States"
                search
                size="lg"
                class="relative z-20"
            />
            <FormSelect
                v-model="form.region.value"
                :error="form.region.error"
                :options="regions"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="County/Region"
                placeholder=""
                search
                size="lg"
                class="relative z-10"
            />
            <FormInput
                v-model="form.city.value"
                :error="form.city.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="City"
                size="lg"
                placeholder="Georgia"
            />
            <FormInput
                v-model="form.name1.value"
                :error="form.name1.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="Address Line 1"
                size="lg"
                placeholder="5073 Mark Brown Rd"
            />
            <FormInput
                v-model="form.name2.value"
                :error="form.name2.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="Address Line 2"
                size="lg"
                placeholder="NE Dalton"
            />
            <FormInput
                v-model="form.postcode.value"
                :error="form.postcode.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="Postcode"
                size="lg"
                placeholder="W1A5AB"
            />
            <FormInput
                v-model="form.phone.value"
                :error="form.phone.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="Mobile Number"
                size="lg"
                placeholder="+1 (706) 275-0767"
            />
            <FormInput
                v-model="form.companyEmail.value"
                :error="form.companyEmail.error"
                :disabled="!isEditing"
                :show-disabled-styles="false"
                label="Company Email"
                placeholder="madalina.dobrovolski@company.com"
                type="email"
                size="lg"
            />
        </div>
        <div v-if="isEditing" class="grid grid-cols-[auto,1fr] gap-4 mt-9 xl:w-1/2 xl:ml-auto xl:pl-4">
            <button
                class="flex items-center justify-center w-full text-left px-[31px] py-2 rounded-lg transition-colors duration-300 bg-[#F2F2F2] text-gray-300 md:px-[91px] xl:px-[61px]"
                @click="isEditing = false"
            >
                <span class="leading-[1.75] font-medium"> Cancel </span>
            </button>
            <button
                class="flex items-center justify-center w-full text-left px-[31px] py-2 rounded-lg transition-colors duration-300 bg-blue text-white"
                @click="
                    updateAccountDetails();
                    isEditing = false;
                "
            >
                <span class="leading-[1.75] font-medium"> Save </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import EditIcon from '@/assets/icons/dashboard/edit.svg';
import CopyIcon from '@/assets/icons/dashboard/copy.svg';
import { countries } from '@/data/countries';
import { FormSelectOption } from '~~/types';
import { useNuxtApp } from '#app';
import { AddressInterface, CompanyDetails, ContactDetails, UserDetails } from '~/types/auth/user-details';
import { PropType } from 'nuxt/dist/app/compat/capi';
import { getRegionByCountry } from '~/helpers/form.helpers';

const companyInformation = ref<CompanyDetails>({} as CompanyDetails);
const { $api } = useNuxtApp();
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    account: {
        type: Object as PropType<UserDetails>,
        required: true,
    },
});
const form = ref({
    companyName: {
        value: '',
        error: '',
    },
    companyRegistrationNumber: {
        value: '',
        error: '',
    },
    taxID: {
        value: '',
        error: '',
    },
    vatNumber: {
        value: '',
        error: '',
    },
    country: {
        value: {
            value: '',
            label: '',
            icon: '',
        },
        error: '',
    },
    region: {
        value: {
            value: '',
            label: '',
        },
        error: '',
    },
    city: {
        value: '',
        error: '',
    },
    name1: {
        value: '',
        error: '',
    },
    name2: {
        value: '',
        error: '',
    },
    postcode: {
        value: '',
        error: '',
    },
    phone: {
        value: '',
        error: '',
    },
    companyEmail: {
        value: '',
        error: '',
    },
});
const regions = ref<FormSelectOption[]>([]);

const getCountryRegion = (country: any, region: any) => {
    const countryRegionObj = getRegionByCountry(country, region);

    if (!countryRegionObj) {
        return null;
    }

    regions.value = countryRegionObj.regions;
    form.value.country.value = countryRegionObj.country;
    form.value.region.value = countryRegionObj.region;
};

const getAccountDetails = async () => {
    if (!props.account?.companyDetails || !props.account?.contactDetails) {
        return;
    }

    form.value.companyName.value = props.account.companyDetails?.name;
    form.value.companyRegistrationNumber.value = props.account.companyDetails?.registrationNumber || '';
    form.value.taxID.value = '-';
    form.value.vatNumber.value = props.account.companyDetails?.vat || '';
    form.value.city.value = props.account.companyDetails?.address.city || '';
    form.value.name1.value = props.account.companyDetails?.address.name1 || '';
    form.value.name2.value = props.account.companyDetails?.address.name2 || '';
    form.value.postcode.value = props.account.companyDetails?.address.postcode || '';
    form.value.phone.value = props.account.contactDetails.phone;
    form.value.companyEmail.value = props.account.contactDetails.email;

    getCountryRegion(props.account.companyDetails?.address.country, props.account.companyDetails?.address.region);
};
await getAccountDetails();

const isEditing = ref(false);

watch(form.value.country, (newVal) => {
    if (newVal?.value) {
        form.value.region = {
            value: '',
            error: '',
            label: '',
            icon: '',
        };
        regions.value =
            newVal.value.regions.map((e) => {
                return {
                    label: e.name,
                    value: e.name,
                };
            }) || [];
    }
});

const updateAccountDetails = async () => {
    const newAddress = {} as AddressInterface;

    newAddress.country = form.value.country.value.value;
    newAddress.region = form.value.region.value.label;
    newAddress.city = form.value.city.value;
    newAddress.name1 = form.value.name1.value;
    newAddress.name2 = form.value.name2?.value || '';
    newAddress.postcode = form.value.postcode?.value;

    const payload = {
        companyDetails: {} as CompanyDetails,
        contactDetails: {} as ContactDetails,
    };
    payload.companyDetails.name = form.value.companyName.value;
    payload.companyDetails.registrationNumber = form.value.companyRegistrationNumber.value;
    payload.companyDetails.taxId = '-';
    payload.companyDetails.vat = form.value.vatNumber.value;

    payload.contactDetails = { ...props.account?.contactDetails };
    payload.contactDetails.email = form.value.companyEmail.value;
    payload.contactDetails.phone = form.value.phone.value;
    payload.companyDetails.shippingAddress = props.account.companyDetails?.shippingAddress || [];
    payload.companyDetails.address = newAddress;
    if (!props.id || props.account.accountType === null || typeof props.account.accountType === 'undefined') {
        return;
    }
    await $api.controlPanel.updateAccountDetails(props.id, payload as UserDetails, props.account.accountType);
};
</script>