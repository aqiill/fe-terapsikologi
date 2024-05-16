<template lang="">
  <div>
    <NavBar />

    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 mt-5">
          <label for="exampleDataList" class="form-label">Filter Jurusan</label>
          <input
            class="form-control"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Ketik Disini..."
          />
          <datalist id="datalistOptions">
            <option value="Teknik Informatika"></option>
            <option value="Teknik Sipil"></option>
            <option value="Teknik Kimia"></option>
            <option value="Manajemen Pemerintahan"></option>
            <option value="Akuntansi"></option>
          </datalist>
        </div>

        <!-- <div class="col-12 col-md-4 mt-5">
          <label for="exampleDataList2" class="form-label">Filter Kampus</label>
          <input
            class="form-control"
            list="datalistOptions2"
            id="exampleDataList2"
            placeholder="Ketik Disini..."
          />
          <datalist id="datalistOptions2">
            <option value="Universitas Indonesia"></option>
            <option value="Universitas Padjadjaran"></option>
            <option value="Politeknik Negeri Bandung"></option>
            <option value="Politeknik Negeri Jakarta"></option>
            <option value="Institute Teknologi Bandung"></option>
          </datalist>
        </div> -->
      </div>
      <div class="row">
        <div v-for="index in 8" :key="index" class="col-6 col-md-3 mt-5">
          <div class="card">
            <img
              src="https://avatar.oxro.io/avatar.svg?name=Teknik+Informatika"
              class="card-img-top"
              alt="Thumbnail Jurusan"
            />
            <div class="card-body d-grid gap-2">
              <h5 class="card-title">Teknik Informatika</h5>
              <!-- <p class="card-text">UNIVERSITAS NEGERI JAKARTA</p> -->
              <router-link to="/daftar-jurusan/1" class="btn btn-primary btn-sm"
                >Selengkapnya</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-12 d-flex justify-content-center mt-5">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <FooterCom />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import FooterCom from "@/components/FooterCom.vue";

export default {
  name: "DaftarJurusanView",
  components: {
    NavBar,
    FooterCom,
  },
};
</script>
<style lang=""></style>
