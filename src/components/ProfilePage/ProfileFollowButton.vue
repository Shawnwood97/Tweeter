<template>
  <div>
    <button v-if="!userFollowed" @click="followUser">
      Follow {{ currentProfile.username }}
    </button>
    <button v-else @click="unFollowUser">
      UnFollow {{ currentProfile.username }}
    </button>
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
        .then((res) => {
          console.log(res.data);
          this.$store.commit("addFollowedUser", this.currentProfile);
          this.userFollowed = true;
        })
        .catch((err) => {
          console.log(err.response);
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
        .then((res) => {
          console.log(res.data);

          for (let i = 0; i < this.$store.state.followedUsers.length; i++) {
            if (
              this.$store.state.followedUsers[i].userId ===
              this.currentProfile.userId
            ) {
              this.$store.commit("removeFollowedUser", i);
            }
          }
          this.userFollowed = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
