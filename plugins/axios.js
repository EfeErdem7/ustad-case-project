import axios from "axios";
import { useUserStore } from "~/store/userStore";
import AuthService from "~/services/AuthService";
import CatService from "~/services/CatService";

export default defineNuxtPlugin((nuxtApp) => {
  const authInstance = axios.create({
    baseURL: '/auth',
  });
  const apiInstance = axios.create({
    baseURL: "/api",
  });

  authInstance.interceptors.request.use((config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  authInstance.authService = new AuthService(authInstance);
  apiInstance.catService = new CatService(apiInstance);

  nuxtApp.provide("authApi", authInstance);
  nuxtApp.provide("api", apiInstance);
});
