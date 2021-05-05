<template>
  <div class="tweet">
    <edit-tweet-button
      v-if="tweetInfo.userId === $store.state.userId"
      @click.native="enableEdit"
    />
    <h4>{{ tweetInfo.username }}</h4>
    <h5 v-if="!showEdit">{{ tweetInfo.content }}</h5>
    <div id="editSect" v-if="showEdit">
      <form action="javascript:void(0)">
        <input type="text" :value="tweetInfo.content" id="editInput" />
        <input
          type="submit"
          value="Submit"
          for="editInput"
          @click="editTweet"
        />
      </form>
    </div>
    <p>{{ tweetInfo.createdAt }}</p>
    <like-button
      v-if="this.$store.state.loginToken"
      :tweetId="tweetInfo.tweetId"
    />
  </div>
</template>

<script>
import axios from "axios";
import EditTweetButton from "./editTweetButton.vue";
import LikeButton from "./LikeButton.vue";
export default {
  components: { LikeButton, EditTweetButton },
  name: "ind-tweet",

  props: {
    tweetInfo: Object,
  },

  data() {
    return {
      showEdit: false,
    };
  },
  methods: {
    enableEdit() {
      this.showEdit = !this.showEdit;
    },

    editTweet() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            tweetId: this.tweetInfo.tweetId,
            content: document.getElementById("editInput").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          for (let i = 0; i < this.$store.state.userTweets.length; i++) {
            if (
              this.$store.state.userTweets[i].tweetId === this.tweetInfo.tweetId
            ) {
              this.$store.state.userTweets[i].content = document.getElementById(
                "editInput"
              ).value;
            }
          }
          this.showEdit = !this.showEdit;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.tweet {
  border: 1px solid #000;
  margin: 5px;
}
</style>
