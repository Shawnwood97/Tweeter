<template>
  <init-loading v-if="!$store.state.initComplete" id="loading" />
  <div
    v-else-if="$store.state.initComplete && $store.state.loginToken"
    id="loggedInApp"
  >
    <site-message v-if="$store.state.siteError || $store.state.siteMessage" />
    <page-header id="mobileHeader" v-if="$store.state.loginToken" />
    <div id="dtContainer">
      <page-side-bar id="pageSideBar" v-if="$store.state.loginToken" />
      <div id="loggedInRouter">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
    <mobile-nav id="mobileNav" v-if="$store.state.loginToken" />
  </div>
  <div v-else id="app">
    <site-message v-if="$store.state.siteError || $store.state.siteMessage" />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import cookies from "vue-cookies";
import PageHeader from "./components/HeaderComponent/PageHeader.vue";
import MobileNav from "./components/MobileComponents/MobileNav.vue";
import InitLoading from "./components/UserLogin/InitLoading.vue";
import SiteMessage from "./components/GlobalComponents/SiteMessage.vue";
import PageSideBar from "./components/HeaderComponent/PageSideBar.vue";
export default {
  components: { PageHeader, MobileNav, InitLoading, SiteMessage, PageSideBar },
  data() {
    return {
      userIdCookie: cookies.get("userId"),
      loginToken: cookies.get("loginToken"),
    };
  },

  computed: {
    initComplete() {
      return this.$store.state.initComplete;
    },
  },

  mounted() {
    if (!this.$store.state.loginToken && this.userIdCookie && this.loginToken) {
      this.$store.commit("setLoginToken", this.loginToken);
      this.$store.commit("setUserId", this.userIdCookie);
      this.$store.dispatch("checkLoggedIn");
    } else {
      this.$store.commit("setInitComplete", true);
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@400;700&display=swap");

@media only screen and (min-width: 1200px) {
  #dtContainer {
    display: grid;
    grid-auto-flow: column;
    width: 100%;
    #pageSideBar {
      display: grid;
      justify-self: end;
      img {
        width: 120px;
        border-radius: 5px;
        border: 3px solid $secColor;
      }
    }
  }

  path:hover {
    cursor: pointer;
  }

  #loggedInApp {
    display: grid;
    margin-top: 0;
    margin-bottom: 0;

    #mobileHeader {
      display: none;
    }
    #loggedInRouter {
      max-width: 900px;
      min-width: 900px;
      margin: -61px 0;
      border-left: 3px solid #000;
      border-right: 3px solid #000;
      justify-self: start;
    }
  }

  #mobileNav {
    display: none;
  }
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: $mainText;
  font-family: $roboto;
}

body {
  background: $mainColor;
}

#pageSideBar {
  display: none;
}
#app,
#loggedInApp {
  font-family: $roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $mainColor;
  color: $mainText;
}
#loggedInApp {
  margin-bottom: 6vh;
  margin-top: 6vh;
  padding: 5px 0;
  min-height: 88vh;
}

a {
  color: $mainLink;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
#logo {
  width: 200px;
  fill: $mainLink;
}

.containerOne {
  display: grid;
  place-items: center;
  gap: 20px;

  h1 {
    color: $mainText;

    place-items: center;
    font-weight: 400;

    span {
      font-weight: bold;
      font-family: $lato;
      color: $mainLink;
    }
  }
}

.containerTwo {
  place-self: start center;
  width: 70%;

  form {
    display: grid;
    gap: 20px;
    place-items: center;
    width: 100%;

    input[type="text"],
    input[type="password"],
    input[type="email"],
    input[type="date"] {
      width: 100%;
      @include inputOne;
    }

    input[type="submit"] {
      @include mainBtn;
      padding: 10px 30px;

      @include btnDisabled;
    }
  }

  p {
    font-size: 0.9rem;
    margin-top: 15px;
    text-align: center;
  }
}

button {
  color: #000;
}
</style>
