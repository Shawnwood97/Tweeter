<template>
  <div>
    <user-card v-for="user in allUsers" :key="user.userId" :user="user" />
    <!-- <article v-for="user in allUsers" :key="user.userId">
      <router-link
        :to="{
          name: 'profile',
          params: { id: user.userId },
        }"
      >
        <h5>{{ user.username }}</h5>
      </router-link>
      <p>{{ user.bio }}</p>
    </article> -->
  </div>
</template>

<script>
import UserCard from "../components/Users/UserCard.vue";
export default {
  components: { UserCard },
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
