import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();
    const app = initializeApp({
        apiKey: (config.public.firebaseApiKey as string) || 'test',
        authDomain: (config.public.firebaseAuthDomain as string) || 'test',
        projectId: (config.public.firebaseProjectID as string) || 'test',
        storageBucket: (config.public.firebaseStorageBucket as string) || 'test',
        messagingSenderId: (config.public.firebaseMessageSenderID as string) || 'test',
        appId: (config.public.firebaseAppID as string) || 'test',
        measurementId: (config.public.firebaseMeasurementID as string) || 'test',
    });

    const auth = getAuth(app);

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);
});
