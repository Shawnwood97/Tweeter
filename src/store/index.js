import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initComplete: false,
    loginToken: "",
    username: null,
    userId: null,
    loginError: "",
    showRegistration: false,
    defaultDisplayPic:
      "https://robohash.org/perferendisfacerequidem.jpg?size=400x400&set=set2",

    allUsers: [],

    followedUsers: [],

    userTweets: [],

    allLikes: [],
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
    setFollowedUsers(state, data) {
      state.followedUsers = data;
    },
    addFollowedUser(state, data) {
      state.followedUsers.push(data);
    },
    removeFollowedUser(state, data) {
      state.followedUsers.splice(data, 1);
    },
    removeTweet(state, data) {
      state.userTweets.splice(data, 1);
    },
    setAllLikes(state, data) {
      state.allLikes = data;
    },
    setInitComplete(state, data) {
      state.initComplete = data;
    },
    setUserTweets(state, data) {
      state.userTweets = data;
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
          context.dispatch("getUserFollows");
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
          // console.log(res.data);
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
    getUserFollows(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: context.state.userId,
          },
        })
        .then((res) => {
          console.log(res.data);
          context.commit("setFollowedUsers", res.data);
          context.dispatch("getUserTweets");

          // console.log(context.state.followedUsers);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getUserTweets(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: context.state.userId,
          },
        })
        .then((res) => {
          context.commit("setUserTweets", res.data.reverse());
          context.dispatch("getAllLikes");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getAllLikes(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          context.commit("setAllLikes", res.data);
          context.commit("setInitComplete", true);
          // for (let i = 0; i < res.data.length; i++) {
          //   if (res.data[i].userId === this.$store.state.userId) {
          //     this.tweetLiked = true;
          //   } else {
          //     this.tweetLiked = false;
          //   }
          // }
          // this.tweetLikes = res.data.length;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  getters: {
    getUserLikes(state) {
      return state.allLikes.filter((like) => like.userId === state.userId);
    },
  },
});
