import { defineStore } from "pinia";
import { fetchServices } from "../api";

export const useServiceStore = defineStore({
  id: "service",
  state: () => ({
    services: []
  }),
  actions: {
    async fetchAll() {
      try {
        const { data } = await fetchServices();
        this.services = data.data.results;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
