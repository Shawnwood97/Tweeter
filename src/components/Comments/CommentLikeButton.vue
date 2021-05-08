<template>
  <div>
    <font-awesome-icon
      class="commentIcon"
      :icon="['fas', 'heart']"
      v-if="!commentLiked"
      @click="likeComment"
    />
    <font-awesome-icon
      class="commentIcon likedComment"
      :icon="['fas', 'heart']"
      n
      v-else
      @click="unLikeComment"
    />
    <p v-if="!commentLiked">{{ commentLikes }}</p>
    <p class="likedCounter" v-else>{{ commentLikes }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "comment-like-button",

  props: {
    commentId: Number,
  },

  data() {
    return {
      commentLiked: undefined,
      commentLikes: undefined,
    };
  },

  computed: {
    getUserCommentLikes() {
      return this.$store.getters.getUserCommentLikes;
    },
  },

  methods: {
    likeComment() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comment-likes",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            commentId: this.commentId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.commentLiked = true;
          this.commentLikes++;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    unLikeComment() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comment-likes",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            commentId: this.commentId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.commentLiked = false;
          this.commentLikes--;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },

  mounted() {
    for (let i = 0; i < this.getUserCommentLikes.length; i++) {
      // console.log(this.getUserLikes[i].userId);
      if (this.getUserCommentLikes[i].commentId === this.commentId) {
        this.commentLiked = true;
        break;
      } else {
        this.commentLiked = false;
      }
    }

    let counter = 0;
    for (let i = 0; i < this.$store.state.allCommentLikes.length; i++) {
      if (this.$store.state.allCommentLikes[i].commentId === this.commentId) {
        counter++;
      }
    }
    this.commentLikes = counter;
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  grid-auto-flow: column;
  width: 45px;
  place-items: center;
}

p {
  color: $altText;
}
.commentIcon {
  font-size: 1.4rem;

  path {
    fill: $altText;
  }
}
.likedComment path {
  fill: #ff2121;
}

.likedCounter {
  color: #ff2121;
  font-weight: bold;
}
</style>
