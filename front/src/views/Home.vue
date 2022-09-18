<template>
  <div id="main-body">
    <CreatePost />
    <Post @delete-post="deletePost" :posts="posts" />
  </div>
</template>

<script>
import authApi from "../services/api";
import { usePostStore } from "../stores/postStore";
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
    deletePost(id) {
      if (confirm("Vous-être sûr?")) {
        //const id = this.posts.map((post) => post.id).indexOf(this.post._id); // find index of your object
        //this.posts.splice(id, 1);
        authApi
          .delete(`/post/${id}`)
          .then(() => {
            this.posts = this.posts.filter((post) => post.id !== id);
          })
          .catch((error) => console.log(error));
      }
    },

    getPosts() {
      authApi
        .get("http://localhost:3000/api/post")
        .then((res) => {
          this.posts = res.data;
          console.log(res.data);

          const store = usePostStore();
          store.getPosts(res.data);
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
