<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3">
          <img
            class="rounded-circle mt-5"
            width="150px"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          /><span class="font-weight-bold">Bentims</span
          ><span class="text-black-50">example@example.com</span>
        </div>
      </div>
      <div class="col-md-9 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Modifier vos informations</h4>
          </div>
          <div class="row mt-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01"
                  ><i class="fas fa-images"></i
                ></span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label class="custom-file-label" for="inputGroupFile01"
                  >Choisir votre nouvelle image</label
                >
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                ><i class="far fa-user"></i
              ></span>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input
                type="text"
                class="form-control"
                placeholder="New email address"
                aria-label="email"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Password</span>
              <input
                type="text"
                class="form-control"
                placeholder="New password"
                aria-label="password"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>

          <div class="mt-5 text-center">
            <button class="btn btn-primary profile-button" type="button">
              Enregistrer
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
