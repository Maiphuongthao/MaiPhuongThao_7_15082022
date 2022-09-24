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
    <form class="card-body">
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="posts"
          role="tabpanel"
          aria-labelledby="posts-tab"
        >
          <div name="inputContent" class="form-group">
            <textarea
              class="form-control"
              id="content"
              rows="3"
              placeholder="Quoi de neuf?"
              v-model="this.newPost.content"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="btn-toolbar justify-content-between">
        <div class="col-12 btn-group mt-2">
          <div class="avatar-zone btn btn-color overlay-layer">
            <input
              @change="onUpload"
              name="inputImg"
              type="file"
              class="form-control upload_btn"
              id="formFile"
              ref="fileInput"
            />
            <button type="file" class="btn btn-color">
              <div for="formFile">
                <i class="fas fa-images"></i>
              </div>
            </button>
          </div>
          <button
            type="submit"
            @click.prevent="onSubmit()"
            class="btn btn-color"
          >
            <i class="far fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import router from "../router/index";
import authApi from "../services/api";

export default {
  data() {
    return {
      newPost: {
        content: "",
        imageUrl: "",
      },
    };
  },
  methods: {
    onUpload() {
      this.newPost.imageUrl = this.$refs.fileInput.files[0];
      console.log("img==" + this.newPost.imageUrl);
    },

    onSubmit() {
      const fd = new FormData();
      if (this.newPost.imageUrl == "" && this.newPost.content == "") {
        alert("Veuillez ajouter votre text ou image");
      } else {
        if (this.newPost.imageUrl) {
          if (this.newPost.imageUrl.size >= 500000) {
            alert("Le fichier ne doit pas dépasser 50ko");
          } else {
            fd.append("image", this.newPost.imageUrl);
          }
        }
        if (this.newPost.content) {
          if (this.newPost.content > 1000 || this.newPost.content < 0) {
            alert("Vous pouvez écrire 1000 lettres");
          } else {
            fd.append("content", this.newPost.content);
          }
        }

        authApi
          .post("/post", fd)
          .then((res) => {
            this.newPost.content = res.data.content;
            this.newPost.imageUrl = res.data.imageUrl;
            alert("Vous avez crée un post");
            location.reload()
          })
          .catch((error) => console.log(error));
      }
      
    },
  },
};
</script>
<style></style>
