<script setup>
import Home from "../views/Home.vue";

defineProps({
  msg: {
    type: String,
  },
});
</script>

<template>
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-2 border-bottom brand-text"
    >
      <a
        href="/"
        class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-danger text-decoration-none"
      >
        Groupomania
      </a>

      <div
        class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 text-end"
      >
        <button type="button" class="btn btn-outline-primary me-2">
          Login
        </button>
        <button type="button" class="btn btn-color">Sign-up</button>
      </div>
    </header>
  </div>

  <Home/>
</template>

<style>
.brand-text {
  font-size: 1.5em;
}
.btn-color {
  background-color: #ffd7d7;
}
.btn-outline-primary {
  border-color: #ffd7d7;
  color: #4e5166;
}
</style>
