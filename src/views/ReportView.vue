<template>
  <div class="home" v-if="allTestsDisabled">
    <NavBar />

    <div class="container mt-5" id="report-content">
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
                    :class="getProgressBarClass(major.percentage)"
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
            <template v-for="(value, key) in personalityResults">
              <div class="col-12 col-md-6 mt-2" :key="key">
                <div class="card">
                  <div class="card-header">
                    {{ key }}:
                    <span :class="getBadgeClass(value)">{{
                      getLabel(value)
                    }}</span>
                  </div>
                  <div class="card-body">
                    <p>{{ descriptions[key] }}</p>
                  </div>
                </div>
              </div>
            </template>
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
            <template v-for="(value, key) in interestResults">
              <div class="col-12 col-md-6 mt-2" :key="key">
                <div class="card">
                  <div class="card-header">
                    {{ key }}:
                    <span :class="getBadgeClass(value)">{{
                      getLabel(value)
                    }}</span>
                  </div>
                  <div class="card-body">
                    <p>{{ descriptions[key] }}</p>
                  </div>
                </div>
              </div>
            </template>
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
            <template v-for="(value, key) in talentResults">
              <div class="col-12 col-md-6 mt-2" :key="key">
                <div class="card">
                  <div class="card-header">
                    {{ key }}:
                    <span :class="getBadgeClass(value)">{{
                      getLabel(value)
                    }}</span>
                  </div>
                  <div class="card-body">
                    <p>{{ descriptions[key] }}</p>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <button
        @click="downloadPDF"
        class="btn btn-primary mt-3"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Download PDF</span>
        <span v-if="isLoading">Loading...</span>
      </button>
    </div>

    <FooterCom />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FooterCom from "@/components/FooterCom.vue";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "ReportView",
  components: {
    NavBar,
    FooterCom,
  },
  data() {
    return {
      isLoading: false,
      allTestsDisabled: false,
      student_name: "",
      results_per_classification: {},
      personalityResults: {
        "Openness to Experience": "",
        Conscientiousness: "",
        Extraversion: "",
        Agreeableness: "",
        Neuroticism: "",
      },
      interestResults: {
        Realistic: "",
        Investigative: "",
        Artistic: "",
        Social: "",
        Enterprising: "",
        Conventional: "",
      },
      talentResults: {
        Memori: "",
        "Math Achievement": "",
        Induction: "",
        "Quantitative Reasoning": "",
        Visualization: "",
        Reading: "",
      },
      descriptions: {
        "Openness to Experience":
          "Openness to Experience adalah keinginan seseorang untuk mencoba hal-hal baru, berbeda, dan menarik. Orang yang memiliki skor rendah pada dimensi ini cenderung lebih konservatif dan tradisional.",
        Conscientiousness:
          "Conscientiousness adalah keinginan seseorang untuk mencapai tujuan dan bekerja keras. Orang yang memiliki skor tinggi pada dimensi ini cenderung lebih disiplin dan bertanggung jawab.",
        Extraversion:
          "Extraversion adalah keinginan seseorang untuk berinteraksi dengan orang lain dan menjadi pusat perhatian. Orang yang memiliki skor tinggi pada dimensi ini cenderung lebih bersemangat dan berani.",
        Agreeableness:
          "Agreeableness adalah keinginan seseorang untuk membantu orang lain dan bersikap baik. Orang yang memiliki skor tinggi pada dimensi ini cenderung lebih ramah dan kooperatif.",
        Neuroticism:
          "Neuroticism adalah kecenderungan seseorang untuk merasa cemas, gelisah, dan mudah terganggu. Orang yang memiliki skor tinggi pada dimensi ini cenderung lebih emosional dan tidak stabil.",
        Realistic:
          "Realistic adalah minat seseorang terhadap aktivitas fisik dan praktis. Orang yang memiliki minat tinggi pada tipe ini cenderung lebih suka bekerja dengan tangan dan alat.",
        Investigative:
          "Investigative adalah minat seseorang terhadap penelitian dan analisis. Orang yang memiliki minat rendah pada tipe ini cenderung lebih suka bekerja dengan fakta dan data.",
        Artistic:
          "Artistic adalah minat seseorang terhadap kreativitas dan ekspresi diri. Orang yang memiliki minat tinggi pada tipe ini cenderung lebih suka bekerja dengan ide dan imajinasi.",
        Social:
          "Social adalah minat seseorang terhadap interaksi sosial dan pelayanan. Orang yang memiliki minat tinggi pada tipe ini cenderung lebih suka bekerja dengan orang lain dan membantu mereka.",
        Enterprising:
          "Enterprising adalah minat seseorang terhadap kepemimpinan dan pengaruh. Orang yang memiliki minat rendah pada tipe ini cenderung lebih suka bekerja dengan orang lain dan membantu mereka.",
        Conventional:
          "Conventional adalah minat seseorang terhadap rutinitas dan keteraturan. Orang yang memiliki minat tinggi pada tipe ini cenderung lebih suka bekerja dengan aturan dan prosedur.",
        Memori:
          "Memori adalah kemampuan seseorang untuk mengingat informasi dan peristiwa. Orang yang memiliki bakat tinggi pada tipe ini cenderung lebih mudah mengingat hal-hal yang telah dipelajari.",
        "Math Achievement":
          "Math Achievement adalah kemampuan seseorang dalam matematika dan logika. Orang yang memiliki bakat rendah pada tipe ini cenderung lebih sulit dalam memahami konsep matematika.",
        Induction:
          "Induction adalah kemampuan seseorang dalam menarik kesimpulan dari informasi yang diberikan. Orang yang memiliki bakat rendah pada tipe ini cenderung lebih sulit dalam menganalisis dan menyimpulkan informasi.",
        "Quantitative Reasoning":
          "Quantitative Reasoning adalah kemampuan seseorang dalam memahami dan menyelesaikan masalah matematika. Orang yang memiliki bakat tinggi pada tipe ini cenderung lebih cepat",
        Visualization:
          "Visualization adalah kemampuan seseorang dalam membayangkan dan memvisualisasikan objek dan ruang. Orang yang memiliki bakat rendah pada tipe ini cenderung lebih sulit dalam memahami konsep visual dan spasial.",
        Reading:
          "Reading adalah kemampuan seseorang dalam memahami dan menafsirkan teks tertulis. Orang yang memiliki bakat rendah pada tipe ini cenderung lebih sulit dalam memahami dan menganalisis teks.",
      },
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
        const response = await axios.get(`/api/report/${studentId}`, {
          headers: {
            "api-key": "qwe123qwe#",
          },
        });
        if (
          response.data.message === "Anda belum mengerjakan/mengenerate Tes!"
        ) {
          this.redirectToSubTesPsikologi();
        } else {
          this.results_per_classification =
            response.data.results_per_classification;

          this.personalityResults["Openness to Experience"] =
            response.data.hasil_tes.o;
          this.personalityResults["Conscientiousness"] =
            response.data.hasil_tes.ce;
          this.personalityResults["Extraversion"] = response.data.hasil_tes.ea;
          this.personalityResults["Agreeableness"] = response.data.hasil_tes.an;
          this.personalityResults["Neuroticism"] = response.data.hasil_tes.n;
          this.interestResults["Realistic"] = response.data.hasil_tes.r;
          this.interestResults["Investigative"] = response.data.hasil_tes.i;
          this.interestResults["Artistic"] = response.data.hasil_tes.a;
          this.interestResults["Social"] = response.data.hasil_tes.s;
          this.interestResults["Enterprising"] = response.data.hasil_tes.e;
          this.interestResults["Conventional"] = response.data.hasil_tes.c;
          this.talentResults["Math Achievement"] = response.data.hasil_tes.math;
          this.talentResults["Visualization"] = response.data.hasil_tes.visual;
          this.talentResults["Memori"] = response.data.hasil_tes.memory;
          this.talentResults["Reading"] = response.data.hasil_tes.reading;
          this.talentResults["Induction"] = response.data.hasil_tes.induction;
          this.talentResults["Quantitative Reasoning"] =
            response.data.hasil_tes.quantitative_reasoning;

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
    getBadgeClass(value) {
      if (value === "Rendah" || value === "Sangat Rendah")
        return "badge text-bg-danger";
      if (value === "Tinggi") return "badge text-bg-warning";
      if (value === "Sangat Tinggi") return "badge text-bg-success";
      return "badge text-bg-secondary";
    },
    getLabel(value) {
      if (value === "Sangat Rendah") return "Sangat Rendah";
      if (value === "Rendah") return "Rendah";
      if (value === "Cukup") return "Cukup";
      if (value === "Tinggi") return "Tinggi";
      if (value === "Sangat Tinggi") return "Sangat Tinggi";
    },
    getProgressBarClass(percentage) {
      if (percentage >= 80) return "progress-bar bg-success text-light";
      return "progress-bar bg-warning text-dark";
    },
    async downloadPDF() {
      this.isLoading = true;
      const reportContent = document.getElementById("report-content");
      const canvas = await html2canvas(reportContent, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // lebar halaman PDF dikurangi margin
      const pdfHeight = pdf.internal.pageSize.getHeight() - 20; // tinggi halaman PDF dikurangi margin

      let imgProps = pdf.getImageProperties(imgData);
      let imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let heightLeft = imgHeight;
      let position = 10; // posisi awal y dengan margin

      pdf.addImage(imgData, "PNG", 10, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 20;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("report.pdf");
      this.isLoading = false;
    },
  },
};
</script>
