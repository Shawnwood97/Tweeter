<template>
  <div>
    <font-awesome-icon
      class="tweetIcon"
      :icon="['fas', 'heart']"
      v-if="!tweetLiked"
      @click="likeTweet"
    />
    <font-awesome-icon
      class="likedTweet tweetIcon"
      :icon="['fas', 'heart']"
      v-else
      @click="unLikeTweet"
    />
    <p v-if="!tweetLiked">{{ tweetLikes }}</p>
    <p class="likedCounter" v-else>{{ tweetLikes }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "like-button",

  data() {
    return {
      tweetLiked: undefined,
      tweetLikes: undefined,
    };
  },

  props: {
    tweetId: Number,
  },

  computed: {
    getUserLikes() {
      return this.$store.getters.getUserLikes;
    },
  },

  methods: {
    likeTweet() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.tweetLiked = true;
          this.tweetLikes++;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    unLikeTweet() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.$store.state.loginToken,
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.tweetLiked = false;
          this.tweetLikes--;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },

  mounted() {
    for (let i = 0; i < this.getUserLikes.length; i++) {
      // console.log(this.getUserLikes[i].userId);
      if (this.getUserLikes[i].tweetId === this.tweetId) {
        this.tweetLiked = true;
        break;
      } else {
        this.tweetLiked = false;
      }
    }

    let counter = 0;
    for (let i = 0; i < this.$store.state.allLikes.length; i++) {
      if (this.$store.state.allLikes[i].tweetId === this.tweetId) {
        counter++;
      }
    }
    this.tweetLikes = counter;
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  grid-auto-flow: column;
  width: 60px;
  place-items: center;
}

p {
  color: $altText;
}
.tweetIcon {
  font-size: 1.5rem;

  path {
    fill: $altText;
  }
}
.likedTweet path {
  fill: #ff2121;
}

.likedCounter {
  color: #ff2121;
  font-weight: bold;
}
</style>
