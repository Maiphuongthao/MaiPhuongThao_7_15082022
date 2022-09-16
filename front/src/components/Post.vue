<template>
  <div class="card gedf-card" :id="postId">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <div
          class="d-flex justify-content-between align-items-center"
          :id="userId"
        >
          <div class="mr-2">
            <router-link to="/otherUser">
              <img
                class="rounded-circle"
                width="45"
                src="../assets/default.png"
                alt=""
            /></router-link>
          </div>
          <div class="ml-2">
            <router-link to="/otherUser">
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
        <i class="fa fa-clock-o"></i>{{ createdAt }}
      </div>
      <a class="card-link" href="#">
        <h6 class="card-title"></h6>
      </a>
      <img :src="imageUrl" v-if="imageUrl" alt="photo post de + username" />
      <p class="card-text">
        {{ content }}
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

<script>
import Comment from "./Comment.vue";
export default {
  props: ["postId", "content", "createdAt", "userId", "imageUrl"],
  components: {
    Comment,
  },
  data() {
    return {
      user: [],
    };
  },
};
</script>

<style></style>
