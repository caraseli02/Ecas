const _ = require("lodash");
const svgPrefix = {};
svgPrefix.toString = () => `${_.uniqueId()}_`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - ECAS",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap",
          rel: "stylesheet",
        },
      ],
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
      ],
    },
  },
  modules: ["nuxt-svgo", "nuxt-swiper"],
  svgo: {
    svgoConfig: {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              cleanupIDs: { prefix: svgPrefix },
            },
          },
        },
      ],
    },
  },
  css: [
    "~/assets/css/main.css",
    "~/assets/css/resets.css",
    "~/assets/css/utils.css",
    "~/assets/css/animations.css",
    "vue3-lottie/dist/style.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    }
  },
});
