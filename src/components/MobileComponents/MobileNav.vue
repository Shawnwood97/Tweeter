<template>
  <nav>
    <button>Profile</button>
    <button>Feed</button>
    <button>Discover</button>
    <button>Users</button>
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
  position: absolute;
  bottom: 0;
  place-items: center;
  width: 100%;
  min-height: 6vh;
  border: 1px solid #000;
  z-index: 9999;
}
</style>
