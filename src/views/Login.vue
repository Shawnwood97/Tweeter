<template>
  <div>
    <section id="loginForm">
      <login-fail v-if="$store.state.loginError" />
      <login-success v-else-if="loginSuccess" />
      <user-login v-else />
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import LoginFail from "../components/UserLogin/loginFail.vue";
import LoginSuccess from "../components/UserLogin/loginSuccess.vue";
import UserLogin from "../components/UserLogin/UserLogin.vue";
export default {
  components: { UserLogin, LoginFail, LoginSuccess },
  name: "login-register",

  userId: cookies.get("userId"),

  computed: {
    loginSuccess() {
      return Boolean(this.$store.state.loginToken);
    },
  },
};
</script>

<style lang="scss" scoped></style>
