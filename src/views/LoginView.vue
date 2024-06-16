<template>
  <div class="container-fluid vh-100 d-flex">
    <!-- Kolom Kiri: Logo -->
    <div class="col-md-6 d-flex justify-content-center align-items-center bg-light">
      <img src="https://app.terapsikologi.com/assets/img/logo_login.svg" alt="Logo" class="logo" />
    </div>
    <!-- Kolom Kanan: Form Login atau Register -->
    <div class="col-md-6 d-flex justify-content-center align-items-center">
      <div style="width: 100%; max-width: 400px;">
        <div v-if="!showRegister">
          <div class="text-center mb-4">
            <h2>Login</h2>
          </div>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="loginEmail" class="form-label">Email</label>
              <input type="email" class="form-control" id="loginEmail" v-model="login.email" required />
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="loginPassword" v-model="login.password" required />
            </div>
            <button type="submit" class="btn btn-primary w-100 mb-3 purple-button" :disabled="isLoading">
              <span v-if="isLoading">Loading...</span>
              <span v-else>Masuk</span>
            </button>
          </form>
          <div class="text-center mt-3">
            <span>Belum punya akun? <button type="button" class="btn custom-link no-underline p-0" @click="toggleRegister(true)">Buat akun</button></span>
          </div>
        </div>

        <div v-else>
          <div class="text-center mb-4">
            <h2>Daftar</h2>
          </div>
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="registerEmail" class="form-label">Email</label>
              <input type="email" class="form-control" id="registerEmail" v-model="register.email" required />
            </div>
            <div class="mb-3">
              <label for="registerPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="registerPassword" v-model="register.password" required />
            </div>
            <div class="mb-3">
              <label for="finalScore" class="form-label">Nilai Akhir</label>
              <input type="number" class="form-control" id="finalScore" v-model="register.finalScore" required />
            </div>
            <div class="mb-3">
              <label for="school" class="form-label">Pilihan Sekolah</label>
              <select class="form-select" id="school" v-model="register.school" @change="checkSchool" required>
                <option v-for="school in schools" :key="school.id" :value="school.id">
                  {{ school.school_name.toUpperCase() }}
                </option>
                <option value="other">Lainnya...</option>
              </select>
            </div>
            <div v-if="register.school === 'other'" class="mb-3">
              <label for="otherSchool" class="form-label">Nama Sekolah</label>
              <input type="text" class="form-control" id="otherSchool" v-model="register.manualSchoolName" required />
            </div>
            <button type="submit" class="btn btn-primary w-100 mb-3 purple-button" :disabled="isLoading">
              <span v-if="isLoading">Loading...</span>
              <span v-else>Daftar</span>
            </button>
            <div class="text-center mt-3">
              <span>Sudah punya akun? <button type="button" class="btn custom-link no-underline p-0" @click="toggleRegister(false)">Kembali ke login</button></span>
            </div>
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

      // Validasi nilai akhir
      if (this.register.finalScore < 0 || this.register.finalScore > 100) {
        Swal.fire(
          "Registrasi Gagal!",
          "Nilai Akhir harus berada dalam rentang 0 sampai 100.",
          "warning"
        );
        this.isLoading = false;
        return;
      }

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
.bg-light {
  background-color: #f8f9fa;
}
.custom-link {
  color: #8850f0;
  text-decoration: none;
}
.custom-link:hover {
  text-decoration: underline;
}
.purple-button {
  background-color: #8850f0 !important;
  border-color: #8850f0 !important;
  color: white !important;
}
.purple-button:hover {
  background-color: #6237b3 !important;
  border-color: #6237b3 !important;
}
.no-underline {
  color: #8850f0 !important;
  text-decoration: none;
}
.no-underline:hover {
  text-decoration: underline;
}
</style>
