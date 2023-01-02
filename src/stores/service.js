import { defineStore } from "pinia";
import { fetchServices, createService, updateService } from "../api";
import { useResponse } from "../composables/useResponse";

export const useServiceStore = defineStore({
  id: "service",
  state: () => ({
    services: [],
    service: {
      name: "",
      description: "",
      logo: ""
    }
  }),
  actions: {
    async fetchAll() {
      try {
        const { data } = await fetchServices();
        this.services = data.data.results;
      } catch (error) {
        useResponse().showNotify(error);
      }
    },
    async create() {
      try {
        const { data } = await createService(this.service);
        this.services.push(data.data);
        useResponse().showNotify(data);
      } catch (error) {
        useResponse().showNotify(error);
      }
    },
    async update() {
      try {
        const { data } = await updateService(this.service);
        this.services.splice(
          this.services.indexOf(this.service),
          1,
          this.service
        );
        useResponse().showNotify(data);
      } catch (error) {
        useResponse().showNotify(error);
      }
    }
  }
});
