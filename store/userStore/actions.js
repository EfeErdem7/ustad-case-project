export default {
  async register(name, email, password) {
    const api = useNuxtApp().$authApi;
    try {
      this.error = null;
      const data = await api.authService.register({ name, email, password });
      this.user = { name, email };
      this.token = data.accessToken;
      this.isAuthenticated = true;
    } catch (error) {
      this.error = error.message || "Registration failed.";
    }
  },
  async login(email, password) {
    const api = useNuxtApp().$authApi;
    try {
      this.error = null;
      const { data } = await api.authService.login({ email, password });
      this.token = data.accessToken;
      this.isAuthenticated = true;

      const user = data.user;
      this.user = {
        name: user.name,
        email: user.email,
      };
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
};
