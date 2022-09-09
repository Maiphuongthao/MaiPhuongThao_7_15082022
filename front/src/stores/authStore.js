import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "store",
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
  }),

  //dynamique header dans app.vue

  actions: {
    login(accessToken, user) {
      // donner de login
      this.user = user;
      this.accessToken = accessToken;
    },
    logOut() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
    }, //tout est null

    updateUser(user) {
      this.user = user;
    }, // comme login
    refreshToken(refreshToken) {
      this.refreshToken = refreshToken;
    }, // return seule le token
  },
});
