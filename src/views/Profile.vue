<template>
  <div>
    <h2>
      Hey {{ $store.state.username }}, this is {{ $route.params.username }}'s
      profile page
    </h2>
  </div>
</template>

<script>
export default {
  name: "profile",
};
</script>

<style lang="scss" scoped></style>
