<template>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-9 mx-auto">
          <div
            class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden"
          >
            <div class="card-img-left d-none d-md-flex">
              <!-- Background image for card set in CSS! -->
            </div>
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-regular fs-5">
                Connexion
              </h5>
              <Form @submit="logIn" :validation-schema="schema">
                <div class="form-floating mb-3">
                  <Field
                    type="email"
                    class="form-control"
                    id="floatingInputEmail"
                    name="floatingInputEmail"
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
                    class="btn btn-md btn-color btn-signup fw-bold text-uppercase"
                    type="submit"
                  >
                    Connexion
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import router from "../router/index";
import { useAuthStore } from "@/stores/authStore";

const schema = yup.object().shape({
  floatingInputEmail: yup
    .string()
    .required("L'email est obligatoire")
    .email("L'email n'est pas valide"),
  floatingPassword: yup.string().required("Le mot de passe est obligatoire"),
});

const user = {
  email: "",
  password: "",
};

defineProps({
  msg: {
    type: String,
  },
  user: {
    type: Object,
  },
});

const logIn = () => {
  axios
    .post(import.meta.env.VITE_APP_API_URL + "/user/login", user, {
      withCredentials: true,
    })
    .then((res) => {
      if (!res.ok) {
        router.push("/login");
      } //interceps the token and place in header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      //store the data to be reused
      const auth = useAuthStore();
      auth.logIn(res.data.token, res.data.user);
      //redirect to homepage
      router.push("/");
    })
    .catch((error) => console.log(error));
};
</script>
