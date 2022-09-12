<template>
  <CreatePost />
  <Post />
</template>

<script>
import axios from "axios";
import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
export default {
  name: "App",
  components: {
    CreatePost,
    Post,
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/post")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  },
};
</script>
<style></style>
