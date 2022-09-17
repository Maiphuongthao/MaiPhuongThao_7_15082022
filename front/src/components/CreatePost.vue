<template>
  <div class="card gedf-card">
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
              v-model="this.post.content"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="btn-toolbar justify-content-between">
        <div class="col-12 btn-group mt-2">
          <input
            @change="onSubmit"
            name="imageUrl"
            type="file"
            class="form-control"
            id="formFile"
            ref="fileInput"
            hidden
          />
          <button type="file" class="btn btn-color mx-3">
            <div @click="$refs.fileInput.click()" for="formFile">
              <i class="fas fa-images"></i>
            </div>
          </button>
          <button type="submit" @click="onUpload" class="btn btn-color">
            <i class="far fa-paper-plane"></i>
          </button>
        </div>
        <div class="btn-group"></div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index";
import authApi from "../services/api";

export default {
  data() {
    return {
      post: [],
    };
  },
  methods: {
    onSubmit(event) {
      this.post.imageUrl = event.target.files[0];
    },

    onUpload() {
      const fd = new FormData();

      if (!this.post.content && !this.post.imageUrl) {
        alert("Veuillez ajouter votre text ou image");
      }

      if (this.post.imageUrl) {
        if (this.post.imageUrl.size >= 500000) {
          alert("Le fichier ne doit pas dépasser 50ko");
        } else {
          fd.append("image", this.post.imageUrl);
        }
      }
      if (this.post.content) {
        if (this.post.content > 1000 || this.post.contetn < 0) {
          alert("Vous pouvez écrire 1000 lettres");
        }
        fd.append("post", JSON.stringify({ content: this.post.content }));
      }

      authApi
        .post("/post", fd)
        .then((res) => {
          router.push("/");
          return res.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
