import { createRouter} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import User from "../views/User.vue";
import UpdateUser from "../views/UpdateUser.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
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
});

export default router;
