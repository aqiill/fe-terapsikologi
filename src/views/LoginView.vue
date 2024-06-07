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
            <button
              type="submit"
              class="btn btn-primary mb-3"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-if="!isLoading">Masuk</span>
            </button>
          </form>
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-link"
              @click="toggleRegister(true)"
            >
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
                <option
                  v-for="school in schools"
                  :key="school.id"
                  :value="school.id"
                >
                  {{ school.school_name.toUpperCase() }}
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
                v-model="register.manualSchoolName"
              />
            </div>
            <button
              type="submit"
              class="btn btn-secondary"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-if="!isLoading">Daftar</span>
            </button>
            <button
              type="button"
              class="btn btn-link"
              @click="toggleRegister(false)"
            >
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
        manualSchoolName: "",
      },
      showRegister: false,
      schools: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchSchools() {
      try {
        const response = await axios.get("/api/schools", {
          headers: {
            "api-key": "qwe123qwe#",
          },
        });
        this.schools = response.data;
      } catch (error) {
        console.error("Failed to fetch schools:", error);
        Swal.fire("Error", "Failed to load school data.", "error");
      }
    },
    async handleLogin() {
      if (!this.login.email || !this.login.password) {
        Swal.fire(
          "Login Gagal!",
          "Harap isi semua bidang yang diperlukan.",
          "warning"
        );
        return;
      }
      const loginData = {
        email: this.login.email,
        password: this.login.password,
      };

      this.isLoading = true;
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
      } finally {
        this.isLoading = false;
      }
    },
    async handleRegister() {
      this.isLoading = true;
      const registrationData = {
        email: this.register.email,
        password: this.register.password,
        final_score: this.register.finalScore,
        school: this.register.school === "other" ? null : this.register.school,
        manual_school_name:
          this.register.school === "other"
            ? this.register.manualSchoolName
            : "",
      };

      try {
        const response = await axios.post(
          "https://api.abcompany.my.id/api/register",
          registrationData,
          {
            headers: {
              "api-key": "qwe123qwe#",
            },
          }
        );

        if (response.data.message === "Registration successful") {
          Swal.fire("Registrasi Berhasil!", "", "success");
          this.toggleRegister(false);
        } else {
          Swal.fire("Registrasi Gagal!", response.data.error, "error");
        }
      } catch (error) {
        Swal.fire(
          "Registration Failed",
          error.response.data.message || "An error occurred.",
          "error"
        );
      } finally {
        this.isLoading = false;
      }
    },
    checkSchool() {
      if (this.register.school !== "other") {
        this.register.manualSchoolName = "";
      }
    },
    toggleRegister(show) {
      this.showRegister = show;
      if (show) {
        this.fetchSchools();
      } else {
        this.resetFormData();
      }
    },
    resetFormData() {
      this.login.email = "";
      this.login.password = "";
      this.register.email = "";
      this.register.password = "";
      this.register.finalScore = null;
      this.register.school = "";
      this.register.manualSchoolName = "";
      this.isLoading = false;
    },
  },
  created() {
    this.fetchSchools();
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
