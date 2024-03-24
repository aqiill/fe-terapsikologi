<template>
  <div class="home">
    <NavBar />
    <HeroCom />
    <SectionOne />
    <ContactCom />
    <FooterCom />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import HeroCom from "@/components/HeroCom.vue";
import SectionOne from "@/components/SectionOne.vue";
import ContactCom from "@/components/ContactCom.vue";
import FooterCom from "@/components/FooterCom.vue";

export default {
  name: "HomeView",
  components: {
    NavBar,
    HeroCom,
    SectionOne,
    ContactCom,
    FooterCom,
  },
};
</script>
