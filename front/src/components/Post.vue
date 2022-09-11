<template>
  <div class="card gedf-card">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between align-items-center">
          <div class="mr-2">
            <router-link to="/user">
              <img
                class="rounded-circle"
                width="45"
                src="../assets/default.png"
                alt=""
            /></router-link>
          </div>
          <div class="ml-2">
            <router-link to="/user">
              <div class="h6 m-0">@LeeCross</div></router-link
            >
            <div class="h7 text-muted">Miracles Lee Cross</div>
          </div>
        </div>

        <div class="d-flex flex-row gap-3 align-items-center">
          <div class="d-flex align-items-center">
            <a href="">
              <i class="fas fa-pen"></i>
              <span class="ms-1 fs-10">Modifier</span></a
            >
          </div>

          <div class="d-flex align-items-center">
            <a href="">
              <i class="fas fa-trash-alt"></i>
              <span class="ms-1 fs-10">Supprimer</span></a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="text-muted h7 mb-2">
        <i class="fa fa-clock-o"></i>10 min ago
      </div>
      <a class="card-link" href="#">
        <h6 class="card-title">
          Lorem ipsum dolor sit amet, consectetur adip.
        </h6>
      </a>

      <p class="card-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae
        nulla rem eos ipsa praesentium esse magnam nemo dolor sequi fuga quia
        quaerat cum, obcaecati hic, molestias minima iste voluptates.
      </p>
    </div>
    <ul class="nav d-flex justify-content-start mb-4">
      <li class="nav-item mx-3">
        <a class="icon" href="#"><i class="fa fa-gittip fa-lg"></i>J'aime</a>
      </li>
      <li class="nav-item">
        <a class="icon" href="#"
          ><i class="fa fa-comment fa-lg"></i> Commenter</a
        >
      </li>
    </ul>
    <Comment />
  </div>
</template>

<script setup>
import Comment from "./Comment.vue";
</script>

<style></style>
