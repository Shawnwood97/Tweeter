<template>
  <main>
    <h2>Loading User Data</h2>
    <font-awesome-icon :icon="['fas', 'sync-alt']" class="spinner" />
  </main>
</template>

<script>
export default {
  name: "init-loading",
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  height: 100vh;
  gap: 60px;
  background: $mainColor;
}

h2 {
  place-self: end center;
  color: $mainLink;
}
.spinner {
  font-size: 10rem;
  place-self: start center;
  animation: rotate 1.3s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
