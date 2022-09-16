<template>
  <CreatePost />
  <Post
    :content="this.post.content"
    :userId="this.post.userId"
    :imageUrl="this.post.imageUrl"
    :createdAt="this.post.createdAt"
    :postId="this.post._id"
  />
</template>

<script>
import authApi from "../services/api";
import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
import { usePostStore } from "../stores/postStore";
export default {
  name: "App",
  components: {
    CreatePost,
    Post,
  },
  data() {
    return {
      post: [],
    };
  },
  mounted() {
    authApi
      .get("http://localhost:3000/api/post")
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.post = res.data[i];
          console.log(this.post);
        }

        console.log(res.data);
      })
      .catch((error) => console.log(error));
  },
};
</script>
<style></style>
