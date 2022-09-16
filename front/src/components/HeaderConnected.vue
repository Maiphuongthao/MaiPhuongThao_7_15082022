<template>
  <div class="container col-12">
    <header
      class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <router-link to="/">
          <img
            class="bi me-2"
            height="40"
            src="../assets/logo/icon-left-font-monochrome-black.svg"
            alt="logo profile"
          />
        </router-link>
      </a>

      <ul class="nav nav-pills">
        <router-link to="/user">
          <li class="nav-item">
            <a href="#" class="nav-link color-txt"
              ><i class="fas fa-user m-lg-1"></i>Profile</a
            >
          </li></router-link
        >
        <router-link to="/updateUser">
          <li class="nav-item">
            <a href="#" class="nav-link color-txt"
              ><i class="fas fa-user-edit m-lg-1"></i>Modifiez votre profile</a
            >
          </li></router-link
        >

        <li class="nav-item" @click.prevent="logout">
          <a href="#" class="nav-link color-txt"
            ><i class="fas fa-sign-out-alt m-lg-1"></i>Déconnecter</a
          >
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import authApi from "../services/api";
import router from "../router/index";
import { useAuthStore } from "@/stores/authStore";

export default {
  methods: {
    logout() {
      authApi
        .get("/auth/logout")
        .then(() => {
          //delete user from store
          const auth = useAuthStore();
          auth.logOut();
          //redirect to login page
          router.push("/login");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.color-txt {
  color: #4e5166;
}
</style>
