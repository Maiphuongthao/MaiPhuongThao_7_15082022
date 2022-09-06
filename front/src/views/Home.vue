<script >
import HeaderHomePage from "../components/HeaderHomePage.vue";
import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
export default {
  name: "App",
  components: {
    HeaderHomePage,
    CreatePost,
    Post,
  }
};
</script>

<template>
  <HeaderHomePage />
  <CreatePost />
  <Post />
</template>
<style></style>
