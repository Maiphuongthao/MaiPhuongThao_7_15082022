<template>
  <div class="posts">
    <div :key="post.id" v-for="post in posts">
      <MiniPost @delete-post="$emit('delete-post', post.id)" :post="post" />
      <Comment />
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import MiniPost from "./MiniPost.vue";
export default {
  props: {
    posts: Array,
  },
  components: {
    MiniPost,
    Comment,
  },
  data() {
    return {
      post: [],
    };
  },
  emits: ["delete-post"],
};
</script>

<style></style>
