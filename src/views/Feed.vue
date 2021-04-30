<template>
  <div>
    <h1>Hey {{ $store.state.username }}, This is your feed</h1>
    <div>
      <input type="text" placeholder="Create A Tweet" /><button>
        Send Tweet
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "feed",
};
</script>

<style lang="scss" scoped></style>
