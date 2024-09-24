import axios from "axios";

export const authRepository = {
  async register(name, email, password) {
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async login(email, password) {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
