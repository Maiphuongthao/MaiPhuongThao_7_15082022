import { useAuthStore } from "@/stores/authStore";
import authApi from "../services/api";

const interceptors = () => {
  // add automatically accesstoken from the store
  authApi.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore();
      if (authStore.accessToken) {
        config.headers.Authorization = "Bearer " + authStore.accessToken;
      }
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  let refresh = false;

  authApi.interceptors.response.use(
    (resp) => resp,
    async (error) => {
      if (error.response.status === 401 && !refresh) {
        refresh = true;

        const { status, data } = await authApi.post(
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

          return authApi(error.config);
        }
      }
      refresh = false;
      return error;
    }
  );
};

export default interceptors;
