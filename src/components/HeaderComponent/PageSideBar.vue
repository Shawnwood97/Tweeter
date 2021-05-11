<template>
  <aside v-if="userInfo">
    <router-link :to="{ path: `/users/${userInfo.userId}` }"
      ><img :src="userInfo.imageUrl" />
    </router-link>
    <h4>{{ userInfo.username }}</h4>

    <nav>
      <router-link
        active-class="navIconActive"
        :to="{
          name: 'feed',
        }"
        ><font-awesome-icon class="navIcon" :icon="['fas', 'home']" />
        Home</router-link
      >
      <router-link
        active-class="navIconActive"
        :to="{
          path: `/users/${this.$store.state.userId}`,
        }"
      >
        <font-awesome-icon class="navIcon" :icon="['fas', 'user-alt']" />
        Profile</router-link
      >

      <router-link
        active-class="navIconActive"
        :to="{
          name: 'discover',
        }"
        ><font-awesome-icon
          class="navIcon"
          :icon="['fas', 'broadcast-tower']"
        />
        Discover</router-link
      >

      <router-link
        exact-active-class="navIconActive"
        :to="{
          name: 'users',
        }"
        ><font-awesome-icon class="navIcon" :icon="['fas', 'users']" />
        Users</router-link
      ><span @click="logoutUser">
        <font-awesome-icon
          class="tweetIcon"
          :icon="['fas', 'sign-out-alt']"
          id="logoutBtn"
        />
        Logout</span
      >
    </nav>
  </aside>
</template>

<script>
export default {
  name: "page-side-bar",

  methods: {
    logoutUser() {
      this.$store.dispatch("logOut");
    },
  },

  data() {
    return {
      userInfo: null,
      allUsers: this.$store.state.allUsers,
    };
  },
  mounted() {
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].userId === this.$store.state.userId) {
        this.userInfo = this.allUsers[i];
        break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
aside {
  display: grid;
  height: 400px;
  place-items: center end;
  margin-right: 40px;
  position: sticky;
  top: 40px;
}

nav {
  display: grid;
  place-items: center start;
  font-size: 1.3rem;
  gap: 20px;
  margin-top: 20px;

  a {
    color: $mainText;

    &:hover {
      color: $mainLink;
      text-decoration: none;
    }
  }

  span {
    font-family: $roboto;
    font-weight: 800;

    &:hover {
      cursor: pointer;
      color: $mainLink;
    }
  }
}

.navIconActive {
  color: $mainLink;
}
.navIconActive path {
  fill: $mainLink;
}
</style>
