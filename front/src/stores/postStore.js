import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => {
    return {
      post: null,
    };
  },
  persist: true,

  //dynamique header dans app.vue

  actions: {
    createPost(data) {
      // donner de login
      this.post = data.newPost;
    },

    deletePost() {
      this.post = null;
    },

    updatePost(data) {
      this.post = data.post;
    }, // comme login
  },
});
