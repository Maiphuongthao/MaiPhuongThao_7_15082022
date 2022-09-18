<template>
  <form @submit="onSubmit" class="card gedf-card" enctype="multipart/form-data">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active fw-bold"
            id="posts-tab"
            data-toggle="tab"
            href="#posts"
            role="tab"
            aria-controls="posts"
            aria-selected="true"
            >Créer un post</a
          >
        </li>
      </ul>
    </div>
    <div class="card-body">
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="posts"
          role="tabpanel"
          aria-labelledby="posts-tab"
        >
          <div class="form-group">
            <textarea
              class="form-control"
              id="message"
              rows="3"
              placeholder="Quoi de neuf?"
              v-model="content"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="btn-toolbar justify-content-between">
        <div class="col-12 btn-group mt-2">
          <input
            @change="onUpload"
            name="imageUrl"
            type="file"
            class="form-control"
            id="formFile"
            ref="fileInput"
            hidden
          />
          <button
            @click="$refs.fileInput.click()"
            type="file"
            class="btn btn-color mx-3"
          >
            <div for="formFile">
              <i class="fas fa-images"></i>
            </div>
          </button>
          <button type="submit" class="btn btn-color">
            <i class="far fa-paper-plane"></i>
          </button>
        </div>
        <div class="btn-group"></div>
      </div>
    </div>
  </form>
</template>

<script>
import router from "../router/index";
import authApi from "../services/api";

export default {
  data() {
    return {
      content: "",
      imageUrl: "",
    };
  },
  methods: {
    onUpload(event) {
      this.imageUrl = event.target.files[0];
    },

    onSubmit() {
      const fd = new FormData();

      if (!this.content && !this.imageUrl) {
        alert("Veuillez ajouter votre text ou image");
      }

      if (this.imageUrl) {
        if (this.imageUrl.size >= 500000) {
          alert("Le fichier ne doit pas dépasser 50ko");
        } else {
          fd.append("image", this.imageUrl, this.imageUrl.name);
        }
      }
      if (this.content) {
        if (this.content > 1000 || this.content < 0) {
          alert("Vous pouvez écrire 1000 lettres");
        }
        fd.append("content", this.content);
      }

      authApi
        .post("/post", fd)
        .then((res) => {
          return res;
        })
        .catch((error) => console.log(error));
      console.log("post===" + newPost);

      this.content = "";
      this.imageUrl = "";
    },
  },
};
</script>
