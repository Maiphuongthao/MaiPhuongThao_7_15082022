<template>
  <div class="post">
    <div class="card gedf-card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div
            class="d-flex justify-content-between align-items-center"
            id="post.userId"
          >
            <div class="mr-2">
              <router-link to="/otherUser">
                <img
                  class="rounded-circle"
                  width="45"
                  :src="this.post.imageUrl"
                  alt=""
              /></router-link>
            </div>
            <div class="ml-2">
              <router-link to="/otherUser">
                <div class="h6 m-0" @click="getUser">
                  {{ this.post.userId }}
                </div></router-link
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
          <i class="fa fa-clock-o px-1 fa-lg"></i
          >{{ $moment(this.post.createdAt).format("MMMM Do YYYY, h:mm:ss a") }}
        </div>
        <a class="card-link" href="this.photo.imageUrl">
          <h6 class="card-title"></h6>
        </a>
        <img
          :src="this.post.imageUrl"
          :alt="'photo post de ' + this.post.userId"
        />
        <p class="card-text">
          {{ this.post.content }}
        </p>
      </div>
      <div class="card-footer pt-3">
        <ul class="nav d-flex justify-content-start mb-2">
          <li class="nav-item mx-3">
            <a class="icon" href="#"
              ><i class="fa fa-gittip fa-lg"></i>J'aime</a
            >
          </li>
          <li class="nav-item">
            <a class="icon" href="#"
              ><i class="fa fa-comment fa-lg"></i> Commenter</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
};
</script>
