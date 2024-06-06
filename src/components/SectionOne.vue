<template lang="">
  <div class="container">
    <hr />
    <div class="card border-0">
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-6 text-center mt-3">
            <img
              src="https://www.16personalities.com/static/images/academy/analysts/exercise.svg"
              alt="Tes Psikologi"
              class="img-fluid"
              width="30%"
            />
            <h2 class=""><strong>Tips Memilih Jurusan</strong></h2>
            <p>
              Memilih jurusan kuliah adalah salah satu keputusan penting yang
              harus diambil oleh setiap siswa SLTA
            </p>
            <router-link to="/daftar-jurusan" class="btn btn-sm btn-warning"
              ><i class="fa-solid fa-list"></i> Daftar Jurusan</router-link
            >
          </div>
          <div class="col-12 col-md-6 text-center mt-3">
            <img
              src="https://www.16personalities.com/static/images/test-header-2.svg"
              alt="Tes Psikologi"
              class="img-fluid"
              width="30%"
            />
            <h2 class=""><strong>Tes Psikologi</strong></h2>
            <p>
              Tes Psikologi ini akan membantu anda dalam menentukan jurusan
              kuliah yang sesuai dengan kepribadian anda
            </p>
            <router-link to="/tes-psikologi" class="btn btn-sm btn-primary"
              ><i class="fa-solid fa-play"></i> Mulai Tes Psikologi</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.student_name = JSON.parse(localStorage.getItem("user")).student_name;
    this.province = JSON.parse(localStorage.getItem("user")).province;
    this.city = JSON.parse(localStorage.getItem("user")).city;
    this.gender = JSON.parse(localStorage.getItem("user")).gender;
    this.contact = JSON.parse(localStorage.getItem("user")).contact;
    this.birth_date = JSON.parse(localStorage.getItem("user")).birth_date;
    this.address = JSON.parse(localStorage.getItem("user")).address;

    if (
      this.student_name == null ||
      this.province == null ||
      this.city == null ||
      this.gender == null ||
      this.contact == null ||
      this.birth_date == null ||
      this.address == null
    ) {
      this.$router.push("/profile");
    }
  },
};
</script>
<style lang=""></style>
