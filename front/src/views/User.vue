<template>
  <User
  :class="this.user.userId"
    :imageUrl="this.user.imageUrl"
    :alt="this.user.username"
    :email="this.user.email"
    :isAdmin="this.user.isAdmin"
    :username="this.user.username"
  />
</template>

<script>
import authApi from "../services/api";
import User from "../components/User.vue";


export default {
  components: {
    User,
  },
  data() {
    return {
      user: [],
    };
  },
  mounted() {
    authApi
      .get("/auth")
      .then((res) => {
        this.user = res.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>
