<template>
  <div>
    <profile-user-info />
    <create-tweet v-if="Number($attrs.id) === $store.state.userId" />
    <profile-tweet-list />
  </div>
</template>

<script>
import cookies from "vue-cookies";
import ProfileTweetList from "../components/ProfilePage/ProfileTweetList.vue";
import ProfileUserInfo from "../components/ProfilePage/ProfileUserInfo.vue";
import CreateTweet from "../components/TweetComponents/CreateTweet.vue";

export default {
  components: { ProfileUserInfo, ProfileTweetList, CreateTweet },
  name: "profile",

  data() {
    return {
      localUserId: cookies.get("userId"),
    };
  },
};
</script>

<style lang="scss" scoped></style>
