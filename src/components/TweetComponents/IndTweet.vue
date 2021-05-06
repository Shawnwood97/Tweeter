<template>
  <div class="tweet">
    <div>
      <button
        id="editButton"
        v-if="tweetInfo.userId === $store.state.userId"
        @click="enableEdit"
      >
        Edit
      </button>
      <button
        id="deleteButton"
        v-if="tweetInfo.userId === $store.state.userId"
        @click="deleteTweet"
      >
        Delete
      </button>
    </div>
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
    <comment-list :tweetInfo="tweetInfo" />
  </div>
</template>

<script>
import axios from "axios";
import LikeButton from "./LikeButton.vue";

import CommentList from "../Comments/CommentList.vue";

export default {
  components: { LikeButton, CommentList },
  name: "ind-tweet",

  props: {
    tweetInfo: Object,
  },

  data() {
    return {
      showEdit: false,

      newComment: [],
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
    deleteTweet() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            tweetId: this.tweetInfo.tweetId,
          },
        })
        .then((res) => {
          console.log(res.data);
          for (let i = 0; i < this.$store.state.userTweets.length; i++) {
            if (
              this.$store.state.userTweets[i].tweetId === this.tweetInfo.tweetId
            ) {
              this.$store.commit("removeTweet", i);
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
