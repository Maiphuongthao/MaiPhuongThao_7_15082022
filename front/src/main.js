import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import moment from "moment";

import App from "./App.vue";
import router from "./router";
import interceptors from "./interceptors/index";

interceptors();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.config.globalProperties.$moment = moment;
app.use(pinia).use(router).mount("#app");
