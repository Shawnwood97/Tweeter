<template>
  <section>
    <p v-if="$store.state.siteError" class="error">
      Error: {{ $store.state.siteError }}
    </p>
    <p v-if="$store.state.siteMessage" class="message">
      {{ $store.state.siteMessage }}
    </p>
  </section>
</template>

<script>
export default {
  name: "site-message",
};
</script>

<style lang="scss" scoped>
.error,
.message {
  position: fixed;
  padding: 5px 0;
  background: #be3a3a;
  width: 100%;
  text-align: center;
  top: 0;
  left: 0;
  font-weight: bold;
  z-index: 9999999;
}

.message {
  background: #7abe3a;
  color: #000;
}
</style>
