<template>
  <div class="chart">
    <h1 class="chartTitle">{{ goal }} {{ chartName }}</h1>
    <!-- Create a pie chart with the props obtained -->
    <pie-chart
      class="progress-chart"
      :donut="true"
      :data="chartData"
      :colors="chartColors"
      :library="chartLibrary"
      style="height: 150px; width: 100%; font-family: 'Teko', sans-serif"
    ></pie-chart>
    <pie-chart
      :data="[
        ['Blueberry', 44],
        ['Strawberry', 23],
      ]"
    ></pie-chart>
    <h1 class="chartDescription">{{ progressOutput }}% Complete</h1>
  </div>
</template>

<script>
export default {
  // this is a ProgressChart component that generates the pie chart for Weight and Muscle mass progress
  name: "ProgressChart",
  props: {
    chartName: String,
    progressOutput: Number,
    goal: String,
    chartData: Object,
    chartColors: Array,
    chartLibrary: Object,
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