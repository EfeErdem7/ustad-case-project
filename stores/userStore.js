// stores/userStore.js
import { defineStore } from "pinia";
import { userRepository } from "~/repositories/userRepository";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    error: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const user = await userRepository.login(username, password);
        if (user) {
          this.isAuthenticated = true;
          this.user = user;
        } else {
          this.error = "Invalid credentials";
        }
      } catch (error) {
        this.error = "An error occurred during login";
        throw error;
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },
  },
});
