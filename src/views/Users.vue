<template>
  <section>
    <user-card v-for="user in allUsers" :key="user.userId" :user="user" />
  </section>
</template>

<script>
import UserCard from "../components/Users/UserCard.vue";
export default {
  components: { UserCard },
  name: "users",

  created() {
    document.title = "TheTweeter | Users";
  },

  mounted() {
    if (!this.$store.state.loginToken) {
      this.$router.push("/");
    }
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
@media only screen and (min-width: 1200px) {
  section {
    min-width: 890px;
  }
}
</style>
