import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import DaftarJurusanView from "../views/DaftarJurusanView.vue";
import DaftarJurusanDetailView from "../views/DaftarJurusanDetailView.vue";
import SubTesPsikologiView from "../views/SubTesPsikologiView.vue";
import TesView from "../views/TesView.vue";
import ReportView from "../views/ReportView.vue";
import ProfileView from "../views/ProfileView.vue";
import LoginView from "../views/LoginView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
    },
  },
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
    path: "/tes/:subTest/:id",
    name: "tes",
    component: TesView,
    meta: {
      title: "Tes Psikologi",
    },
  },
  {
    path: "/report",
    name: "report",
    component: ReportView,
    meta: {
      title: "Report Hasil Tes Psikologi",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      title: "Profile",
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

  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
