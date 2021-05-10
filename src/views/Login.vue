<template>
  <main>
    <user-login />
  </main>
</template>

<script>
import UserLogin from "../components/UserLogin/UserLogin.vue";
export default {
  components: { UserLogin },
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
