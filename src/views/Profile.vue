<template>
  <main>
    <profile-user-info />
    <create-tweet v-if="Number($attrs.id) === $store.state.userId" />
    <profile-tweet-list />
  </main>
</template>

<script>
import ProfileTweetList from "../components/ProfilePage/ProfileTweetList.vue";
import ProfileUserInfo from "../components/ProfilePage/ProfileUserInfo.vue";
import CreateTweet from "../components/TweetComponents/CreateTweet.vue";

export default {
  components: { ProfileUserInfo, ProfileTweetList, CreateTweet },
  name: "profile",

  created() {
    document.title = `TheTweeter | User Profile ${this.$attrs.id}`;
  },

  mounted() {
    if (!this.$store.state.loginToken) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped></style>
