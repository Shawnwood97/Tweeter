<template>
  <section>
    <div v-if="userInfo !== null">
      <img :src="displayPicture" alt="" />
      <div>
        <h2>
          {{ userInfo[0].username }}
        </h2>
        <profile-follow-button :currentProfile="userInfo[0].username" />
      </div>

      <p>{{ userInfo[0].email }}</p>
      <p>{{ userInfo[0].bio }}</p>
      <p>DOB: {{ userInfo[0].birthdate }}</p>
      <!-- <img :src="userInfo.imageUrl" alt="" /> -->
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ProfileFollowButton from "./ProfileFollowButton.vue";
export default {
  components: { ProfileFollowButton },
  name: "profile-user-info",

  data() {
    return {
      userInfo: null,
      displayPicture: null,
    };
  },

  mounted() {
    axios
      .request({
        url: "https://tweeterest.ml/api/users",
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        params: {
          userId: this.$route.params.id,
        },
      })
      .then((res) => {
        // console.log(res.data[0].imageUrl);
        this.userInfo = res.data;

        if (!res.data[0].imageUrl) {
          this.displayPicture = this.$store.state.defaultDisplayPic;
        } else {
          this.displayPicture = res.data[0].imageUrl;
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100px;
}
</style>
