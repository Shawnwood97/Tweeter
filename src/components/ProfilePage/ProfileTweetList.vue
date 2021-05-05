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
import IndTweet from "../TweetComponents/IndTweet.vue";
export default {
  components: { IndTweet },
  name: "profile-tweet-list",

  computed: {
    userTweets() {
      return this.$store.state.userTweets;
    },
  },
};
</script>

<style lang="scss" scoped></style>
