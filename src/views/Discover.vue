<template>
  <div>
    <ind-tweet
      v-for="tweet in getRandTweets"
      :key="tweet.tweetId"
      :tweetInfo="tweet"
    />
  </div>
</template>

<script>
import IndTweet from "../components/TweetComponents/IndTweet.vue";
export default {
  components: { IndTweet },
  name: "discover",

  computed: {
    getRandTweets() {
      return this.$store.getters.randTweets;
    },
  },
};
</script>

<style lang="scss" scoped></style>
