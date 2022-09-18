import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => {
    return {
      posts: [],
    };
  },
  persist: true,

  //dynamique header dans app.vue

  actions: {
    getPosts(posts) {
      this.posts = posts;
    },

    deletePost(_id) {
      this.posts = this.posts.filter((post) => post._id !== _id);
    },

    updatePost(data) {
      this.post = data.post;
    }, // comme login
  },
});
