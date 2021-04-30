<template>
  <div>
    <div v-if="userInfo !== null">
      <h2>
        Hey {{ $store.state.username }}, this is {{ userInfo[0].username }}'s
        profile page
      </h2>
      <p>{{ userInfo[0].email }}</p>
      <p>{{ userInfo[0].bio }}</p>
      <p>DOB: {{ userInfo[0].birthdate }}</p>
      <!-- <img :src="userInfo.imageUrl" alt="" /> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profile",

  data() {
    return {
      userInfo: null,
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
        console.log(res.data);
        this.userInfo = res.data;
        // console.log(context);
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped></style>
