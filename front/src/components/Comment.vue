<template>
  <div class="comment">
    <div class="card">
      <div class="row">
        <div class="col-2"></div>
        <div class="comment-box">
          <h6 class="fw-bold px-3 pt-2">Ajouter un commentaire</h6>

          <div class="comment-area">
            <textarea
              class="form-control"
              placeholder="Que penses tu?"
              rows="2"
            ></textarea>
          </div>

          <div class="comment-btns">
            <div class="row">
              <div class="col-1 px-4 pb-2">
                <div class="pull-right">
                  <button class="btn btn-color send">
                    <i class="far fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="solid" />

    <div class="card p-3 mb-2">
      <div class="d-flex flex-row">
        <router-link to="/user">
          <img
            src="../assets/default.png"
            height="40"
            width="40"
            class="rounded-circle"
            alt="photo user"
        /></router-link>
        <div class="d-flex flex-column ms-2">
          <router-link to="/user"
            ><h6 class="mb-1 text-primary">Emma</h6></router-link
          >
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

        <div class="d-flex flex-row">
          <span class="text-muted fw-normal fs-10">May 22,2020 12:10 PM</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{}
</script>
