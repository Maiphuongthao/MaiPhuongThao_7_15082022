<template>
  <div class="container d-flex justify-content-center align-items-center mt-5">
    <div class="card">
      <div class="user text-center p-3">
        <div class="profile">
          <img
            v-if="imageUrl"
            :src="`http://localhost:3000${imageUrl}`"
            :alt="'photo profile de' + username"
            class="rounded-circle"
            width="80"
          />
          <img
            v-else
            src="../assets/default.png"
            alt="photo user"
            class="rounded-circle"
            width="80"
          />
        </div>
        <div v-if="isAdmin == true" class="ribbon">
          <span>Admin</span>
        </div>
      </div>

      <div class="mt-5 text-center">
        <h4 class="mb-0">{{ username }}</h4>

        <div class="form-group row pt-3 px-3 align-items-center">
          <label for="staticUser" class="col-sm-2 col-form-label "
            ><i class="far fa-user fa-lg ms-5 btn-color"></i
          ></label>
          <div class="col-sm-10">
            {{username}}
          </div>
        </div>
        <div class="form-group row px-3 align-items-center">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            ><i class="far fa-envelope fa-lg ms-5 btn-color"></i
          ></label>
          <div class="col-sm-10">
            {{email}}
          </div>
        </div>

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
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.prevent="deleteUser"
            >
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
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.prevent="exportUser"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authApi from "../services/api";
import router from "../router";
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/authStore";

export default {
  props: ["imageUrl", "email", "username", "isAdmin"],
  /*data() {
    return {
      user:[]
    };
  },
  computed: {
    ...mapStores(useAuthStore),
  }*/ methods: {
    deleteUser() {
      authApi
        .delete("/auth")
        .then(() => {
          const auth = useAuthStore();
          auth.logOut();
          router.push("/public");
        })
        .catch((error) => console.log(error));
    },
    //add fuction to export data
    exportUser() {
      authApi
        .get("/auth/export", { responseType: "blob" })
        .then((res) => {
          const fileBlob = new Blob([res.data], { type: "text/plain" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(fileBlob);
          link.download = "userData.txt";
          document.body.appendChild(link);

          link.click();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.btn-color {
  background-color: #ffd7d7;
}
</style>
