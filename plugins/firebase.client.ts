import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();
    console.log('config: ', config);
    if (import.meta.server) {
        console.log('API secret:', config.firebaseApiKey);
    }
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
        apiKey: (config.firebaseApiKey as string) || 'test',
        authDomain: (config.firebaseAuthDomain as string) || 'test',
        projectId: (config.firebaseProjectID as string) || 'test',
        storageBucket: (config.firebaseStorageBucket as string) || 'test',
        messagingSenderId: (config.firebaseMessageSenderID as string) || 'test',
        appId: (config.firebaseAppID as string) || 'test',
        measurementId: (config.firebaseMeasurementID as string) || 'test',
    });

    const auth = getAuth(app);

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);
});
