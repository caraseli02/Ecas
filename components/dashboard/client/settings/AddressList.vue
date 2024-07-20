<script lang="ts" setup>
import { ref } from 'vue';
import AddressCard from './AddressCard.vue';

interface AddressData {
  icon: string;
  alias: string;
  isDefault: boolean;
  name: string;
  address: string;
  phone: string;
}

const addresses = ref<AddressData[]>([
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cd8b9b1c0d2b925f29e818d6e49d9d83c8bd553c0416b56bcae00e809eb1cd1b?apiKey=20497529553648aab918fa2d322ece87&',
    alias: 'Shipping Address Alias 1',
    isDefault: true,
    name: 'Madalina Dobrovolski',
    address: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States',
    phone: '+1 (555) 867-5309'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cd8b9b1c0d2b925f29e818d6e49d9d83c8bd553c0416b56bcae00e809eb1cd1b?apiKey=20497529553648aab918fa2d322ece87&',
    alias: 'Shipping Address Alias 1',
    isDefault: false,
    name: 'Madalina Dobrovolski',
    address: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States',
    phone: '+1 (555) 867-5309'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cd8b9b1c0d2b925f29e818d6e49d9d83c8bd553c0416b56bcae00e809eb1cd1b?apiKey=20497529553648aab918fa2d322ece87&',
    alias: 'Shipping Address Alias 1',
    isDefault: false,
    name: 'Madalina Dobrovolski',
    address: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States',
    phone: '+1 (555) 867-5309'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cd8b9b1c0d2b925f29e818d6e49d9d83c8bd553c0416b56bcae00e809eb1cd1b?apiKey=20497529553648aab918fa2d322ece87&',
    alias: 'Shipping Address Alias 1',
    isDefault: false,
    name: 'Madalina Dobrovolski',
    address: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States',
    phone: '+1 (555) 867-5309'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cd8b9b1c0d2b925f29e818d6e49d9d83c8bd553c0416b56bcae00e809eb1cd1b?apiKey=20497529553648aab918fa2d322ece87&',
    alias: 'Shipping Address Alias 1',
    isDefault: false,
    name: 'Madalina Dobrovolski',
    address: '5073 Mark Brown Rd, NE Dalton, Georgia (GA), 30721, United States',
    phone: '+1 (555) 867-5309'
  },
]);

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
      v-for="address in addresses"
      :key="address.alias"
      :address-data="address"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>
