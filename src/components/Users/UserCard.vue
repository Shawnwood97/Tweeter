<template>
  <article>
    <div class="topRow">
      <img
        class="profileImage"
        :src="user.imageUrl"
        :alt="`${user.username}'s Profile Picture`"
      />

      <h4>
        <router-link
          :to="{
            name: 'profile',
            params: { id: user.userId },
          }"
          >{{ user.username }}
        </router-link>
      </h4>

      <div></div>
      <profile-follow-button
        class="followButton"
        v-if="user.userId !== $store.state.userId"
        :currentProfile="user"
      />
    </div>

    <p>{{ user.bio }}</p>
  </article>
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
  background: $secColor;
  border-radius: 5px;
  margin: 10px;
  box-shadow: $bsMain;
  display: grid;
  padding: 5px;
  .topRow {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    h4 {
      margin-left: 5px;
      height: 10px;
    }
    .profileImage {
      background: $mainColor;
      width: 50px;
      border-radius: 5px;
      border: 2px solid $mainColor;
    }

    .followButton {
      place-self: start end;
    }
  }

  p {
    margin-top: 5px;
  }
}
</style>
