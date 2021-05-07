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
