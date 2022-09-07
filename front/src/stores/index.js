import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "store",
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    login() {
      this.counter++;
    },
    signUp(){

    },
    updateUser(){

    },
    
  },
});
