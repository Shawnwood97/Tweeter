<template>
  <div>
    <h1>Hey {{ $store.state.username }}, This is your feed</h1>
    <div>
      <input type="text" placeholder="Create A Tweet" /><button>
        Send Tweet
      </button>
    </div>
    <ind-tweet
      v-for="tweet in getFollowedTweets"
      :key="tweet.tweetId"
      :tweetInfo="tweet"
    />
  </div>
</template>

<script>
import IndTweet from "../components/TweetComponents/IndTweet.vue";
export default {
  components: { IndTweet },
  name: "feed",

  computed: {
    getFollowedTweets() {
      return this.$store.getters.followedUsersTweets;
    },
  },

  // mounted() {
  //   console.log(this.getFollowedTweets);
  // },
};
</script>

<style lang="scss" scoped></style>
