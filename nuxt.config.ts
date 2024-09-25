import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-09-23",
  devtools: { enabled: true },

  build: {
    transpile: ["vuetify"],
  },

  css: ["~/assets/scss/app.scss"],

  plugins: ["~/plugins/axios.js"],

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Poppins: [500, 600, 700],
        },
      },
    ],
    "@pinia/nuxt",
    "@nuxt/image",
  ],

  runtimeConfig: {
    catApiKey: process.env.CAT_API_KEY,
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;',
          api: "modern-compiler",
        },
      },
    },
    server: {
      proxy: {
        "/auth": {
          target: "http://localhost:3001",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/auth/, ""),
        },
      },
    },
  },
});
