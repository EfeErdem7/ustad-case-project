import axios from "axios";

export const catRepository = {
  async getRandomCat() {
    try {
      const response = await axios.get("/api/images/search");
      return response.data[0].url;
    } catch (error) {
      throw error;
    }
  },
};
