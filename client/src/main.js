import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

app.config.globalProperties.$axios = axiosInstance;

app.use(router).mount("#app");
