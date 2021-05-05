<template>
  <div>
    <h2>Update Your Profile</h2>
    <div>
      <form action="javascript:void(0)">
        <h4>Banner Image</h4>
        <input type="text" id="bannerUrl" name="bannerUrl" />
        <input
          @click="updateBanner"
          type="submit"
          placeholder="Submit"
          for="bannerUrl"
        />
      </form>
    </div>
    <div>
      <form action="javascript:void(0)">
        <h4>Profile Picture</h4>
        <input type="text" id="profilePic" name="profilePic" />
        <input
          @click="updateProfilePic"
          type="submit"
          placeholder="Submit"
          for="profilePic"
        />
      </form>
    </div>
    <div>
      <form action="javascript:void(0)">
        <h4>Headline</h4>
        <input type="text" id="headline" name="headline" />
        <input
          @click="updateHeadline"
          type="submit"
          placeholder="Submit"
          for="headline"
        />
      </form>
    </div>
    <div>
      <form action="javascript:void(0)">
        <h4>Birthdate</h4>
        <input type="date" name="birthDate" id="birthDate" value="2020-04-20" />
        <input
          @click="updateBday"
          type="submit"
          placeholder="Submit"
          for="birthDate"
        />
      </form>
      <form action="javascript:void(0)">
        <h4>Username</h4>
        <input type="text" name="userName" id="userName" />
        <input
          @click="updateUsername"
          type="submit"
          placeholder="Submit"
          for="userName"
        />
      </form>
      <form action="javascript:void(0)">
        <h4>Email</h4>
        <input type="email" name="email" id="email" />
        <input
          @click="updateEmail"
          type="submit"
          placeholder="Submit"
          for="email"
        />
      </form>
      <form action="javascript:void(0)">
        <h4>Delete Profile</h4>
        <p>This cannot be undone!</p>
        <input type="password" name="password" id="password" />
        <input
          @click="deleteProfile"
          type="submit"
          placeholder="Submit"
          for="password"
        />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-profile",
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
            bio: document.getElementById("headline").value,
          },
        })
        .then((res) => {
          console.log(res.data.bio);
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
            email: document.getElementById("email").value,
          },
        })
        .then((res) => {
          console.log(res.data.email);
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
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
