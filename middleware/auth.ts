import { useAuthStore } from '~~/store/authStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token');
    const authStore = useAuthStore();
    // redirect the user to the home page
    console.log('token', token.value);
    if (!token?.value) {
        return navigateTo({
            path: '/',
        });
    }

    if (import.meta.client && !token?.value) {
        authStore.signOut();
    }
});
