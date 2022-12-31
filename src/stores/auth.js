import { defineStore } from "pinia";
import cache from "../utils/cache";
import { sigin } from "../api";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: cache.getItem("user"),
    token: cache.getItem("token"),
    returnUrl: ""
  }),
  getters: {
    getEsential(state) {
      return {
        id: state.user.dni,
        username: state.user.username,
        email: state.user.email,
        is_staff: state.user.is_staff,
        image: "/assets/media/images/user.jpg"
      };
    }
  },
  actions: {
    async login(email, password) {
      try {
        const {
          data: { data, tokens }
        } = await sigin({ email, password });
        cache.setItem("user", data);
        cache.setItem("token", tokens.access);
        this.user = data;
        this.token = tokens.access;
      } catch (error) {
        return error;
      }
    },
    async logout() {
      cache.cleanAll();
    }
  }
});
