<template>
  <header v-if="userInfo">
    <router-link :to="{ path: `/users/${userInfo.userId}` }"
      ><img :src="userInfo.imageUrl" />
    </router-link>
    <h4>{{ userInfo.username }}</h4>
    <button id="logoutBtn" @click="logoutUser">Logout</button>
  </header>
</template>

<script>
export default {
  name: "page-header",

  methods: {
    logoutUser() {
      this.$store.dispatch("logOut");
    },
  },

  data() {
    return {
      userInfo: null,
      allUsers: this.$store.state.allUsers,
    };
  },
  mounted() {
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].userId === this.$store.state.userId) {
        this.userInfo = this.allUsers[i];
        break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  place-items: center;
  height: 5vh;
  position: fixed;
  top: 0;
  background: #000;
  width: 100%;

  img {
    width: 40px;
    border-radius: 50%;
    border: 2px solid #000;
  }

  #logoutBtn {
    place-self: center end;
  }
}
</style>
