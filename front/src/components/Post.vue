<template>
  <div class="posts">
    <div :key="post._id" v-for="post in posts">
      <MiniPost :post="post" />
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
};
</script>

<style></style>
