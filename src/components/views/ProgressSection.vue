<template>
  <div class="progress-section-container">
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
        Remaining: 57,
      },
      muscleData: {
        Progress: 87,
        Remaining: 13,
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
.progress-section-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  display: inline-block;
  height: 28em;
  box-sizing: border-box;
}

.progress-chart-container {
  display: flex;
  justify-content: space-evenly;
}
</style>