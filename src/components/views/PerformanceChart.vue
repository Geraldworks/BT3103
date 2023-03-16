<template>
  <!-- <div class="chart">
    <h1>{{ chartName }} - {{ mostRecentData }}</h1>
    <CChart type="line" class="lineChart" :data="chartData" />
  </div> -->
</template>

<!-- <style scoped>
.lineChart {
  margin: auto;
  width: 300px;
  border: 3px solid gray;
} -->
</style>

<script>
export default {
  name: "PerformanceChart",
  data() {
    return {
      chartName: "Fat Percentage",
      mostRecentData: "15%", // Maybe do some indexing from data
      chartData: {
        datasets: [
          {
            backgroundColor: "rgba(151, 187, 205, 0.2)",
            borderColor: "rgba(151, 187, 205, 1)",
            pointBackgroundColor: "rgba(151, 187, 205, 1)",
            pointBorderColor: "#fff",
            data: {
              January: 32,
              February: 29,
              March: 28,
              April: 30,
              May: 26,
              June: 24,
              July: 20,
            },
          },
        ],
      },
    };
  },
};
</script>