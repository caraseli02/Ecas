import { storeToRefs } from 'pinia';
import { useAuthStore } from '~~/store/authStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    const {loggedInUser} = storeToRefs(authStore)

    // redirect the user to the home page
    if (!loggedInUser.value) {
        return navigateTo({
            path: '/',
        });
    }
});
