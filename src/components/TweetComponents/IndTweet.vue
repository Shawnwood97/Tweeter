<template>
  <div class="tweet">
    <h4>{{ tweetInfo.username }}</h4>
    <h5>{{ tweetInfo.content }}</h5>
    <p>{{ tweetInfo.createdAt }}</p>
    <like-button :tweetId="tweetInfo.tweetId" />
  </div>
</template>

<script>
import LikeButton from "./LikeButton.vue";
export default {
  components: { LikeButton },
  name: "ind-tweet",

  props: {
    tweetInfo: Object,
  },
};
</script>

<style lang="scss" scoped>
.tweet {
  border: 1px solid #000;
  margin: 5px;
}
</style>
