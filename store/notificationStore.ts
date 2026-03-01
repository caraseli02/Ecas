import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', () => {
  const showNotifications = ref(false);
  const unreadNotifications = ref(0);

  return { showNotifications, unreadNotifications };
});
