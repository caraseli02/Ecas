import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: config.FIREBASE_API_KEY,
        authDomain: "ecas-adf2e.firebaseapp.com",
        projectId: "ecas-adf2e",
        storageBucket: "ecas-adf2e.appspot.com",
        messagingSenderId: "62090955324",
        appId: "1:62090955324:web:48bcf220686f578d2dd139",
        measurementId: "G-64MNZJ5KPS"
      };

    const app = initializeApp(firebaseConfig)
    console.log(app);
    const auth = getAuth(app)

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)
})