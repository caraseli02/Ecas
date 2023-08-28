<template>
    <div>
        <h2 class="text-xl leading-[1.4] font-semibold mb-9">Shipping</h2>
        <div class="grid grid-cols-1 gap-6">
            <div
                v-for="(address, index) in addresses"
                :key="index"
                class="p-4 border border-dashed border-border rounded-xl md:flex md:items-center md:justify-between"
            >
                <div class="flex items-center gap-4 max-md:mb-9">
                    <BusinessIcon class="w-8 h-8 flex-shrink-0 text-gray-300" />
                    <div class="md:w-[301px] lg:w-auto">
                        <div class="flex items-center mb-2">
                            <div class="font-semibold leading-normal md:mr-6">{{ address.addressAlias }}</div>
                            <div
                                v-if="address.default"
                                class="flex items-center gap-1 bg-[#00D395] rounded-[100px] px-2 py-1 text-white max-md:hidden"
                            >
                                <CheckIcon class="w-4 h-4" />
                                <span class="text-xs font-medium leading-[1.3333]">Default</span>
                            </div>
                        </div>
                        <div class="text-sm leading-[1.42857] text-gray-300">
                            {{
                                address.addressLine1 +
                                ', ' +
                                (address.addressLine2 ? address.addressLine2 + ', ' : '') +
                                address.region +
                                ', ' +
                                address.postcode +
                                ', ' +
                                address.country
                            }}
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div v-if="address.default" class="flex items-center gap-1 bg-[#00D395] rounded-[100px] px-2 py-1 text-white md:hidden">
                        <CheckIcon class="w-4 h-4" />
                        <span class="text-xs font-medium leading-[1.3333]">Default</span>
                    </div>
                    <div class="flex items-center gap-4 ml-auto">
                        <button
                            v-if="!address.default"
                            class="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] bg-opacity-95 rounded-full text-gray-300 transition-colors duration-300 hover:bg-blue hover:text-white"
                            @click="setAsDefault(address)"
                        >
                            <CheckIcon class="w-5 h-5" />
                        </button>
                        <button
                            class="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] bg-opacity-95 rounded-full text-gray-300 transition-colors duration-300 hover:bg-blue hover:text-white"
                            @click="editAddressModal = address"
                        >
                            <EditIcon class="w-5 h-5" />
                        </button>
                        <button
                            class="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] bg-opacity-95 rounded-full text-gray-300 transition-colors duration-300 hover:bg-blue hover:text-white"
                        >
                            <TrashIcon class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            <button
                class="flex items-center justify-center p-3 border border-dashed border-blue rounded-xl md:p-4"
                @click="addAddressModal = true"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" class="w-8 h-8 text-blue md:w-10 md:h-10">
                    <path stroke="#007FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12v16m8-8H12" />
                    <rect width="38" height="38" x="1" y="1" stroke="#007FFF" stroke-width="2" rx="19" />
                </svg>
            </button>
        </div>
        <Teleport to="body">
            <Transition name="fade">
                <DashboardControlPanelAddAddress v-if="addAddressModal" @close="addAddressModal = false" @add="handleAddAddress" />
            </Transition>
            <Transition name="fade">
                <DashboardControlPanelEditAddress v-if="editAddressModal" :address="editAddressModal" @close="editAddressModal = null" />
            </Transition>
            <div
                class="fixed z-50 top-0 left-0 w-full h-full bg-[#2F3241]/10 transition-all duration-300 cursor-pointer"
                :class="[addAddressModal || editAddressModal ? 'backdrop-blur-[7.5px]' : 'backdrop-blur-0 opacity-0 pointer-events-none']"
                @click="
                    addAddressModal = false;
                    editAddressModal = null;
                "
            />
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import EditIcon from '@/assets/icons/dashboard/edit.svg';
import BusinessIcon from '@/assets/icons/dashboard/business.svg';
import CheckIcon from '@/assets/icons/check-circle.svg';
import TrashIcon from '@/assets/icons/dashboard/trash.svg';

const addAddressModal = ref(false);
const editAddressModal = ref();

const addresses = ref([
    {
        addressAlias: 'Shipping Address Alias 1',
        country: 'United States',
        region: 'Georgia (GA)',
        addressLine1: '5073 Mark Brown Rd, NE Dalton',
        addressLine2: '',
        postcode: '30721',
        phoneNumber: '',
        companyEmail: 'email@email.com',
        default: true,
    },
    {
        addressAlias: 'Shipping Address Alias 2',
        country: 'United States',
        region: 'Georgia (GA)',
        addressLine1: '5073 Mark Brown Rd, NE Dalton',
        addressLine2: '',
        postcode: '30721',
        phoneNumber: '',
        companyEmail: 'email@email.com',
    },
    {
        addressAlias: 'Shipping Address Alias 3',
        country: 'United States',
        region: 'Georgia (GA)',
        addressLine1: '5073 Mark Brown Rd, NE Dalton',
        addressLine2: '',
        postcode: '30721',
        phoneNumber: '',
        companyEmail: 'email@email.com',
    },
    {
        addressAlias: 'Shipping Address Alias 4',
        country: 'United States',
        region: 'Georgia (GA)',
        addressLine1: '5073 Mark Brown Rd, NE Dalton',
        addressLine2: '',
        postcode: '30721',
        phoneNumber: '',
        companyEmail: 'email@email.com',
    },
]);

const setAsDefault = (address: any) => {
    addresses.value.forEach((item: any) => {
        item.default = false;
    });
    address.default = true;
};

const handleAddAddress = (val: any) => {
    addresses.value.push({
        addressAlias: val.addressAlias.value,
        country: val.country.value.value,
        region: val.region.value.value,
        addressLine1: val.addressLine1.value,
        addressLine2: val.addressLine2.value,
        postcode: val.postcode.value,
        phoneNumber: val.phoneNumber.value,
        companyEmail: val.companyEmail.value,
        default: false,
    });

    addAddressModal.value = false;
};
</script>
