<template>
  <div class="progress-section-container">
    <div class="progress-header">
      <ComponentHeader :blackHeader="blackHeader" :redHeader="redHeader" />
    </div>
    <div class="progress-chart-container">
      <ProgressChart
        chartName="Weight"
        :progressOutput="weightData.Progress"
        :chartData="weightData"
        :chartColors="['#ED1F24', '#FFFFFF']"
        :chartLibrary="{
          cutout: '80%',
          borderColor: '#ED1F24',
          color: '#000',
        }"
      />
      <ProgressChart
        chartName="Muscle Mass"
        :chartData="muscleData"
        :progressOutput="muscleData.Progress"
        :chartColors="['#ED1F24', '#FFFFFF']"
        :chartLibrary="{
          cutout: '80%',
          borderColor: '#ED1F24',
          color: '#000',
        }"
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
    };
  },
  computed: {},
  components: {
    ProgressChart,
    ComponentHeader,
  },
};
</script>

<style scoped>
.progress-section-container {
  /* background: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  display: inline-block;
  height: 34.5vh;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  /* height: 34.5vh; */
  width: 100%;
  box-sizing: border-box;
}

.progress-chart-container {
  display: flex;
  justify-content: space-evenly;
}
</style>