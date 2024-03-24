import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Beranda",
    },
  },
  {
    path: "/about",
    name: "about",
    meta: {
      title: "Tentang Kami",
    },
    component: () => import("../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Terapsikologi.com";
  next();
});

export default router;
