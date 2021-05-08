<template>
  <nav>
    <button>
      <router-link
        :to="{
          path: `/users/${this.$store.state.userId}`,
        }"
        >Profile</router-link
      >
    </button>
    <button>
      <router-link
        :to="{
          name: 'feed',
        }"
        >Feed</router-link
      >
    </button>
    <button>
      <router-link
        :to="{
          name: 'discover',
        }"
        >Discover</router-link
      >
    </button>
    <button>
      <router-link
        :to="{
          name: 'users',
        }"
        >Users</router-link
      >
    </button>
  </nav>
</template>

<script>
export default {
  name: "mobile-nav",
};
</script>

<style lang="scss" scoped>
nav {
  display: grid;
  grid-auto-flow: column;
  position: fixed;
  bottom: 0;
  place-items: center;
  place-self: center;
  width: 100%;
  height: 6vh;
  box-shadow: 0 0 6px rgba(0, 0, 0, 1);
  background: $secColor;

  z-index: 9999;
}
</style>
