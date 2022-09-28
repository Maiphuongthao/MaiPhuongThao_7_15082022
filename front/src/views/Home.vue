<template>
  <div id="main-body">
    <CreatePost />
    <Post @delete-post="deletePost" :posts="posts" />
  </div>
</template>

<script>
import authApi from "../services/api";

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
      newPost: {
        content: "",
        imageUrl: "",
      },
    };
  },
  created() {
    this.posts = this.getPosts();
    this.$root.$refs = this;
  },
  methods: {

    
    //filte out the post with post id to be deleted
    async deletePost(id) {
      if (confirm("Vous-être sûr?")) {
        let self = this;
        const res = await authApi.delete(`/post/${id}`);
        this.posts = this.posts.filter((post) => post.id !== id);
        return self.getPosts();
        //modification vers dom
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
