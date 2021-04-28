<template>
  <section>
    <h2>Your Login Failed!</h2>
    <p>{{ $store.state.loginError }}</p>
    <p><span @click="tryAgain">Click here</span> to try again!</p>
  </section>
</template>

<script>
export default {
  name: "login-fail",

  method: {
    tryAgain() {
      this.$store.commit("setLoginError", "");
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  text-decoration: underline;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
}
</style>
