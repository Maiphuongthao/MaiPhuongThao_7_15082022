import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "store",
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
  }),
  persist: true,
  //dynamique header dans app.vue

  actions: {
    login(data) {
      // donner de login
      this.user = data.user;
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
    },
    logOut() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
    }, //tout est null

    updateUser(user) {
      this.user = user;
    }, // comme login
    refreshToken(refreshToken, accessToken) {
      this.refreshToken = refreshToken;
      this.accessToken = accessToken;
      
    }, // return seule le token
  },
});
