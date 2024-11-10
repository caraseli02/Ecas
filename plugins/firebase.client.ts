import dotenv from 'dotenv';
import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

dotenv.config({ path: '.env' });

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();
    console.log('config: ', config);
    console.log('Initializing Firebase client', import.meta.env);
    // const app = initializeApp({
    //     apiKey: process.env.VITE_FIREBASE_API_KEY as string,
    //     authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    //     projectId: process.env.VITE_FIREBASE_PROJECT_ID as string,
    //     storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET as string,
    //     messagingSenderId: process.env.VITE_FIREBASE_MESSAGE_SENDER_ID as string,
    //     appId: process.env.VITE_FIREBASE_APP_ID as string,
    //     measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID as string,
    // });
    const app = initializeApp({
        apiKey: process.env.NUXT_FIREBASE_API_KEY as string,
        authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN as string,
        projectId: process.env.NUXT_FIREBASE_PROJECT_ID as string,
        storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET as string,
        messagingSenderId: process.env.NUXT_FIREBASE_MESSAGE_SENDER_ID as string,
        appId: process.env.NUXT_FIREBASE_APP_ID as string,
        measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID as string,
    });

    const auth = getAuth(app);

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);
});
