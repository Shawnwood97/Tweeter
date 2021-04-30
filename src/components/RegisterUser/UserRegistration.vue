<template>
  <main v-if="!loginToken">
    <h1>Register</h1>
    <form action="javascript:void(0)">
      <div class="formItem">
        <label for="email">Email Address</label>
        <input type="email" name="email" id="emailInput" />
      </div>
      <div class="formItem">
        <label for="username">Username</label>
        <input type="text" name="username" id="usernameInput" />
      </div>
      <div class="formItem">
        <label for="password">Password</label>
        <input type="password" name="password" id="passwordInput" />
      </div>
      <!-- <div class="formItem">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPasswordInput"
        />
      </div> -->
      <div class="formItem">
        <label for="headline">Headline</label>
        <input type="text" name="headline" id="headlineInput" />
      </div>
      <div class="formItem">
        <label for="birthDate">Date Of Birth</label>
        <input
          type="date"
          name="birthDate"
          id="birthDateInput"
          value="2020-04-20"
        />
      </div>
      <div class="formItem">
        <input @click="registerUser" type="submit" value="Register" />
      </div>
    </form>
    <p>
      Already Registered? <span @click="showLogin">Click Here</span> To Login!
    </p>
  </main>
  <already-registered v-else-if="loginToken" />
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import AlreadyRegistered from "./AlreadyRegistered.vue";
export default {
  components: { AlreadyRegistered },
  name: "user-registration",

  data() {
    return {
      loginToken: cookies.get("loginToken"),
    };
  },
  methods: {
    showLogin() {
      return this.$store.commit("regToggle", false);
    },
    registerUser() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            email: document.getElementById("emailInput").value,
            username: document.getElementById("usernameInput").value,
            password: document.getElementById("passwordInput").value,
            bio: document.getElementById("headlineInput").value,
            birthdate: document.getElementById("birthDateInput").value,
          },
        })
        .then((res) => {
          console.log(res);
          // set cookie and update login state
          cookies.set("loginToken", res.data.loginToken);
          cookies.set("userId", res.data.userId);
          this.$store.commit("setLoginToken", res.data.loginToken);
          this.$store.commit("setUserId", res.data.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  place-items: center;
}
form {
  display: grid;
  gap: 10px;

  .formItem {
    display: grid;
    place-items: center;
  }
}
</style>
