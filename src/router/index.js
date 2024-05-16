import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import DaftarJurusanView from "../views/DaftarJurusanView.vue";
import DaftarJurusanDetailView from "../views/DaftarJurusanDetailView.vue";
import SubTesPsikologiView from "../views/SubTesPsikologiView.vue";

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
    path: "/daftar-jurusan",
    name: "daftar-jurusan",
    component: DaftarJurusanView,
    meta: {
      title: "Daftar Jurusan",
    },
  },
  {
    path: "/daftar-jurusan/:id",
    name: "daftar-jurusan-detail",
    component: DaftarJurusanDetailView,
    meta: {
      title: "Detail Jurusan",
    },
  },
  {
    path: "/tes-psikologi",
    name: "tes-psikologi",
    component: SubTesPsikologiView,
    meta: {
      title: "8 Sub Tes Psikologi",
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
