<template>
  <div>
    <h1>You must login to use the site!</h1>
    <p>Redirecting you to login page!</p>
  </div>
</template>

<script>
export default {
  name: "not-logged-in",
  data() {
    return {
      redirect: setTimeout(() => {
        this.$router.push("login");
      }, 3000),
    };
  },
};
</script>

<style lang="scss" scoped></style>
