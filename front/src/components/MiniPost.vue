<template>
  <div class="post p-4">
    <div class="card gedf-card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div
            class="d-flex justify-content-between align-items-center"
            id="profile-bar"
          >
            <div class="m-4">
              <img
                class="rounded-circle"
                width="50"
                :src="user.imageUrl"
                :alt="'photo de ' + user.username"
              />
            </div>
            <div class="ml-2">
              <div
                value="this.post.userId"
                class="h6 m-0 profile-name"
                @click="getUser"
              >
                {{ user.username }}
              </div>
            </div>
          </div>

          <div
            v-if="
              this.post.userId === userInStore._id ||
              userInStore.isAdmin === true
            "
            class="d-flex flex-row gap-3 align-items-center"
          >
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

        <div class="mx-4">
          <div id="post-image">
            <img
              v-if="post.imageUrl"
              class="mx-auto my-4 d-flex"
              width="250"
              :src="this.post.imageUrl"
              :alt="'photo post de ' + this.user.username"
            />
          </div>

          <p class="card-text">
            {{ this.post.content }}
          </p>
        </div>
      </div>
      <div class="card-footer pt-3">
        <ul class="nav d-flexjustify-content-start mb-2">
          <li class="nav-item d-fex align-items-center">
            <button
              type="button"
              class="btn btn-color"
              v-if="post.likes"
              @click.prevent="likePost(post._id)"
            >
              <i class="fa fa-gittip fa-lg"></i>J'aime
            </button>
            <button
              type="button"
              class="btn btn-default"
              v-else
              @click.prevent="likePost(post._id)"
            >
              <i class="fa fa-gittip fa-lg"></i>J'aime
            </button>
          </li>

          <!--<li class="nav-item">
            <div class="icon">
              <i class="fa fa-comment fa-lg"></i> Commenter
            </div>
          </li>-->
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
                        class="form-control upload_btn"
                        id="formFile"
                        ref="fileInput"
                      />
                      <div
                        @click="$refs.fileInput.click()"
                        type="file"
                        class="btn btn-color mx-3 overlay-layer"
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
import authApi from "../services/api";
import { useAuthStore } from "../stores/authStore";

export default {
  props: {
    post: Object,
  },
  data() {
    return {
      user: {},
      userInStore: {},
      displayPost: "",
      updatedPost: {
        content: "",
        imageUrl: "",
      },
    };
  },
  created() {
    this.userOfPost();
    this.checkAuthUser();
  },
  methods: {
    checkAuthUser() {
      const auth = useAuthStore();
      this.userInStore = auth.user;
      return this.userInStore;
    },

    userOfPost(id) {
      id = this.post.userId;
      authApi
        .get(`/auth/${id}`)
        .then((res) => {
          this.user = res.data;

        })
        .catch((error) => console.log(error));
    },

    likePost(id) {
      id = this.post._id;
      let like;
      const userLiked = this.post.usersLiked;

      const auth = useAuthStore();
      const userFromStore = auth.user;

      if (userLiked.includes(userFromStore._id)) {
        like = 0;
      } else {
        like = 1;
      }
      authApi
        .post(`/post/${id}`, { likes: like })
        .then((res) => {
          location.reload();
          return res;
        })
        .catch((erreur) => console.log(erreur));
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
        if (this.updatedPost.imageUrl.size >= 5000000) {
          alert("Le fichier ne doit pas dépasser 50ko");
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
          this.updatedPost.content = res.data.content;
          this.updatedPost.imageUrl = res.data.imageUrl;

          location.reload();
          alert("Vos modifications sont bien enregistrées ");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style>
#profile.name {
  color: #4e5166;
  font-size: 1.5em;
  font-weight: 500;
}
a {
  text-decoration: none;
  color: #4e5166;
}
</style>
