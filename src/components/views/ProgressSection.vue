<template>
  <div class="progress-header">
    <ComponentHeader :blackHeader="blackHeader" :redHeader="redHeader" />
  </div>
  <div class="progress-chart-container">
    <ProgressChart
      chartName="Weight"
      :chartData="weightData"
      :chartColors="['#ED1F24', '#FFFFFF']"
      :chartLibrary="{
        cutout: '80%',
        borderColor: '#ED1F24',
      }"
    />
    <ProgressChart
      chartName="Muscle Mass"
      :chartData="muscleData"
      :chartColors="['#ED1F24', '#FFFFFF']"
      :chartLibrary="muscleLibrary"
    />
  </div>
</template>

<script>
import ProgressChart from "./ProgressChart.vue";
import ComponentHeader from "./ComponentHeader.vue";
export default {
  name: "ProgressSection",
  data() {
    return {
      blackHeader: "Current",
      redHeader: "Progress",
      weightData: {
        Progress: 43,
        Reach: 57,
      },
      muscleData: {
        Progress: 87,
        Reach: 13,
      },
      muscleLibrary: {
        cutout: "80%",
        borderColor: "#ED1F24",
      },
    };
  },
  components: {
    ProgressChart,
    ComponentHeader,
  },
};
</script>

<style>
.progress-chart-container {
  display: flex;
  justify-content: space-evenly;
}
</style>