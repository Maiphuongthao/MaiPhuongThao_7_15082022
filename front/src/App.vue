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
.overlay-layer {
  position: absolute;
  opacity: 1;
  z-index: 0;
  text-align: center;
}
.upload_btn {
  position: absolute;
  background-color: black;
  z-index: 10;
  opacity: 0;
}
</style>
