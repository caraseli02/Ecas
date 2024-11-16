import { storeToRefs } from 'pinia';
import { useAuthStore } from '~~/store/authStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStoreCookie = useCookie('auth-store');
    console.log(authStoreCookie);
    
    // redirect the user to the home page
    if (!authStoreCookie?.value?.token?.value) {
        return navigateTo({
            path: '/',
        });
    }
});
