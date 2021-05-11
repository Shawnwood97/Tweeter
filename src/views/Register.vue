<template>
  <div>
    <user-registration />
  </div>
</template>

<script>
import UserRegistration from "../components/RegisterUser/UserRegistration.vue";
export default {
  components: { UserRegistration },

  name: "registration-page",

  created() {
    document.title = "TheTweeter | Register Now!";
  },
};
</script>

<style lang="scss" scoped></style>
