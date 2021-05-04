<template>
  <div>
    <article>
      <router-link
        :to="{
          name: 'profile',
          params: { id: user.userId },
        }"
      >
        <h5>{{ user.username }}</h5>
      </router-link>
      <profile-follow-button :currentProfile="user" />
      <p>{{ user.bio }}</p>
    </article>
  </div>
</template>

<script>
import ProfileFollowButton from "../ProfilePage/ProfileFollowButton.vue";
export default {
  components: { ProfileFollowButton },
  name: "user-card",

  props: {
    user: Object,
  },

  // computed: {
  //   allUsers() {
  //     return this.$store.state.allUsers;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
article {
  border: 1px solid #000;
  margin: 5px;
}
</style>
