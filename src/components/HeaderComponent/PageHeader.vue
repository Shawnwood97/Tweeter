<template>
  <div>
    <!-- <header v-if="!$store.state.loginToken">
      <button @click="navToLogin">Login</button>
      <button @click="navToRegister">Sign Up</button>
    </header> -->
    <!-- <header v-else-if="$store.state.loginToken && userInfo"> -->
    <header>
      <router-link :to="{ path: `/users/${userInfo.userId}` }"
        ><img :src="userInfo.imageUrl" />
      </router-link>
      <h4>{{ userInfo.username }}</h4>
      <button id="logoutBtn" @click="logoutUser">Logout</button>
    </header>
  </div>
</template>

<script>
export default {
  name: "page-header",

  methods: {
    logoutUser() {
      this.$store.dispatch("logOut");
    },

    navToRegister() {
      this.$router.push("register");
    },
    navToLogin() {
      this.$router.push("login");
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
  grid-auto-flow: column;
  align-items: center;
  height: 50px;

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
