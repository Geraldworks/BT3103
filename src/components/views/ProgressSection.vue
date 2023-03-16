<template>
  <ProgressChart chartName="Weight" />
  <ProgressChart chartName="Muscle Mass" />
</template>

<script>
import ProgressChart from "./ProgressChart.vue";
export default {
  name: "ProgressSection",
  components: {
    ProgressChart,
  },
};
</script>