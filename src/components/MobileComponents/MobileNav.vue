<template>
  <nav>
    <router-link
      active-class="navIconActive"
      :to="{
        name: 'feed',
      }"
      ><font-awesome-icon class="navIcon" :icon="['fas', 'home']"
    /></router-link>
    <router-link
      active-class="navIconActive"
      :to="{
        path: `/users/${this.$store.state.userId}`,
      }"
    >
      <font-awesome-icon class="navIcon" :icon="['fas', 'user-alt']"
    /></router-link>

    <router-link
      active-class="navIconActive"
      :to="{
        name: 'discover',
      }"
      ><font-awesome-icon class="navIcon" :icon="['fas', 'broadcast-tower']"
    /></router-link>

    <router-link
      exact-active-class="navIconActive"
      :to="{
        name: 'users',
      }"
      ><font-awesome-icon class="navIcon" :icon="['fas', 'users']"
    /></router-link>
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

.navIconActive path {
  fill: $mainLink;
}
</style>
