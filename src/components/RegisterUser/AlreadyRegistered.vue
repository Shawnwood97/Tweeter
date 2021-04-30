<template>
  <main>
    <h1>
      You are already registered, and logged in
      <span @click="logOut">Click Here</span> to logout!
    </h1>
  </main>
</template>

<script>
import cookies from "vue-cookies";
export default {
  name: "already-registered",

  methods: {
    logOut() {
      cookies.remove("loginToken");
      cookies.remove("userId");
      this.$store.commit("setLoginToken", null);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
