<template>
  <div class="chart">
    <h1 class="chartTitle">{{ goal }} {{ chartName }}</h1>
    <!-- Create a pie chart with the props obtained -->
    <apexchart
      type="donut"
      :options="chartOptions"
      :series="chartSeries"
      :height="chartHeight"
      :width="chartWidth"
      :style="{ fontFamily: 'Teko, sans-serif' }"
    ></apexchart>
    <h1 class="chartDescription">{{ progressOutput }}% Complete</h1>
  </div>
</template>

<script>
export default {
  // this is a ProgressChart component that generates the pie chart for Weight and Muscle mass progress
  name: "ProgressChartNew",
  data() {
    return {
      chartOptions: {
        legend: {
          position: "bottom",
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: ["#000"],
          },
        },
        stroke: {
          colors: ["#ED1F24"],
        },
        colors: ["#ED1F24", "#FFFFFF"],
        labels: ["Progress", "Remaining"],
      },
      chartHeight: 200, // set chart height
      chartWidth: "100%", // set chart width
    };
  },
  props: {
    chartName: String,
    progressOutput: Number,
    goal: String,
    chartSeries: Array,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.chartTitle {
  font-family: "Teko", sans-serif;
  font-weight: 600;
  font-size: 1.5em;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 0px;
}

.chartDescription {
  font-family: "Teko", sans-serif;
  font-weight: 600;
  font-size: 1.5em;
  color: #ed1f24;
  text-align: center;
  text-transform: uppercase;
  line-height: 2.125em;
}
.chart {
  max-width: 100%;
}
</style>