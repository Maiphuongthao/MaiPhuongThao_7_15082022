<script>
import HeaderOne from "./components/HeaderOne.vue";
export default {
  name: "App",
  components: {
    HeaderOne,
  },
};
</script>

<template>
  <HeaderOne />
  <router-view></router-view>
</template>

<style>
#app {
  font-family: "Lato", sans-serif;
  color: #4e5166;
  text-align: center;
}
.btn-color {
  background-color: #ffd7d7;
}
</style>
