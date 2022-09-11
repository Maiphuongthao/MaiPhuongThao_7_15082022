<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div
          class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden"
        >
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-bold fs-5">
              Inscription
            </h5>
            <Form @submit="signUp" :validation-schema="formSchema">
              <div class="form-floating mb-3">
                <Field
                  type="text"
                  class="form-control"
                  name="floatingInputUsername"
                  id="floatingInputUsername"
                  placeholder="myusername"
                  v-model="user.username"
                  required
                  autofocus
                />
                <ErrorMessage name="floatingInputUsername" />
                <label for="floatingInputUsername">Username</label>
              </div>

              <div class="form-floating mb-3">
                <Field
                  type="email"
                  class="form-control"
                  name="floatingInputEmail"
                  id="floatingInputEmail"
                  placeholder="name@example.com"
                  v-model="user.email"
                />
                <ErrorMessage name="floatingInputEmail" />
                <label for="floatingInputEmail">Email address</label>
              </div>

              <hr />

              <div class="form-floating mb-3">
                <Field
                  type="password"
                  class="form-control"
                  name="floatingPassword"
                  id="floatingPassword"
                  placeholder="Password"
                  v-model="user.password"
                />
                <ErrorMessage name="floatingPassword" />
                <label for="floatingPassword">Password</label>
              </div>

              <div class="d-grid mb-2">
                <button
                  class="btn btn-color btn-md btn-login fw-bold text-uppercase"
                  type="submit"
                >
                  Inscription
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import router from "../router/index";

//define validation rules on the schema--for each feild
const formSchema = yup.object().shape({
  floatingInputUsername: yup
    .string()
    .required("Ce champs est obligatoire")
    .min(3, "Le nom doit avoir au moins 3 caractères")
    .matches(/^[a-zA-ZÀ-ÿ']{2,}/, "Espace entre les mots n'est pas accepté"),

  floatingInputEmail: yup
    .string()
    .required("Ce champs est obligatoire")
    .email("Ce email n'est pas valide")
    .matches(
      /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "L'email n'est pas valide, exp: abc@gmail.com"
    ),

  floatingPassword: yup
    .string()
    .required("Ce champs est obligatoire")
    .min(8, "Le mot de pass contient au moins 8 caractères")
    .max(100, "Le mot de pass ne doit pas dépasser 100 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,100}$/,
      "Contient au moin 1 lettre en majuscule, 1 lettre en minuscule, 1 caractère speciale, 1 nombre"
    ),
});

const user = {
  username: " ",
  email: " ",
  password: " ",
};

defineProps({
  msg: {
    type: String,
  },
  user: {
    type: Object,
  },
});
console.log("user ==" + user);

const signUp = () => {
  axios
    .post("http://localhost:3000/api/auth/signup", user)
    .then(() => {
      alert(
        "Votre inscription a réussi, veuilez aller vers la page de connexion"
      );
      router.push("/login");
    })
    .catch((error) => console.log(error));
};
</script>
