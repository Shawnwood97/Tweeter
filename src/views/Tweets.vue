<template>
  <div>
    <h2>All Tweets</h2>
    <ind-tweet
      v-for="tweet in allTweets"
      :key="tweet.tweetId"
      :tweetInfo="tweet"
    />
  </div>
</template>

<script>
import axios from "axios";
import IndTweet from "../components/TweetComponents/IndTweet.vue";
export default {
  components: { IndTweet },
  name: "tweets",

  data() {
    return {
      allTweets: [],
    };
  },

  mounted() {
    axios
      .request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.allTweets = res.data.reverse();
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped></style>
