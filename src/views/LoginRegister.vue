<template>
  <div>
    <section v-if="!showRegisterPage" id="loginForm">
      <user-login />
    </section>
    <section v-else id="registerForm">
      <user-registration />
    </section>
  </div>
</template>

<script>
import UserRegistration from "../components/RegisterUser/UserRegistration.vue";
import UserLogin from "../components/UserLogin/UserLogin.vue";
export default {
  components: { UserLogin, UserRegistration },
  name: "login-register",

  computed: {
    showRegisterPage() {
      return this.$store.state.showRegistration;
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: grid;
  gap: 10px;
}
span {
  text-decoration: underline;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
}
</style>
