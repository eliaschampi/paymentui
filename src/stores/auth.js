import { defineStore } from "pinia";
import cache from "../utils/cache";
import { sigin } from "../api";
import  { useResponse } from "../composables/useResponse"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: cache.getItem("user"),
    token: cache.getItem("token"),
    msg: {},
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
    async login(payload) {
      try {
        const {
          data: { data, tokens }
        } = await sigin(payload);
        cache.setItem("user", data);
        cache.setItem("token", tokens.access);
        this.user = data;
        this.token = tokens.access;
        this.router.push({ name: "home" })
      } catch (error) {
        this.msg = useResponse().showAlert(error);
      }
    },
    async logout() {
      this.token = null;
      this.user = null;
      cache.cleanAll();
      this.router.push({ name: "login" });
    }
  }
});
