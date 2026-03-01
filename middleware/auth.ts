import { useAuthStore } from '~~/store/authStore';
import { parseMockToken } from '~/utils/mockAuth';

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token');
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const authToken = token?.value ? String(token.value) : '';
  const hasToken = Boolean(authToken);

  if (!hasToken) {
    if (import.meta.client) {
      authStore.signOut();
    }

    return navigateTo('/?signin=true&redirect=' + encodeURIComponent(to.fullPath));
  }

  if (config.public.MOCK_MODE && !parseMockToken(authToken)) {
    if (import.meta.client) {
      authStore.signOut();
    }

    return navigateTo('/?signin=true&redirect=' + encodeURIComponent(to.fullPath));
  }

  if (authStore.token.value && authStore.token.value !== authToken) {
    if (import.meta.client) {
      authStore.signOut();
    }

    return navigateTo('/?signin=true&redirect=' + encodeURIComponent(to.fullPath));
  }

  if (!authStore.token.value) {
    authStore.addToken(authToken);
  }
});
