import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "@/views/Login.vue";
import register from "@/views/Register.vue";
import feed from "@/views/Feed.vue";
import profile from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/feed",
    name: "feed",
    component: feed,
  },
  {
    path: "/:username",
    name: "profile",
    component: profile,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
