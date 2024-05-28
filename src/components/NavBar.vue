<template lang="">
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img
            src="https://app.terapsikologi.com/assets/img/logo_login.svg"
            alt="Logo Terapsikologi"
            width="120"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fa-solid fa-bars text-white"></i>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Beranda</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tes-psikologi" class="nav-link"
                >Tes Psikologi</router-link
              >
            </li>
            <!-- <li class="nav-item">
              <router-link to="/daftar-jurusan" class="nav-link"
                >Daftar Jurusan</router-link
              >
            </li> -->
            <li class="nav-item">
              <router-link to="/report" class="nav-link">Report</router-link>
            </li>
            <hr class="d-sm-block d-md-none" />
            <li class="nav-item">
              <router-link to="/profile" class="nav-link" title="Profil"
                ><i class="fa-solid fa-user"></i
                ><span class="d-sm-block d-md-none"> Profil</span></router-link
              >
            </li>
            <li class="nav-item">
              <button @click="handleLogout" class="nav-link" title="Keluar">
                <i class="fa-solid fa-right-from-bracket text-danger"></i>
                <span class="d-sm-block d-md-none"> Keluar</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  methods: {
    handleLogout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang=""></style>
