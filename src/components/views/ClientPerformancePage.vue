<template>
  <div class="performance-page">
    <div>
      <Navbar />
    </div>
    <PerformanceHeader />
    <div class="content-container">
      <AllCharts :email= clientEmail />
      <PerformanceBottom class="bottom" :email= clientEmail />
    </div>
  </div>
</template>

<script>
import { mapGetters, useStore } from "vuex";
import {db, auth} from "../../firebase.js"
import AllCharts from "../client/AllCharts.vue";
import PerformanceBottom from "../client/PerformanceBottom.vue";
import PerformanceHeader from "../client/PerformanceHeader.vue";

export default {
  name: "ClientPerformancePage",
  props:["clientEmail"],
  components: {
    AllCharts,
    PerformanceBottom,
    PerformanceHeader,
  },
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
