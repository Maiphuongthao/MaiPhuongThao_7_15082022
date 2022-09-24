<template>
  <div id="main-body">
    <CreatePost />
    <Post @delete-post="deletePost" :posts="posts" />
  </div>
</template>

<script>
import authApi from "../services/api";
import router from "../router/index";
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
    this.posts = this.getPosts();
  },
  methods: {
    //filte out the post with post id to be deleted
    deletePost(id) {
      if (confirm("Vous-être sûr?")) {
        authApi
          .delete(`/post/${id}`)
          .then(() => {
            this.posts = this.posts.filter((post) => post.id !== id);
            router.push("/");
          })
          .catch((error) => console.log(error));
      }
    },

    //get all post
    getPosts() {
      authApi
        .get("/post")
        .then((res) => {
          this.posts = res.data;
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
  max-width: 1120px;
}
</style>
