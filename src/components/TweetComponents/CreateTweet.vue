<template>
  <div>
    <h3>Publish A Tweet</h3>
    <textarea-autosize
      id="tweetContent"
      placeholder="Enter Tweet"
      rows="1"
      :minHeight="20"
    />
    <button @click="createTweet">Send</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "create-tweet",

  computed: {
    userTweets() {
      return this.$store.state.userTweets;
    },
  },

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
          this.userTweets.unshift(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#tweetContent {
  width: 80%;
}
</style>
