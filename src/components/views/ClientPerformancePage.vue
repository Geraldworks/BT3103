<template>
  <div class="performance-page">
    <div>
      <TrainerNavbar />
    </div>
    <TrainerPerformanceHeader :email= "holder"/>
    <div class="content-container">
      <AllCharts :email= "holder" />
      <PerformanceBottom class="bottom" :email= "holder" />
    </div>
  </div>
</template>

<script>
import AllCharts from "../client/AllCharts.vue";
import PerformanceBottom from "../client/PerformanceBottom.vue";
import TrainerPerformanceHeader from "../trainer/TrainerPerformanceHeader.vue";
import TrainerNavbar from '../trainer/TrainerNavbar.vue';

export default {
  name: "ClientPerformancePage",
  props:["clientEmail"],
  components: {
    AllCharts,
    PerformanceBottom,
    TrainerPerformanceHeader,
    TrainerNavbar,
  },
  created() {
    this.holder = this.$route.params.clientEmail;
  },
  data() {
    return {
      holder: ""
    }
  }

};
</script>
<style scoped>
.performance-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 800px; /* Or else the PerformanceBottom component will overflow into the side margin */
  padding-bottom: 50px;
}

.content-container {
  background-color: #d9d9d9;
  margin: 0vw 10vw;
  border-radius: 25px;
  padding-bottom: 30px;
  margin-top: 22px;
}

body::-webkit-scrollbar {
  display: none;
}
</style>
