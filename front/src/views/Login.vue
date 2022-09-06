<script setup>
import axios from "axios";

defineProps({
  msg: {
    type: String,
  },
  method:{
  },
});
</script>

<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-9 mx-auto">
          <div
            class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden"
          >
            <div class="card-img-left d-none d-md-flex">
              <!-- Background image for card set in CSS! -->
            </div>
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-regular fs-5">
                Inscription
              </h5>
              <form>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputUsername"
                    placeholder="myusername"
                    v-model="user.username"
                    required
                    autofocus
                  />
                  <label for="floatingInputUsername">Username</label>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInputEmail"
                    placeholder="name@example.com"
                    v-model="user.email"
                  />
                  <label for="floatingInputEmail">Email address</label>
                </div>

                <hr />

                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="user.password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <div class="d-grid mb-2">
                  <button @click.prevent = "logIn"
                    class="btn btn-color btn-md btn-login fw-bold text-uppercase"
                    type="submit"
                  >
                    Inscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

