<template>
  <div class="home">
    <div>This is the homepage</div>
    <button @click="gotoLogin">Login</button>
  </div>
</template>

<script>
export default {
  name: "home",

  methods: {
    gotoLogin() {
      this.$router.push("login");
    },
  },
};
</script>
