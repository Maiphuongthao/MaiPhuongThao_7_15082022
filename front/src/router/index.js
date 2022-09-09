import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import User from "../views/User.vue";
import UpdateUser from "../views/UpdateUser.vue";
import NotFound from "../views/NotFound.vue";
import PublicLayout from "../layouts/PublicLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import OtherUser from "../views/OtherUser.vue"

const publicRoutes = [
  {
    path: "/public",
    name: "PublicLayout",
    component: PublicLayout,
    children: [
      {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/signup",
        name: "Signup",
        component: Signup,
      },
    ],
  },
];

const mainRoutes = [
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    children: [
      {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
      },
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/user/:id",
        name: "OtherUser",
        component: OtherUser,
      },

      {
        path: "/user",
        name: "User",
        component: User,
      },
      {
        path: "/updateUser",
        name: "UpdateUser",
        component: UpdateUser,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: mainRoutes.concat(publicRoutes),
});

export default router;
