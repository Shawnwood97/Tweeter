<template>
  <div>
    <button v-if="userFollowed === false" @click="followUser">
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

  // data() {
  //   return {
  //     userFollowed: this.$store.state.currProfileFollowed,
  //   };
  // },

  computed: {
    followedUsers() {
      return this.$store.state.followedUsers;
    },
    userFollowed() {
      return this.$store.state.currProfileFollowed;
    },
  },

  props: {
    currentProfile: Object,
  },

  mounted() {
    console.log(this.followedUsers);
    for (let i = 0; i < this.followedUsers.length; i++) {
      // console.log(user);
      // console.log(this.followedUsers[i].userId);
      if (this.followedUsers[i].userId === Number(this.$route.params.id)) {
        // this.userFollowed = true;
        this.$store.commit("updateCurrentProfileFollowed", true);
      }
    }
  },

  // mounted() {
  //   axios
  //     .request({
  //       url: "https://tweeterest.ml/api/follows",
  //       method: "GET",
  //       headers: {
  //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
  //       },
  //       params: {
  //         userId: this.$store.state.userId,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       console.log(this.$route.params.id);
  //       for (let i = 0; i < res.data.length; i++) {
  //         // console.log(user);
  //         console.log(res.data[i].userId);
  //         if (res.data[i].userId === Number(this.$route.params.id)) {
  //           this.userFollowed = true;
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // },
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
            followId: Number(this.$route.params.id),
          },
        })
        .then((res) => {
          console.log(res.data);

          this.followedUsers.push(this.currentProfile);
          this.$store.commit("updateCurrentProfileFollowed", true);
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
            followId: Number(this.$route.params.id),
          },
        })
        .then((res) => {
          console.log(res.data);

          this.followedUsers.splice(this.currentProfile, 1);
          this.$store.commit("updateCurrentProfileFollowed", false);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
