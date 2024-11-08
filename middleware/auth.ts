import { useAuthStore } from '~~/store/authStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    const token = authStore.getToken();

    // redirect the user to the home page
    if (!token) {
        return navigateTo({
            path: '/',
        });
    }
});
