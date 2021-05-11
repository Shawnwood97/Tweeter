<template>
  <div class="mainContainer">
    <div id="login" v-if="!$store.state.loginToken">
      <div class="containerOne">
        <svg id="logo" viewBox="0 0 248 204">
          <path
            d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04
		C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66
		c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64
		c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76
		c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26
		c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"
          />
        </svg>
        <h1>Login To <span>Twitter</span></h1>
      </div>
      <div class="containerTwo">
        <form action="javascript:void(0)">
          <!-- <label for="username">Username </label> -->
          <input
            type="text"
            name="username"
            v-model="usernameInput"
            id="usernameInput"
            placeholder="Username"
            required
          />

          <!-- <label for="password">Password </label> -->
          <input
            type="password"
            name="password"
            v-model="passwordInput"
            id="passwordInput"
            placeholder="Password"
            required
          />

          <div>
            <input
              @click="logIn"
              :disabled="isDisabled"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <p>
          Don't have an account?
          <router-link :to="{ name: 'register' }">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";

export default {
  name: "user-login",

  data() {
    return {
      usernameInput: "",
      passwordInput: "",
    };
  },

  computed: {
    isDisabled() {
      if (this.usernameInput.length >= 4 && this.passwordInput.length >= 4) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
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
            this.$store.commit("setInitComplete", false);
            this.$store.commit("setLoginToken", res.data.loginToken);
            this.$store.commit("setUserId", res.data.userId);
            this.$store.commit("setUsername", res.data.username);
            this.$store.dispatch("checkLoggedIn");
          } else {
            this.$store.commit("setLoginToken", null);
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.$store.commit("setSiteError", err.response.data);
          cookies.remove("loginToken");
          cookies.remove("userId");
          setTimeout(() => {
            this.$store.commit("setSiteError", "");
          }, 3000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mainContainer {
  display: grid;
  place-items: center;
  min-height: 100vh;
  width: 100vw;
}

#login {
  display: grid;
  place-items: center;
  gap: 20px;
  width: 320px;
}
</style>
