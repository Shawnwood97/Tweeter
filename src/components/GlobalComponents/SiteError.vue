<template>
  <section>
    <p>Error: {{ $store.state.siteError }}</p>
  </section>
</template>

<script>
export default {
  name: "site-error",
};
</script>

<style lang="scss" scoped>
section {
  position: absolute;
  padding: 5px 0;
  background: #be3a3a;
  width: 100%;
  text-align: center;
  top: 0;
  left: 0;
  font-weight: bold;
}
</style>
