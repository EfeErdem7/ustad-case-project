import { defineStore } from "pinia";
import { authRepository } from "~/repositories/authRepository";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
  }),
  actions: {
    async register(name, email, password) {
      try {
        this.error = null;
        const data = await authRepository.register(name, email, password);
        this.user = { name, email };
        this.token = data.accessToken;
        this.isAuthenticated = true;
      } catch (error) {
        this.error = error.message || "Registration failed.";
      }
    },
    async login(email, password) {
      try {
        this.error = null;
        const data = await authRepository.login(email, password);
        this.token = data.accessToken;
        this.isAuthenticated = true;

        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

        const userResponse = await axios.get("/auth/users", {
          params: { email },
        });

        if (userResponse.data && userResponse.data.length > 0) {
          const user = userResponse.data[0];
          this.user = {
            name: user.name,
            email: user.email,
          };
        } else {
          throw new Error("User not found.");
        }
      } catch (error) {
        this.error = error.message || "Login failed.";
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.error = null;
    },
  },
});
