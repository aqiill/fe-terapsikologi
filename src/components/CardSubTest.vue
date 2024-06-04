<template>
  <div class="col-6 col-md-3 mt-3">
    <div
      class="card box-sub-tes"
      :class="{ disabled: isDisabled, 'bg-success': bgSuccess }"
      @click="showAlert()"
    >
      <div class="card-img-container">
        <img :src="imgSrc" class="card-img-top p-3" :alt="imgAlt" />
        <div v-if="disabled" class="label-top">Selesai</div>
        <div v-if="isDisabled && !disabled" class="label-top-dua">
          Belum Diizinkan
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">{{ title }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "CardItem",
  props: {
    title: String,
    imgSrc: String,
    imgAlt: String,
    disabled: Boolean,
    bgSuccess: Boolean,
  },
  computed: {
    isDisabled() {
      const activeTitle = localStorage.getItem("title_active");
      return activeTitle !== null && activeTitle !== this.title;
    },
  },
  methods: {
    showAlert() {
      if (this.isDisabled) {
        return;
      }

      let alertOptions = {};
      let redirectPath = "/";

      switch (this.title) {
        case "Kepribadian": {
          alertOptions = {
            title: "Persiapan Tes",
            html:
              '<p class="text-start">Berikut ini terdapat 60 pernyataan. Baca dan pahami setiap butir pernyataannya. Pilihlah jawaban pada salah satu kolom pilihan yang telah disediakan. Tidak ada jawaban yang salah, karena itu pilihlah jawaban dengan jujur sesuai dengan kondisi dan keadaan yang paling menggambarkan diri anda saat ini, bukan yang Anda harapkan di masa depan. Tanggapan anda akan dijaga kerahasiaannya. Harap baca setiap pernyataan dengan seksama, dan jangan sampai ada pernyataan yang tidak anda isi.</p>' +
              '<ul class="text-start"><li> (SS) : jika keadaan anda saat ini SANGAT SESUAI dengan pernyataan yang ada.</li><li> (S) : jika keadaan anda saat ini SESUAI dengan pernyataan yang ada.</li><li> (AS) : jika keadaan anda saat ini AGAK SESUAI dengan pernyataan yang ada.</li><li> (TS) : jika keadaan anda saat ini TIDAK SESUAI dengan pernyataan yang ada.</li><li>(STS) : jika keadaan anda saat ini SANGAT TIDAK SESUAI dengan pernyataan yang ada.</li></ul>',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Ya, Mulai!",
            cancelButtonText: "Tidak, Batalkan!",
          };
          redirectPath = "/tes/kepribadian-minat/1";
          break;
        }
        case "Minat": {
          alertOptions = {
            title: "Persiapan Tes",
            html: '<ol class="text-start"><li>Terdapat sejumlah pernyataan yang harus anda isi</li><li>Bacalah setiap pernyataan-pernyataan tersebut dengan seksama</li><li>Pililhlah salah satu dari 5 (lima) alternatif jawaban yang tersedia yang paling sesuai dengan pada kolom yang telah disediakan. Adapun pilihan jawaban yang tersedia adalah sebagai berikut:<ul><li> (SS) : jika keadaan anda saat ini SANGAT SESUAI dengan pernyataan yang ada.</li><li> (S) : jika keadaan anda saat ini SESUAI dengan pernyataan yang ada.</li><li> (AS) : jika keadaan anda saat ini AGAK SESUAI dengan pernyataan yang ada.</li><li> (TS) : jika keadaan anda saat ini TIDAK SESUAI dengan pernyataan yang ada.</li><li>(STS) : jika keadaan anda saat ini SANGAT TIDAK SESUAI dengan pernyataan yang </li></ul></li><li>Jawablah semua nomor dan pastikan jangan ada yang terlewati.</li><li>Tidak ada jawaban yang dianggap salah, sehingga anda tidak perlu ragu untuk menentukan jawaban yang paling sesuai dengan diri anda.</li><li>Bila anda telah selesai mengerjakan, saya mohon kesediaan anda untuk memeriksa kembali sehingga tidak ada pernyataan yang terlewatkan.</li></ol>',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Ya, Mulai!",
            cancelButtonText: "Tidak, Batalkan!",
          };
          redirectPath = "/tes/kepribadian-minat/61";
          break;
        }
        case "Visualization": {
          alertOptions = {
            title: "Apakah kamu yakin?",
            text: "Tes akan dimulai!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Ya, Mulai!",
            cancelButtonText: "Tidak, Batalkan!",
          };
          redirectPath = "/tes/bakat/115";
          break;
        }
        case "Induction": {
          alertOptions = {
            title: "Persiapan Tes",
            html:
              '<p class="text-start">Ada beberapa pertanyaan berupa soal gambar. Silahkan anda perhatikan dan pahami pertanyaan dari soal gambar di bawah ini.  </p>' +
              '<p class="text-start">Ada beberapa pertanyaan berupa soal gambar. Silahkan anda perhatikan dan pahami pertanyaan dari soal gambar di bawah ini. </p>' +
              '<p class="text-start">Soal gambar di bawah ini berupa:</p>' +
              '<ol class="text-start"><li>Urutan Gambar: Silahkan anda mencari urutan atau seri objek berikutnya yang mempunyai hubungan konsisten dan logis terhadap objek-objek sebelumnya. Dalam setiap soal akan ditemukan urutan logis dari beberapa kotak. Tugas Anda adalah memutuskan urutan mana dari kotak terakhir tersebut. Untuk memberikan jawaban, pilih salah satu kotak bergambar pada pilihan A ke E.</li><li>Klasifikasi gambar: Masing-masing soal terdiri dari lima (5) buah gambar yang sekilas tampak sama, tetapi hanya ada satu gambar yang berbeda dengan gambar lain. Pilih salah satu gambar yang tidak sama di antara kelima gambar lainnya tersebut</li><li>Analogi gambar: Dalam tes ini, setiap soal terdiri dari satu baris bentuk gambar. Setiap bentuk gambar yang pertama dihubungkan dengan bentuk gambar kedua. Dengan cara yang sama, dan bentuk gambar ketiga dihubungkan dengan bentuk gambar keempat. Manakah dari kelima bentuk gambar dari pilihan A ke E yang merupakan bentuk gambar keempat?</li></ol>',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Ya, Mulai!",
            cancelButtonText: "Tidak, Batalkan!",
          };
          redirectPath = "/tes/bakat/175";
          break;
        }
        case "Qty Reas": {
          alertOptions = {
            title: "Persiapan Tes",
            html: '<p class="text-start">Ada beberapa pertanyaan berupa soal hitungan. Silahkan anda perhatikan dan pahami pertanyaan dari soal hitungan tersebut. Soal hitungan di bawah ini berupa soal perbandingan dan logika hitungan tanpa melibatkan rumus matematika yang kompleks. Silahkan anda jawab soal-soal hitungan di bawah ini sebisa anda, kemudian anda pilih jawaban yang paling tepat dari lima alternatif jawaban yang disediakan. </p>',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Ya, Mulai!",
            cancelButtonText: "Tidak, Batalkan!",
          };
          redirectPath = "/tes/bakat/205";
          break;
        }
        case "Math": {
          alertOptions = {
            title: "Apakah kamu yakin?",
            text: "Tes akan dimulai!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Ya, Mulai!",
            cancelButtonText: "Tidak, Batalkan!",
          };
          redirectPath = "/tes/bakat/235";
          break;
        }
        case "Reading": {
          alertOptions = {
            title: "Persiapan Tes",
            html: '<p class="text-start">Berikut ini ada beberapa teks atau bacaan, silahkan anda baca dan pahami. Soal yang diberikan berkaitan dengan isi teks masing-masing. Silahkan anda jawab pertanyaan-pertanyaan dari tiap teks yang diberikan, kemudian anda pilih jawaban yang paling tepat dari lima alternatif jawaban yang disediakan. </p>',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Ya, Mulai!",
            cancelButtonText: "Tidak, Batalkan!",
          };
          redirectPath = "/tes/bakat/265";
          break;
        }
        case "Memori": {
          alertOptions = {
            title: "Persiapan Tes",
            html:
              '<div id="timer" class="text-center">' +
              '<h4>Waktu Tersisa: <span id="countdown">2:00</span></h4>' +
              "</div>" +
              "<p>Tes berikut meminta Anda untuk menghafalkan sejumlah kata dalam waktu 2 menit. Setelah itu, Anda akan diminta untuk menjawab pertanyaan berdasarkan bahan yang dihafalkan tersebut.</p>" +
              '<div class="page-body">' +
              '<img src="https://i.ibb.co.com/8036kbp/Contoh-Soal-Intruksi.png" width="100%" alt="Contoh Soal">' +
              "</div>",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: "#6c757d",
            cancelButtonText: "Mulai Tes",
            timer: 120000, // Waktu dalam milisekon (2 menit = 120000 milisekon)
            timerProgressBar: true,
            allowOutsideClick: false,
            willClose: () => {
              clearInterval(this.countdownInterval);
              this.$router.push("/tes/bakat/287");
            },
          };
          // Mengatur countdown timer pada sweet alert
          let timer = 120;
          this.countdownInterval = setInterval(() => {
            let countdownElement = document.getElementById("countdown");
            if (countdownElement) {
              timer -= 1;
              let minutes = Math.floor(timer / 60);
              let seconds = timer % 60;
              countdownElement.innerText =
                (minutes < 10 ? "0" : "") +
                minutes +
                ":" +
                (seconds < 10 ? "0" : "") +
                seconds;
              if (timer <= 0) {
                clearInterval(this.countdownInterval);
              }
            }
          }, 1000);
          break;
        }
        default: {
          alertOptions = {
            title: "Apakah Anda yakin?",
            text: "Anda akan memulai tes ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, mulai tes!",
            cancelButtonText: "Tidak, tetap di sini",
          };
          break;
        }
      }

      Swal.fire(alertOptions).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("title_active", this.title);
          this.$router.push(redirectPath);
        }
      });
    },
  },
};
</script>

<style scoped>
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

.label-top {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(240, 191, 76);
  color: black;
  padding: 5px 10px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 0.25rem;
}

.label-top-dua {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(209, 30, 17);
  color: white;
  padding: 5px 10px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 0.25rem;
}
</style>
