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
        <div class="btn-group mt-2">
          <button type="submit" class="btn btn-color">
            <i class="far fa-paper-plane"></i>
          </button>
          <button type="file" class="btn btn-color mx-3">
            <label for="formFile"><i class="fas fa-images"></i></label>
            <input type="file" class="form-control" id="formFile" hidden />
          </button>
        </div>
        <div class="btn-group"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
