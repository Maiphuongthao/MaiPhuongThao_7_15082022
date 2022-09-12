import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import User from "../views/User.vue";
import UpdateUser from "../views/UpdateUser.vue";
import NotFound from "../views/NotFound.vue";
import PublicLayout from "../layouts/PublicLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import OtherUser from "../views/OtherUser.vue";

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
  routes: publicRoutes.concat(mainRoutes),
});

/*router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/public", "/login", "/signup"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/public";
  }
});*/

export default router;
