<template>
  <div class="card">
    <div class="row">
      <div class="col-2">
        <img src="" width="70" class="rounded-circle mt-2" />
      </div>

      <div class="col-10">
        <div class="comment-box ml-2">
          <h4>Ajouter un commentaire</h4>

          <div class="comment-area">
            <textarea
              class="form-control"
              placeholder="Que penses tu?"
              rows="4"
            ></textarea>
          </div>

          <div class="comment-btns mt-2">
            <div class="row">
              <div class="col-6">
                <div class="pull-right">
                  <button class="btn btn-success send btn-sm">
                    <i class="far fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card p-3 mb-2">
    <div class="d-flex flex-row">
      <img
        src="https://i.imgur.com/dwiGgJr.jpg"
        height="40"
        width="40"
        class="rounded-circle"
        alt="photo user"
      />
      <div class="d-flex flex-column ms-2">
        <router-link to="/profile"><h6 class="mb-1 text-primary">Emma</h6></router-link>
        <p class="comment-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus
          nibh, efficitur in bibendum id, pellentesque quis nibh. Ut dictum
          facilisis dui, non faucibus dolor sit amet lorem auctor vitae. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Quisque risus mauris
        </p>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <div class="d-flex flex-row gap-3 align-items-center">
        <div class="d-flex align-items-center">
          <i class="fas fa-pen"></i>
          <span class="ms-1 fs-10">Modifier</span>
        </div>

        <div class="d-flex align-items-center">
          <i class="fas fa-trash-alt"></i>
          <span class="ms-1 fs-10">Supprimer</span>
        </div>
      </div>

      <div class="d-flex flex-row">
        <span class="text-muted fw-normal fs-10">May 22,2020 12:10 PM</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
  },
});
</script>
