<template>
  <login-fail v-if="$store.state.loginError" />
  <div v-else-if="!$store.state.loginToken">
    <h1>Login</h1>
    <form action="javascript:void(0)">
      <div>
        <label for="username">Username </label>
        <input type="text" name="username" id="usernameInput" />
      </div>
      <div>
        <label for="password">Password </label>
        <input type="password" name="password" id="passwordInput" />
      </div>
      <div>
        <input @click="logIn" type="submit" value="Login" />
      </div>
    </form>
    <p>Not Registered? <span @click="showReg">Click Here</span> To Register!</p>
  </div>

  <login-success v-else-if="loginSuccess" />
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import loginSuccess from "./loginSuccess.vue";
import LoginFail from "./loginFail.vue";

export default {
  components: { loginSuccess, LoginFail },
  name: "user-login",

  computed: {
    loginSuccess() {
      return Boolean(this.$store.state.loginToken);
    },
  },

  methods: {
    showReg() {
      this.$store.commit("regToggle", true);
    },

    logIn() {
      axios
        .request({
          url: "https://tweeterest.ml/api/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            email: document.getElementById("usernameInput").value,
            password: document.getElementById("passwordInput").value,
          },
        })
        .then((res) => {
          if (res.data.loginToken !== undefined) {
            cookies.set("loginToken", res.data.loginToken);
            this.$store.commit("setLoginToken", res.data.loginToken);
            this.$store.commit("setUsername", res.data.username);
          } else {
            this.$store.commit("setLoginToken", null);
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.$store.commit("setLoginError", err.response.data);
          cookies.remove("loginToken");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: grid;
  gap: 10px;

  button {
    width: 60px;
  }
}
</style>
