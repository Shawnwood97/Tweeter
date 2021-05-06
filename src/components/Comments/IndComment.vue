<template>
  <div class="commentContainer">
    <div>
      <button
        id="commentEditButton"
        v-if="indCommentInfo.userId === $store.state.userId"
        @click="enableCommentEdit"
      >
        Edit
      </button>
      <button
        id="commentDeleteButton"
        v-if="indCommentInfo.userId === $store.state.userId"
        @click="deleteComment"
      >
        Delete
      </button>
    </div>
    <h4>{{ indCommentInfo.username }}</h4>
    <p class="comment">{{ indCommentInfo.content }}</p>
    <div id="editSect" v-if="showCommentEdit">
      <form action="javascript:void(0)">
        <input
          type="text"
          :value="indCommentInfo.content"
          id="editCommentInput"
        />
        <input
          type="submit"
          value="Submit"
          for="editInput"
          @click="editComment"
        />
      </form>
    </div>
    <p class="commentTime">{{ indCommentInfo.createdAt }}</p>

    <comment-like-button
      v-if="this.$store.state.loginToken && indCommentInfo.commentId"
      :commentId="indCommentInfo.commentId"
    />
  </div>
</template>

<script>
import axios from "axios";
import CommentLikeButton from "./CommentLikeButton.vue";
export default {
  components: { CommentLikeButton },
  name: "ind-comment",

  props: {
    commentInfo: Object,
  },

  data() {
    return {
      showCommentEdit: false,
      indCommentInfo: this.commentInfo,
    };
  },

  methods: {
    enableCommentEdit() {
      this.showCommentEdit = !this.showCommentEdit;
    },

    editComment() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            commentId: this.indCommentInfo.commentId,
            content: document.getElementById("editCommentInput").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          for (let i = 0; i < this.$store.state.userTweets.length; i++) {
            this.indCommentInfo.content = document.getElementById(
              "editCommentInput"
            ).value;
          }
          this.showCommentEdit = !this.showCommentEdit;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteComment() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            commentId: this.indCommentInfo.commentId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.indCommentInfo = {};
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.commentContainer {
  border: 1px solid black;
  margin: 5px;
}
</style>
