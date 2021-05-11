<template>
  <div class="tweet">
    <!-- <div>
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
    </div> -->
    <div class="tweetColGrid">
      <img :src="`${tweetInfo.userImageUrl}`" />
      <div class="userAtContent">
        <div class="userAt">
          <router-link
            :to="{
              name: 'profile',
              params: { id: tweetInfo.userId },
            }"
          >
            <h4>{{ tweetInfo.username }}</h4></router-link
          >

          <p class="createdText">{{ tweetInfo.createdAt }}</p>
        </div>
        <p class="contentText" v-if="!showEdit">{{ tweetInfo.content }}</p>
      </div>
    </div>
    <div id="editSect" v-if="showEdit">
      <form action="javascript:void(0)">
        <textarea-autosize
          type="text"
          rows="1"
          :min-height="20"
          v-model="editInput"
          :value="tweetInfo.content"
          id="editInput"
        />
        <input
          type="submit"
          value="Submit"
          for="editInput"
          :disabled="editDisabled"
          @click="editTweet"
        />
      </form>
    </div>
    <hr />
    <div class="tweetButtons">
      <like-button
        v-if="this.$store.state.loginToken"
        :tweetId="tweetInfo.tweetId"
      />
      <comment-button
        v-if="this.$store.state.loginToken"
        @click.native="enableComment"
      />
      <font-awesome-icon
        class="tweetIcon"
        :icon="['fas', 'edit']"
        id="editButton"
        v-if="tweetInfo.userId === $store.state.userId"
        @click="enableEdit"
      />

      <font-awesome-icon
        class="tweetIcon"
        :icon="['fas', 'trash-alt']"
        id="deleteButton"
        v-if="tweetInfo.userId === $store.state.userId"
        @click="deleteTweet"
      />
    </div>
    <div id="commentSect" v-if="showComment">
      <form action="javascript:void(0)">
        <textarea-autosize
          maxlength="150"
          id="commentInput"
          placeholder="Enter Comment"
          rows="1"
          v-model="commentInput"
          :minHeight="20"
        />
        <input
          type="submit"
          value="Submit"
          @click="postComment"
          :disabled="commentDisabled"
        />
      </form>
    </div>
    <ind-comment
      v-for="comment in tweetComments"
      :key="comment.commentId"
      :commentInfo="comment"
    />
  </div>
</template>

<script>
import axios from "axios";
import LikeButton from "./LikeButton.vue";

import CommentButton from "./CommentButton.vue";
import IndComment from "../Comments/IndComment.vue";

export default {
  components: { LikeButton, CommentButton, IndComment },
  name: "ind-tweet",

  props: {
    tweetInfo: Object,
  },

  data() {
    return {
      showEdit: false,
      showComment: false,
      newComment: [],
      tweetComments: [],
      commentInput: "",
      editInput: "",
    };
  },

  computed: {
    commentDisabled() {
      if (this.commentInput) {
        return false;
      } else {
        return true;
      }
    },
    editDisabled() {
      if (this.editInput) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    enableEdit() {
      this.showEdit = !this.showEdit;
    },
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
          this.tweetComments.unshift(res.data);
          this.commentInput = "";
          this.showComment = !this.showComment;
        })
        .catch(() => {
          this.$store.commit(
            "setSiteError",
            "Error Posting Comment, Try Again!"
          );
          setTimeout(() => {
            this.$store.commit("setSiteError", "");
          }, 3000);
        });
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
        .then(() => {
          for (let i = 0; i < this.$store.state.userTweets.length; i++) {
            if (
              this.$store.state.userTweets[i].tweetId === this.tweetInfo.tweetId
            ) {
              this.$store.state.userTweets[i].content = document.getElementById(
                "editInput"
              ).value;
            }
          }

          for (let i = 0; i < this.$store.getters.randTweets.length; i++) {
            if (
              this.$store.getters.randTweets[i].tweetId ===
              this.tweetInfo.tweetId
            ) {
              this.$store.getters.randTweets[
                i
              ].content = document.getElementById("editInput").value;
            }
          }
          this.showEdit = !this.showEdit;
        })
        .catch(() => {
          this.$store.commit("setSiteError", "Error Editing Tweet, Try Again!");
          setTimeout(() => {
            this.$store.commit("setSiteError", "");
          }, 3000);
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
        .then(() => {
          for (let i = 0; i < this.$store.state.userTweets.length; i++) {
            if (
              this.$store.state.userTweets[i].tweetId === this.tweetInfo.tweetId
            ) {
              this.$store.commit("removeTweet", i);
            }
          }

          for (let i = 0; i < this.$store.getters.randTweets.length; i++) {
            if (
              this.$store.getters.randTweets[i].tweetId ===
              this.tweetInfo.tweetId
            ) {
              this.$store.getters.randTweets.splice(i, 1);
            }
          }
        })
        .catch(() => {
          this.$store.commit(
            "setSiteError",
            "Error Deleting Tweet, Try Again!"
          );
          setTimeout(() => {
            this.$store.commit("setSiteError", "");
          }, 3000);
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
        this.tweetComments = res.data.reverse();
      })
      .catch(() => {
        this.$store.commit("setSiteError", "Error Getting Comments, Refresh!");
        setTimeout(() => {
          this.$store.commit("setSiteError", "");
        }, 3000);
      });
  },
};
</script>

<style lang="scss" scoped>
.tweet {
  background: $secColor;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 0 3px 1px rgba(29, 31, 33, 1);
  display: grid;

  .tweetColGrid {
    display: grid;
    grid-template-columns: auto 1fr;

    .userAtContent {
      display: grid;
      gap: 10px;
      margin: 5px;
      margin-right: 10px;

      .contentText {
        font-size: 1rem;
        font-family: $lato;
      }

      .userAt {
        display: grid;
        grid-auto-flow: column;
        margin-top: 5px;
        align-items: center;

        .createdText {
          place-self: center end;
          color: $altText;
          font-size: 0.8rem;
        }
      }
    }
  }

  hr {
    width: 90%;
    margin: 10px auto;
    border: 1px solid $mainColor;
  }

  .tweetButtons {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    margin-bottom: 10px;
  }

  img {
    background: $mainColor;
    width: 50px;
    border-radius: 5px;
    border: 2px solid $mainColor;
    margin: 5px;
  }
}

#editSect,
#commentSect {
  margin: 10px;
  form {
    display: grid;
    gap: 10px;
  }
  #editInput,
  #commentInput {
    @include inputOne;
    padding: 5px;
    width: 100%;
    font-size: 1.2rem;
    place-self: center;
    background: $mainColor;
    font-weight: 400;
  }
  input[type="submit"] {
    @include mainBtn;
    padding: 5px 10px;
    font-size: 0.9rem;
    place-self: end;

    @include btnDisabled;
  }
}

.tweetIcon {
  font-size: 1.5rem;

  path {
    fill: $altText;
  }
}
</style>
