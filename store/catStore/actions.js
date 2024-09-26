export default {
  async getRandomCat() {
    const api = useNuxtApp().$api;
    const { data } = await api.catService.get();
    if (data.length) {
      return data[0].url;
    } else {
      throw new Error("No cat data available");
    }
  },
};
