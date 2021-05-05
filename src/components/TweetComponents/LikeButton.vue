<template>
  <div>
    <button v-if="!tweetLiked" @click="likeTweet">+1</button>
    <button v-else @click="unLikeTweet">-1</button>
    <p class="likeCounter">{{ tweetLikes }}</p>
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
      console.log(this.getUserLikes[i].userId);
      if (
        this.getUserLikes[i].userId === this.$store.state.userId &&
        this.getUserLikes[i].tweetId === this.tweetId
      ) {
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

    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/tweet-likes",
    //       method: "GET",
    //       headers: {
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },
    //       params: {
    //         tweetId: this.tweetId,
    //       },
    //     })
    //     .then((res) => {
    //       for (let i = 0; i < res.data.length; i++) {
    //         if (res.data[i].userId === this.$store.state.userId) {
    //           this.tweetLiked = true;
    //         } else {
    //           this.tweetLiked = false;
    //         }
    //       }
    //       this.tweetLikes = res.data.length;
    //     })
    //     .catch((err) => {
    //       console.log(err.response);
    //     });
  },
};
</script>

<style lang="scss" scoped></style>
