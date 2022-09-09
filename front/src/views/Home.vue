<template>
  <CreatePost />
  <Post />
</template>

<script>
import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
export default {
  name: "App",
  components: {
    CreatePost,
    Post,
  },
  data(){
    return{
      post:{
        id:""
      }
    }
  }
};
</script>
<style></style>
