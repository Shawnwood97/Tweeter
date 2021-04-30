<template>
  <div v-if="!$store.state.loginToken">
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
    <p>
      Not Registered? <span @click="navToRegister">Click Here</span> To
      Register!
    </p>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";

export default {
  name: "user-login",

  methods: {
    navToRegister() {
      this.$router.push("register");
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
            username: document.getElementById("usernameInput").value,
            password: document.getElementById("passwordInput").value,
          },
        })
        .then((res) => {
          if (res.data.loginToken !== undefined) {
            cookies.set("loginToken", res.data.loginToken);
            cookies.set("userId", res.data.userId);
            this.$store.commit("setLoginToken", res.data.loginToken);
            this.$store.commit("setUserId", res.data.userId);
            this.$store.commit("setUsername", res.data.username);
          } else {
            this.$store.commit("setLoginToken", null);
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.$store.commit("setLoginError", err.response.data);
          cookies.remove("loginToken");
          cookies.remove("userId");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: grid;
  gap: 10px;
}
span {
  text-decoration: underline;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
}
</style>
