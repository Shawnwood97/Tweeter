<template>
  <section>
    <h2>Hey {{ $store.state.username }}, Thank you for logging in.</h2>
  </section>
</template>

<script>
export default {
  name: "login-success",
};
</script>

<style lang="scss" scoped></style>
