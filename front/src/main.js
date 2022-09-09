import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./interceptors/index";

const app = createApp(App);

app.use(router);

app.use(createPinia()).use(router).mount("#app");
