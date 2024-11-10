import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();
    console.log('config: ', config);
    console.log('Initializing Firebase client', process.env);
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
        apiKey: (config.FIREBASE_API_KEY as string) || 'test',
        authDomain: (config.FIREBASE_AUTH_DOMAIN as string) || 'test',
        projectId: (config.FIREBASE_PROJECT_ID as string) || 'test',
        storageBucket: (config.FIREBASE_STORAGE_BUCKET as string) || 'test',
        messagingSenderId: (config.FIREBASE_MESSAGE_SENDER_ID as string) || 'test',
        appId: (config.FIREBASE_APP_ID as string) || 'test',
        measurementId: (config.FIREBASE_MEASUREMENT_ID as string) || 'test',
    });

    const auth = getAuth(app);

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);
});
