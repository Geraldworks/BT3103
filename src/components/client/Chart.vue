<template>
  <div>
    <div>{{ chartName }} - {{ recentData }}{{ metric }}</div>
    <line-chart class="lineChart" :data="chartData" :colors="chartColor" />
  </div>
</template>

<script>
export default {
  // create a child component, Chart, that takes in this set of props to render the chart for viewing on the performance page
  name: "Chart",
  props: {
    chartName: String,
    chartData: Object,
    recentData: Number,
    chartColor: Array,
    metric: String,
  },
};
</script>

<style scoped>
div {
  font-size: 34px;
}
</style>
