import { useAuthStore } from '~~/store/authStore';

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();

    if (to.name !== 'signup' && authStore.firebaseTempToken != null) {
        authStore.firebaseTempToken = null;
    }
});
