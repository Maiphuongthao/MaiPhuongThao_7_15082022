<template>
  <div class="post">
    <div class="card gedf-card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div
            class="d-flex justify-content-between align-items-center"
            id="post.userId"
          >
            <div class="mr-2">
              <router-link to="/otherUser">
                <img
                  class="rounded-circle"
                  width="45"
                  :src="this.post.imageUrl"
                  alt=""
              /></router-link>
            </div>
            <div class="ml-2">
              <router-link to="/otherUser">
                <div class="h6 m-0" @click="getUser">
                  {{ this.post.userId }}
                </div></router-link
              >
              <div class="h7 text-muted">Miracles Lee Cross</div>
            </div>
          </div>

          <div class="d-flex flex-row gap-3 align-items-center">
            <div
              data-bs-toggle="modal"
              data-bs-target="#onUpdatePost"
              class="d-flex align-items-center icon"
            >
              <i class="fas fa-pen"></i>Modifier
            </div>

            <div @click="deletePost" class="d-flex align-items-center icon">
              <i class="fas fa-trash-alt"></i>Supprimer
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-muted h7 mb-2">
          <i class="fa fa-clock-o px-1 fa-lg"></i
          >{{ $moment(this.post.createdAt).format("MMMM Do YYYY, h:mm:ss a") }}
        </div>
        <a class="card-link" href="this.photo.imageUrl">
          <h6 class="card-title"></h6>
        </a>

        <div>
          <img
            :src="this.post.imageUrl"
            :alt="'photo post de ' + this.post.userId"
          />
          <p class="card-text">
            {{ this.post.content }}
          </p>
        </div>
      </div>
      <div class="card-footer pt-3">
        <ul class="nav d-flex justify-content-start mb-2">
          <li class="nav-item mx-3">
            <span class="like-text"></span>
            <div class="icon" @click="like(post.id)">
              <i class="fa fa-gittip fa-lg"></i>J'aime
            </div>
            <span class="icon icon-2">{{ this.post.userLiked }}</span>
          </li>
          <li class="nav-item">
            <div class="icon">
              <i class="fa fa-comment fa-lg"></i> Commenter
            </div>
          </li>
        </ul>
      </div>
      <!--modal-->
      <div
        class="modal fade"
        id="onUpdatePost"
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
              <form
                id="newPostInput"
                class="card gedf-card"
                enctype="multipart/form-data"
              >
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
                          :placeholder="this.post.content"
                          v-model="this.updatedPost.content"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="btn-toolbar justify-content-between">
                    <div class="col-2 btn-group mt-2">
                      <input
                        @change="onUploadPost"
                        name="imageUrl"
                        type="file"
                        class="form-control"
                        id="formFile"
                        ref="fileInput"
                        hidden
                      />
                      <div
                        @click="$refs.fileInput.click()"
                        type="file"
                        class="btn btn-color mx-3"
                      >
                        <div for="formFile">
                          <i class="fas fa-images"></i>
                        </div>
                      </div>
    
                    </div>
                  </div>
                </div>
              </form>
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
                @click.prevent="onSubmitPost"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import authApi from "../services/api";

export default {
  props: {
    post: Object,
  },
  data() {
    return {
      likes: "",
      likeCount: "",
      updatedPost: {
        content: "",
        imageUrl: "",
      },
    };
  },
  methods: {
    like(id) {
      id = this.post._id;
      authApi.put(`/post/${id}`,{
        body: this.likes
      }).then().catch()
    },

    deletePost(id) {
      this.$emit("delete-post", id);
    },
    onUploadPost(e) {
      this.updatedPost.imageUrl = e.target.files[0];
    },
    onSubmitPost(id) {
      id = this.post._id;
      const fd = new FormData();
      if (this.updatedPost.imageUrl) {
        if (this.updatedPost.imageUrl.size >= 2621439) {
          alert("Le fichier ne doit pas dépasser 2.5Mo");
        } else {
          fd.append("image", this.updatedPost.imageUrl);
        }
      }
      if (!this.updatedPost.content == "") {
        fd.append("content", this.updatedPost.content);
      }

      authApi
        .put(`/post/${id}`, fd)
        .then((res) => {
          console.log("res====" + res.data);
          this.updatedPost.content = res.data.content;
          this.updatedPost.imageUrl = res.data.imageUrl;
          router.push("/");
          alert("Vos modifications sont bien enregistrées ");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
