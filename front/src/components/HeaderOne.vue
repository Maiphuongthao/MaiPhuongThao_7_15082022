<script setup>
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
      <router-link class="navbar-brand" to="/">
        <img
          class="w-50"
          src="../assets/logo/icon-left-font-monochrome-black.svg"
          alt="Logo Groupomania"
        />
      </router-link>

      <div
        class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 text-end"
      >
        <router-link to="/login">
          <button type="button" class="btn btn-outline-primary me-2">
            Login
          </button></router-link
        >
        <router-link to="/signup">
          <button type="button" class="btn btn-color">
            Sign-up
          </button></router-link
        >
      </div>
    </header>
  </div>
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
