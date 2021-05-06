<template>
  <section>
    <div v-if="userInfo !== null">
      <img class="bannerImg" :src="userInfo.bannerUrl" alt="" />
      <div v-if="userInfo.userId === $store.state.userId">
        <router-link :to="{ name: 'edit-profile' }">Edit Profile</router-link>
      </div>
      <img class="profilePic" :src="userInfo.imageUrl" alt="" />
      <div>
        <h2>
          {{ userInfo.username }}
        </h2>
        <profile-follow-button
          v-if="userInfo.userId !== $store.state.userId"
          :currentProfile="userInfo"
        />
      </div>

      <p>{{ userInfo.email }}</p>
      <p>{{ userInfo.bio }}</p>
      <p>DOB: {{ userInfo.birthdate }}</p>
      <!-- <img :src="userInfo.imageUrl" alt="" /> -->
    </div>
  </section>
</template>

<script>
// import axios from "axios";
import ProfileFollowButton from "./ProfileFollowButton.vue";
export default {
  components: { ProfileFollowButton },
  name: "profile-user-info",

  data() {
    return {
      userInfo: null,
      displayPicture: null,
      allUsers: this.$store.state.allUsers,
    };
  },

  mounted() {
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].userId === Number(this.$route.params.id)) {
        this.userInfo = this.allUsers[i];
        break;
      }
    }

    //     axios
    //       .request({
    //         url: "https://tweeterest.ml/api/users",
    //         method: "GET",
    //         headers: {
    //           "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //         },
    //         params: {
    //           userId: this.$route.params.id,
    //         },
    //       })
    //       .then((res) => {
    //         // console.log(res.data[0].imageUrl);
    //         this.userInfo = res.data;

    //         if (!res.data[0].imageUrl) {
    //           this.displayPicture = this.$store.state.defaultDisplayPic;
    //         } else {
    //           this.displayPicture = res.data[0].imageUrl;
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err.response);
    //       });
  },
};
</script>

<style lang="scss" scoped>
.profilePic {
  width: 100px;
}
.bannerImg {
  width: 100%;
}
</style>
