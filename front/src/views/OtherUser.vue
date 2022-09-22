<template>
  <User :user="user" />
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
      user: {},
    };
  },
  mounted() {
    authApi
      .get("/auth/:id")
      .then((res) => {
        this.user = res.data;
        console.log("user===" + this.user.imageUrl);
        console.log("data =====" + this.user);
      })
      .catch((error) => console.log(error));
  },
};
</script>
