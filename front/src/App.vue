<script setup>
import { RouterLink, RouterView } from "vue-router";
import HeaderLoginPage from "./components/HeaderLoginPage.vue";
</script>

<template>
 <HeaderLoginPage/>

  <RouterView />
</template>

<style>
#app{
  font-family: 'Lato', sans-serif;
}

</style>
