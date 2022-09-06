<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="user text-center p-3">
        <div class="profile">
          <img src="../assets/default.png" alt="photo user" class="rounded-circle" width="80" />
        </div>
      </div>

      <div class="mt-5 text-center">
        <h4 class="mb-0">Benjamin Tims</h4>
        <form>
          <div class="form-group row pt-3 px-3">
            <label for="staticUser" class="col-sm-2 col-form-label p-1"
              ><i class="far fa-user btn-color"></i
            ></label>
            <div class="col-sm-10">
              <input
                type="text"
                readonly
                class="form-control-plaintext p-1"
                id="staticUser"
                value="BenTims"
              />
            </div>
          </div>
          <div class="form-group row px-3">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              ><i class="far fa-envelope btn-color"></i
            ></label>
            <div class="col-sm-10">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="staticEmail"
                value="email@example.com"
              />
            </div>
          </div>
        </form>

        <div
          class="d-flex justify-content-between align-items-center mt-4 px-4"
        >
          <button
            class="btn btn- md m-3 btn-primary py-1 px-2 rounded-pill shadow"
            data-bs-toggle="modal"
            data-bs-target="#exportAlert"
          >
            Exporter
          </button>

          <button
            class="btn btn-md m-3 btn-danger py-1 px-2 rounded-pill shadow"
            data-bs-toggle="modal"
            data-bs-target="#deleteAlert"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <!--modal-->
    <div
      class="modal fade"
      id="deleteAlert"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="deleteAlertLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary" id="deleteAlertLabel">
              <i class="fa-solid fa-triangle-exclamation fa-lg"></i>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Votre profil sera supprimé définitivement. Etes-vous sûr(e) de
            vouloir continuer ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-dark"
              data-bs-dismiss="modal"
            >
              Abandonner
            </button>
            <button type="button" class="btn btn-outline-danger">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="exportAlert"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="exportAlertLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary" id="exportAlertLabel">
              <i class="fa-solid fa-triangle-exclamation fa-lg"></i>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Voulez-vous confirmer d'exporter vos données?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-dark"
              data-bs-dismiss="modal"
            >
              Abandonner
            </button>
            <button type="button" class="btn btn-outline-danger">
              Confirmer
            </button>
          </div>
        </div>
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

<style scoped>
  .btn-color {
background-color: #ffd7d7;}
</style>
