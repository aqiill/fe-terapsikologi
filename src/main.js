import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import "bootstrap"; // Import Bootstrap JS
import "./assets/css/main.css"; // Import custom CSS

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(function (config) {
  config.headers["api-key"] = process.env.VUE_APP_API_KEY;
  return config;
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
