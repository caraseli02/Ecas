// ~/composables/useUser.ts
import { computed, ref } from 'vue';
import { useAuthStore } from '~/store/authStore';
import { ShippingAddressInterface } from '~/types/auth/user-interface';

export function useUser() {
  const store = useAuthStore();
  const user = computed(() => store.getUserDetails);

  const getShipping = () => {
    const fallbackAddress: ShippingAddressInterface = {
        alias: 'N/A',
        name1: 'N/A',
        name2: 'N/A',
        default: false,
        country: 'N/A',
        region: 'N/A',
        city: 'N/A',
        postcode: 'N/A',
        phone: 'N/A',
    };

    if (!user.value) {
        return fallbackAddress;
    }

    const address =
        (user.value.personalDetails?.shippingAddress as ShippingAddressInterface[])?.find((address) => address.default) ||
        (user.value?.personalDetails?.shippingAddress && user.value?.personalDetails?.shippingAddress[0]);

    if (!address) {
        return fallbackAddress;
    }

    address.alias = address.alias || 'Address';

    return address;
};

const getBilling = () => {
    const fallbackAddress: ShippingAddressInterface = {
        alias: 'N/A',
        name1: 'N/A',
        name2: 'N/A',
        default: false,
        country: 'N/A',
        region: 'N/A',
        city: 'N/A',
        postcode: 'N/A',
        phone: 'N/A',
    };

    if (!user.value) {
        return fallbackAddress;
    }
    const address =
        (user.value?.personalDetails?.shippingAddress as ShippingAddressInterface[])?.find((address) => address.default) ||
        user.value?.companyDetails?.shippingAddress[0];

    if (!address) {
        return fallbackAddress;
    }

    address.alias = address.alias || 'Address';

    return address;
};

  return { user, getShipping, getBilling };
}
