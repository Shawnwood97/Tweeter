<template>
  <div>
    <h3>Publish A Tweet</h3>
    <textarea-autosize
      :minHeight="20"
      maxlength="200"
      id="tweetContent"
      placeholder="Enter Tweet"
      rows="1"
      v-model="tweetContent"
    />
    <button @click="createTweet" :disabled="isDisabled">Send Tweet</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "create-tweet",

  data() {
    return {
      tweetContent: "",
    };
  },

  computed: {
    userTweets() {
      return this.$store.state.userTweets;
    },
    isDisabled() {
      if (this.tweetContent.length) {
        return false;
      } else {
        return true;
      }
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
          this.userTweets.unshift(res.data);
          this.tweetContent = "";

          this.$store.commit(
            "setSiteMessage",
            `You Created A Tweet, Check Your Profile To See It`
          );
          setTimeout(() => {
            this.$store.commit("setSiteMessage", "");
          }, 3000);
        })
        .catch(() => {
          this.$store.commit("setSiteError", "Error Posting Tweet, Try Again");
          setTimeout(() => {
            this.$store.commit("setSiteError", "");
          }, 3000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
  gap: 10px;
  margin-top: 10px;

  #tweetContent {
    @include inputOne;
    padding: 5px;
    width: 96%;
    font-size: 1.2rem;
    justify-self: center;
  }

  button {
    @include mainBtn;
    place-self: center end;
    margin-right: 8px;
    padding: 5px 10px;
    font-size: 0.9rem;

    @include btnDisabled;
  }
}
</style>
