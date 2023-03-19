<template>
  <div>
    <Navbar />
    <PerformanceChart />
    <h1>This is performance page</h1>
  </div>
</template>

<script>
import PerformanceChart from "./PerformanceChart.vue";
export default {
  name: "PerformancePage",
  components: {
    PerformanceChart
  },
};
</script>

<style scoped>
</style>