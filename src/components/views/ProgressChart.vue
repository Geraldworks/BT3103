<template>
  <div>
    <pie-chart
      :donut="true"
      :data="chartData"
      :colors="chartColors"
      :library="chartLibrary"
    ></pie-chart>
    <h1 class="chartTitle">{{ chartName }}</h1>
  </div>
</template>

<script>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

export default {
  name: "ProgressChart",
  data() {
    return {};
  },
  props: {
    chartName: String,
    chartData: Object,
    chartColors: String,
    chartLibrary: String,
  },
};
</script>

<style scoped>
.chartTitle {
  /* width: 119px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 553px;
  left: 839px; */
  font-family: "Teko", sans-serif;
  font-weight: 600;
  font-size: 1.5em;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  line-height: 2.125em;
}
</style>