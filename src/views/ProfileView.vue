<template>
  <div class="home">
    <NavBar />

    <div class="container mt-5">
      <h2>Profil Pengguna</h2>

      <!-- Collapse untuk Profil Pengguna -->
      <button
        class="btn btn-primary ms-2 mt-3"
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
                  v-model="user.province"
                  @change="updateCities"
                >
                  <option
                    v-for="province in provinces"
                    :key="province.id"
                    :value="province.name"
                  >
                    {{ province.name }}
                  </option>
                </select>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="city" class="form-label">Pilihan Kota</label>
                <select class="form-select" id="city" v-model="user.city">
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.name"
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
                <label for="whatsapp" class="form-label">Kontak Whatsapp</label>
                <input
                  type="tel"
                  class="form-control"
                  id="whatsapp"
                  v-model="user.whatsapp"
                />
              </div>
              <div class="col-12 mb-3">
                <label for="gender" class="form-label">Jenis Kelamin</label>
                <select class="form-select" id="gender" v-model="user.gender">
                  <option value="male">Pria</option>
                  <option value="female">Wanita</option>
                </select>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary float-end">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Collapse untuk Ganti Kata Sandi -->
      <button
        class="btn btn-secondary ms-2 mt-3"
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
                />
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-secondary">
                  Ganti Kata Sandi
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
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import FooterCom from "@/components/FooterCom.vue";

export default {
  name: "ReportView",
  components: {
    NavBar,
    FooterCom,
  },
  data() {
    return {
      user: {
        name: "",
        finalScore: null,
        email: "",
        address: "",
        province: "",
        city: "",
        school: "SMA Negeri 1",
        birthdate: "",
        whatsapp: "",
        gender: "",
      },
      provinces: [
        { id: 1, name: "Jawa Barat" },
        { id: 2, name: "Jawa Timur" },
      ],
      cities: [],
      passwords: {
        current: "",
        new: "",
        confirm: "",
      },
    };
  },
  methods: {
    updateCities() {
      if (this.user.province === "Jawa Barat") {
        this.cities = [
          { id: 1, name: "Bandung" },
          { id: 2, name: "Bekasi" },
        ];
      } else if (this.user.province === "Jawa Timur") {
        this.cities = [
          { id: 3, name: "Surabaya" },
          { id: 4, name: "Malang" },
        ];
      } else {
        this.cities = [];
      }
    },
    handleSubmit() {
      console.log("Form Submitted:", this.user);
    },
    handlePasswordChange() {
      console.log("Password Changed:", this.passwords);
    },
  },
};
</script>
