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
          <h6>Aqil Rahman</h6>
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
          <h4>{{ currentQuestion.number }}. {{ currentQuestion.question }}</h4>
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
                v-model="selectedAnswer"
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
            <button
              v-if="currentQuestion.number != 1"
              class="btn btn-secondary"
              @click="prevQuestion"
            >
              <i class="fa-solid fa-arrow-left"></i> Kembali
            </button>
            <button
              v-if="currentQuestion.question_id < currentQuestion.last_id"
              class="btn btn-primary"
              @click="handleNextQuestion"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-if="!isLoading">Selanjutnya</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>

            <button
              v-if="currentQuestion.question_id == currentQuestion.last_id"
              class="btn btn-warning"
              @click="handleNextQuestion"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-if="!isLoading">Selesaikan</span>
              <i class="fa-solid fa-arrow-right"></i>
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      currentQuestion: {
        question_id: null,
        number: 1,
        question: "",
        choices: [],
        last_id: null,
        first_id: null,
      },
      selectedAnswer: null,
      totalQuestions: [],
      minutes: 10,
      seconds: 0,
      isDesktopOrLandscape:
        window.innerWidth > 768 || window.innerHeight < window.innerWidth,
      timeUpRedirected: false,
      isLoading: false,
    };
  },
  async mounted() {
    this.startTimer();
    window.addEventListener("resize", this.handleResize);
    this.loadQuestionFromRoute();
    await this.loadQuestions();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    "$route.params.id": "loadQuestionFromRoute",
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
        this.totalQuestions = response.data.total_question;
        this.loadQuestionFromRoute();
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
            name: "tes-kepribadian-minat",
            params: { id: number },
          })
          .catch((err) => {
            if (err.name !== "NavigationDuplicated") {
              console.error(err);
            }
          });
      }
    },
    async loadQuestionFromRoute() {
      const questionNumber = parseInt(this.$route.params.id);
      const studentId = JSON.parse(localStorage.getItem("user")).id;

      const navigateToTesPsikologi = () => {
        if (this.$route.name !== "tes-psikologi") {
          this.$router.push({ name: "tes-psikologi" });
        }
      };
      // Redirect check
      // console.log("last_id", this.currentQuestion.last_id);
      // console.log("first_id", this.currentQuestion.first_id);

      let last_id;
      let first_id;
      if (
        this.currentQuestion.last_id == null &&
        this.currentQuestion.first_id == null
      ) {
        if (localStorage.getItem("title_active") == "Kepribadian") {
          last_id = 1;
          first_id = 1;
        } else if (localStorage.getItem("title_active") == "Minat") {
          last_id = 61;
          first_id = 61;
        }

        if (localStorage.getItem("title_active") && last_id < questionNumber) {
          Swal.fire({
            icon: "warning",
            title: "Anda Belum diizinkan melaksanakan test tersebut",
            timer: 5000,
          }).then(() => {
            navigateToTesPsikologi();
          });
          return;
        }

        if (localStorage.getItem("title_active") && first_id > questionNumber) {
          Swal.fire({
            icon: "warning",
            title: "Anda tidak diizinkan mengakses halaman tersebut",
            timer: 5000,
          }).then(() => {
            navigateToTesPsikologi();
          });
          return;
        }
      } else {
        if (
          localStorage.getItem("title_active") &&
          this.currentQuestion.last_id < questionNumber
        ) {
          Swal.fire({
            icon: "warning",
            title: "Anda Belum diizinkan melaksanakan test tersebut",
            timer: 5000,
          }).then(() => {
            navigateToTesPsikologi();
          });
          return;
        }

        if (
          localStorage.getItem("title_active") &&
          this.currentQuestion.first_id > questionNumber
        ) {
          Swal.fire({
            icon: "warning",
            title: "Anda tidak diizinkan mengakses halaman tersebut",
            timer: 5000,
          }).then(() => {
            navigateToTesPsikologi();
          });
          return;
        }
      }

      try {
        const response = await axios.get(
          `https://api.abcompany.my.id/api/test/form/${questionNumber}/${studentId}`,
          {
            headers: {
              "api-key": "qwe123qwe#",
            },
          }
        );

        const questionData = response.data;
        let choices;

        if (questionData.question.order === "f") {
          choices = [
            { value: "1", text: "Sangat Sesuai" },
            { value: "2", text: "Sesuai" },
            { value: "3", text: "Agar Sesuai" },
            { value: "4", text: "Tidak Sesuai" },
            { value: "5", text: "Sangat Tidak Sesuai" },
          ];
        } else {
          choices = [
            { value: "5", text: "Sangat Sesuai" },
            { value: "4", text: "Sesuai" },
            { value: "3", text: "Agar Sesuai" },
            { value: "2", text: "Tidak Sesuai" },
            { value: "1", text: "Sangat Tidak Sesuai" },
          ];
        }

        this.currentQuestion = {
          question_id: questionData.question_id,
          number: questionData.number,
          question: questionData.question.question,
          choices: choices,
          last_id: questionData.last_id,
          first_id: questionData.first_id,
        };

        if (questionData.student_answer !== null) {
          this.selectedAnswer = questionData.student_answer;
        } else {
          this.selectedAnswer = null;
        }

        if (questionData.first_answers == null) {
          const now = new Date();
          if (localStorage.getItem("first_time_access") === null) {
            localStorage.setItem("first_time_access", now);
          }
          const firstTimeAccess = new Date(
            localStorage.getItem("first_time_access")
          );

          const tenMinutesLater = new Date(
            firstTimeAccess.getTime() + 10 * 60 * 1000
          );

          this.minutes = Math.floor((tenMinutesLater - now) / 60000);
          this.seconds = Math.floor((tenMinutesLater - now) / 1000) % 60;
        } else {
          const now = new Date();
          const firstTimeAccessString = questionData.first_answers.replace(
            " ",
            "T"
          );
          const firstTimeAccess = new Date(firstTimeAccessString);

          firstTimeAccess.setHours(firstTimeAccess.getHours() + 7);

          const tenMinutesLater = new Date(
            firstTimeAccess.getTime() + 10 * 60 * 1000
          );

          this.minutes = Math.floor((tenMinutesLater - now) / 60000);
          this.seconds = Math.floor((tenMinutesLater - now) / 1000) % 60;
        }
      } catch (error) {
        console.error("Error loading question:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal memuat soal. Silakan coba lagi.",
        });
      }
    },
    async submitAnswer() {
      const questionId = this.currentQuestion.question_id;
      const studentId = JSON.parse(localStorage.getItem("user")).id;

      const now = localStorage.getItem("first_time_access");
      let first_submit = localStorage.getItem("first_submit");
      let isoDate;
      if (!first_submit || first_submit === "false") {
        isoDate = new Date(now).toISOString().replace("T", " ").split(".")[0];
        localStorage.setItem("first_submit", true);
      } else {
        isoDate = new Date().toISOString().replace("T", " ").split(".")[0];
      }

      try {
        await axios.post(
          `https://api.abcompany.my.id/api/test/submit/${questionId}/${studentId}`,
          {
            answer: this.selectedAnswer,
            created_at: isoDate,
          },
          {
            headers: {
              "api-key": "qwe123qwe#",
            },
          }
        );
      } catch (error) {
        console.error("Error submitting answer:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal mengirim jawaban. Silakan coba lagi.",
        });
      }
    },
    async handleNextQuestion() {
      this.isLoading = true;
      await this.submitAnswer();
      this.nextQuestion();
      this.loadQuestions();
      this.isLoading = false;
    },
    nextQuestion() {
      if (this.currentQuestion.question_id == this.currentQuestion.last_id) {
        // sweertalert anda yakin ingin menyelesaikan test
        Swal.fire({
          title: "Apakah Anda Yakin?",
          text: "Anda akan menyelesaikan test ini",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Selesaikan!",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("first_time_access");
            localStorage.removeItem("first_submit");
            localStorage.removeItem("title_active");
            this.$router.push({ name: "tes-psikologi" });
          }
        });
      }
      const nextQuestionId = parseInt(this.currentQuestion.question_id) + 1;
      // console.log(this.currentQuestion.last_id);

      if (nextQuestionId <= this.currentQuestion.last_id) {
        this.selectQuestion(nextQuestionId);
      }
    },
    prevQuestion() {
      if (this.currentQuestion.question_id > 1) {
        this.selectQuestion(this.currentQuestion.question_id - 1);
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
</style>
