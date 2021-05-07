<template>
  <div v-if="!$store.state.initComplete" id="loading">Loading Site Assets</div>
  <div v-else id="app">
    <page-header v-if="$store.state.loginToken" />
    <router-view :key="$route.fullPath" />
    <mobile-nav v-if="$store.state.loginToken" />
  </div>
</template>

<script>
import cookies from "vue-cookies";
import PageHeader from "./components/HeaderComponent/PageHeader.vue";
import MobileNav from "./components/MobileComponents/MobileNav.vue";
export default {
  components: { PageHeader, MobileNav },
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
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@400;700&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: $roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
