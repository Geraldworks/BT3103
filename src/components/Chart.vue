<template>
  <div class="chart">
    <h1>{{ chartName }} - {{ recentData }}%</h1>
    <line-chart class="lineChart" :data="chartData" :colors="chartColor"/>
  </div>
</template>

<script>
// Chart component
let fat = [32, 29, 28, 30, 26];
let time = [1, 2, 3, 4, 5];

export default {
  data() {

  },
  props: {
    chartName: String,
    chartData: Object,
    recentData: String,
    chartColor: String
  },
};
</script>
