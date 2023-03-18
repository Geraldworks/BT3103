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
  font-family: Teko;
  font-weight: SemiBold;
  font-size: 24px;
  opacity: 1;
  text-align: center;
}
</style>