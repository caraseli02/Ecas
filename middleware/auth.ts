import { useAuthStore } from "~~/store/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const user = authStore.getCurrentUser

  // redirect the user to the home page
  if (!user) {
    return navigateTo({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
