<template>
  <section>
    <div v-if="userInfo !== null">
      <img
        id="bannerImg"
        :src="userInfo.bannerUrl"
        :alt="`Banner for ${userInfo.username}'s profile`"
      />
      <div id="userPanel">
        <img class="profilePic" :src="userInfo.imageUrl" alt="" />
        <div id="userInfo">
          <div>
            <h2 id="profileUsername">
              {{ userInfo.username }}
            </h2>
            <profile-follow-button
              v-if="userInfo.userId !== $store.state.userId"
              :currentProfile="userInfo"
            />
          </div>
          <p id="profileBio">{{ userInfo.bio }}</p>

          <div id="lastProfileRow">
            <p id="profileBirthDate">
              <font-awesome-icon
                class="profileIcon"
                :icon="['fas', 'birthday-cake']"
              />{{ userInfo.birthdate }}
            </p>

            <div
              id="profileEdit"
              v-if="userInfo.userId === $store.state.userId"
            >
              <router-link :to="{ name: 'edit-profile' }"
                >Edit Profile
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from "axios";
import ProfileFollowButton from "./ProfileFollowButton.vue";
export default {
  components: { ProfileFollowButton },
  name: "profile-user-info",

  data() {
    return {
      userInfo: null,
      displayPicture: null,
      allUsers: this.$store.state.allUsers,
    };
  },

  mounted() {
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].userId === Number(this.$route.params.id)) {
        this.userInfo = this.allUsers[i];
        break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
#bannerImg {
  width: 100%;
  height: 160px;
  position: relative;
}
#userPanel {
  display: grid;
  grid-template-columns: auto 1fr;
  background: $secColor;
  margin: 0 10px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: $bsMain;
  margin-top: -20px;
  position: relative;
  z-index: 9998;

  .profilePic {
    width: 100px;
    background: $mainColor;
    border-radius: 5px;
    border: 2px solid $mainColor;
  }

  #userInfo {
    display: grid;
    margin-left: 5px;
    > div {
      display: grid;
      grid-template-columns: 1fr auto;
    }
    #profileUsername {
      font-size: 1.2rem;
      color: $secText;
    }

    #lastProfileRow {
      display: grid;
      grid-template-columns: 1fr auto;

      #profileBirthDate {
        font-size: 0.9rem;
        color: $altText;
      }

      #profileBirthDate {
        align-self: end;
      }

      #profileEdit {
        place-self: end;

        a {
          font-weight: normal;
          font-size: 0.7rem;
        }
      }
    }
  }
}

.profileIcon {
  margin-right: 10px;

  path {
    color: $altText;
  }
}
</style>
