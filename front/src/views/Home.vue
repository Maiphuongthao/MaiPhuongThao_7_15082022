<template>
  <div id="main-body">
    <CreatePost />
    <Post :posts="posts" />
  </div>
</template>

<script>
import authApi from "../services/api";
import router from "../router";
import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
export default {
  name: "App",
  components: {
    CreatePost,
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      authApi
        .get("http://localhost:3000/api/post")
        .then((res) => {
          console.log(res.data);
          this.posts = res.data;
          router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style>
#main-body {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 1120px;
}
</style>
