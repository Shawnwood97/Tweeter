<template>
  <div>
    <article v-for="user in allUsers" :key="user.userId">
      <router-link
        :to="{
          name: 'profile',
          params: { id: user.userId },
        }"
      >
        <h5>{{ user.username }}</h5>
      </router-link>
      <p>{{ user.bio }}</p>
    </article>
  </div>
</template>

<script>
export default {
  name: "users",

  mounted() {
    return this.$store.dispatch("getUsers");
  },

  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
  },
};
</script>

<style lang="scss" scoped>
article {
  border: 1px solid #000;
  margin: 5px;
}
</style>
