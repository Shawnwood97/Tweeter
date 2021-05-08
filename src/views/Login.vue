<template>
  <main>
    <site-error v-if="$store.state.siteError" />
    <user-login />
  </main>
</template>

<script>
import SiteError from "../components/GlobalComponents/SiteError.vue";
import UserLogin from "../components/UserLogin/UserLogin.vue";
export default {
  components: { UserLogin, SiteError },
  name: "login-register",

  mounted() {
    if (this.$store.state.loginToken) {
      this.$router.push("feed");
    }
  },

  computed: {
    loginSuccess() {
      return Boolean(this.$store.state.loginToken);
    },
  },
};
</script>

<style lang="scss" scoped></style>
