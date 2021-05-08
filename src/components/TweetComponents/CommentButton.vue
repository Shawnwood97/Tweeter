<template>
  <font-awesome-icon class="tweetIcon" :icon="['fas', 'comment-dots']" />
</template>

<script>
export default {
  name: "comment-button",
};
</script>

<style lang="scss" scoped>
.tweetIcon {
  font-size: 1.5rem;

  path {
    fill: $altText;
  }
}
</style>
