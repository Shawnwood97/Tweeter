<template>
  <div>
    <ind-tweet
      v-for="tweet in userTweets"
      :key="tweet.tweetId"
      :tweetInfo="tweet"
    />
  </div>
</template>

<script>
import axios from "axios";
import IndTweet from "../TweetComponents/IndTweet.vue";
export default {
  components: { IndTweet },
  name: "profile-tweet-list",

  computed: {
    userTweets() {
      return this.$store.state.userTweets;
    },
  },

  mounted() {
    axios
      .request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        params: {
          userId: this.$route.params.id,
        },
      })
      .then((res) => {
        // console.log(res.data);
        this.$store.commit("setUserTweets", res.data.reverse());
        // this.userTweets = res.data.reverse();
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped></style>
