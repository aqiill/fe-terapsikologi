<template lang="">
  <div>
    <NavBar />
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 mt-5">
          <img
            src="https://avatar.oxro.io/avatar.svg?name=Teknik+Informatika"
            class="img-fluid rounded"
            alt="Thumbnail Jurusan"
          />
        </div>
        <div class="col-12 col-md-6 mt-5">
          <h2>Teknik Informatika</h2>
          <p>UNIVERSITAS NEGERI JAKARTA</p>
          <canvas id="myChart" width="100%"></canvas>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <h4 class="text-center">
            <strong>Daftar Uang Kuliah Tunggal</strong>
          </h4>
        </div>
        <div class="col-12 col-md-4">
          <label for="exampleDataList2" class="form-label"
            >Bandingkan dengan Kampus Lain</label
          >
          <input
            class="form-control"
            list="datalistOptions2"
            id="exampleDataList2"
            placeholder="Cari Kampus Disini..."
          />
          <datalist id="datalistOptions2">
            <option value="Universitas Indonesia"></option>
            <option value="Universitas Padjadjaran"></option>
            <option value="Politeknik Negeri Bandung"></option>
            <option value="Politeknik Negeri Jakarta"></option>
            <option value="Institute Teknologi Bandung"></option>
          </datalist>
        </div>
        <div class="col-12 mt-3">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Kampus</th>
                  <th scope="col">UKT 1</th>
                  <th scope="col">UKT 2</th>
                  <th scope="col">UKT 3</th>
                  <th scope="col">UKT 4</th>
                  <th scope="col">UKT 5</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr>
                  <th scope="row">1</th>
                  <td>Universitas Negeri Jakarta</td>
                  <td>500.000</td>
                  <td>1.000.000</td>
                  <td>2.500.000</td>
                  <td>4.000.000</td>
                  <td>6.000.000</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Universitas Padjadjaran</td>
                  <td>500.000</td>
                  <td>2.000.000</td>
                  <td>2.900.000</td>
                  <td>5.000.000</td>
                  <td>8.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <router-link to="/daftar-jurusan" class="btn mt-3 btn-primary"
            ><i class="fa-solid fa-backward"></i> Kembali</router-link
          >
        </div>
      </div>
    </div>
    <FooterCom />
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import NavBar from "@/components/NavBar.vue";
import FooterCom from "@/components/FooterCom.vue";
export default {
  name: "DaftarJurusanDetailView",
  components: {
    NavBar,
    FooterCom,
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      // Data untuk diplot
      const data = {
        labels: ["2019", "2020", "2021", "2022", "2023"],
        datasets: [
          {
            label: "Jumlah Peminat",
            data: [900, 220, 500, 800, 700],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
          {
            label: "Jumlah Diteima",
            data: [10, 20, 30, 40, 50],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      // Konfigurasi chart
      const config = {
        type: "bar",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      // Membuat chart baru dengan ID "myChart"
      new Chart(document.getElementById("myChart"), config);
    },
  },
};
</script>
<style lang=""></style>
