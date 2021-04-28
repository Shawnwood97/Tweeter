import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginToken: "",
    username: null,
    loginError: "",
    showRegistration: false,
  },
  mutations: {
    setLoginToken(state, data) {
      state.loginToken = data;
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
  actions: {},
  modules: {},
});
