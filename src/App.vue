<template>
  <div v-if="!initComplete" id="loading">Loading Site Assets</div>
  <div v-else id="app">
    <button @click="logoutUser">Logout</button>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  data() {
    return {
      userIdCookie: cookies.get("userId"),
      loginToken: cookies.get("loginToken"),
    };
  },

  computed: {
    initComplete() {
      return this.$store.state.initComplete;
    },
  },

  methods: {
    logoutUser() {
      this.$store.dispatch("logOut");
    },
  },

  mounted() {
    if (!this.$store.state.loginToken && this.userIdCookie && this.loginToken) {
      this.$store.commit("setLoginToken", this.loginToken);
      this.$store.commit("setUserId", this.userIdCookie);
      this.$store.dispatch("checkLoggedIn");
      console.log(this.$store.state.loginToken);
      // this.$store.dispatch("getUserFollows");
    } else {
      this.$store.commit("setInitComplete", true);
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
