<template>
  <div>
    <h3>Publish A Tweet</h3>
    <input id="tweetContent" type="text" placeholder="Enter Tweet" />
    <button @click="createTweet">Send</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "create-tweet",

  methods: {
    createTweet() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            content: document.getElementById("tweetContent").value,
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
