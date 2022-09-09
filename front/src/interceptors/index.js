import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

//set default config
const BASE_URL = import.meta.env.VITE_APP_API_URL;

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// add automatically accesstoken from the store
axios.interceptors.request.use(
  (req) => {
    const authStore = useAuthStore();
    const accessToken = req;
    return authStore.login(accessToken);
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

let refresh = false;

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 403 && !refresh) {
      refresh = true;

      const { status, data } = await axios.post(
        "auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );

      if (status === 200) {
        authApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;

        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
