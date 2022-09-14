<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center pt-5">
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
          <span class="font-weight-bold">{{ this.user.username }}</span
          ><span class="text-black-50">{{ this.user.email }}</span>
        </div>
      </div>
      <Form
        class="col-md-9 border-right"
        @submit="onSubmit"
        :validation-schema="schema"
      >
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Modifier vos informations</h4>
          </div>

          <div class="row mt-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01"
                  ><i class="fas fa-images fa-lg p-1"></i
                ></span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input form-control"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon02"
                  @change="imageChange"
                />
                <label class="custom-file-label" for="inputGroupFile01"></label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                ><i class="far fa-user"></i
              ></span>
              <Field
                type="text"
                class="form-control"
                :placeholder="this.user.username"
                aria-label="username"
                aria-describedby="basic-addon1"
                name="inputUsername"
                v-model="updateUser.username"
              />
              <ErrorMessage name="inputUsername" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input
                type="text"
                class="form-control"
                :placeholder="this.user.email"
                aria-label="email"
                aria-describedby="basic-addon1"
                name="inputEmail"
                v-model="updateUser.email"
              />
              <ErrorMessage name="inputEmail" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Password</span>
              <Field
                type="text"
                class="form-control"
                placeholder="New password"
                aria-label="password"
                aria-describedby="basic-addon1"
                name="inputPassword"
                v-model="updateUser.password"
              />
              <ErrorMessage name="inputPassword" />
            </div>
          </div>

          <div class="mt-4 text-center">
            <button class="btn btn-primary profile-button" type="submit">
              Enregistrer
            </button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import authApi from "../services/api";
import router from "../router";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape(
      {
        inputUsername: yup
          .string()
          .nullable()
          .notRequired()
          .when("inputUsername", {
            is: (value) => value?.length,
            then: (rule) => {
              rule
                .min(3, "Le nom doit avoir au moins 3 caractères")
                .matches(
                  /^[a-zA-ZÀ-ÿ']{2,}/,
                  "Espace entre les mots n'est pas accepté"
                );
            },
          }),
        inputEmail: yup
          .string()
          .nullable()
          .notRequired()
          .email("L'email n'est pas valide"),

        inputPassword: yup
          .string()
          .nullable()
          .notRequired()
          .when("inputPassword", {
            is: (value) => value?.length,
            then: (rule) => {
              rule
                .min(8, "Le mot de pass contient au moins 8 caractères")
                .max(100, "Le mot de pass ne doit pas dépasser 100 caractères")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,100}$/,
                  "Contient au moin 1 lettre en majuscule, 1 lettre en minuscule, 1 caractère speciale, 1 nombre"
                );
            },
          }),
      },
      [
        ["inputUsername", "inputUsername"],
        ["inputPassword", "inputPassword"],
      ]
    );
    return {
      schema,
      user: [],
      updateUser: {
        username: "",
        email: "",
        password: "",
        imageUrl: "",
      },
    };
  },

  mounted() {
    const auth = useAuthStore();
    this.user = auth.user;
    console.log("auth===" + this.user);
  },
  methods: {
    imageChange() {
      this.updateUser.imageUrl =
        document.querySelector("#inputGroupFile01").files[0];
    },
    onSubmit() {
      let fd = new FormData();
      fd.append(
        "imageUrl",
        this.updateUser.imageUrl,
        this.updateUser.imageUrl.name
      );
      authApi
        .put("/auth", this.updateUser)
        .then((res) => {
          const authStore = useAuthStore();
          authStore.updateUser(res.data);
          alert("Vos modifications sont bien enregistrées ");
          router.push("/user");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
