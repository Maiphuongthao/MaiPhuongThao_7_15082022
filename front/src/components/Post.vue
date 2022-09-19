<template>
  <div class="posts">
    <div :key="post.id" v-for="post in posts">
      <MiniPost @delete-post="$emit('delete-post', post._id)" :post="post" />
    </div>
  </div>
</template>

<script>
import MiniPost from "./MiniPost.vue";
export default {
  props: {
    posts: Array,
  },
  components: {
    MiniPost,
  },
  data() {
    return {
      newpost: {},
    };
  },
  emits: ["delete-post"],
};
</script>

<style></style>
