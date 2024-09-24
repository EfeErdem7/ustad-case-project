// repositories/userRepository.js
import axios from "axios";

export const userRepository = {
  async login(username, password) {
    try {
      const response = await axios.get("/auth/users", {
        params: {
          username,
          password,
        },
      });
      return response.data[0];
    } catch (error) {
      throw error;
    }
  },
};
