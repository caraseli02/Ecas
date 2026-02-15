import { useAuthStore } from '~~/store/authStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token');
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    // Demo mode bypass - skip auth checks
    if (config.public.mockMode) {
        return;
    }

    if (!token?.value) {
        return navigateTo({
            path: '/',
        });
    }

    if (import.meta.client && !token?.value) {
        authStore.signOut();
    }
});
