<template>
  <div>
    <comment-button
      v-if="this.$store.state.loginToken"
      @click.native="enableComment"
    />
    <form v-if="showComment" action="javascript:void(0)">
      <input id="commentInput" type="text" />
      <input type="submit" value="Submit" @click="postComment" />
    </form>
    <ind-comment
      v-for="comment in tweetComments"
      :key="comment.commentId"
      :commentInfo="comment"
    />
  </div>
</template>

<script>
import axios from "axios";
import IndComment from "./IndComment.vue";
import CommentButton from "../TweetComponents/CommentButton.vue";
export default {
  components: { IndComment, CommentButton },
  name: "comment-list",

  data() {
    return {
      showComment: false,
      tweetComments: [],
    };
  },

  props: {
    tweetInfo: Object,
    newComment: Object,
  },

  methods: {
    enableComment() {
      this.showComment = !this.showComment;
    },
    postComment() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            tweetId: this.tweetInfo.tweetId,
            content: document.getElementById("commentInput").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.tweetComments.unshift(res.data);
          this.showComment = !this.showComment;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },

  mounted() {
    axios
      .request({
        url: "https://tweeterest.ml/api/comments",
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
        },
        params: {
          tweetId: this.tweetInfo.tweetId,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.tweetComments = res.data.reverse();
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped></style>
