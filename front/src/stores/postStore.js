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

    updatePost(data) {
      this.post = data.post;
    }, // comme login
  },
});
