<template>
  <div>
    <user-card v-for="user in allUsers" :key="user.userId" :user="user" />
  </div>
</template>

<script>
import UserCard from "../components/Users/UserCard.vue";
export default {
  components: { UserCard },
  name: "users",

  mounted() {
    if (this.$store.state.loginToken) {
      return this.$store.dispatch("getUsers");
    }
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
