import { createRouter, createWebHistory } from "vue-router";

import NProgress from "nprogress/nprogress.js";

// Main layouts
import LayoutBackend from "@/layouts/variations/Backend.vue";
import LayoutSimple from "@/layouts/variations/Simple.vue";
import { useAuthStore } from "../stores/auth";
//Auth layout
const AuthLogin = () => import("@/views/auth/Login.vue");
const AuthSignup = () => import("@/views/auth/Signup.vue");
const BackendUser = () => import("@/views/User.vue");
const NotFound = () => import("@/views/error/NotFound.vue");
const NotAllowed = () => import("@/views/error/NotAllowed.vue");

// Backend: Dashboard
const Dashboard = () => import("@/views/Home.vue");

// Set all routes
const routes = [
  {
    path: "/",
    redirect: "/home",
    component: LayoutBackend,
    children: [
      {
        path: "home",
        name: "home",
        component: Dashboard
      },
      {
        path: "user",
        name: "user",
        component: BackendUser
      }
    ]
  },
  {
    path: "/auth",
    component: LayoutSimple,
    children: [
      {
        path: "login",
        name: "login",
        component: AuthLogin
      },
      {
        path: "signup",
        name: "signup",
        component: AuthSignup
      }
    ]
  },
  {
    path: "/",
    component: LayoutSimple,
    children: [
      {
        path: "notallowed",
        name: "notallowed",
        component: NotAllowed
      },
      {
        path: ":pathMatch(.*)*",
        name: "not_found",
        component: NotFound
      },
    ]
  }
];

// Create Router
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes
});

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeResolve((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

router.beforeEach((to, from) => {
  const publicPages = ["login", "signup"];
  const authRequired = !publicPages.includes(to.name);
  const auth = useAuthStore();

  if (authRequired) {
    if (!auth.token) {
      auth.returnUrl = to.fullPath;
      return { name: "login" };
    }
  } else {
    if (!authRequired) {
      if (auth.token) {
        return { name: "home" };
      }
    }
  }
});

export default router;
