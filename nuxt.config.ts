const _ = require('lodash');
const svgPrefix = {};
svgPrefix.toString = () => `${_.uniqueId()}_`;

require('dotenv').config();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // server: {
    //   host: '0.0.0.0',
    //   port: '3000'
    // },
    app: {
        head: {
            titleTemplate: '%s - ECAS',
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: 'anonymous',
                },
                {
                    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap',
                    rel: 'stylesheet',
                },
            ],
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
                },
            ],
            script: [
                {
                    src: 'https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.min.es.js',
                },
            ],
        },
    },
    modules: ['nuxt-svgo', 'nuxt-swiper', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-lodash', 'nuxt3-leaflet', 'nuxt-viewport'],
    viewport: {
        breakpoints: {
            xs: 390,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            '2xl': 1536,
        },
    },
    svgo: {
        svgo: true,
        defaultImport: 'component',
        svgoConfig: {
          multipass: true,
        },
      },
    css: [
        '~/assets/css/main.css',
        '~/assets/css/resets.css',
        '~/assets/css/utils.css',
        '~/assets/css/animations.css',
        'vue3-lottie/dist/style.css',
        'leaflet/dist/leaflet.css',
        'v-calendar/style.css',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        FIREBASE_API_KEY: process.env.NUXT_FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.NUXT_FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGE_SENDER_ID: process.env.NUXT_FIREBASE_MESSAGE_SENDER_ID,
        FIREBASE_APP_ID: process.env.NUXT_FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
        public: {
            BASE_URL_API: process.env.NUXT_PUBLIC_BASE_URL_API ?? 'https://dev-backend.ecasmag.ro/ecas',
            HOST: '0.0.0.0',
        },
    },
    lodash: {
        prefix: '_',
        prefixSkip: ['string'],
        upperAfterPrefix: false,
        exclude: ['map'],
        alias: [
            ['camelCase', 'stringToCamelCase'], // => stringToCamelCase
            ['kebabCase', 'stringToKebab'], // => stringToKebab
            ['isDate', 'isLodashDate'], // => _isLodashDate
        ],
    },
});
