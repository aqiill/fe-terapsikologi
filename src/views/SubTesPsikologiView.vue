<template>
  <div>
    <NavBar />

    <div class="container mt-3">
      <!-- profile -->
      <div class="circle-container">
        <img
          :src="
            'https://www.gravatar.com/avatar/' +
            studentEmailEncrypt +
            '?d=identicon'
          "
          alt="Profil Pengguna"
          class="img-fluid rounded-circle"
        />
      </div>
      <h3 class="text-center">{{ student_name }}</h3>

      <hr />

      <h5 class="text-center mt-3">
        Tes ini dilakukan untuk mengetahui jurusan yang cocok untuk kamu dengan
        mengetahui kepribadian, minat, serta bakatmu.
      </h5>

      <div v-if="allTestsDisabled" class="text-center mt-5">
        <button
          class="btn btn-primary mb-5"
          @click="checkSummaryBeforeReport()"
          :disabled="isGenerateReport"
        >
          <span v-if="!isGenerateReport"
            ><i class="fa-regular fa-envelope"></i> Lihat Hasil Tes</span
          >
          <span v-if="isGenerateReport"> Loading Generate Report...</span>
        </button>
      </div>
      <p v-else class="text-center mt-5">Kerjakan semua subtes di bawah ini!</p>

      <div class="row">
        <CardItem
          v-for="(item, index) in testItems"
          :key="index"
          :title="item.title"
          :img-src="item.imgSrc"
          :img-alt="item.imgAlt"
          :disabled="item.disabled"
          :bg-success="item.disabled"
        />
      </div>
    </div>

    <FooterCom />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FooterCom from "@/components/FooterCom.vue";
import CardItem from "@/components/CardSubTest.vue";

import md5 from "blueimp-md5";
import axios from "axios";

// Sweetalert2
import Swal from "sweetalert2";

export default {
  name: "SubTesPsikologiView",
  components: {
    NavBar,
    FooterCom,
    CardItem,
  },
  data() {
    return {
      id: "",
      student_name: "",
      studentEmail: "",
      studentEmailEncrypt: "",
      testItems: [
        {
          title: "Kepribadian",
          key: "ocean",
          imgSrc: require("@/assets/images/personality.svg"),
          imgAlt: "Kepribadian",
          disabled: false,
        },
        {
          title: "Minat",
          key: "riasec",
          imgSrc: require("@/assets/images/interest.svg"),
          imgAlt: "Minat",
          disabled: false,
        },
        {
          title: "Visualization",
          key: "visual",
          imgSrc: require("@/assets/images/visualization.svg"),
          imgAlt: "Visualization",
          disabled: false,
        },
        {
          title: "Induction",
          key: "induction",
          imgSrc: require("@/assets/images/induction.svg"),
          imgAlt: "Induction",
          disabled: false,
        },
        {
          title: "Qty Reas",
          key: "quatitative_reasoning",
          imgSrc: require("@/assets/images/qty_reas.svg"),
          imgAlt: "Qty Reas",
          disabled: false,
        },
        {
          title: "Math",
          key: "math",
          imgSrc: require("@/assets/images/math.svg"),
          imgAlt: "Math",
          disabled: false,
        },
        {
          title: "Reading",
          key: "reading",
          imgSrc: require("@/assets/images/reading.svg"),
          imgAlt: "Reading",
          disabled: false,
        },
        {
          title: "Memori",
          key: "memory",
          imgSrc: require("@/assets/images/memory.svg"),
          imgAlt: "Memori",
          disabled: false,
        },
      ],
      isGenerateReport: false,
    };
  },
  computed: {
    allTestsDisabled() {
      return this.testItems.every((item) => item.disabled);
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.student_name = user.student_name;
    this.province = user.province;
    this.city = user.city;
    this.gender = user.gender;
    this.contact = user.contact;
    this.birth_date = user.birth_date;
    this.address = user.address;

    if (
      !this.student_name ||
      !this.province ||
      !this.city ||
      !this.gender ||
      !this.contact ||
      !this.birth_date ||
      !this.address
    ) {
      this.$router.push("/profile");
    }

    this.id = user.id;
    this.studentEmail = user.student_email;
    this.studentEmailEncrypt = md5(this.studentEmail);

    if (
      localStorage.getItem("first_time_access") ||
      localStorage.getItem("first_submit") === "true"
    ) {
      Swal.fire({
        icon: "warning",
        title: "Selesaikan Sub Test Terlebih Dahulu",
        showConfirmButton: false,
        timer: 3000,
      });
    }

    this.fetchTestData();
  },
  methods: {
    async checkSummaryBeforeReport() {
      if (!this.allTestsDisabled) {
        Swal.fire({
          icon: "warning",
          title: "Harap selesaikan semua tes terlebih dahulu",
          showConfirmButton: true,
        });
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      const student_id = user.id;

      try {
        const response = await axios.get(`/api/checkSummary/${student_id}`, {
          headers: {
            "api-key": "qwe123qwe#",
          },
        });
        const data = response.data;

        if (data.message != "Anda belum mengerjakan/mengenerate Tes!") {
          this.$router.push("/report");
        } else {
          this.report();
        }
      } catch (error) {
        console.error("Error checking summary:", error);
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Tidak dapat terhubung ke server.",
        });
      }
    },

    async report() {
      if (this.allTestsDisabled) {
        const user = JSON.parse(localStorage.getItem("user"));
        const student_id = user.id;
        const school_id = user.school_id || 0;

        this.isGenerateReport = true;
        try {
          const response = await axios.get(
            `/api/generate/${student_id}/${school_id}`,
            {
              headers: {
                "api-key": "qwe123qwe#",
              },
            }
          );

          if (
            response.data.message === "Generate Report Berhasil" ||
            response.data.message === "Data sudah ada"
          ) {
            this.$router.push("/report");
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal mengenerate report",
              showConfirmButton: true,
            });
          }
        } catch (error) {
          console.error("Error during report generation:", error);
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Tidak dapat terhubung ke server.",
          });
        }
        this.isGenerateReport = false;
      } else {
        Swal.fire({
          icon: "warning",
          title: "Harap selesaikan semua tes terlebih dahulu",
          showConfirmButton: true,
        });
      }
    },
    async fetchTestData() {
      try {
        const response = await axios.get(`/api/test/${this.id}`);
        const data = response.data;

        if (data.least_time === null) {
          return;
        }

        const now = new Date();

        this.testItems.forEach((item) => {
          const answerTime = data.time_first_answers[item.key];
          if (answerTime) {
            let createdAt = new Date(answerTime.created_at);

            if (item.key === "ocean" || item.key === "riasec") {
              createdAt = new Date(
                createdAt.getTime() + 7 * 60 * 60 * 1000 + 10 * 60 * 1000
              );
            } else {
              createdAt = new Date(
                createdAt.getTime() + 7 * 60 * 60 * 1000 + 6 * 60 * 1000
              );
            }

            if (now > createdAt) {
              item.disabled = true;
            }
          }
        });
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    },
  },
};
</script>

<style>
.circle-container {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 auto;
}

.circle-container img {
  width: 100%;
  height: auto;
  display: block;
}

.box-sub-tes:hover {
  background: #ffc926;
}

.card-img-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.router-link-active {
  color: inherit;
  text-decoration: none;
}
</style>
