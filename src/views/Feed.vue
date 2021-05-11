<template>
  <main>
    <!-- <h1>Hey {{ $store.state.username }}, This is your feed</h1> -->
    <create-tweet v-if="$store.state.userId" />
    <ind-tweet
      v-for="tweet in getFollowedTweets"
      :key="tweet.tweetId"
      :tweetInfo="tweet"
    />
  </main>
</template>

<script>
import CreateTweet from "../components/TweetComponents/CreateTweet.vue";
import IndTweet from "../components/TweetComponents/IndTweet.vue";

export default {
  components: { IndTweet, CreateTweet },
  name: "feed",

  mounted() {
    if (!this.$store.state.loginToken) {
      this.$router.push("/");
    }
  },

  computed: {
    getFollowedTweets() {
      return this.$store.getters.followedUsersTweets;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
}
</style>
