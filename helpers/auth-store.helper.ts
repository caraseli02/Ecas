import type { UserInterface } from '~/types/auth/user-interface';
import { useNuxtApp } from '#app';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/authStore';

const { $api } = useNuxtApp();

export const updateStoreDetails = async () => {
    const authStore = useAuthStore();
    const { getUserDetails } = storeToRefs(authStore);
    const response = await $api.auth.fetchUserDetails(getUserDetails.value.firebaseId);

    if (response.status !== 'success') {
        return;
    }

    const userDetails = response.data;
    authStore.addUserDetail(userDetails as UserInterface);
};
