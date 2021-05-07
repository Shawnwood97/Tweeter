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
          for (let i = 0; i < this.state.allUsers.length; i++) {
            if (this.state.allUsers[i].imageUrl === null) {
              this.state.allUsers[i].imageUrl =
                "https://lh3.googleusercontent.com/XJGWUivcvCXmMrSQnUzD7WKHsoasrtYYu3dnWVgKjW0ulBvzYVdl4p0YPV85ZeqhD5WFho7o2BysQ8rxSZNH7rfGYUYKUaqofnxvwEc6nWYiFexONmr-K_i1hCYgubRp-fj-q7YSRlqIK0NvoDs-bTrOTSL7kKkRC2Ay5NNWYV6TzA3WucL8reE71oMFMupMqtEWR1pa37Y3MovWpVTfHmPV6znfQ57inAfd58ATiOkzPhdQQBl2eViexJCaVtsNn9rn0tcAKYoVPp8VxuNSC_6AubY735xqTURFfqN9AnL5CH5SKoFDMOceaf2LriezvaUTF3ghqxMlZ95dE5pTCT1kNSKbPO-ereGcURQbZ1Xq5SVXurlvUs-p1Tiu4j1UFKOF-pD1iSoFX8oMB2eBQfBxinLP_tGf8t0CpzGR1UG9IC-RZEvh5ZOl058Ejdg1EHG5SNjGRhHrkm_rKxekch1NNs1qSRNqidjuBUZQhSdmGTdJqa79Z6kneec_MTJesShlGOAi3Mp1xwU02QSvUyM8Vufw-NIEbseX1qmbA7dhaUEkLK8o5G3AdB9hA7mHvpaE05_4jSU3n6gewvQnFwHcGNYFUX_RduNVtpIUbb_oD4m3A3QDTfsnWhqdH0YkdtKnz_BdjzkR4VasDOfoj6OHO-_gVHr-WWVbDuqLqn_2ErMxqSE4AQ0kUaTVlQ18_2u0aq470ch1aHDXtXJPSRS0=s300-no?authuser=0";
            }
            if (this.state.allUsers[i].bannerUrl === null) {
              this.state.allUsers[i].bannerUrl =
                "https://lh3.googleusercontent.com/_lvXwiuxwkIuRNNBEelzNNK5jEy_BnynbIly8qq1SES2KlqAIIDjtNOpNmzy9D9eh1kFF2Z8rhCeoSlzXy2yNTWxvChqvArbTsJywfBJMIyVqdgKFBp1Rx6YtLoD1myOY35JFhXEnqBo61AC6zp0DB_36D6_Bp70xfhhXU1il8xu79XJPgrzhMGapoHsIkeDfWPpXfnKrL1EBQxlColVxNZyeHKmiBlAdrvR74TpjJL-R42YNWYcxcsm1Jie5vyBqrbX_7WjZwRj9Q5PuECu7L3jJ2MBvvLsha9IjDht6ucgxSk0EXvVU0nP-pm52CiLcMSUO-JV41rAAAAv5PB_p4VBymeaTVYz3gluwbwT4fj-4SkfCluU3qOiRewRWQmZJUA-mgH1jsO5d15JBv9-omNmS_IQ59XpsHggsZSbu9MR_lhSsJbw16bBELLooJ2TkrBfVn4ORgdPlmu6T10z-Ar8iBVxfqDFG4QmwUjo2hBjSS5A9rpBfl2l12gdWHiZPU-aIL9DKxXwhtfdvZkd1J5ujVfJMurOE91L8uO8Kzgz99EZeDF0j8Gt9Et7h56_BCzq3E78muV6cbR_nfMTgy3viwI27t6fSIHJuEHYrKln9bgOFf7vRzrzWRSNuF_5SqN8woLbaexLduDCNwoB5UqVcvx3F17JuotSzeeL9tjdlRO8PAwLvGxhWl9eY9tC5Z5G9FET2wEaLX7ASxyqBfrw=w1920-h500-no?authuser=0";
            }
          }
          context.dispatch("getUserFollows");
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
          context.dispatch("getAllLikes");

          // console.log(context.state.followedUsers);
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
          context.dispatch("getAllCommentLikes");
        })
        .catch((err) => {
          console.log(err.response);
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
        .catch((err) => {
          console.log(err.response);
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
                "https://lh3.googleusercontent.com/XJGWUivcvCXmMrSQnUzD7WKHsoasrtYYu3dnWVgKjW0ulBvzYVdl4p0YPV85ZeqhD5WFho7o2BysQ8rxSZNH7rfGYUYKUaqofnxvwEc6nWYiFexONmr-K_i1hCYgubRp-fj-q7YSRlqIK0NvoDs-bTrOTSL7kKkRC2Ay5NNWYV6TzA3WucL8reE71oMFMupMqtEWR1pa37Y3MovWpVTfHmPV6znfQ57inAfd58ATiOkzPhdQQBl2eViexJCaVtsNn9rn0tcAKYoVPp8VxuNSC_6AubY735xqTURFfqN9AnL5CH5SKoFDMOceaf2LriezvaUTF3ghqxMlZ95dE5pTCT1kNSKbPO-ereGcURQbZ1Xq5SVXurlvUs-p1Tiu4j1UFKOF-pD1iSoFX8oMB2eBQfBxinLP_tGf8t0CpzGR1UG9IC-RZEvh5ZOl058Ejdg1EHG5SNjGRhHrkm_rKxekch1NNs1qSRNqidjuBUZQhSdmGTdJqa79Z6kneec_MTJesShlGOAi3Mp1xwU02QSvUyM8Vufw-NIEbseX1qmbA7dhaUEkLK8o5G3AdB9hA7mHvpaE05_4jSU3n6gewvQnFwHcGNYFUX_RduNVtpIUbb_oD4m3A3QDTfsnWhqdH0YkdtKnz_BdjzkR4VasDOfoj6OHO-_gVHr-WWVbDuqLqn_2ErMxqSE4AQ0kUaTVlQ18_2u0aq470ch1aHDXtXJPSRS0=s300-no?authuser=0";
            }
          }
          context.commit("setInitComplete", true);
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
  },
});
