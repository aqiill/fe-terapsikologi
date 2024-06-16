<template>
  <div class="home">
    <NavBar />

    <div class="container mt-5">
      <h2>Profil Pengguna</h2>

      <!-- Collapse untuk Profil Pengguna -->
      <button
        class="btn btn-primary ms-2 mt-3 purple-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#profileForm"
        aria-expanded="true"
        aria-controls="profileForm"
      >
        Edit Profil
      </button>

      <div class="collapse show" id="profileForm">
        <div class="card card-body mt-3">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-12 col-md-6 mb-3">
                <label for="name" class="form-label">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="user.name"
                />
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="finalScore" class="form-label">Nilai Akhir</label>
                <input
                  type="number"
                  class="form-control"
                  id="finalScore"
                  v-model="user.finalScore"
                />
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="user.email"
                />
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="address" class="form-label">Alamat</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="user.address"
                />
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="province" class="form-label"
                  >Pilihan Provinsi</label
                >
                <select
                  class="form-select"
                  id="province"
                  v-model="user.provinceId"
                  @change="updateCities"
                >
                  <option
                    v-for="province in provinces"
                    :key="province.id"
                    :value="province.id"
                  >
                    {{ province.name }}
                  </option>
                </select>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="city" class="form-label">Pilihan Kota</label>
                <select class="form-select" id="city" v-model="user.cityId">
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="birthdate" class="form-label">Tanggal Lahir</label>
                <input
                  type="date"
                  class="form-control"
                  id="birthdate"
                  v-model="user.birthdate"
                />
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="contact" class="form-label">Kontak</label>
                <input
                  type="tel"
                  class="form-control"
                  id="contact"
                  v-model="user.contact"
                />
              </div>
              <div class="col-12 mb-3">
                <label for="gender" class="form-label">Jenis Kelamin</label>
                <select class="form-select" id="gender" v-model="user.gender">
                  <option value="M">Laki-Laki</option>
                  <option value="F">Perempuan</option>
                </select>
              </div>
              <div class="col-12">
                <button
                  type="submit"
                  class="btn btn-primary float-end purple-button"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading">Loading...</span>
                  <span v-if="!isLoading">Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Collapse untuk Ganti Kata Sandi -->
      <button
        class="btn btn-secondary ms-2 mt-3 purple-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#passwordForm"
        aria-expanded="false"
        aria-controls="passwordForm"
      >
        Ganti Kata Sandi
      </button>

      <div class="collapse" id="passwordForm">
        <div class="card card-body mt-3">
          <form @submit.prevent="handlePasswordChange">
            <div class="row">
              <div class="col-12 mb-3">
                <label for="currentPassword" class="form-label"
                  >Kata Sandi Saat Ini</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="currentPassword"
                  v-model="passwords.current"
                  required
                />
              </div>
              <div class="col-12 mb-3">
                <label for="newPassword" class="form-label"
                  >Kata Sandi Baru</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  v-model="passwords.new"
                  required
                />
              </div>
              <div class="col-12 mb-3">
                <label for="confirmPassword" class="form-label"
                  >Konfirmasi Kata Sandi Baru</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="passwords.confirm"
                  required
                />
              </div>
              <div class="col-12">
                <button
                  type="submit"
                  class="btn btn-secondary purple-button"
                  :disabled="isLoading"
                >
                  <span v-if="!isLoading">Ganti Kata Sandi</span>
                  <span v-if="isLoading">Loading</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <FooterCom />
  </div>
</template>

<script>
import Papa from "papaparse";
import axios from "axios"; // Tambahkan axios untuk melakukan HTTP request
import NavBar from "@/components/NavBar.vue";
import FooterCom from "@/components/FooterCom.vue";
import Swal from "sweetalert2";

export default {
  name: "ProfileView",
  components: {
    NavBar,
    FooterCom,
  },
  data() {
    const userData = JSON.parse(localStorage.getItem("user"));
    return {
      user: {
        name: userData.student_name,
        finalScore: userData.final_score,
        email: userData.student_email,
        address: userData.address,
        provinceId: userData.province || null,
        cityId: userData.city || null,
        birthdate: userData.birth_date,
        contact: userData.contact,
        gender: userData.gender,
      },
      provinces: [],
      cities: [],
      passwords: {
        current: "",
        new: "",
        confirm: "",
      },
      isLoading: false,
    };
  },
  methods: {
    loadProvinces() {
      Papa.parse("/provinces.csv", {
        download: true,
        header: true,
        complete: (results) => {
          this.provinces = results.data;
          if (this.user.provinceId) {
            this.updateCities();
          }
        },
      });
    },
    updateCities() {
      if (!this.user.provinceId) {
        this.cities = [];
        return;
      }

      Papa.parse("/cities.csv", {
        download: true,
        header: true,
        complete: (results) => {
          this.cities = results.data.filter(
            (city) => city.province_id === this.user.provinceId
          );
        },
      });
    },
    handleSubmit() {
      this.isLoading = true;
      const studentId = JSON.parse(localStorage.getItem("user")).id; // Mengambil student_id
      axios
        .post(
          `https://api.abcompany.my.id/api/profile/${studentId}`,
          {
            student_name: this.user.name,
            final_score: this.user.finalScore,
            student_email: this.user.email,
            address: this.user.address,
            province: this.user.provinceId,
            city: this.user.cityId,
            birth_date: this.user.birthdate,
            gender: this.user.gender,
            contact: this.user.contact,
          },
          {
            headers: {
              "api-key": "qwe123qwe#",
            },
          }
        )
        .then(() => {
          // update localStorage user
          const userData = JSON.parse(localStorage.getItem("user"));
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userData,
              student_name: this.user.name,
              final_score: this.user.finalScore,
              student_email: this.user.email,
              address: this.user.address,
              province: this.user.provinceId,
              city: this.user.cityId,
              birth_date: this.user.birthdate,
              gender: this.user.gender,
              contact: this.user.contact,
            })
          );

          Swal.fire({
            icon: "success",
            title: "Profil berhasil diperbaharui",
            showConfirmButton: false,
            timer: 3000,
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          Swal.fire({
            icon: "error",
            title: "Gagal memperbaharui profil",
            showConfirmButton: false,
            timer: 3000,
          });
        });
    },
    handlePasswordChange() {
      this.isLoading = true;
      // Validasi password
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!this.passwords.new.match(passwordPattern)) {
        Swal.fire({
          icon: "error",
          title: "Kata sandi baru tidak memenuhi syarat",
          text: "Kata sandi harus terdiri dari minimal 8 karakter, termasuk huruf, angka, dan simbol.",
          showConfirmButton: true,
        });
        this.isLoading = false;
        return;
      }

      if (this.passwords.new !== this.passwords.confirm) {
        Swal.fire({
          icon: "error",
          title: "Konfirmasi kata sandi tidak cocok",
          showConfirmButton: true,
        });
        this.isLoading = false;
        return;
      }

      const email = this.user.email;

      axios
        .post(
          "https://api.abcompany.my.id/api/changePassword",
          {
            email: email,
            password: this.passwords.current,
            new_password: this.passwords.new,
          },
          {
            headers: {
              "api-key": "qwe123qwe#",
            },
          }
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Kata sandi berhasil diubah",
            showConfirmButton: false,
            timer: 3000,
          });
          this.passwords.current = "";
          this.passwords.new = "";
          this.passwords.confirm = "";
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Error changing password:", error);
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah kata sandi",
            showConfirmButton: false,
            timer: 3000,
          });
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.loadProvinces();
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
</style>
