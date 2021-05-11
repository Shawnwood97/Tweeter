<template>
  <div>
    <h2>Update Your Profile</h2>
    <div id="mainGrid">
      <div>
        <h4>Banner Image</h4>
        <form action="javascript:void(0)">
          <textarea-autosize
            :minHeight="20"
            rows="1"
            type="text"
            id="bannerUrl"
            class="editInput"
            v-model="bannerUrl"
            name="bannerUrl"
          />
          <input
            @click="updateBanner"
            type="submit"
            placeholder="Submit"
            for="bannerUrl"
          />
        </form>
      </div>
      <div>
        <h4>Profile Picture</h4>
        <form action="javascript:void(0)">
          <textarea-autosize
            :minHeight="20"
            rows="1"
            type="text"
            id="profilePic"
            class="editInput"
            v-model="profilePic"
            name="profilePic"
          />
          <input
            @click="updateProfilePic"
            type="submit"
            placeholder="Submit"
            for="profilePic"
          />
        </form>
      </div>

      <div>
        <h4>Headline</h4>
        <form action="javascript:void(0)">
          <textarea-autosize
            maxlength="120"
            :minHeight="20"
            rows="1"
            type="text"
            id="headline"
            class="editInput"
            name="headline"
            v-model="headlineInput"
          />
          <input
            @click="updateHeadline"
            type="submit"
            placeholder="Submit"
            for="headline"
          />
        </form>
      </div>
      <div>
        <h4>Birthdate</h4>
        <form action="javascript:void(0)">
          <input
            type="date"
            name="birthDate"
            class="editInput"
            v-model="birthDate"
            id="birthDate"
            value="2020-04-20"
          />
          <input
            @click="updateBday"
            type="submit"
            placeholder="Submit"
            for="birthDate"
          />
        </form>
      </div>
      <div>
        <h4>Username</h4>
        <form action="javascript:void(0)">
          <textarea-autosize
            maxlength="20"
            :minHeight="20"
            rows="1"
            type="text"
            name="userName"
            class="editInput"
            v-model="userName"
            id="userName"
          />
          <input
            @click="updateUsername"
            type="submit"
            placeholder="Submit"
            for="userName"
          />
        </form>
      </div>
      <div>
        <h4>Email</h4>
        <form action="javascript:void(0)">
          <textarea-autosize
            :minHeight="20"
            rows="1"
            type="email"
            name="email"
            class="editInput"
            id="emailInput"
            v-model="emailInput"
          />
          <input
            @click="updateEmail"
            type="submit"
            placeholder="Submit"
            for="email"
          />
        </form>
      </div>
      <div class="deleteProfile">
        <h4>Delete Profile</h4>
        <p>This cannot be undone!</p>
        <form action="javascript:void(0)">
          <textarea-autosize
            :minHeight="20"
            rows="1"
            type="password"
            name="password"
            class="editInput"
            id="password"
            placeholder="Enter Password"
          />
          <input
            @click="deleteProfile"
            type="submit"
            placeholder="Submit"
            for="password"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-profile",

  created() {
    document.title = "TheTweeter | Edit Profile";
  },

  data() {
    return {
      headlineInput: "",
      bannerUrl: "",
      profilePic: "",
      birthDate: "",
      userName: "",
      emailInput: "",
    };
  },

  methods: {
    updateBanner() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            bannerUrl: document.getElementById("bannerUrl").value,
          },
        })
        .then((res) => {
          console.log(res.data.bannerUrl);
          this.bannerUrl = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    updateProfilePic() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            imageUrl: document.getElementById("profilePic").value,
          },
        })
        .then((res) => {
          console.log(res.data.imageUrl);
          this.profilePic = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    updateHeadline() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            bio: document.getElementById("headlineInput").value,
          },
        })
        .then((res) => {
          console.log(res.data.bio);
          this.headlineInput = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    updateBday() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            birthdate: document.getElementById("birthDate").value,
          },
        })
        .then((res) => {
          console.log(res.data.birthdate);
          this.birthDate = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    updateUsername() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            username: document.getElementById("userName").value,
          },
        })
        .then((res) => {
          console.log(res.data.username);
          this.userName = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    updateEmail() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            email: document.getElementById("emailInput").value,
          },
        })
        .then((res) => {
          console.log(res.data.email);
          this.emailInput = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteProfile() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            password: document.getElementById("password").value,
          },
        })
        .then(() => {
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 10px 0 10px 10px;
}
#mainGrid {
  display: grid;
  width: 100%;
  padding: 0 10px;
  gap: 20px;

  form {
    display: grid;
    grid-template-columns: 1fr auto;
    place-items: center;

    gap: 10px;
    // width: 90%;
    .editInput {
      @include inputOne;
      padding: 5px;
      width: 100%;
      font-size: 1.2rem;
      place-self: center;
      font-weight: 400;
    }
    input[type="submit"] {
      @include mainBtn;
      padding: 5px 10px;
      font-size: 0.9rem;

      @include btnDisabled;
    }
  }
}

.deleteProfile p {
  color: #ff2121;
  font-size: 0.9rem;
}
</style>
