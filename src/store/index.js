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
    siteError: "",
    siteMessage: "",

    allUsers: [],

    followedUsers: [],

    userTweets: [],

    currProfileTweets: [],

    tweetComments: [],

    allLikes: [],

    allCommentLikes: [],

    allTweets: [],
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
    setSiteError(state, data) {
      state.siteError = data;
    },
    setSiteMessage(state, data) {
      state.siteMessage = data;
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
      state.userTweets = data.reverse();
    },
    // setCurrProfileTweets(state, data) {
    //   state.currProfileTweets = data.reverse();
    // },
    setAllCommentLikes(state, data) {
      state.allCommentLikes = data;
    },
    setAllTweets(state, data) {
      state.allTweets = data;
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
          context.dispatch("getUsers");
        })
        .catch(() => {
          context.commit("setSiteError", "Error Logging You In!");
          setTimeout(() => {
            context.commit("setSiteError", "");
          }, 3000);
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
          for (let i = 0; i < this.state.allUsers.length; i++) {
            if (this.state.allUsers[i].imageUrl === null) {
              this.state.allUsers[i].imageUrl =
                "https://cdn.discordapp.com/attachments/841266201657344010/841266288486907914/ABSRlIpzcqh_JEyZP1CW1_RaZDO34zgsV3wfGtpwfn_D3IB6XFnQjvFl5nkymDIEJ58dpJoA1-t8agaWloWXJhVz9WWaXYVIbkkj.png";
            }
            if (this.state.allUsers[i].bannerUrl === null) {
              this.state.allUsers[i].bannerUrl =
                "https://cdn.discordapp.com/attachments/841266201657344010/841267134037753856/xYLCLELDik-QpSS1IlJGDh6GUVerl--HL5SGNhgwm_we9oTua_QOtpRh4jIuZsvIPGrRqa_kg0WYLV1MQn4XUCP80_32o4oUQET0.png";
            }
          }
          context.dispatch("getUserFollows");
        })
        .catch(() => {
          context.commit(
            "setSiteError",
            "Error Getting Users, Try Refreshing!"
          );
          setTimeout(() => {
            context.commit("setSiteError", "");
          }, 3000);
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
        .then(() => {
          cookies.remove("loginToken");
          cookies.remove("userId");
          context.commit("setLoginToken", null);
          router.push("/");
        })
        .catch(() => {
          context.commit("setSiteError", "Error Logging You Out!");
          setTimeout(() => {
            context.commit("setSiteError", "");
          }, 3000);
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
          context.commit("setFollowedUsers", res.data);
          context.dispatch("getAllLikes");
        })
        .catch(() => {
          context.commit(
            "setSiteError",
            "Error Getting Followed Users, Try Refreshing!"
          );
          setTimeout(() => {
            context.commit("setSiteError", "");
          }, 3000);
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
          context.dispatch("getAllCommentLikes");
        })
        .catch(() => {
          context.commit(
            "setSiteError",
            "Error Getting Tweet Likes, Try Refreshing!"
          );
          setTimeout(() => {
            context.commit("setSiteError", "");
          }, 3000);
        });
    },
    getAllCommentLikes(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/comment-likes",
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          context.commit("setAllCommentLikes", res.data);
          context.dispatch("getAllTweets");
        })
        .catch(() => {
          context.commit(
            "setSiteError",
            "Error Getting Comment Likes, Try Refreshing!"
          );
          setTimeout(() => {
            context.commit("setSiteError", "");
          }, 3000);
        });
    },
    getAllTweets(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          context.commit("setAllTweets", res.data);
          for (let i = 0; i < this.state.allTweets.length; i++) {
            if (this.state.allTweets[i].userImageUrl === null) {
              this.state.allTweets[i].userImageUrl =
                "https://cdn.discordapp.com/attachments/841266201657344010/841266288486907914/ABSRlIpzcqh_JEyZP1CW1_RaZDO34zgsV3wfGtpwfn_D3IB6XFnQjvFl5nkymDIEJ58dpJoA1-t8agaWloWXJhVz9WWaXYVIbkkj.png";
            }
          }
          context.dispatch("getUserTweets");
        })
        .catch(() => {
          context.commit(
            "setSiteError",
            "Error Getting Tweets, Try Refreshing!"
          );
          setTimeout(() => {
            context.commit("setSiteError", "");
          }, 3000);
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
            userId: this.state.userId,
          },
        })
        .then((res) => {
          context.commit("setUserTweets", res.data);
          context.commit("setInitComplete", true);
        })
        .catch(() => {
          context.commit(
            "setSiteError",
            "Error Getting Your Tweets, Try Refreshing!"
          );
          setTimeout(() => {
            context.commit("setSiteError", "");
          }, 3000);
        });
    },
  },
  getters: {
    getUserLikes(state) {
      return state.allLikes.filter((like) => like.userId === state.userId);
    },
    getUserCommentLikes(state) {
      return state.allCommentLikes.filter(
        (like) => like.userId === state.userId
      );
    },
    randTweets(state) {
      return state.allTweets.sort(() => Math.random() - 0.5);
    },
    followedUsersTweets(state) {
      let tweets = [];
      state.followedUsers.forEach((user) => {
        state.allTweets.forEach((tweet) => {
          if (user.userId === tweet.userId) tweets.push(tweet);
        });
      });
      return tweets.sort((a, b) => b.tweetId - a.tweetId);
    },

    getCurrProfileTweets(state) {
      return state.allTweets
        .filter(
          (tweet) =>
            tweet.userId === Number(router.currentRoute.params.id) &&
            tweet.userId !== state.userId
        )
        .reverse();
    },
  },
});
