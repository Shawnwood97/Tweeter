import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginToken: "",
    username: null,
    userId: null,
    loginError: "",
    showRegistration: false,
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
          console.log(context);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    getProfile(context, data) {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: data,
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log(context);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  modules: {},
});
