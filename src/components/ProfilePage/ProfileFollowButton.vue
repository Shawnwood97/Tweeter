<template>
  <div>
    <font-awesome-icon
      class="followUser"
      :icon="['fas', 'user-plus']"
      v-if="!userFollowed"
      @click="followUser"
    />
    <font-awesome-icon
      class="unfollowUser"
      :icon="['fas', 'user-minus']"
      v-else
      @click="unFollowUser"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profile-follow-button",
  props: {
    currentProfile: Object,
  },

  data() {
    return {
      userFollowed: "",
    };
  },

  computed: {
    followedUsers() {
      return this.$store.state.followedUsers;
    },
  },

  mounted() {
    for (let i = 0; i < this.followedUsers.length; i++) {
      if (this.followedUsers[i].userId === this.currentProfile.userId) {
        this.userFollowed = true;
      }
    }
  },

  methods: {
    followUser() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            followId: this.currentProfile.userId,
          },
        })
        .then(() => {
          this.$store.commit("addFollowedUser", this.currentProfile);
          this.userFollowed = true;
          this.$store.commit(
            "setSiteMessage",
            `You Followed ${this.currentProfile.username}`
          );
          setTimeout(() => {
            this.$store.commit("setSiteMessage", "");
          }, 3000);
        })
        .catch(() => {
          this.$store.commit(
            `setSiteError", "Error Following ${this.currentProfile.username}, Try Again!`
          );
          setTimeout(() => {
            this.$store.commit("setSiteError", "");
          }, 3000);
        });
    },
    unFollowUser() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            followId: this.currentProfile.userId,
          },
        })
        .then(() => {
          for (let i = 0; i < this.$store.state.followedUsers.length; i++) {
            if (
              this.$store.state.followedUsers[i].userId ===
              this.currentProfile.userId
            ) {
              this.$store.commit("removeFollowedUser", i);
            }
          }
          this.userFollowed = false;

          this.$store.commit(
            "setSiteMessage",
            `You Unfollowed ${this.currentProfile.username}`
          );
          setTimeout(() => {
            this.$store.commit("setSiteMessage", "");
          }, 3000);
        })
        .catch(() => {
          this.$store.commit(
            `setSiteError", "Error Unfollowing ${this.currentProfile.username}, Try Again!`
          );
          setTimeout(() => {
            this.$store.commit("setSiteError", "");
          }, 3000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.followUser:hover,
.unfollowUser:hover {
  cursor: pointer;
}

.followUser path {
  fill: $mainLink;
}
.unfollowUser path {
  fill: #ff2121;
}
</style>
