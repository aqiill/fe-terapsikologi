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
                'btn-warning':
                  question.id == currentQuestion.question.question_id,
                'btn-secondary':
                  question.id !== currentQuestion.question.question_id,
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
            v-if="currentQuestion.question.question_image"
            class="d-flex justify-content-center"
          >
            <img
              v-if="isSvg"
              :src="currentQuestion.question.question_image"
              alt="Question Image"
              class="img-fluid mb-3"
            />
            <p v-else>{{ currentQuestion.question.question_image }}</p>
          </div>
          <h4>
            {{ currentQuestion.number }}.
            {{ currentQuestion.question.question }}
          </h4>
          <div class="mt-3 d-flex justify-content-center flex-wrap">
            <div
              v-for="choice in answerOptions"
              :key="choice.value"
              class="form-check m-2"
            >
              <input
                class="form-check-input"
                type="radio"
                :name="'question' + currentQuestion.number"
                :id="'choice' + choice.value"
                :value="choice.value"
                v-model="selectedOption"
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
        question_id: null,
        number: 1,
        question: "",
        last_id: null,
        first_id: null,
        question_image: null,
        student_answer: null,
      },
      selectedOption: null,
      totalQuestions: [],
      minutes: 6,
      seconds: 0,
      isDesktopOrLandscape:
        window.innerWidth > 768 || window.innerHeight < window.innerWidth,
      timeUpRedirected: false,
    };
  },
  watch: {
    currentQuestion: {
      deep: true,
      handler(newQuestion) {
        if (newQuestion.student_answer !== null) {
          this.$nextTick(() => {
            this.selectedOption = newQuestion.student_answer;
          });
        }
      },
    },
  },
  async mounted() {
    this.startTimer();
    window.addEventListener("resize", this.handleResize);
    await this.loadQuestions();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    answerOptions() {
      if (!this.currentQuestion || !this.currentQuestion.question) {
        return [];
      }

      if (this.currentQuestion.answer_choices) {
        const optionLabels = ["a", "b", "c", "d", "e"];
        return Object.keys(this.currentQuestion.answer_choices)
          .filter((key) => key.startsWith("option"))
          .map((key, index) => {
            const optionText = this.currentQuestion.answer_choices[key];
            const isImageUrl = /^https?:\/\/raw\.githubusercontent\.com\//.test(
              optionText
            );
            return {
              value: optionLabels[index],
              text: optionText,
              image: isImageUrl ? optionText : null,
            };
          });
      }
      return [];
    },
    isSvg() {
      const imageUrl = this.currentQuestion.question.question_image;
      return imageUrl && imageUrl.endsWith(".svg");
    },
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

        this.currentQuestion = response.data;

        this.selectedOption = response.data.student_answer;
        this.totalQuestions = response.data.total_question;
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
      if (this.$route.params.id !== String(number)) {
        this.$router
          .push({
            name: "tes-bakat",
            params: { id: number },
          })
          .catch((err) => {
            if (err.name !== "NavigationDuplicated") {
              console.error(err);
            }
          });
      }
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
