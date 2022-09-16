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

  authApi.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const originalConfig = error.config;
      if (originalConfig.url !== "/auth/login" && error.response) {
        if (error.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const authStore = useAuthStore();

            //refresh the token and retry once
            const refresh = await authApi.post("/auth/refresh", {
              refreshToken: authStore.refreshToken,
            });
            const { accessToken } = refresh.data;

            authStore.returnRefreshToken(accessToken);
            console.log("auth==" + authStore.refreshToken);
            originalConfig.headers.Authorization = "Bearer " + accessToken;

            return authApi(originalConfig);
          } catch (_error) {
            console.error("Refresh token failed");
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default interceptors;
