<template>
  <div>
    <h4>{{ tweetInfo.username }}</h4>
    <h5>{{ tweetInfo.content }}</h5>
    <p>{{ tweetInfo.createdAt }}</p>
  </div>
</template>

<script>
export default {
  name: "ind-tweet",

  props: {
    tweetInfo: Object,
  },
};
</script>

<style lang="scss" scoped>
div {
  border: 1px solid #000;
  margin: 5px;
}
</style>
