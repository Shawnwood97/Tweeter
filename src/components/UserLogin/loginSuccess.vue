<template>
  <section>
    <h2>Hey {{ $store.state.username }}, Thank you for logging in.</h2>

    <p>Redirecting you to your feed</p>
  </section>
</template>

<script>
export default {
  name: "login-success",

  data() {
    return {
      redirect: setTimeout(() => {
        this.$router.push("feed");
      }, 3000),
    };
  },
};
</script>

<style lang="scss" scoped></style>
