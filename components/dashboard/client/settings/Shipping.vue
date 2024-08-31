<script setup lang="ts">
import AddressList from './AddressList';
import ShippingDialog from './ShippingDialog';
import { useAuthStore } from '~/store/authStore';
import { storeToRefs } from 'pinia';
import { AccountType } from '~/types';
import { ShippingAddressInterface } from '~/types/auth/user-interface';
import { ref } from 'vue';
import { useNuxtApp } from '#app';
const { $api } = useNuxtApp();

interface AddressData {
    icon: string;
    alias: string;
    isDefault: boolean;
    name: string;
    address: string;
    phone: string;
    _id: string;
    name1: string;
    name2: string;
    city: string;
    country: string;
    postcode: string;
    region: string;
}

const authStore = useAuthStore();
const { getUserDetails } = storeToRefs(authStore);
const accountType = ref(getUserDetails.value.accountType);

const formatAddresses = async () => {
    const addresses =
        getUserDetails.value.accountType === AccountType.Personal
            ? getUserDetails.value.personalDetails?.shippingAddress
            : getUserDetails.value.companyDetails?.shippingAddress;

    return addresses?.map((address: ShippingAddressInterface, index: number) => {
        return {
            alias: address.alias || `Shipping Address Alias ${index + 1}`,
            isDefault: address.default || false,
            name:
                getUserDetails.value.accountType === AccountType.Personal
                    ? `${getUserDetails.value.personalDetails?.firstName} ${getUserDetails.value.personalDetails?.lastName}`
                    : getUserDetails.value.companyDetails?.name,
            address: address.name1 + ' ' + address.name2 + ', ' + address.city + ', ' + address.postcode + ', ' + address.country,
            phone: address.phone || '',
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cd8b9b1c0d2b925f29e818d6e49d9d83c8bd553c0416b56bcae00e809eb1cd1b?apiKey=20497529553648aab918fa2d322ece87&',
            _id: address._id,
            name1: address.name1,
            name2: address.name2,
            city: address.city,
            country: address.country,
            postcode: address.postcode,
            region: address.region,
        };
    }) as AddressData[];
};

const isDialogOpen = ref(false);

const addresses = ref<AddressData[]>(await formatAddresses());
const addressToBeEdited = ref<AddressData | null>(null);

watch(isDialogOpen, async (isOpen) => {
    if (!isOpen) {
        addressToBeEdited.value = null;
    }
})

const handleEdit = async (editedAddress: AddressData) => {
    isDialogOpen.value = true;
    addressToBeEdited.value = editedAddress;
    console.log(addressToBeEdited.value);
};

const handleDelete = async (deletedAddress: AddressData) => {
    addresses.value = addresses.value.filter((address) => address._id !== deletedAddress._id);
    await handleChange(addresses.value);
};

const handleSetDefault = async (changedAddress: AddressData) => {
    addresses.value = addresses.value.map((address) => ({
        ...address,
        isDefault: address._id === changedAddress._id,
    }));
    await handleChange(addresses.value);
};

const handleChange = async (addresses: AddressData[]) => {
    const newAddresses = addresses.map((address) => {
        return {
            default: address.isDefault,
            _id: address._id,
            alias: address.alias,
            name1: address.name1,
            name2: address.name2,
            country: address.country,
            region: address.region,
            city: address.city,
            postcode: address.postcode,
            phone: address.phone,
        };
    });
    if (getUserDetails.value.firebaseId && newAddresses) {
        await $api.settingsClient.updateShipping(newAddresses);
    }
};

const handleAdd = async (address: AddressData) => {
    addresses.value = [...addresses.value, address];
};
</script>

<template>
    <section class="flex flex-col gap-9 self-stretch p-4 md:p-6 bg-white rounded-xl shadow-l">
        <div class="flex gap-2.5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <h2 class="self-start text-xl font-semibold leading-7 text-neutral-700">Shipping</h2>
        </div>
        <AddressList :addresses="addresses" @edit="handleEdit" @delete="handleDelete" @set-default="handleSetDefault" />
        <section class="flex justify-center items-center self-stretch p-4 rounded-xl border border-blue-500 border-dashed max-md:px-5">
            <ShippingDialog
                v-model="isDialogOpen"
                :address="addressToBeEdited"
                :account-type="accountType"
                @add-shipping-address="handleAdd"
            />
        </section>
    </section>
</template>

<style scoped></style>
