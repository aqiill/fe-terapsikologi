<template>
  <div class="home" v-if="allTestsDisabled">
    <NavBar />

    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <img
            src="../assets/images/rekomendasi.svg"
            alt="Rekomendasi"
            class="justify-content-center d-block mx-auto"
            width="20%"
          />
          <h3 class="text-center">Rekomendasi Jurusan</h3>
          <h3 class="text-center">{{ student_name }}</h3>

          <div
            v-for="(majors, classification) in results_per_classification"
            :key="classification"
            class="mt-4"
          >
            <div class="col-12 mt-3">
              <b>{{ classification.toUpperCase() }}</b>
            </div>
            <div class="row">
              <div
                v-for="major in majors"
                :key="major.major_id"
                class="col-12 col-md-6 mt-3"
              >
                <div class="progress">
                  <div
                    class="progress-bar bg-warning text-dark"
                    role="progressbar"
                    :style="{ width: major.percentage + '%' }"
                    :aria-valuenow="major.percentage"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {{ major.major }} {{ major.percentage.toFixed(2) }}% Cocok
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <hr />
        </div>

        <div class="col-md-12 mb-5">
          <h4 class="text-center"><strong>Laporan Hasil Tes</strong></h4>
          <h4 class="text-center"><strong>Psikologi</strong></h4>
        </div>

        <div class="col-12 col-md-4">
          <img
            src="../assets/images/r-kepribadian.svg"
            width="100%"
            alt="Kepribadian"
          />
        </div>

        <div class="col-12 col-md-8">
          <h4>Kepribadian</h4>
          <div class="row">
            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Openness to Experience: Rendah</div>
                <div class="card-body">
                  <p>
                    Openness to Experience adalah keinginan seseorang untuk
                    mencoba hal-hal baru, berbeda, dan menarik. Orang yang
                    memiliki skor rendah pada dimensi ini cenderung lebih
                    konservatif dan tradisional.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Conscientiousness: Tinggi</div>
                <div class="card-body">
                  <p>
                    Conscientiousness adalah keinginan seseorang untuk mencapai
                    tujuan dan bekerja keras. Orang yang memiliki skor tinggi
                    pada dimensi ini cenderung lebih disiplin dan bertanggung
                    jawab.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Extraversion: Tinggi</div>
                <div class="card-body">
                  <p>
                    Extraversion adalah keinginan seseorang untuk berinteraksi
                    dengan orang lain dan menjadi pusat perhatian. Orang yang
                    memiliki skor tinggi pada dimensi ini cenderung lebih
                    bersemangat dan berani.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Agreeableness: Sangat Tinggi</div>
                <div class="card-body">
                  <p>
                    Agreeableness adalah keinginan seseorang untuk membantu
                    orang lain dan bersikap baik. Orang yang memiliki skor
                    tinggi pada dimensi ini cenderung lebih ramah dan
                    kooperatif.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Neuroticism: Tinggi</div>
                <div class="card-body">
                  <p>
                    Neuroticism adalah kecenderungan seseorang untuk merasa
                    cemas, gelisah, dan mudah terganggu. Orang yang memiliki
                    skor tinggi pada dimensi ini cenderung lebih emosional dan
                    tidak stabil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <hr />
        </div>

        <div class="col-12 col-md-4 d-block d-md-none">
          <img src="../assets/images/r-minat.svg" width="100%" alt="Minat" />
        </div>

        <div class="col-12 col-md-8">
          <h4>Minat</h4>
          <div class="row">
            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Realistic: Tinggi</div>
                <div class="card-body">
                  <p>
                    Realistic adalah minat seseorang terhadap aktivitas fisik
                    dan praktis. Orang yang memiliki minat tinggi pada tipe ini
                    cenderung lebih suka bekerja dengan tangan dan alat.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Investigative: Rendah</div>
                <div class="card-body">
                  <p>
                    Investigative adalah minat seseorang terhadap penelitian dan
                    analisis. Orang yang memiliki minat rendah pada tipe ini
                    cenderung lebih suka bekerja dengan fakta dan data.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Artistic: Tinggi</div>
                <div class="card-body">
                  <p>
                    Artistic adalah minat seseorang terhadap kreativitas dan
                    ekspresi diri. Orang yang memiliki minat tinggi pada tipe
                    ini cenderung lebih suka bekerja dengan ide dan imajinasi.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Social: Tinggi</div>
                <div class="card-body">
                  <p>
                    Social adalah minat seseorang terhadap interaksi sosial dan
                    pelayanan. Orang yang memiliki minat tinggi pada tipe ini
                    cenderung lebih suka bekerja dengan orang lain dan membantu
                    mereka.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Enterprising: Rendah</div>
                <div class="card-body">
                  <p>
                    Enterprising adalah minat seseorang terhadap kepemimpinan
                    dan pengaruh. Orang yang memiliki minat rendah pada tipe ini
                    cenderung lebih suka bekerja dengan orang lain dan membantu
                    mereka.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Conventional: Tinggi</div>
                <div class="card-body">
                  <p>
                    Conventional adalah minat seseorang terhadap rutinitas dan
                    keteraturan. Orang yang memiliki minat tinggi pada tipe ini
                    cenderung lebih suka bekerja dengan aturan dan prosedur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <img src="../assets/images/r-minat.svg" width="100%" alt="Minat" />
        </div>

        <div class="col-12">
          <hr />
        </div>

        <div class="col-12 col-md-4">
          <img src="../assets/images/r-bakat.svg" width="100%" alt="Bakat" />
        </div>

        <div class="col-12 col-md-8">
          <h4>Bakat</h4>
          <div class="row">
            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Memori: Tinggi</div>
                <div class="card-body">
                  <p>
                    Memori adalah kemampuan seseorang untuk mengingat informasi
                    dan peristiwa. Orang yang memiliki bakat tinggi pada tipe
                    ini cenderung lebih mudah mengingat hal-hal yang telah
                    dipelajari.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Math Achivement: Rendah</div>
                <div class="card-body">
                  <p>
                    Math Achivement adalah kemampuan seseorang dalam matematika
                    dan logika. Orang yang memiliki bakat rendah pada tipe ini
                    cenderung lebih sulit dalam memahami konsep matematika.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Induction: Rendah</div>
                <div class="card-body">
                  <p>
                    Induction adalah kemampuan seseorang dalam menarik
                    kesimpulan dari informasi yang diberikan. Orang yang
                    memiliki bakat rendah pada tipe ini cenderung lebih sulit
                    dalam menganalisis dan menyimpulkan informasi.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Quantitative Reasoning: Tinggi</div>
                <div class="card-body">
                  <p>
                    Quantitative Reasoning adalah kemampuan seseorang dalam
                    memahami dan menyelesaikan masalah matematika. Orang yang
                    memiliki bakat tinggi pada tipe ini cenderung lebih cepat
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Visualization: Rendah</div>
                <div class="card-body">
                  <p>
                    Visualization adalah kemampuan seseorang dalam membayangkan
                    dan memvisualisasikan objek dan ruang. Orang yang memiliki
                    bakat rendah pada tipe ini cenderung lebih sulit dalam
                    memahami konsep visual dan spasial.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-2">
              <div class="card">
                <div class="card-header">Reading: Rendah</div>
                <div class="card-body">
                  <p>
                    Reading adalah kemampuan seseorang dalam memahami dan
                    menafsirkan teks tertulis. Orang yang memiliki bakat rendah
                    pada tipe ini cenderung lebih sulit dalam memahami dan
                    menganalisis teks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterCom />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FooterCom from "@/components/FooterCom.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ReportView",
  components: {
    NavBar,
    FooterCom,
  },
  data() {
    return {
      allTestsDisabled: false,
      student_name: "",
      results_per_classification: {},
    };
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.student_name = user.student_name;

    if (!this.student_name) {
      this.$router.push("/profile");
      return;
    }

    await this.checkAllTestsDisabled(user.id);
  },
  methods: {
    async checkAllTestsDisabled(studentId) {
      try {
        const response = await axios.get(
          `https://api.abcompany.my.id/api/report/${studentId}`,
          {
            headers: {
              "api-key": "qwe123qwe#",
            },
          }
        );
        if (
          response.data.message === "Anda belum mengerjakan/mengenerate Tes!"
        ) {
          this.redirectToSubTesPsikologi();
        } else {
          this.results_per_classification =
            response.data.results_per_classification;
          this.allTestsDisabled = true;
        }
      } catch (error) {
        console.error("Error checking test data:", error);
        this.redirectToSubTesPsikologi();
      }
    },
    redirectToSubTesPsikologi() {
      Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Harap selesaikan semua tes terlebih dahulu, dan lakukan generate report.",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        this.$router.push("/tes-psikologi");
      });
    },
  },
};
</script>
