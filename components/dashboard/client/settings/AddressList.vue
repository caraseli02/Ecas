<script lang="ts" setup>
import { PropType } from 'vue';
import AddressCard from './AddressCard.vue';

interface AddressData {
    icon: string;
    alias: string;
    isDefault: boolean;
    name: string;
    address: string;
    phone: string;
}

const props = defineProps({
    addresses: {
        type: Object as PropType<AddressData[]>,
        required: true,
    },
});

const handleEdit = (address: AddressData) => {
    console.log('Edit address:', address);
};

const handleDelete = (address: AddressData) => {
    console.log('Delete address:', address);
};
</script>

<template>
    <div class="space-y-4">
        <AddressCard
            v-for="address in props.addresses"
            :key="address.alias"
            :address-data="address"
            @edit="handleEdit"
            @delete="handleDelete"
        />
    </div>
</template>
