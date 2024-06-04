<template>
  <div id="app" class="d-flex" v-if="isDesktopOrLandscape">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-content">
        <div class="user-info text-center mt-3">
          <img
            src="https://www.gravatar.com/avatar/ba9c91bedd6e7506ad00e833f0a0b813?d=mp&s=150"
            alt="User"
            class="rounded-circle"
            height="50"
          />
          <h6>Aqil Rahman 2</h6>
          <span class="badge bg-success"
            >Sisa Waktu {{ minutes }}:{{ seconds }}</span
          >
        </div>
        <h5 class="text-center mt-3">Nomor Soal</h5>
        <div class="d-flex flex-wrap justify-content-center">
          <div
            v-for="(question, index) in totalQuestions"
            :key="question.id"
            class="p-2"
            style="width: 25%"
          >
            <button
              :class="{
                'btn-warning': question.id == currentQuestion.question_id,
                'btn-secondary': question.id !== currentQuestion.question_id,
                'btn-primary': question.chosen == 1,
              }"
              class="btn btn-question w-100"
              @click="selectQuestion(question.id)"
            >
              {{ index + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content flex-grow-1">
      <!-- Navbar -->
      <nav class="navbar navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand mx-auto" href="#">
            <img
              src="https://app.terapsikologi.com/assets/img/logo_login.svg"
              alt="Logo"
              height="50"
            />
          </a>
        </div>
      </nav>

      <!-- Question Box -->
      <div class="container mt-5">
        <div class="question-box p-4">
          <div
            v-if="currentQuestion.image"
            class="d-flex justify-content-center"
          >
            <img
              :src="currentQuestion.image"
              alt="Question Image"
              class="img-fluid mb-3"
            />
          </div>
          <h4>{{ currentQuestion.text }}</h4>
          <div class="mt-3 d-flex justify-content-center flex-wrap">
            <div
              v-for="choice in currentQuestion.choices"
              :key="choice.value"
              class="form-check m-2"
            >
              <input
                class="form-check-input"
                type="radio"
                :name="'question' + currentQuestion.number"
                :id="'choice' + choice.value"
                :value="choice.value"
              />
              <label class="form-check-label" :for="'choice' + choice.value">
                <div v-if="choice.image">
                  <img :src="choice.image" alt="Choice Image" height="150" />
                </div>
                <div v-else>
                  {{ choice.text }}
                </div>
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-secondary" @click="prevQuestion">
              <i class="fa-solid fa-arrow-left"></i> Kembali
            </button>
            <button class="btn btn-primary" @click="nextQuestion">
              Selanjutnya <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    <h1>Hanya Tersedia Pada Mode Desktop dan Tablet (Landscape)</h1>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      currentQuestion: {
        number: 1,
        text: "Jika kubus kita putar satu kali ke arah kiri, satu kali. Bentuk kubus yang baru adalah",
        image:
          "https://raw.githubusercontent.com/kojolahsandboxcorp/TerapsAssets/7882457ecc27bb816cfe4bf94632244ab8bf1eb6/soal-3/3.svg", // URL gambar soal (opsional)
        choices: [
          { value: "choice1", text: "Pilihan 1" },
          {
            value: "choice2",
            text: "Pilihan 2",
            image: "https://example.com/choice2.png",
          },
          { value: "choice3", text: "Pilihan 3" },
          { value: "choice4", text: "Pilihan 4" },
        ],
      },
      totalQuestions: [],
      minutes: 6,
      seconds: 0,
      isDesktopOrLandscape:
        window.innerWidth > 768 || window.innerHeight < window.innerWidth,
      timeUpRedirected: false,
    };
  },
  async mounted() {
    this.startTimer();
    window.addEventListener("resize", this.handleResize);
    await this.loadQuestions();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    startTimer() {
      setInterval(() => {
        if (this.seconds === 0) {
          if (this.minutes > 0) {
            this.minutes--;
            this.seconds = 59;
          } else if (!this.timeUpRedirected) {
            this.timeUpRedirected = true;
            localStorage.removeItem("first_time_access");
            localStorage.removeItem("first_submit");
            localStorage.removeItem("title_active");
            Swal.fire({
              icon: "warning",
              title: "Waktu Habis",
              text: "Waktu untuk mengerjakan soal sudah habis.",
            }).then(() => {
              if (this.$route.name !== "tes-psikologi") {
                this.$router.push({ name: "tes-psikologi" });
              }
            });
          }
        } else {
          this.seconds--;
        }
      }, 1000);
    },
    handleResize() {
      this.isDesktopOrLandscape =
        window.innerWidth > 768 || window.innerHeight < window.innerWidth;
    },
    async loadQuestions() {
      const questionNumber = parseInt(this.$route.params.id);
      const studentId = JSON.parse(localStorage.getItem("user")).id;
      try {
        const response = await axios.get(
          `https://api.abcompany.my.id/api/test/form/${questionNumber}/${studentId}`,
          {
            headers: {
              "api-key": "qwe123qwe#",
            },
          }
        );
        console.log("Questions loaded:", response.data);
        this.totalQuestions = response.data.total_question;
        // this.loadQuestionFromRoute();
      } catch (error) {
        console.error("Error loading questions:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal memuat soal. Silakan coba lagi.",
        });
      }
    },

    selectQuestion(number) {
      this.currentQuestion = {
        number: number,
        text: `Contoh soal nomor ${number}?`,
        image:
          number % 2 === 0
            ? "https://raw.githubusercontent.com/kojolahsandboxcorp/TerapsAssets/7882457ecc27bb816cfe4bf94632244ab8bf1eb6/soal-3/3.svg"
            : null, // Contoh kondisi untuk gambar soal
        choices: [
          { value: "choice1", text: "Pilihan 1" },
          {
            value: "choice2",
            text: "Pilihan 2",
            image:
              "https://raw.githubusercontent.com/kojolahsandboxcorp/TerapsAssets/f8946186f03e0be3d8d7db37d6ecc047f1ec15bb/jawaban-3/28-3.svg",
          },
          { value: "choice3", text: "Pilihan 3" },
          { value: "choice4", text: "Pilihan 4" },
        ],
      };
    },
    nextQuestion() {
      if (this.currentQuestion.number < 60) {
        this.selectQuestion(this.currentQuestion.number + 1);
      }
    },
    prevQuestion() {
      if (this.currentQuestion.number > 1) {
        this.selectQuestion(this.currentQuestion.number - 1);
      }
    },
  },
};
</script>

<style>
body {
  background-color: #f8f9fa;
}

.sidebar {
  width: 280px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #343a40;
  color: white;
  overflow-y: auto;
}

.sidebar-content {
  padding: 20px;
}

.main-content {
  margin-left: 280px;
  transition: all 0.3s;
}

.question-box {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-question {
  width: 100%;
  height: 40px;
  font-size: 1rem;
  padding: 0;
}

@media (max-width: 768px) and (min-width: 1024px) {
  .question-box {
    margin: 20px;
  }
}

/* @media (max-width: 768px) {
  #app {
    display: none;
  }
} */
</style>
