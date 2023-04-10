export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: config.NUXT_FIREBASE_API_KEY,
        authDomain: config.NUXT_FIREBASE_AUTH_DOMAIN,
        projectId: config.NUXT_FIREBASE_PROJECT_ID,
        storageBucket: config.NUXT_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: config.NUXT_FIREBASE_MESSAGE_SENDER_ID,
        appId: config.NUXT_FIREBASE_APP_ID,
        measurementId: config.NUXT_FIREBASE_MEASUREMENT_ID,
    };

    return firebaseConfig
});
