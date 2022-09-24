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
};

export default interceptors;
