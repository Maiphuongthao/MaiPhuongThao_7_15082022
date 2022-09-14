<template>
  <User
    :src="this.user.imageUrl"
    :alt="this.user.imageUrl"
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
        console.log("user==="+ this.user.imageUrl)
        console.log("data =====" + this.user);
      })
      .catch((error) => console.log(error));
  },
};
</script>
