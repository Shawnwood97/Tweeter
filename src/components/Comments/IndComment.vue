<template>
  <div class="commentContainer" v-if="commentToggle">
    <div class="userTimeGrid">
      <router-link
        :to="{
          name: 'profile',
          params: { id: indCommentInfo.userId },
        }"
      >
        <h4>{{ indCommentInfo.username }}</h4></router-link
      >

      <p class="commentTime">{{ indCommentInfo.createdAt }}</p>
    </div>
    <p class="commentContent" v-if="!showCommentEdit">
      {{ indCommentInfo.content }}
    </p>
    <div id="editSect" v-else>
      <form action="javascript:void(0)">
        <textarea-autosize
          id="editCommentInput"
          placeholder="Enter Comment"
          :value="indCommentInfo.content"
          rows="1"
          :minHeight="20"
        />
        <input
          type="submit"
          value="Submit"
          for="editInput"
          @click="editComment"
        />
      </form>
    </div>
    <hr />
    <div class="commentIconRow">
      <comment-like-button
        v-if="this.$store.state.loginToken && indCommentInfo.commentId"
        :commentId="indCommentInfo.commentId"
      />
      <font-awesome-icon
        class="commentIcon"
        :icon="['fas', 'edit']"
        id="commentEditButton"
        v-if="indCommentInfo.userId === $store.state.userId"
        @click="enableCommentEdit"
      />

      <font-awesome-icon
        class="commentIcon"
        :icon="['fas', 'trash-alt']"
        id="commentDeleteButton"
        v-if="indCommentInfo.userId === $store.state.userId"
        @click="deleteComment"
      />
    </div>
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
      commentToggle: true,
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

          for (let i = 0; i < this.$store.getters.randTweets.length; i++) {
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
          this.indCommentInfo = [];
          this.commentToggle = false;
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
  background: $mainColor;
  border-radius: 5px;
  box-shadow: $bsMain;
  margin: 5px;
  padding: 5px;

  .commentContent {
    font-size: 1rem;
    font-family: $lato;
    margin: 10px 0;
  }

  .userTimeGrid {
    display: grid;
    grid-auto-flow: column;
    margin-top: 5px;
    align-items: center;

    h4 {
      place-self: center;
    }

    p {
      place-self: center end;
      color: $altText;
      font-size: 0.8rem;
    }
  }

  hr {
    border: 1px solid $secColor;
    margin: 10px 0;
  }

  .commentIconRow {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    .commentIcon {
      font-size: 1.4rem;

      path {
        fill: $altText;
      }
    }
  }

  #editSect {
    margin: 10px;
    form {
      display: grid;
      gap: 10px;

      #editCommentInput {
        @include inputOne;
        padding: 5px;
        width: 100%;
        font-size: 1.2rem;
        place-self: center;
        font-weight: 400;
      }
      input[type="submit"] {
        @include mainBtn;
        padding: 5px 10px;
        font-size: 0.9rem;
        place-self: end;
      }
    }
  }
}
</style>
