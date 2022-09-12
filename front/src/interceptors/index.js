import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const interceptors = () => {
  //set default config
  const BASE_URL = "http://localhost:3000/api";

  const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });
  // add automatically accesstoken from the store
  authApi.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore();
      console.log(authStore);
      if (authStore.logIn()) {
        config.headers.Authorization =
          "Bearer" + authStore.getToken().accessToken;
      }
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  authApi.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalConfig = error.config;
      if (error.response?.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          //refresh the token and retry once
          const refreshToken = await axios.post(
            "http://localhost:3000/api/auth/refresh",
            { withCredentials: true }
          );
          const authStore = useAuthStore();
          authStore.refreshToken(refreshToken);

          originalConfig.headers.Authorization = "Bearer" + refreshToken;

          return authApi(originalConfig);
        } catch (_error) {
          console.error("Refresh token failed");
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default interceptors;
