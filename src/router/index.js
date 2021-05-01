import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "@/views/Login.vue";
import register from "@/views/Register.vue";
import feed from "@/views/Feed.vue";
import profile from "@/views/Profile.vue";
import users from "@/views/Users.vue";
import tweets from "@/views/Tweets.vue";

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
    path: "/users",
    name: "users",
    component: users,
  },
  {
    path: "/tweets",
    name: "tweets",
    component: tweets,
  },
  {
    path: "/users/:id",
    name: "profile",
    component: profile,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
