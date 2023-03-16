<script>
import Chart from "./Chart.vue";

// Importing Data from firebase
// Make this whole thing async
let fats = [3, 4, 5, 6, 7];
let weights = [5, 6, 7, 8, 7];
let muscles = [16, 14, 12, 10, 15];
//let dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let dates = [1, 2, 3, 4, 5];

let makeObject = function (dates, data) {
  let obj = {};
  for (let i = 0; i < dates.length; i++) {
    obj[dates[i]] = data[i];
  }
  return obj;
};

let fatDateObject = makeObject(dates, fats);
let weightDateObject = makeObject(dates, weights);
let muscleDateObject = makeObject(dates, muscles);

export default {
  data() {
    return {
      fatDateObject,
      weightDateObject,
      muscleDateObject,
      recentFat: fats[fats.length - 1],
      recentWeight: weights[weights.length - 1],
      recentMuscle: muscles[muscles.length - 1]
    };
  },
  components: {
    Chart,
  },
};

console.log(muscleDateObject);
</script>

<template>
  <div class="chart-container">
    <Chart
      class="chart"
      chartName="Fat Percentage"
      :chartData="fatDateObject"
      :chartColor="['#FF0000']"
      :recentData="recentFat"
    />
    <Chart
      class="chart"
      chartName="Weight"
      :chartData="weightDateObject"
      :chartColor="['#FF0000']"
      :recentData="recentWeight"
    />
    <Chart
      class="chart"
      chartName="Muscle Mass"
      :chartData="muscleDateObject"
      :chartColor="['#FF0000']"
      :recentData="recentMuscle"
    />
  </div>
</template>

<style>
.chart-container {
  display: flex;
  justify-content: space-evenly;
}

.chart {
  width: 30%;
  margin: 5px;
  padding: 5px;
}

.color1 {
}
</style>
