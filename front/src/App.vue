<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
defineProps({});
</script>

<style>
#app {
  font-family: Lato, "Open sans", sans-serif;
  color: #4e5166;
}
.btn-color {
  background-color: #ffd7d7;
}
img {
  object-fit: cover;
}
a {
  text-decoration: none;
}
.icon{
  color:#B66878;
}
.icon:hover {
  color: #FD2D01;
}
</style>
