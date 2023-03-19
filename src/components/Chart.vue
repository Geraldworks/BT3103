<template>
  <div>
    <h1>{{ chartName }} - {{ recentData }}%</h1>
    <line-chart class="lineChart" :data="chartData" :colors="chartColor"/>
  </div>
</template>

<script>
export default {
  // this segment is to test the graphs
  data() {
    return {
      // chartData: {
      //   "Monday" : 1,
      //   "Tuesday": 2,
      //   "Wednesday": 3,
      //   "Thursday": 4,
      //   "Friday": 5
      // }
    }
  },
  props: {
    chartName: String,
    chartData: Object,
    recentData: Number,
    chartColor: Array
  },
};
</script>
