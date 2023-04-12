import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
    const firebase = await $fetch('/api/firebase')

    const app = initializeApp(firebase)
    const auth = getAuth(app);

    nuxtApp.vueApp.provide("auth", auth);
    nuxtApp.provide("auth", auth);
});
