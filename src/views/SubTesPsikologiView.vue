<template>
  <div>
    <NavBar />

    <div class="container mt-3">
      <!-- profile -->
      <div class="circle-container">
        <img
          src="https://www.gravatar.com/avatar/${studentEmailEncrypt}?d=identicon"
          alt="Profil Pengguna"
          class="img-fluid rounded-circle"
        />
      </div>
      <h3 class="text-center">{{ studentEmail }}</h3>

      <hr />

      <h5 class="text-center mt-3">
        Tes ini dilakukan untuk mengetahui jurusan yang cocok untuk kamu dengan
        mengetahui kepribadian, minat, serta bakatmu.
      </h5>

      <p class="text-center mt-5">Lakukan Semua Tes dibawah ini!</p>

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
  mounted() {
    this.id = JSON.parse(localStorage.getItem("user")).id;
    this.studentEmail = JSON.parse(localStorage.getItem("user")).student_email;
    this.studentEmailEncrypt = md5(this.studentEmail);

    if (
      localStorage.getItem("first_time_access") ||
      localStorage.getItem("first_submit") === "true"
    ) {
      // alert("Selesaikan Sub Test Sebelumnya Terlebih Dahulu");
      Swal.fire({
        icon: "warning",
        title: "Selesaikan Sub Test Terlebih Dahulu",
        showConfirmButton: false,
        timer: 3000,
      });
    }

    this.fetchTestData();
  },
  data() {
    return {
      id: "",
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
    };
  },
  methods: {
    async fetchTestData() {
      try {
        const response = await axios.get(
          `https://api.abcompany.my.id/api/test/${this.id}`
        );
        const data = response.data;

        // console.log(data);

        if (data.least_time === null) {
          return;
        }

        const now = new Date();
        // console.log("waktu sekarang", now);

        this.testItems.forEach((item) => {
          const answerTime = data.time_first_answers[item.key];
          if (answerTime) {
            let createdAt = new Date(answerTime.created_at);

            if (item.key === "ocean" || item.key === "riasec") {
              createdAt = new Date(
                createdAt.getTime() + 7 * 60 * 60 * 1000 + 10 * 60 * 1000
              );
              // console.log("waktu ocean", createdAt);
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
