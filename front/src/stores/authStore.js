import { defineStore } from "pinia";


export const useAuthStore = defineStore("store", {
  state: () => {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
    };
  },
  persist: true,

  //dynamique header dans app.vue

  actions: {
    loggingIn(data) {
      // donner de login
      this.user = data.userSend;
      this.accessToken = data.token;
      this.refreshToken = data.refreshToken;
    },
    logOut() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
    }, //tout est null

    updateUser(data) {
      this.user = data.user;
    }, // comme login
    returnRefreshToken(data) {
      this.accessToken = data.token;
    }, // return seule le token
  },
});

