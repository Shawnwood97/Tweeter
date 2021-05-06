<template>
  <div class="commentContainer">
    <h4>{{ commentInfo.username }}</h4>
    <p class="comment">{{ commentInfo.content }}</p>
    <p class="commentTime">{{ commentInfo.createdAt }}</p>
  </div>
</template>

<script>
export default {
  name: "ind-comment",

  props: {
    commentInfo: Object,
  },
};
</script>

<style lang="scss" scoped>
.commentContainer {
  border: 1px solid black;
  margin: 5px;
}
</style>
