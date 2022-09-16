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
            <label class="sr-only" for="message">post</label>
            <textarea
              class="form-control"
              id="message"
              rows="3"
              placeholder="Quoi de neuf?"
              v-model="this.post.content"
            ></textarea>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="images"
          role="tabpanel"
          aria-labelledby="images-tab"
        >
          <div class="form-group">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" />
              <label class="custom-file-label icon-color" for="customFile"
                >Ajouter</label
              >
            </div>
          </div>
          <div class="py-4"></div>
        </div>
      </div>
      <div class="btn-toolbar justify-content-between">
        <div class="col-12 btn-group mt-2">
          <button type="file" class="btn btn-color mx-3">
            <label for="formFile"><i class="fas fa-images"></i></label>
            <input
              @change="onSubmit"
              name="imageUrl"
              type="file"
              class="form-control"
              id="formFile"
              hidden
            />
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
import authApi from "../services/api";
import { usePostStore } from "../stores/postStore";
export default {
  data() {
    return {
      post: {
        content: "",
        imageUrl: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      this.post.imageUrl = event.target.files[0];
    },

    onUpload() {
      const fd = new FormData();
      fd.append("image", this.post.imageUrl);
      fd.append("content", this.post.content);
      console.log("hello==" + fd.get("content"));

      authApi
        .post("/post", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const auth = usePostStore;
          auth.createPost(res.data);
          console.log("data=====" + res.data);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
