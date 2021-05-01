<template>
  <div>
    <button v-if="!userFollowed" @click="followUser">
      Follow {{ currentProfile }}
    </button>
    <button v-else @click="followUser">UnFollow {{ currentProfile }}</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profile-follow-button",

  data() {
    return {
      userFollowed: false,
    };
  },

  props: {
    currentProfile: String,
  },
  mounted() {
    axios
      .request({
        url: "https://tweeterest.ml/api/follows",
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        params: {
          userId: this.$store.state.userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(this.$route.params.id);
        for (let i = 0; i < res.data.length; i++) {
          // console.log(user);
          console.log(res.data[i].userId);
          if (res.data[i].userId === Number(this.$route.params.id)) {
            this.userFollowed = true;
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
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
            followId: Number(this.$route.params.id),
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
