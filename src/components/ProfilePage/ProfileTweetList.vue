<template>
  <div>
    <ind-tweet
      v-for="tweet in userTweets"
      :key="tweet.tweetId"
      :tweetInfo="tweet"
    />
  </div>
</template>

<script>
import axios from "axios";
import IndTweet from "../TweetComponents/IndTweet.vue";
export default {
  components: { IndTweet },
  name: "profile-tweet-list",

  computed: {
    userTweets() {
      return this.$store.state.userTweets;
    },
  },

  mounted() {
    axios
      .request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        params: {
          userId: this.$route.params.id,
        },
      })
      .then((res) => {
        // console.log(res.data);
        this.$store.commit("setUserTweets", res.data.reverse());
        for (let i = 0; i < this.$store.state.userTweets.length; i++) {
          if (this.$store.state.userTweets[i].userImageUrl === null) {
            this.$store.state.userTweets[i].userImageUrl =
              "https://cdn.discordapp.com/attachments/841266201657344010/841266288486907914/ABSRlIpzcqh_JEyZP1CW1_RaZDO34zgsV3wfGtpwfn_D3IB6XFnQjvFl5nkymDIEJ58dpJoA1-t8agaWloWXJhVz9WWaXYVIbkkj.png";
          }
        }
        // this.userTweets = res.data.reverse();
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped></style>
