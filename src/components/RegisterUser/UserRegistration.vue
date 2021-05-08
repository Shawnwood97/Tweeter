<template>
  <main>
    <site-error v-if="$store.state.siteError" />

    <div class="mainGrid" v-if="!loginToken">
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
        <h1>Register On <span>Twitter</span></h1>
      </div>
      <div class="containerTwo">
        <form action="javascript:void(0)">
          <div class="formItem">
            <label for="email">Email Address</label>
            <input type="email" name="email" id="emailInput" required />
          </div>
          <div class="formItem">
            <label for="username">Username</label>
            <input type="text" name="username" id="usernameInput" required />
          </div>
          <div class="formItem">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="passwordInput"
              required
            />
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
            <input type="text" name="headline" id="headlineInput" required />
          </div>
          <div class="formItem">
            <label for="birthDate">Date Of Birth</label>
            <input
              type="date"
              name="birthDate"
              id="birthDateInput"
              value="2020-04-20"
              required
            />
          </div>
          <div class="formItem">
            <input @click="registerUser" type="submit" value="Register" />
          </div>
        </form>
        <p>
          Already Registered?
          <router-link :to="{ name: 'login' }">Log In</router-link>
        </p>
      </div>
    </div>
  </main>
  <!-- <already-registered v-else-if="loginToken" /> -->
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import SiteError from "../GlobalComponents/SiteError.vue";

export default {
  components: { SiteError },

  name: "user-registration",

  data() {
    return {
      loginToken: cookies.get("loginToken"),
    };
  },

  mounted() {
    if (this.$store.state.loginToken) {
      this.$router.push("feed");
    }
  },
  methods: {
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
          this.$store.commit("setInitComplete", false);
          this.$store.commit("setLoginToken", res.data.loginToken);
          this.$store.commit("setUserId", res.data.userId);
          this.$store.commit("setUsername", res.data.username);
          this.$store.dispatch("checkLoggedIn");
        })
        .catch((err) => {
          console.log(err.response);
          this.$store.commit("setSiteError", err.response.data);
          setTimeout(() => {
            this.$store.commit("setSiteError", "");
          }, 3000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mainGrid {
  display: grid;
  place-items: center;
  min-height: 100vh;
  width: 100vw;
}

.formItem {
  text-align: center;
}
</style>
