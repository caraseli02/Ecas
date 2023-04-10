import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = await $fetch("/api/firebase");
    console.log(config);

    const app = initializeApp(config);
    const auth = getAuth(app);

    nuxtApp.vueApp.provide("auth", auth);
    nuxtApp.provide("auth", auth);
});
