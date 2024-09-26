import { defineStore } from "pinia";
import actions from "./actions";

export const useCatStore = defineStore("cat", {
  state: () => ({}),
  actions,
});
