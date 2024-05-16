<template>
  <div>
    <NavBar />

    <div class="container mt-3">
      <!-- profile -->
      <div class="circle-container">
        <img
          src="https://www.gravatar.com/avatar/423423442424242223232?d=mp&s=100"
          alt="Profil Pengguna"
          class="img-fluid rounded-circle"
        />
      </div>
      <h3 class="text-center">Aqil Rahman</h3>

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

export default {
  name: "DaftarJurusanView",
  components: {
    NavBar,
    FooterCom,
    CardItem,
  },
  data() {
    return {
      testItems: [
        {
          title: "Kepribadian",
          imgSrc: require("@/assets/images/personality.svg"),
          imgAlt: "Kepribadian",
        },
        {
          title: "Minat",
          imgSrc: require("@/assets/images/interest.svg"),
          imgAlt: "Minat",
        },
        {
          title: "Visualization",
          imgSrc: require("@/assets/images/visualization.svg"),
          imgAlt: "Visualization",
        },
        {
          title: "Induction",
          imgSrc: require("@/assets/images/induction.svg"),
          imgAlt: "Induction",
        },
        {
          title: "Qty Reas",
          imgSrc: require("@/assets/images/qty_reas.svg"),
          imgAlt: "Qty Reas",
        },
        {
          title: "Math",
          imgSrc: require("@/assets/images/math.svg"),
          imgAlt: "Math",
        },
        {
          title: "Reading",
          imgSrc: require("@/assets/images/reading.svg"),
          imgAlt: "Reading",
        },
        {
          title: "Memori",
          imgSrc: require("@/assets/images/memory.svg"),
          imgAlt: "Memori",
        },
      ],
    };
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
