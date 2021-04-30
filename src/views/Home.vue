<template>
  <div class="home">
    <div>This is the homepage</div>
    <button @click="navToLogin">Login</button>
    <button @click="navToReg">Register</button>
  </div>
</template>

<script>
export default {
  name: "home",

  methods: {
    navToLogin() {
      this.$router.push("login");
    },
    navToReg() {
      this.$router.push("register");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  gap: 20px;
}
</style>
