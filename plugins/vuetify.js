// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      iconfont: "mdi",
    },
    theme: {
      defaultTheme: "customTheme",
      themes: {
        customTheme: {
          dark: false,
          colors: {
            primary: "#C63C51",
            textColor: "#070F2B",
            background: "#FBFCFF",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
