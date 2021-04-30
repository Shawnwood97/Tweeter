<template>
  <div>
    <profile-user-info />
    <profile-tweet-list />
  </div>
</template>

<script>
import ProfileTweetList from "../components/ProfilePage/ProfileTweetList.vue";
import ProfileUserInfo from "../components/ProfilePage/ProfileUserInfo.vue";
export default {
  components: { ProfileUserInfo, ProfileTweetList },
  name: "profile",
};
</script>

<style lang="scss" scoped></style>
