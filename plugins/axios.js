import axios from "axios";
import { useUserStore } from "~/stores/userStore";

export default defineNuxtPlugin(() => {
  const userStore = useUserStore();

  axios.interceptors.request.use(
    (config) => {
      if (userStore.isAuthenticated && userStore.token) {
        config.headers.Authorization = `Bearer ${userStore.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
});
