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
              "https://lh3.googleusercontent.com/XJGWUivcvCXmMrSQnUzD7WKHsoasrtYYu3dnWVgKjW0ulBvzYVdl4p0YPV85ZeqhD5WFho7o2BysQ8rxSZNH7rfGYUYKUaqofnxvwEc6nWYiFexONmr-K_i1hCYgubRp-fj-q7YSRlqIK0NvoDs-bTrOTSL7kKkRC2Ay5NNWYV6TzA3WucL8reE71oMFMupMqtEWR1pa37Y3MovWpVTfHmPV6znfQ57inAfd58ATiOkzPhdQQBl2eViexJCaVtsNn9rn0tcAKYoVPp8VxuNSC_6AubY735xqTURFfqN9AnL5CH5SKoFDMOceaf2LriezvaUTF3ghqxMlZ95dE5pTCT1kNSKbPO-ereGcURQbZ1Xq5SVXurlvUs-p1Tiu4j1UFKOF-pD1iSoFX8oMB2eBQfBxinLP_tGf8t0CpzGR1UG9IC-RZEvh5ZOl058Ejdg1EHG5SNjGRhHrkm_rKxekch1NNs1qSRNqidjuBUZQhSdmGTdJqa79Z6kneec_MTJesShlGOAi3Mp1xwU02QSvUyM8Vufw-NIEbseX1qmbA7dhaUEkLK8o5G3AdB9hA7mHvpaE05_4jSU3n6gewvQnFwHcGNYFUX_RduNVtpIUbb_oD4m3A3QDTfsnWhqdH0YkdtKnz_BdjzkR4VasDOfoj6OHO-_gVHr-WWVbDuqLqn_2ErMxqSE4AQ0kUaTVlQ18_2u0aq470ch1aHDXtXJPSRS0=s300-no?authuser=0";
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
