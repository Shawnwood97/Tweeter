import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginToken: "",
    username: null,
    userId: null,
    loginError: "",
    showRegistration: false,
    defaultDisplayPic:
      "https://robohash.org/perferendisfacerequidem.jpg?size=400x400&set=set2",

    allUsers: [],
  },
  mutations: {
    setLoginToken(state, data) {
      state.loginToken = data;
    },
    setUserId(state, data) {
      state.userId = Number(data);
    },
    setUsername(state, data) {
      state.username = data;
    },
    setLoginError(state, data) {
      state.loginError = data;
    },
    regToggle(state, data) {
      state.showRegistration = data;
    },
    setAllUsers(state, data) {
      state.allUsers = data;
    },
  },
  actions: {
    checkLoggedIn(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: Number(cookies.get("userId")),
          },
        })
        .then((res) => {
          context.commit("setUsername", res.data[0].username);
          // console.log(context);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    getUsers(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          context.commit("setAllUsers", res.data);
          console.log(res.data);
          // console.log(context);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    logOut(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/login",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: context.state.loginToken,
          },
        })
        .then((res) => {
          console.log(res);
          cookies.remove("loginToken");
          cookies.remove("userId");
          context.commit("setLoginToken", null);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {},
});
