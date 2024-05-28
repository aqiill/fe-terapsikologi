<template>
  <div class="container-fluid vh-100">
    <div class="row h-100 justify-content-center align-items-center">
      <!-- Bagian Kiri: Logo -->
      <div class="col-md-6 d-flex justify-content-center" v-if="!showRegister">
        <img
          src="https://app.terapsikologi.com/assets/img/logo_login.svg"
          alt="Logo"
          class="logo"
        />
      </div>

      <!-- Bagian Kanan: Form Login dan Pendaftaran -->
      <div class="col-md-6">
        <div v-if="!showRegister">
          <h2>Login</h2>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="loginEmail" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="loginEmail"
                v-model="login.email"
              />
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="loginPassword"
                v-model="login.password"
              />
            </div>
            <button type="submit" class="btn btn-primary mb-3">Masuk</button>
          </form>
          <div class="text-center">
            <button class="btn btn-link" @click="toggleRegister(true)">
              Belum Punya Akun? Buat Akun
            </button>
          </div>
        </div>

        <!-- Form Pendaftaran -->
        <div v-if="showRegister">
          <h2>Daftar</h2>
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="registerEmail" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="registerEmail"
                v-model="register.email"
              />
            </div>
            <div class="mb-3">
              <label for="registerPassword" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="registerPassword"
                v-model="register.password"
              />
            </div>
            <div class="mb-3">
              <label for="finalScore" class="form-label">Nilai Akhir</label>
              <input
                type="number"
                class="form-control"
                id="finalScore"
                v-model="register.finalScore"
              />
            </div>
            <div class="mb-3">
              <label for="school" class="form-label">Pilihan Sekolah</label>
              <select
                class="form-select"
                id="school"
                v-model="register.school"
                @change="checkSchool"
              >
                <option v-for="school in schools" :key="school" :value="school">
                  {{ school }}
                </option>
                <option value="other">Lainnya...</option>
              </select>
            </div>
            <div v-if="register.school === 'other'">
              <label for="otherSchool" class="form-label">Nama Sekolah</label>
              <input
                type="text"
                class="form-control mb-3"
                id="otherSchool"
                v-model="register.otherSchool"
              />
            </div>
            <button type="submit" class="btn btn-secondary">Daftar</button>
            <button class="btn btn-link" @click="toggleRegister(false)">
              Kembali ke Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "LoginPage",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      register: {
        email: "",
        password: "",
        finalScore: null,
        school: "",
        otherSchool: "",
      },
      showRegister: false,
      schools: ["SMA Negeri 1", "SMA Negeri 2", "SMA Negeri 3", "SMP Negeri 4"],
    };
  },
  methods: {
    async handleLogin() {
      const loginData = {
        email: this.login.email,
        password: this.login.password,
      };

      try {
        const response = await axios.post("/api/login", loginData);
        if (response.data.message === "Login successful") {
          Swal.fire("Login Berhasil!", "", "success");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          router.push("/");
        } else {
          Swal.fire("Login Gagal!", response.data.error, "error");
        }
      } catch (error) {
        Swal.fire("Login Gagal!", "Email atau Password salah!", "error");
      }
    },
    handleRegister() {
      console.log("Registration Data:", this.register);
    },
    checkSchool() {
      if (this.register.school !== "other") {
        this.register.otherSchool = "";
      }
    },
    toggleRegister(show) {
      this.showRegister = show;
    },
  },
};
</script>

<style>
.vh-100 {
  height: 100vh;
}
.logo {
  max-width: 300px;
}

.btn-link {
  text-decoration: none;
}
</style>
